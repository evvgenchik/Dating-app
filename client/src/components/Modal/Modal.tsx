import { FC, useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

type Props = {
  active: boolean;
  setActive: (flag: boolean) => void;
  children: JSX.Element;
};

const Modal: FC<Props> = ({ active, setActive, children }) => {
  const popup = useRef(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Escape') {
      setActive(false);
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (popup.current) {
      const input = popup.current as HTMLDivElement;
      input.focus();
    }
  });

  return (
    <div
      role='tab'
      tabIndex={0}
      onClick={() => setActive(false)}
      onKeyDown={handleKeyDown}
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
    >
      <div
        ref={popup}
        role='tab'
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        className={
          active ? `${styles.content} ${styles.active}` : styles.content
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
