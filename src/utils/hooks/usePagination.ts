import { useState, useCallback, useEffect } from 'react';
import { IRecipeCardModel } from 'models/Recipe';

export const usePagination = (limitPosts: number, postsArray: IRecipeCardModel[] = []) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePosts, setCurrentPagePosts] = useState<IRecipeCardModel[]>([]);
  const [pageNumberGroup, setPageNumberGroup] = useState<(string | number)[]>([]);

  useEffect(() => {
    setCurrentPagePosts(getPageData());
    setPageNumberGroup(getPageNumberGroup());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsArray, currentPage]);

  const getPageData = () => {
    const endIndex = currentPage * limitPosts;
    const startIndex = endIndex - limitPosts;
    return postsArray.slice(startIndex, endIndex);
  };

  const setNextPage = useCallback((): void => {
    if (currentPage === postsArray.length - 1) return;
    setCurrentPage(currentPage + 1);
  }, [currentPage, postsArray.length]);

  const setPrevPage = useCallback((): void => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const changePageTo = (pageNumber: number) => setCurrentPage(pageNumber);

  const getPageNumberGroup = () => {
    const last = postsArray.length / limitPosts;
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
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
  };

  return { setNextPage, setPrevPage, changePageTo, currentPage, currentPagePosts, pageNumberGroup };
};
