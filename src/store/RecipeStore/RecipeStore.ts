import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { BASE_URL } from 'config/config';
import { Meta } from 'models/CommonTypes';
import { ILocalStore } from 'models/CommonTypes/ILocalStore';
import { Equipment, IRecipeApi, Ingredient, Step } from 'models/Recipe';
import { API_KEY } from 'utils/http/apiKey';

type PrivateFields = '_recipeInfo' | '_meta';

export default class RecipeStore implements ILocalStore {
  private _recipeInfo: IRecipeApi | null = null;
  private _meta: Meta = Meta.initial;
  constructor() {
    makeObservable<RecipeStore, PrivateFields>(this, {
      _recipeInfo: observable.ref,
      _meta: observable,
      recipeInfo: computed,
      meta: computed,
      ingredients: computed,
      equipments: computed,
      getRecipeInfo: action,
    });
  }

  get recipeInfo(): IRecipeApi | null {
    return this._recipeInfo;
  }

  get ingredients(): string[] {
    if (!this._recipeInfo) return [];
    return this._recipeInfo.extendedIngredients.map((el: Ingredient) => el.original);
  }

  get equipments(): string[] {
    if (!this._recipeInfo) return [];
    return this._getEquipments();
  }

  get directions(): Step[] {
    if (!this._recipeInfo) return [];
    return this._recipeInfo.analyzedInstructions[0].steps;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRecipeInfo(id: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await axios.get(`${BASE_URL}${id}/information?apiKey=${API_KEY}`);

    runInAction(() => {
      if (!response) {
        this._meta = Meta.error;
      }
      try {
        const data = response.data;
        this._meta = Meta.success;
        this._recipeInfo = data;
      } catch (error) {
        alert(error);
        this._meta = Meta.error;
        this._recipeInfo = null;
      }
    });
  }

  private _getEquipments() {
    const set = new Set<string>();
    const allEquipments: Equipment[][] = [];
    this._recipeInfo?.analyzedInstructions[0].steps.forEach((el) => {
      if (el.equipment.length > 0) {
        allEquipments.push(el.equipment);
      }
    });

    allEquipments.flat().forEach((equipment) => {
      set.add(equipment.name);
    });
    return [...set];
  }

  destroy() {}
}
