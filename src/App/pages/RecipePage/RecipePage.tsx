import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import Text from 'components/Text';
import RecipeStore from 'store/RecipeStore';
// import { Equipment } from 'types/RecipeDataView';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import CommonInformation from './components/CommonInformation/CommonInformation';
import Directions from './components/Directions/Directions';
import RecipeTitle from './components/RecipeTitle';
import RequirementSection from './components/RequirementSection/RequirementSection';
import styles from './RecipePage.module.scss';

const RecipePage: FC = () => {
  const recipeStore = useLocalStore(() => new RecipeStore());
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      recipeStore.getRecipeInfo(+id);
    }
  }, [id, recipeStore]);

  return (
    <main className={styles.main}>
      {recipeStore.meta !== 'loading' ? (
        recipeStore.recipeInfo ? (
          <>
            <RecipeTitle title={recipeStore.recipeInfo.title} />
            <CommonInformation
              preporationTime={recipeStore.recipeInfo.preporationMinutes}
              cookingTime={recipeStore.recipeInfo.readyInMinutes}
              likes={recipeStore.recipeInfo.aggregateLikes}
              servings={recipeStore.recipeInfo.servings}
              image={recipeStore.recipeInfo.image}
              summary={recipeStore.recipeInfo.summary}
              title={recipeStore.recipeInfo.title}
            />
            <RequirementSection ingredients={recipeStore.ingredients} equipment={recipeStore.equipments} />
            <Directions directions={recipeStore.directions} />
          </>
        ) : (
          <Text view="title" tag="h2">
            {'Ooops, this recept has eaten:('}
          </Text>
        )
      ) : (
        <Loader />
      )}

      <div className={styles.main__pattern}></div>
    </main>
  );
};

export default observer(RecipePage);
