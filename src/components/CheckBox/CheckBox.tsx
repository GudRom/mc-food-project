import classNames from 'classnames';
import { FC, InputHTMLAttributes, memo } from 'react';
import CheckIcon from '../icons/CheckIcon/CheckIcon';
import styles from './Checkbox.module.scss';

export type CheckBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: FC<CheckBoxProps> = ({ checked, disabled, onChange, className, ...props }) => {
  const classCheckbox = classNames(
    styles.checkbox,
    {
      [styles.checkbox_disabled]: disabled,
    },
    className,
  );
  return (
    <label htmlFor="checkbox" className={classCheckbox}>
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        onChange={() => onChange(!checked)}
        className={styles.checkbox__invisible}
        disabled={disabled}
        checked={checked}
        {...props}
      />
      {checked ? (
        <CheckIcon width={40} height={40} color={disabled ? 'secondary' : 'accent'} className={styles.checkbox__icon} />
      ) : null}
    </label>
  );
};

export default memo(CheckBox);
