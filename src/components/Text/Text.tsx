import classNames from 'classnames';
import { ReactNode, FC, memo } from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: FC<TextProps> = ({ className, view, tag, weight, children, color, maxLines }) => {
  const Element = tag ?? 'p';
  const textClasses = classNames(
    styles.text,
    {
      [styles[`text_${view}`]]: view,
      [styles[`text_${color}`]]: color,
    },
    className,
  );
  return (
    <Element
      className={textClasses}
      style={{
        fontWeight: weight,
        WebkitLineClamp: maxLines,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
      }}
    >
      {children}
    </Element>
  );
};

export default memo(Text);
