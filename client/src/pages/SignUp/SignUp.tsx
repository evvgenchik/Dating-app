import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import axios from '../../api/axios';
import { birthdayValidator, avatarValidator } from './signUpValidator';
import MyButton from '../../components/UI/Button/MyButton';
import styles from './SignUp.module.scss';
import heart from '../../assets/Home/heart2.svg';
import Modal from '../../components/Modal/Modal';
import checkRed from '../../assets/checkRed.svg';

enum GenderEnum {
  female = 'female',
  male = 'male',
  neutral = 'neutral',
}
enum LookingEnum {
  female = 'female',
  male = 'male',
  everyone = 'everyone',
}

interface AuthForm {
  password: string;
  firstName: string;
  email: string;
  birthday: Date;
  gender: GenderEnum;
  looking: LookingEnum;
  descriptrion: string;
  avatar: File;
}

const ERRORS = {
  requiredFnMsg: (field: string) => `${field} is required`,
};

const REGISTER_URL = '/auth/register';
const IMAGE_URL = '/image/upload';

function SignUp() {
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<AuthForm>({ mode: 'onBlur', reValidateMode: 'onChange' });

  const sendImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(IMAGE_URL, formData);
      const fileData = res.data.url;
      return fileData;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const sendUser = async (user: AuthForm) => {
    try {
      const res = await axios.post(REGISTER_URL, user);
      return res.data;
    } catch (error) {
      console.error(error);
      if (error?.response?.status === 409) {
        setError(
          'email',
          {
            type: 'custom',
            message: 'User with this email already exists',
          },
          { shouldFocus: true }
        );
      }
      return null;
    }
  };

  const submitHandler: SubmitHandler<AuthForm> = async (data) => {
    const avatar = await sendImage(data.avatar);
    const user = await sendUser({ ...data, avatar });

    if (user) {
      reset();
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    }
    return user;
  };

  const fileInputHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    const fileSrc = URL.createObjectURL(files[0]);
    setAvatarSrc(fileSrc);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logoText}>
          Finder
          <img className={styles.logoImage} src={heart} alt='heart' />
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <h1 className={styles.title}>CREATE ACCOUNT</h1>
        <div className={styles.formContent}>
          <div className={styles.leftSide}>
            <label className={styles.mainLabel}>
              Email:
              <input
                {...register('email', {
                  required: ERRORS.requiredFnMsg('Email'),
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
                // {...register('login', {
                //   required: ERRORS.requiredFnMsg('Login'),
                //   minLength: {
                //     value: 5,
                //     message: 'Login must contain at least 5 symbols',
                //   },
                //   pattern: {
                //     value: /^\S+\S$/g,
                //     message: "Login mustn't contain spaces",
                //   },
                // })}
                className={styles.input}
                type='email'
                placeholder='Email'
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </label>

            <label className={styles.mainLabel}>
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

            <label className={styles.mainLabel}>
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

            <label className={styles.mainLabel}>
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

            <label className={`${styles.mainLabel}`}>
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

            <label className={`${styles.mainLabel}`}>
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
                  value='wooman'
                />
                <label htmlFor='everyone-looking' className={styles.innerLabel}>
                  Everyone
                </label>
              </div>
              {errors.looking && (
                <p className={styles.error}>{errors.looking.message}</p>
              )}
            </label>

            <label className={styles.mainLabel}>
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
                  />
                )}
              />
              {errors.descriptrion && (
                <p className={styles.error}>{errors.descriptrion.message}</p>
              )}
            </label>
          </div>

          <div className={styles.rigthSide}>
            <label className={styles.mainLabel}>
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
              {avatarSrc && (
                <img
                  className={styles.iconContainer}
                  src={avatarSrc}
                  alt='profile'
                />
              )}
            </div>
          </div>
        </div>

        <MyButton type='submit' className='signup-btn'>
          Submit
        </MyButton>
      </form>

      <Modal active={success} setActive={setSuccess}>
        <div className='success-popup'>
          <h2 className='success-title'>
            Awesome!
            <img className='check-mark' src={checkRed} alt='checkMark' />
          </h2>
          <h3 className='success-sub-title'>
            Your profile was successfully created.
          </h3>
          <p className='success-text'>
            Thank you for your time! We sand message on your email. Please
            confirm it.
          </p>
          <p className='success-text'>
            Now you will be redirected to main page for authorization.
          </p>
        </div>
      </Modal>

      <div className={styles.empty} />
    </div>
  );
}

export default SignUp;
