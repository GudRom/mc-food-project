import Text from 'components/Text';
import MainImage from '../../../assets/main-recipes-img.png';
import CardList from './components/CardList/CardList';
import Pagination from './components/Pagination';
import Search from './components/Search/Search';
import styles from './MainPage.module.scss';

export interface Recipe {
  id: number;
  image: string;
  readyInMinutes: number;
  title: string;
  subtitle: string;
  calories: number;
}

const MainPage = () => {
  return (
    <main className={styles.recipes}>
      <header>
        <img className={styles.recipes__mainImg} src={MainImage} alt="Image with dishes" />
      </header>
      <main className={styles.recipes__main}>
        <Text tag="p" view="p-20">
          <>
            Find the perfect food and <span className={styles.underline}>drink ideas</span> for every occasion, from{' '}
            <span className={styles.underline}>weeknight dinners</span> to&nbsp;
            <span className={styles.underline}>holiday feasts</span>.
          </>
        </Text>
        <Search className={styles.recipes__search} />
        <CardList className={styles.recipes__cardList} />
        <Pagination />
      </main>
    </main>
  );
};

export default MainPage;
