import { FC, ReactNode } from 'react';
import Text from 'components/Text';
import Requirement from './Requirement/Requirement';
import styles from './RequirementList.module.scss';

interface Props {
  list: string[];
  icon: ReactNode;
  title: string;
}

const RequirementList: FC<Props> = ({ list, icon, title }) => {
  return (
    <div>
      <Text view="p-20" weight="bold">
        {title}
      </Text>
      <ul className={styles.requirementList}>
        {list.map((el, index) => (
          <Requirement key={index.toString()} title={el} icon={icon} />
        ))}
      </ul>
    </div>
  );
};

export default RequirementList;
