export interface RecipeDataView {
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

export interface Ingredient {
  aisle: string;
  amount: number;
  consitency: string;
  id: number;
  image: string;
  measures: {
    metric: Metric;
    us: Metric;
  };
  name: string;
  original: string;
  originalName: string;
  unit: string;
}

export type Metric = {
  amount: number;
  unitLong: string;
  unitShort: string;
};

export type Instruction = {
  name: string;
  steps: Step[];
};

export type Step = {
  equipment: Equipment[];
  ingredients: [];
  number: number;
  step: string;
};

export type Equipment = {
  id: number;
  image: string;
  localizedName: string;
  name: string;
};
