import { Nutrition } from 'types/RecipesDataView';
import { IRecipeApi } from './IRecipe';
import { Ingredient } from './Ingredient';

export interface IRecipeCardApi extends IRecipeApi {
  nutrition: Nutrition;
}

export interface IRecipeCardModel {
  id: number;
  image: string;
  readyInMinutes: number;
  title: string;
  subtitle: string;
  calories?: number;
}

const getSubtitleFromArray = (array: Ingredient[]): string => {
  return array.reduce((acc, current) => acc + ' + ' + current.name, array[0].name);
};

export const normalizeRecipe = (from: IRecipeCardApi): IRecipeCardModel => ({
  id: from.id,
  image: from.image,
  readyInMinutes: from.readyInMinutes,
  title: from.title,
  subtitle: getSubtitleFromArray(from.nutrition.ingredients),
  calories: from.nutrition.nutrients.find((el) => el.name === 'Calories')?.amount,
});
