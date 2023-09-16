import { FC } from 'react';
import EquipmentIcon from 'components/icons/EquipmentIcon';
import IngredientIcon from 'components/icons/IngredientIcon';
import Divider from './Divider';
import RequirementList from './RequirementList';
import styles from './RequirementSection.module.scss';

interface Props {
  ingredients: string[];
  equipment: string[];
}

const RequirementSection: FC<Props> = ({ ingredients, equipment }) => {
  return (
    <section className={styles.requirementSection}>
      <RequirementList list={ingredients} icon={<IngredientIcon />} title={'Ingredients'} />
      <Divider />
      <RequirementList list={equipment} icon={<EquipmentIcon />} title={'Equipment'} />
    </section>
  );
};

export default RequirementSection;
