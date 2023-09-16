import { FC, MouseEventHandler, ReactNode, memo } from 'react';
import Text from '../../../../../../components/Text';
import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: ReactNode;
  /** Заголовок карточки */
  title: ReactNode;
  /** Описание карточки */
  subtitle: ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: ReactNode;
  /** Клик на карточку */
  onClick?: MouseEventHandler;
  /** Слот для действия */
  actionSlot?: ReactNode;
};

const Card: FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot }) => {
  return (
    <li className={styles.listItem} onClick={onClick}>
      <article className={`${styles.card} ${className}`}>
        <div className={styles.card__imgWrapper}>
          <img className={styles.card__img} src={image} alt={'card'} />
        </div>
        <div className={styles.card__infoBox}>
          <div className={styles.card__textBox}>
            {captionSlot ? (
              <Text view="p-14" color="secondary" weight="medium" className={styles.card__caption}>
                {captionSlot}
              </Text>
            ) : null}
            <Text className={styles.card__title} view="p-20" weight="bold" maxLines={2}>
              {title}
            </Text>
            <Text view="p-16" color="secondary" maxLines={3} className={styles.card__subtitle}>
              {subtitle}
            </Text>
          </div>
          <div className={styles.card__slotBox}>
            {contentSlot ? (
              <Text view="p-18" weight="bold" color="accent">
                {contentSlot}
              </Text>
            ) : null}
            {actionSlot ? <div className={styles.card__actionSlot}>{actionSlot}</div> : null}
          </div>
        </div>
      </article>
    </li>
  );
};

export default memo(Card);
