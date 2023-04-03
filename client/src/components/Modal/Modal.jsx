import styles from './Modal.module.scss';

const Modal = ({ active, setActive, className, children }) => {
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
