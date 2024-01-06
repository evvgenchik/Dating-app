import { AuthForm, GenderEnum, LookingEnum, UserType } from '@/utils/types';
import checkRed from '@/assets/checkRed.svg';
import styles from './SignUp.module.scss';

import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { format } from 'date-fns';

import { birthdayValidator, avatarValidator } from './signUpValidator';
import { AuthApi } from '@/api/services/authApi';
import { UserApi } from '@/api/services/userApi';
import MyButton from '@/components/UI/Button/MyButton';
import Modal from '@/components/Modal/Modal';
import Logo from '@/components/Logo/Logo';
import Loader from '@/components/UI/Loader/Loader';

type AuthFormKeys = keyof AuthForm;

export const ERRORS_SPECIFIC = {
  email: {
    notMatch: 'Entered value does not match email format',
    exist: 'User with this email already exists',
    notFound: 'Incorrect emai: user with this email not found',
  },
  password: {
    length: 'Password must be more than 4 symbols',
  },
  firstName: {
    capitalLetter:
      "Name must start with a capital letter and doesn't contain spaces",
  },
  description: {
    lengthMax: 'Description must contain no more than 50 symbols',
    lengthMin: 'Description must contain at least 10 symbols',
  },
};

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
      const blob = await UserApi.getImage(url);
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
        errorHandler('email', ERRORS_SPECIFIC.email.exist);
        return null;
      }

      if (statusCode === 550) {
        errorHandler('email', ERRORS_SPECIFIC.email.notFound);
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
          <Logo />
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <h1 className={styles.title}>{action} ACCOUNT</h1>
        <div className={styles.formContent}>
          <div className={styles.leftSide}>
            <div role='mainLabel' className={styles.mainLabel}>
              Email:
              <input
                {...register('email', {
                  required: ERRORS.requiredFnMsg('Email'),
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: ERRORS_SPECIFIC.email.notMatch,
                  },
                })}
                className={styles.input}
                type='email'
                placeholder='Email'
              />

              {errors.email && (
                <p role='errorMsg' className={styles.error}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div role='mainLabel' className={styles.mainLabel}>
              Password:
              <input
                {...register('password', {
                  required: ERRORS.requiredFnMsg('Password'),
                  minLength: {
                    value: 4,
                    message: ERRORS_SPECIFIC.password.length,
                  },
                })}
                className={styles.input}
                type='password'
                placeholder='Password'
              />

              {errors.password && (
                <p role='errorMsg' className={styles.error}>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div role='mainLabel' className={styles.mainLabel}>
              First name:
              <input
                {...register('firstName', {
                  required: ERRORS.requiredFnMsg('First name'),
                  pattern: {
                    value: /^[A-Z]+[a-z]/g,
                    message: ERRORS_SPECIFIC.firstName.capitalLetter,
                  },
                })}
                className={styles.input}
                type='text'
                placeholder='First name'
              />

              {errors.firstName && (
                <p role='errorMsg' className={styles.error}>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div role='mainLabel' className={styles.mainLabel}>
              Birthday:
              <input
                {...register('birthday', {
                  required: ERRORS.requiredFnMsg('Birthday'),
                  valueAsDate: true,
                  validate: birthdayValidator,
                })}
                aria-label='inputDate'
                className={styles.input}
                type='date'
                placeholder='Birthday'
              />

              {errors.birthday && (
                <p role='errorMsg' className={styles.error}>
                  {errors.birthday.message}
                </p>
              )}
            </div>

            <div role='mainLabel' className={`${styles.mainLabel}`}>
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
                <p role='errorMsg' className={styles.error}>
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div role='mainLabel' className={`${styles.mainLabel}`}>
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
                <p role='errorMsg' className={styles.error}>
                  {errors.looking.message}
                </p>
              )}
            </div>

            <div role='mainLabel' className={styles.mainLabel}>
              Brief description of yourself
              <Controller
                rules={{
                  required: ERRORS.requiredFnMsg('Description'),
                  minLength: {
                    value: 10,
                    message: ERRORS_SPECIFIC.description.lengthMin,
                  },
                  maxLength: {
                    value: 50,
                    message: ERRORS_SPECIFIC.description.lengthMax,
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
                <p role='errorMsg' className={styles.error}>
                  {errors.descriptrion.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.rigthSide}>
            <div role='mainLabel' className={styles.mainLabel}>
              Profile photo:
              <label className={styles.inputFile}>
                <span className={styles.inputFileText}>{avatarSrc}</span>

                <Controller
                  rules={{
                    required: ERRORS.requiredFnMsg('Photo'),
                    validate: avatarValidator,
                  }}
                  name='avatar'
                  control={control}
                  render={({ field: { onChange, onBlur } }) => (
                    <input
                      aria-label='inputFile'
                      onChange={(e) => {
                        fileInputHandler(e);
                        onChange(e.target.files[0]);
                        onBlur();
                      }}
                      className={styles.input}
                      type='file'
                    />
                  )}
                />

                <span className={styles.inputFileBtn}>Select</span>
              </label>
              {errors.avatar && (
                <p role='errorMsg' className={styles.error}>
                  {errors.avatar.message}
                </p>
              )}
            </div>

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
