import classNames from 'classnames';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import Loader from '../Loader/Loader';
import styles from './Button.module.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({ loading, children, disabled, className, ...props }) => {
  const btnClass = classNames({ [`${className}`]: className }, styles.button, {
    [styles.button_disabled]: disabled,
  });
  return (
    <button className={btnClass} disabled={loading || disabled} {...props}>
      <>
        {loading ? <Loader size="s" className={styles.button__spinner} /> : null}
        {children}
      </>
    </button>
  );
};

export default Button;
