import axios from 'axios';
import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { GOODS_PER_PAGE, baseURL } from 'config/config';
import { Meta } from 'models/CommonTypes';
import { ILocalStore } from 'models/CommonTypes/ILocalStore';
import { IRecipeCardModel, normalizeRecipe } from 'models/Recipe';
import { API_KEY } from 'utils/http/apiKey';

type PrivateFields = '_recipesList' | '_meta' | '_currentPage';

export default class RecipesStore implements ILocalStore {
  private _recipesList: IRecipeCardModel[] = [];
  private _meta: Meta = Meta.initial;
  private _currentPage: number = 1;

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _recipesList: observable.ref,
      _meta: observable,
      _currentPage: observable,
      currentPage: computed,
      currentPageData: computed,
      pageList: computed,
      meta: computed,
      getRecipesList: action,
      // getPageList: action,
      setNextPage: action,
      setPrevPage: action,
      changePageTo: action,
    });
  }

  get currentPageData(): IRecipeCardModel[] {
    const endIndex = this._currentPage * GOODS_PER_PAGE;
    const startIndex = endIndex - GOODS_PER_PAGE;
    console.log(this._currentPage);
    return this._recipesList.slice(startIndex, endIndex);
  }

  get meta(): Meta {
    return this._meta;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get pageList(): (number | string)[] {
    const last = this._recipesList.length / GOODS_PER_PAGE;
    const delta = 2;
    const left = this._currentPage - delta;
    const right = this._currentPage + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    console.log(this._recipesList, last, left, right);

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  }

  async getRecipesList() {
    this._meta = Meta.loading;

    const response = await axios.get(`${baseURL}complexSearch?addRecipeNutrition=true&number=20&apiKey=${API_KEY}`);

    runInAction(() => {
      if (!response) {
        this._meta = Meta.error;
      }
      try {
        const list = [];
        this._meta = Meta.success;
        for (const item of response.data.results) {
          list.push(normalizeRecipe(item));
        }
        this._recipesList = list;

        console.log(this._recipesList, 'req');
      } catch (error) {
        alert(error);
        this._meta = Meta.error;
        this._recipesList = [];
      }
    });
  }

  // getPageList() {
  //   const last = this._recipesList.length / GOODS_PER_PAGE;
  //   const delta = 2;
  //   const left = this._currentPage - delta;
  //   const right = this._currentPage + delta + 1;
  //   const range = [];
  //   const rangeWithDots = [];
  //   let l;

  //   for (let i = 1; i <= last; i++) {
  //     if (i == 1 || i == last || (i >= left && i < right)) {
  //       range.push(i);
  //     }
  //   }

  //   for (const i of range) {
  //     if (l) {
  //       if (i - l === 2) {
  //         rangeWithDots.push(l + 1);
  //       } else if (i - l !== 1) {
  //         rangeWithDots.push('...');
  //       }
  //     }
  //     rangeWithDots.push(i);
  //     l = i;
  //   }
  //   return rangeWithDots;
  // }

  setNextPage(): void {
    if (this._currentPage === this._recipesList.length - 1) return;
    this._currentPage++;
  }

  setPrevPage(): void {
    if (this._currentPage === 1) return;
    this._currentPage--;
  }

  changePageTo(pageNumber: number) {
    this._currentPage = pageNumber;
  }

  private readonly _getPageListReaction = reaction(
    () => this._currentPage,
    (currentValue) => console.log(currentValue),
  );

  destroy() {
    this._getPageListReaction();
  }
}
