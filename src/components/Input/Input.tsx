import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { value, onChange, afterSlot, className, ...props },
  ref,
) {
  return (
    <div className={`${styles.inputWrapper} ${className ? className : ''}`}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={ref}
        {...props}
      />
      {afterSlot ? <div className={styles.input__icon}>{afterSlot}</div> : null}
    </div>
  );
});

export default Input;
