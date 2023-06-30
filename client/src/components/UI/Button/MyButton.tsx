import { FC } from 'react';
import styles from './MyButton.module.scss';

type Props = {
  className: string;
  children: string;
  onClick?: () => void;
};

const MyButton: FC<Props> = ({ className, children, ...props }) => {
  console.log(className);

  return (
    <button
      type='button'
      className={`${styles[className]} ${styles.myBtn}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default MyButton;
