import { FC } from 'react';
import styles from './MyButton.module.scss';

type Props = {
  className: string;
  children: string;
  type?: 'button' | 'submit';
  onClick?: any;
};

const MyButton: FC<Props> = ({ className, children, ...props }) => {
  return (
    <button
      type='button'
      className={`${styles.myBtn} ${styles[className] ?? styles[className]} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default MyButton;
