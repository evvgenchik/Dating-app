import { FC } from 'react';
import styles from './Modal.module.scss';
type Props = {
  active: boolean;
  setActive: (flag: boolean) => void;
  className: string;
  children: JSX.Element[];
};

const Modal: FC<Props> = ({ active, setActive, className, children }) => {
  return (
    <div
      onClick={() => setActive(false)}
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          active ? `${styles.content} ${styles.active}` : styles.content
        }
      >
        <div className={styles[className]}>{children.map((el) => el)}</div>
      </div>
    </div>
  );
};

export default Modal;
