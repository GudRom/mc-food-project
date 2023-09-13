import classNames from 'classnames';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Text from 'components/Text';
import { Recipe } from '../../MainPage';
import Card from './Card';
import styles from './CardList.module.scss';

interface Props {
  recipes: Recipe[];
  className: string;
}

const CardList: FC<Props> = ({ recipes = [], className }) => {
  const navigate = useNavigate();
  const classCardList = classNames(styles.cardList, className);
  return (
    <ul className={classCardList}>
      {recipes.map((el: Recipe) => (
        <Card
          key={el.id}
          image={el.image}
          title={el.title}
          subtitle={el.subtitle}
          captionSlot={<>{`${el.readyInMinutes} minutes`}</>}
          contentSlot={<>{`${Math.floor(el.calories)} kcal`}</>}
          actionSlot={
            <Button>
              <Text view="button">Save</Text>
            </Button>
          }
          onClick={() => navigate(`/recipes/${el.id}`)}
        />
      ))}
    </ul>
  );
};

export default CardList;
