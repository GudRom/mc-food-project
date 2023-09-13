import classNames from 'classnames';
import { FC } from 'react';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import styles from './Pagination.module.scss';

interface Props {
  setNextPage: () => void;
  setPrevPage: () => void;
  changePageTo: (par: number) => void;
  currentPage: number;
  pageNumberGroup: (number | string)[];
}

const Pagination: FC<Props> = ({ setNextPage, setPrevPage, currentPage, pageNumberGroup, changePageTo }) => {
  const classBtnPrev = classNames(styles.pagination__btn, styles.pagination__btn_prev, {
    [styles.pagination__btn_disable]: currentPage === 1,
  });

  const classBtnNext = classNames(styles.pagination__btn, styles.pagination__btn_next, {
    [styles.pagination__btn_disable]: pageNumberGroup.length === currentPage,
  });

  return (
    <section className={styles.pagination}>
      <ArrowRightIcon className={classBtnPrev} onClick={() => setPrevPage()} />
      <ul className={styles.pagination__list}>
        {pageNumberGroup.map((page: number | string) => (
          <li
            key={page.toString()}
            className={`${styles.pagination__page} ${currentPage === page ? styles.pagination__page_active : ''}`}
            onClick={() => {
              if (typeof page !== 'number') return;
              changePageTo(page);
            }}
          >
            <Text view="p-18">{page}</Text>
          </li>
        ))}
      </ul>
      <ArrowRightIcon className={classBtnNext} onClick={() => setNextPage()} />
    </section>
  );
};

export default Pagination;
