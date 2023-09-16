import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { useRecipesContext } from '../../';
import styles from './Pagination.module.scss';

interface Props {}

const Pagination: FC<Props> = () => {
  const recipes = useRecipesContext();

  const classBtnPrev = classNames(styles.pagination__btn, styles.pagination__btn_prev, {
    [styles.pagination__btn_disable]: recipes?.currentPage === 1,
  });

  const classBtnNext = classNames(styles.pagination__btn, styles.pagination__btn_next, {
    [styles.pagination__btn_disable]: recipes?.pageList.length === recipes?.currentPage,
  });

  return (
    <section className={styles.pagination}>
      <ArrowRightIcon className={classBtnPrev} onClick={() => recipes?.setPrevPage()} />
      <ul className={styles.pagination__list}>
        {recipes?.pageList.map((page: number | string) => (
          <li
            key={page.toString()}
            className={`${styles.pagination__page} ${
              recipes?.currentPage === page ? styles.pagination__page_active : ''
            }`}
            onClick={() => {
              if (typeof page !== 'number') return;
              recipes?.changePageTo(page);
            }}
          >
            <Text view="p-18">{page}</Text>
          </li>
        ))}
      </ul>
      <ArrowRightIcon className={classBtnNext} onClick={() => recipes?.setNextPage()} />
    </section>
  );
};

export default observer(Pagination);
