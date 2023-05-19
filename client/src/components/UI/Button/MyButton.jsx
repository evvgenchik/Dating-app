/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import styles from './MyButton.module.scss';

function MyButton({ children, className, ...props }) {
  return (
    <button
      type='button'
      className={`${styles[className]} ${styles.myBtn}`}
      {...props}
    >
      {children}
    </button>
  );
}

MyButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default MyButton;
