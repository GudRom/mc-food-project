import { Ingredient, RecipeDataView } from './RecipeDataView';

export interface RecipesDataView extends RecipeDataView {
  nutrition: Nutrition;
}

export type Nutrition = {
  ingredients: Ingredient[];
  nutrients: Nutrient[];
};

export type Nutrient = {
  amount: number;
  name: string;
  percentOfDailyNeeds: number;
  unit: string;
};
