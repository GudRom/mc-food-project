import { Ingredient } from './Ingredient';
import { Instruction } from './Instruction';

export interface IRecipeApi {
  id: number;
  aggregateLikes: number;
  title: string;
  image: string;
  servings: number;
  preporationMinutes: number;
  readyInMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: Instruction[];
  cheap: false;
  creditsText: string;
  dishTypes: string[];
  extendedIngredients: Ingredient[];
  summary: string;
  instructions: string;
}

// export interface RecipeModel {
//   id: number;
//   image: string;
//   readyInMinutes: number;
//   title: string;
//   subtitle: string;
//   calories: number;
// }

// export const normalizeRepoItem = (from: RecipeApi): RecipeModel => ({
//   id: from.id,
//   image: from.image,
//   readyInMinutes: from.readyInMinutes,
//   title: from.title,
// });
