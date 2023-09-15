import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import RecipesStore from 'store/RecipesStore';
import { useLocalStore } from 'utils/hooks/useLocalStore';
import styles from './Pagination.module.scss';

interface Props {
  // setNextPage: () => void;
  // setPrevPage: () => void;
  // changePageTo: (par: number) => void;
  // currentPage: number;
  // pageNumberGroup: (number | string)[];
}

const Pagination: FC<Props> = () =>
  // { setNextPage, setPrevPage, currentPage, pageNumberGroup, changePageTo }
  {
    const recipesStore = useLocalStore(() => new RecipesStore());

    const classBtnPrev = classNames(styles.pagination__btn, styles.pagination__btn_prev, {
      [styles.pagination__btn_disable]: recipesStore.currentPage === 1,
    });

    const classBtnNext = classNames(styles.pagination__btn, styles.pagination__btn_next, {
      [styles.pagination__btn_disable]: recipesStore.pageList.length === recipesStore.currentPage,
    });

    return (
      <section className={styles.pagination}>
        <ArrowRightIcon className={classBtnPrev} onClick={() => recipesStore.setPrevPage()} />
        <ul className={styles.pagination__list}>
          {recipesStore.pageList.map((page: number | string) => (
            <li
              key={page.toString()}
              className={`${styles.pagination__page} ${
                recipesStore.currentPage === page ? styles.pagination__page_active : ''
              }`}
              onClick={() => {
                if (typeof page !== 'number') return;
                recipesStore.changePageTo(page);
              }}
            >
              <Text view="p-18">{page}</Text>
            </li>
          ))}
        </ul>
        <ArrowRightIcon className={classBtnNext} onClick={() => recipesStore.setNextPage()} />
      </section>
    );
  };

export default observer(Pagination);
