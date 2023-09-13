import classNames from 'classnames';
import { FC } from 'react';
import { IconProps } from '../ArrowDownIcon';
import styles from './ArrowRightIcon.module.scss';

const ArrowRightIcon: FC<IconProps> = ({ className, color, width, height, ...props }) => {
  const classArrowRightIcon = classNames(styles.arrowRightIcon, className, {
    [styles[`arrowRightIcon_${color}`]]: color,
  });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 32}
      height={height ?? 32}
      viewBox="0 0 32 32"
      fill="none"
      className={classArrowRightIcon}
      {...props}
    >
      <path
        d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
