import styles from './MyButton.module.scss';
import { FC } from 'react';

type Props = {
  className: string;
  children: string;
  onClick?: () => void;
};

const MyButton: FC<Props> = ({ className, children, ...props }) => {
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
