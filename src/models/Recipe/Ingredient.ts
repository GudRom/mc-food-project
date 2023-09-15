import { Metric } from './Metric';

export type Ingredient = {
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
};
