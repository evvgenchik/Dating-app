import MyButton from '../../components/UI/Button/MyButton';
import styles from './SignUp.module.scss';
import icon from '../../assets/signUp/girl.jpg';
import heart from '../../assets/Home/heart2.svg';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logoText}>
          Finder
          <img className={styles.logoImage} src={heart} alt="heart" />
        </div>
      </div>

      <form className={styles.form}>
        <h1 className={styles.title}>CREATE ACCOUNT</h1>
        <div className={styles.formContent}>
          <div className={styles.leftSide}>
            <label className={styles.mainLabel}>
              First name:
              <input
                className={styles.input}
                type="text"
                placeholder="First name"
              />
            </label>

            <label className={styles.mainLabel}>
              Birthday:
              <input
                className={styles.input}
                type="text"
                placeholder="Birthday"
              />
            </label>

            <label className={styles.mainLabel}>
              Country:
              <input
                className={styles.input}
                type="text"
                placeholder="Birthday"
              />
            </label>

            <label className={`${styles.mainLabel}`}>
              Gender:
              <div className={styles.radioContainer}>
                <label className={styles.innerLabel}>
                  Man
                  <input type="radio" value="man" />
                </label>
                <label className={styles.innerLabel}>
                  Wooman
                  <input type="radio" value="wooman" />
                </label>
                <label className={styles.innerLabel}>
                  Neutral
                  <input type="radio" value="wooman" />
                </label>
              </div>
            </label>

            <label className={`${styles.mainLabel}`}>
              Looking for:
              <div className={styles.radioContainer}>
                <label className={styles.innerLabel}>
                  Man
                  <input type="radio" value="man" />
                </label>
                <label className={styles.innerLabel}>
                  Wooman
                  <input type="radio" value="wooman" />
                </label>
                <label className={styles.innerLabel}>
                  All
                  <input type="radio" value="wooman" />
                </label>
              </div>
            </label>

            <div>
              <label className={styles.mainLabel}>
                Brief description of yourself
              </label>
              <textarea
                className={styles.textarea}
                name="description"
                id="description"
                cols={30}
                rows={10}
                placeholder="Type your answer here"
              ></textarea>
            </div>
          </div>

          <div className={styles.rigthSide}>
            <label className={styles.mainLabel}>
              Profile photo:
              <div className={styles.inputFile}>
                <span className={styles.inputFileText}></span>
                <input className={styles.input} type="file" />
                <span className={styles.inputFileBtn}>Выберите файл</span>
              </div>
            </label>

            <div className={styles.iconContainer}>
              <img
                className={styles.iconContainer}
                src={icon}
                alt="photo profile"
              />
            </div>
          </div>
        </div>

        <MyButton onClick={() => navigate('/app')} className="signup-btn">
          Submit
        </MyButton>
      </form>
    </div>
  );
};

export default SignUp;
