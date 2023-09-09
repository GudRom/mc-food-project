import classNames from 'classnames';
import { FC } from 'react';
import { IconProps } from '../ArrowDownIcon';
import styles from './CheckIcon.module.scss';

const CheckIcon: FC<IconProps> = ({ className, color, width, height, ...props }) => {
  const classCheckIcon = classNames(
    styles.checkIcon,
    {
      [styles[`checkIcon_${color}`]]: color,
    },
    className,
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      className={classCheckIcon}
      {...props}
    >
      <path d="M4 11.6129L9.87755 18L20 7" stroke="black" strokeWidth="2" />
    </svg>
  );
};

export default CheckIcon;
