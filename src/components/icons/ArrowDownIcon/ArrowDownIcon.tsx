import classNames from 'classnames';
import { FC, SVGAttributes } from 'react';
import styles from './ArrowDownIcon.module.scss';

export type IconProps = SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const ArrowDownIcon: FC<IconProps> = ({ className, color, width, height, ...props }) => {
  const classArrowDownIcon = classNames(styles.arrowDownIcon, className, {
    [styles[`arrowDownIcon_${color}`]]: color,
  });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      className={classArrowDownIcon}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill="black"
      />
    </svg>
  );
};

export default ArrowDownIcon;
