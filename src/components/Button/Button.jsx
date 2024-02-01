import styles from './button.module.css';

const Button = ({ type = 'submit', onClick, children }) => {
  return (
    <button type={type} onClick={onClick} className={styles.btn}>
      {children}
    </button>
  );
};
export default Button;
