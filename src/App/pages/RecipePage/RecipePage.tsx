import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Text from 'components/Text';
import { Equipment, RecipeDataView } from 'types/RecipeDataView';
import { getRecipeInfo } from 'utils/http/apiClient';
import CommonInformation from './components/CommonInformation/CommonInformation';
import Directions from './components/Directions/Directions';
import RecipeTitle from './components/RecipeTitle';
import RequirementSection from './components/RequirementSection/RequirementSection';
import styles from './RecipePage.module.scss';

const RecipePage: FC = () => {
  const [currentRecipeInfo, setCurrentRecipeInfo] = useState<RecipeDataView | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getRecipeInfo(+id)
        .then((res) => {
          if (res) {
            setCurrentRecipeInfo(res.data);
          } else {
            throw new Error('request problem');
          }
        })
        .catch((error) => alert(error));
    }
  }, [id]);

  const getIngredients = (): string[] => {
    if (!currentRecipeInfo) return [];
    return currentRecipeInfo.extendedIngredients.map((el) => el.original);
  };

  const getEquipments = (): string[] => {
    const set = new Set<string>();
    const allEquipments: Equipment[][] = [];
    currentRecipeInfo?.analyzedInstructions[0].steps.forEach((el) => {
      if (el.equipment.length > 0) {
        allEquipments.push(el.equipment);
      }
    });

    allEquipments.flat().forEach((equipment) => {
      set.add(equipment.name);
    });
    return [...set];
  };
  return (
    <main className={styles.main}>
      {currentRecipeInfo ? (
        <>
          <RecipeTitle title={currentRecipeInfo.title} />
          <CommonInformation
            preporationTime={currentRecipeInfo.preporationMinutes}
            cookingTime={currentRecipeInfo.readyInMinutes}
            likes={currentRecipeInfo.aggregateLikes}
            servings={currentRecipeInfo.servings}
            image={currentRecipeInfo.image}
            summary={currentRecipeInfo.summary}
            title={currentRecipeInfo.title}
          />
          <RequirementSection ingredients={getIngredients()} equipment={getEquipments()} />
          <Directions directions={currentRecipeInfo.analyzedInstructions[0].steps} />
        </>
      ) : (
        <Text view="title" tag="h2">
          {'Ooops, this recept has eaten:('}
        </Text>
      )}
      <div className={styles.main__pattern}></div>
    </main>
  );
};

export default RecipePage;
