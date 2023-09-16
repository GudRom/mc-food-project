import axios from 'axios';
import { API_KEY } from 'utils/http/apiKey';

const baseURL = 'https://api.spoonacular.com/recipes/';

export const getRecipes = async () => {
  try {
    const result = await axios.get(`${baseURL}complexSearch?addRecipeNutrition=true&number=20&apiKey=${API_KEY}`);
    return result;
  } catch (error) {
    alert(error);
  }
};

export const getRecipeInfo = async (id: number) => {
  try {
    const result = await axios.get(`${baseURL}${id}/information?apiKey=${API_KEY}`);
    return result;
  } catch (error) {
    alert(error);
  }
};
