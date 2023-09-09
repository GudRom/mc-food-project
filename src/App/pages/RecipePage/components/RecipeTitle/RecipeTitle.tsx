import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import styles from './RecipeTitle.module.scss';

interface Props {
  title: string;
}

const RecipeTitle: FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.recipeTitle}>
      <ArrowRightIcon className={styles.recipeTitle__iconBtn} onClick={() => navigate(-1)} />
      <Text view="title" tag="h1">
        {title}
      </Text>
    </div>
  );
};

export default RecipeTitle;
