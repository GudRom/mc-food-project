import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import Input from '../Input';
import Text from '../Text/Text';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>('');
  const multiDropRef = useRef<HTMLDivElement | null>(null);
  const classDropdown = classNames(className, styles.multiDd);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (multiDropRef.current && !multiDropRef.current.contains(e.target as Node)) {
        setIsListVisible(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const onFocus = () => {
    setIsListVisible(true);
  };

  const filterOptions = (current: string) => {
    setCurrentValue(current);
  };

  const filtered = options.filter(({ value }) => value.toLowerCase().startsWith(currentValue.toLowerCase()));

  const toggleOption = (option: Option) => {
    if (value.some((el) => el.key === option.key)) {
      onChange(value.filter((el) => el.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className={classDropdown} ref={multiDropRef}>
      <Input
        value={!isListVisible && value.length !== 0 ? getTitle(value) : currentValue}
        onChange={filterOptions}
        afterSlot={<ArrowDownIcon color="secondary" />}
        onFocus={onFocus}
        placeholder={getTitle(value)}
        disabled={disabled}
      />
      {isListVisible && !disabled ? (
        <ul className={styles.optionList}>
          {filtered.map((option) => (
            <li
              className={`${styles.option} ${value.includes(option) ? styles.option_added : ''}`}
              onClick={() => toggleOption(option)}
              key={option.key}
            >
              <Text view="p-16">{option.value}</Text>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default MultiDropdown;
