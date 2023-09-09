import { FC, ReactNode } from 'react';
import Text from 'components/Text';

import styles from './Requirement.module.scss';

interface Props {
  title: string;
  icon: ReactNode;
}

const Requirement: FC<Props> = ({ title, icon }) => {
  return (
    <li className={styles.requirement}>
      {icon}
      <Text view="p-16" className={styles.requirement__text}>
        {title}
      </Text>
    </li>
  );
};

export default Requirement;
