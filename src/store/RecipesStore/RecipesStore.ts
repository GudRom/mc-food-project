import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Option } from 'components/MultiDropdown';
import { GOODS_PER_PAGE, BASE_URL } from 'config/config';
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
      setNextPage: action,
      setPrevPage: action,
      changePageTo: action,
    });
  }

  get currentPageData(): IRecipeCardModel[] {
    const endIndex = this._currentPage * GOODS_PER_PAGE;
    const startIndex = endIndex - GOODS_PER_PAGE;
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

  async getRecipesList(...args: (string | Option[] | undefined)[]) {
    const search = args.find((arg) => typeof arg === 'string');
    const options = args.find((arg) => Array.isArray(arg));

    const condition =
      !sessionStorage.recipes ||
      (search && sessionStorage.query !== search) ||
      (options && sessionStorage.options !== JSON.stringify(options));

    if (condition) {
      this._meta = Meta.loading;

      const response = await axios.get(
        `${BASE_URL}complexSearch?addRecipeNutrition=true${this._getReadyParams(...args)}&number=20&apiKey=${API_KEY}`,
      );

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

          sessionStorage.setItem('recipes', JSON.stringify(list));

          this._recipesList = list;
        } catch (error) {
          alert(error);
          this._meta = Meta.error;
          this._recipesList = [];
        }
      });
    } else {
      this._recipesList = JSON.parse(sessionStorage.recipes);
    }
  }

  private _getReadyParams = (...args: (string | Option[] | undefined)[]): string => {
    const search = args[0];
    const options = args[1];
    const query: string[] = [];

    if (search && typeof search === 'string') {
      query.push(`query=${search}`);
      sessionStorage.setItem('query', search);
    }

    if (Array.isArray(options) && options.length >= 0) {
      options.forEach((option) => {
        query.push(`type=${option.key}`);
      });
      sessionStorage.setItem('options', JSON.stringify(options));
    }

    return query.reduce((acc, current) => acc.concat('&', current), '');
  };

  destroy() {}
}
