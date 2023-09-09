import { useEffect, useState } from 'react';
import Text from 'components/Text';
import { GOODS_PER_PAGE } from 'config/config.ts';
import { Ingredient } from 'types/RecipeDataView';
import { RecipesDataView } from 'types/RecipesDataView';
import { usePagination } from 'utils/hooks/usePagination.ts';
import { getRecipes } from 'utils/http/apiClient';
import MainImage from '../../../assets/main-recipes-img.png';
import CardList from './components/CardList/CardList';
import Pagination from './components/Pagination';
import Search from './components/Search/Search';
import styles from './MainPage.module.scss';

export interface Recipe {
  id: number;
  image: string;
  readyInMinutes: number;
  title: string;
  subtitle: string;
  calories: number;
}

const MainPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { setNextPage, setPrevPage, changePageTo, currentPage, currentPagePosts, pageNumberGroup } = usePagination(
    GOODS_PER_PAGE,
    recipes,
  );

  const getSubtitleFromArray = (array: Ingredient[]): string => {
    return array.reduce((acc, current) => acc + ' + ' + current.name, array[0].name);
  };

  useEffect(() => {
    getRecipes()
      .then((res) => {
        if (res) {
          setRecipes(
            res?.data.results.map((recipe: RecipesDataView) => ({
              id: recipe.id,
              image: recipe.image,
              readyInMinutes: recipe.readyInMinutes,
              title: recipe.title,
              subtitle: getSubtitleFromArray(recipe.nutrition.ingredients),
              calories: recipe.nutrition.nutrients.find((el) => el.name === 'Calories')?.amount,
            })),
          );
        } else {
          throw new Error('request problem');
        }
      })
      .catch((error) => alert(error));
  }, []);
  return (
    <main className={styles.recipes}>
      <header>
        <img className={styles.recipes__mainImg} src={MainImage} alt="Image with dishes" />
      </header>
      <main className={styles.recipes__main}>
        <Text tag="p" view="p-20">
          <>
            Find the perfect food and <span className={styles.underline}>drink ideas</span> for every occasion, from{' '}
            <span className={styles.underline}>weeknight dinners</span> to&nbsp;
            <span className={styles.underline}>holiday feasts</span>.
          </>
        </Text>
        <Search className={styles.recipes__search} />
        <CardList className={styles.recipes__cardList} recipes={currentPagePosts} />
        <Pagination
          setNextPage={setNextPage}
          setPrevPage={setPrevPage}
          currentPage={currentPage}
          changePageTo={changePageTo}
          pageNumberGroup={pageNumberGroup}
        />
      </main>
    </main>
  );
};

export default MainPage;
