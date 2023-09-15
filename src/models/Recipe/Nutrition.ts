import { Ingredient } from './Ingredient';
import { Nutrient } from './Nutrient';

export type Nutrition = {
  ingredients: Ingredient[];
  nutrients: Nutrient[];
};
