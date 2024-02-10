import { IoMdArrowRoundBack } from "react-icons/io";
import styles from './BackButton.module.scss';

import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const goBackHandler = async () => {
    navigate(-1);
  };

  return (
    <button
      onClick={goBackHandler}
      type='button'
      className={styles.backButtonBtn}
      >
      <IoMdArrowRoundBack
        className={styles.iconArrow}
        size='20px'
        />

      Back
    </button>
  );
};

export default BackButton;
