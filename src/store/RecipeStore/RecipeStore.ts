import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { baseURL } from 'config/config';
import { Meta } from 'models/CommonTypes';
import { ILocalStore } from 'models/CommonTypes/ILocalStore';
import { Equipment, IRecipeApi, Ingredient, Step } from 'models/Recipe';
import { API_KEY } from 'utils/http/apiKey';

type PrivateFields = '_recipeInfo' | '_meta' | '_equipments' | '_ingredients' | '_directions';

export default class RecipeStore implements ILocalStore {
  private _recipeInfo: IRecipeApi | null = null;
  private _meta: Meta = Meta.initial;
  private _ingredients: string[] = [];
  private _equipments: string[] = [];
  private _directions: Step[] = [];
  constructor() {
    makeObservable<RecipeStore, PrivateFields>(this, {
      _recipeInfo: observable.ref,
      _meta: observable,
      _ingredients: observable,
      _equipments: observable,
      _directions: observable,
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
    return this._ingredients;
  }

  get equipments(): string[] {
    return this._equipments;
  }

  get directions(): Step[] {
    return this._directions;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRecipeInfo(id: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await axios.get(`${baseURL}${id}/information?apiKey=${API_KEY}`);

    runInAction(() => {
      if (!response) {
        this._meta = Meta.error;
      }
      try {
        const data = response.data;
        this._meta = Meta.success;
        this._recipeInfo = data;
        this._ingredients = data.extendedIngredients.map((el: Ingredient) => el.original);
        this._directions = data.analyzedInstructions[0].steps;
        this._getEquipments();
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
    this._equipments = [...set];
  }

  destroy() {}
}
