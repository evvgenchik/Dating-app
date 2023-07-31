import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { birthdayValidator, avatarValidator } from './signUpValidator';
import MyButton from '@/components/UI/Button/MyButton';
import styles from './SignUp.module.scss';
import heart from '@/assets/Home/heart2.svg';
import Modal from '@/components/Modal/Modal';
import checkRed from '@/assets/checkRed.svg';
import Loader from '@/components/UI/Loader/Loader';
import { AuthApi } from '@/api/services/authApi';
import { AuthForm, GenderEnum, LookingEnum, UserType } from '@/utils/types';
import { format } from 'date-fns';
import { UserApi } from '@/api/services/userApi';
import axios from 'axios';

type AuthFormKeys = keyof AuthForm;

const ERRORS = {
  requiredFnMsg: (field: string) => `${field} is required`,
};

type Props = {
  currentUser?: UserType;
};

function SignUp({ currentUser }: Props) {
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const action = currentUser ? 'UPDATE' : 'CREATE';

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<AuthForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: currentUser && {
      email: currentUser.email,
      firstName: currentUser.firstName,
      birthday: format(new Date(currentUser.birthday), 'yyyy-MM-dd'),
      gender: currentUser.gender as GenderEnum,
      looking: currentUser.looking as LookingEnum,
      descriptrion: currentUser.descriptrion,
    },
  });

  useEffect(() => {
    if (!currentUser) return;

    async function getFileFromUrl(url: string) {
      const res = await axios<Blob>({ url, responseType: 'blob' });
      const blob = res.data;
      const file = new File([blob], 'avatar', { type: blob.type });
      reset({ avatar: file }, { keepDefaultValues: true });
    }

    getFileFromUrl(currentUser.avatar);
  }, [currentUser?.avatar]);

  const errorHandler = (field: AuthFormKeys, message: string) => {
    setError(
      field,
      {
        type: 'custom',
        message,
      },
      { shouldFocus: true }
    );
  };

  const sendImage = async (icon: File) => {
    try {
      const res = await UserApi.avatar(icon);
      const fileData = res.data.url;
      return fileData;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const sendUser = async (user: AuthForm) => {
    try {
      const res = currentUser
        ? await UserApi.update(currentUser.id, user)
        : await AuthApi.signup(user);
      return res;
    } catch (error) {
      const statusCode = error?.response?.status;

      if (statusCode === 409) {
        errorHandler('email', 'User with this email already exists');
        return null;
      }

      if (statusCode === 550) {
        errorHandler('email', 'Incorrect emai: user with this email not found');
        return null;
      }

      console.error(error);
    }
  };

  const submitHandler: SubmitHandler<AuthForm> = async (data) => {
    setIsLoading(true);

    const avatar = await sendImage(data.avatar);
    const user = await sendUser({ ...data, avatar });

    if (user) {
      reset();
      setSuccess(true);
      !currentUser && setTimeout(() => navigate('/'), 3000);
    }

    setIsLoading(false);
  };

  const fileInputHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    const fileSrc = URL.createObjectURL(files[0]);
    setAvatarSrc(fileSrc);
  };

  return (
    <div className={styles.container}>
      {!currentUser && (
        <div className={styles.header}>
          <div className={styles.logoText}>
            Finder
            <img className={styles.logoImage} src={heart} alt='heart' />
          </div>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <h1 className={styles.title}>{action} ACCOUNT</h1>
        <div className={styles.formContent}>
          <div className={styles.leftSide}>
            <label role='mainLabel' className={styles.mainLabel}>
              Email:
              <input
                {...register('email', {
                  required: ERRORS.requiredFnMsg('Email'),
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
                className={styles.input}
                type='email'
                placeholder='Email'
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </label>

            <label role='mainLabel' className={styles.mainLabel}>
              Password:
              <input
                {...register('password', {
                  required: ERRORS.requiredFnMsg('Password'),
                  minLength: {
                    value: 4,
                    message: 'Password must be more than 4 symbols',
                  },
                })}
                className={styles.input}
                type='password'
                placeholder='Password'
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </label>

            <label role='mainLabel' className={styles.mainLabel}>
              First name:
              <input
                {...register('firstName', {
                  required: ERRORS.requiredFnMsg('First name'),
                  pattern: {
                    value: /^[A-Z]+[a-z]/g,
                    message:
                      "Name must start with a capital letter and doesn't contain spaces",
                  },
                })}
                className={styles.input}
                type='text'
                placeholder='First name'
              />
              {errors.firstName && (
                <p className={styles.error}>{errors.firstName.message}</p>
              )}
            </label>

            <label role='mainLabel' className={styles.mainLabel}>
              Birthday:
              <input
                {...register('birthday', {
                  required: ERRORS.requiredFnMsg('Birthday'),
                  valueAsDate: true,
                  validate: birthdayValidator,
                })}
                className={styles.input}
                type='date'
                placeholder='Birthday'
              />
              {errors.birthday && (
                <p className={styles.error}>{errors.birthday.message}</p>
              )}
            </label>

            <label role='mainLabel' className={`${styles.mainLabel}`}>
              Gender:
              <div className={styles.radioContainer}>
                <input
                  id='man-gender'
                  {...register('gender', {
                    required: ERRORS.requiredFnMsg('Gender'),
                  })}
                  type='radio'
                  value='man'
                />
                <label htmlFor='man-gender' className={styles.innerLabel}>
                  Man
                </label>
                <input
                  id='woman-gender'
                  {...register('gender', {
                    required: ERRORS.requiredFnMsg('Gender'),
                  })}
                  type='radio'
                  value='wooman'
                />
                <label htmlFor='woman-gender' className={styles.innerLabel}>
                  Wooman
                </label>
                <input
                  id='neutral-gender'
                  {...register('gender', {
                    required: ERRORS.requiredFnMsg('Gender'),
                  })}
                  type='radio'
                  value='neutral'
                />
                <label htmlFor='neutral-gender' className={styles.innerLabel}>
                  Neutral
                </label>
              </div>
              {errors.gender && (
                <p className={styles.error}>{errors.gender.message}</p>
              )}
            </label>

            <label role='mainLabel' className={`${styles.mainLabel}`}>
              Looking for:
              <div className={styles.radioContainer}>
                <input
                  id='man-looking'
                  {...register('looking', {
                    required: ERRORS.requiredFnMsg('Lokking'),
                  })}
                  type='radio'
                  value='man'
                />
                <label htmlFor='man-looking' className={styles.innerLabel}>
                  Man
                </label>
                <input
                  id='woman-looking'
                  {...register('looking', {
                    required: ERRORS.requiredFnMsg('Lokking'),
                  })}
                  type='radio'
                  value='wooman'
                />
                <label htmlFor='woman-looking' className={styles.innerLabel}>
                  Wooman
                </label>
                <input
                  id='everyone-looking'
                  {...register('looking', {
                    required: ERRORS.requiredFnMsg('Lokking'),
                  })}
                  type='radio'
                  value='everyone'
                />
                <label htmlFor='everyone-looking' className={styles.innerLabel}>
                  Everyone
                </label>
              </div>
              {errors.looking && (
                <p className={styles.error}>{errors.looking.message}</p>
              )}
            </label>

            <label role='mainLabel' className={styles.mainLabel}>
              Brief description of yourself
              <Controller
                rules={{
                  required: ERRORS.requiredFnMsg('Description'),
                  minLength: {
                    value: 10,
                    message: 'Description must contain at least 10 symbols',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Description must contain no more than 50 symbols',
                  },
                }}
                name='descriptrion'
                control={control}
                render={({ field: { onChange, onBlur } }) => (
                  <textarea
                    className={styles.textarea}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder='Type your answer here'
                    defaultValue={currentUser?.descriptrion}
                  />
                )}
              />
              {errors.descriptrion && (
                <p className={styles.error}>{errors.descriptrion.message}</p>
              )}
            </label>
          </div>

          <div className={styles.rigthSide}>
            <label role='mainLabel' className={styles.mainLabel}>
              Profile photo:
              <div className={styles.inputFile}>
                <span className={styles.inputFileText}>{avatarSrc}</span>
                <Controller
                  rules={{
                    required: ERRORS.requiredFnMsg('Photo'),
                    validate: avatarValidator,
                  }}
                  name='avatar'
                  control={control}
                  render={({ field: { onChange } }) => (
                    <input
                      onChange={(e) => {
                        fileInputHandler(e);
                        onChange(e.target.files[0]);
                      }}
                      className={styles.input}
                      type='file'
                    />
                  )}
                />
                <span className={styles.inputFileBtn}>Выберите файл</span>
              </div>
              {errors.avatar && (
                <p className={styles.error}>{errors.avatar.message}</p>
              )}
            </label>

            <div className={styles.iconContainer}>
              {(avatarSrc || currentUser?.avatar) && (
                <img
                  className={styles.iconContainer}
                  src={avatarSrc || currentUser.avatar}
                  alt='profile'
                />
              )}
            </div>
          </div>
        </div>

        <MyButton data-testid='submitBtn' type='submit' className='signup-btn'>
          {action}
        </MyButton>
      </form>

      <Modal active={success} setActive={setSuccess}>
        <div className='success-popup'>
          <h2 className='success-title'>
            Awesome!
            <img className='check-mark' src={checkRed} alt='checkMark' />
          </h2>
          <h3 className='success-sub-title'>
            Your profile was successfully {action.toLowerCase() + 'd'}.
          </h3>
          {!currentUser && (
            <>
              <p className='success-text'>
                Thank you for your time! We sand message on your email. Please
                confirm it.
              </p>
              <p className='success-text'>
                Now you will be redirected to main page for authorization.
              </p>
            </>
          )}
        </div>
      </Modal>

      {isLoading && <Loader />}

      <div className={styles.empty} />
    </div>
  );
}

export default SignUp;
