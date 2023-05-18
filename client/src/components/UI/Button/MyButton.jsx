import styles from "./MyButton.module.scss";

function MyButton({ children, className, ...props }) {
  return (
    <button className={`${styles[className]} ${styles.myBtn}`} {...props}>
      {children}
    </button>
  );
}

export default MyButton;
