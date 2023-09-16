import { FC } from 'react';
import Text from 'components/Text';
import { Step } from 'models/Recipe/Step';
import styles from './Directions.module.scss';

interface Props {
  directions: Step[];
}

const Directions: FC<Props> = ({ directions }) => {
  return (
    <section className={styles.directions}>
      <Text view="p-20" weight="bold">
        Directions
      </Text>
      <ul className={styles.directions__list}>
        {directions.map((step) => (
          <li key={step.number.toString()} className={styles.directions__step}>
            <Text view="p-16" weight="bold" className={styles.directions__stepName}>{`Step ${step.number}`}</Text>
            <Text view="p-14">{step.step}</Text>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Directions;
