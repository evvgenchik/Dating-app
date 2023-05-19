/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

function Modal({ active, setActive, className, children }) {
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
}

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
