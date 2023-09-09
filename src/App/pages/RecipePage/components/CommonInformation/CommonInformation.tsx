import { FC } from 'react';
import Text from 'components/Text';

import styles from './CommonInformation.module.scss';

interface Props {
  preporationTime: number;
  cookingTime: number;
  likes: number;
  servings: number;
  image: string;
  summary: string;
  title: string;
}

const CommonInformation: FC<Props> = ({ preporationTime, cookingTime, likes, servings, image, summary, title }) => {
  const infoArray = [
    {
      name: 'Preporation',
      amount: (preporationTime > 0 ? preporationTime : 0) + ' minutes',
    },
    {
      name: 'Cooking',
      amount: cookingTime + ' minutes',
    },
    {
      name: 'Total',
      amount: (preporationTime > 0 ? preporationTime : 0) + cookingTime + ' minutes',
    },
    {
      name: 'Ratings',
      amount: likes + ' likes',
    },
    {
      name: 'Servings',
      amount: servings + ' servings',
    },
  ];
  return (
    <section className={styles.commonInfo}>
      <div className={styles.commonInfo__box}>
        <img className={styles.commonInfo__img} src={image} alt={title} />
        <ul className={styles.commonInfo__list}>
          {infoArray.map(({ name, amount }, index) => (
            <li className={styles.commonInfo__item} key={index.toString()}>
              <Text view="p-16" className={styles.commonInfo__text}>
                {name}
              </Text>
              <Text view="p-16" color="accent">
                {amount}
              </Text>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.commonInfo__summary} dangerouslySetInnerHTML={{ __html: summary }} />
    </section>
  );
};

export default CommonInformation;
