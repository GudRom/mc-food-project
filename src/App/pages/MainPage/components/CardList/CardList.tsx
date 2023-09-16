import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Text from 'components/Text';
import { IRecipeCardModel } from 'models/Recipe';
import { useRecipesContext } from '../..';
import Card from './Card';
import styles from './CardList.module.scss';

interface Props {
  // recipes: IRecipeCardModel[];
  className: string;
}

const CardList: FC<Props> = ({ className }) => {
  const recipes = useRecipesContext();
  const navigate = useNavigate();
  const classCardList = classNames(styles.cardList, className);

  return (
    <ul className={classCardList}>
      {recipes?.currentPageData.map((el: IRecipeCardModel) => (
        <Card
          key={el.id}
          image={el.image}
          title={el.title}
          subtitle={el.subtitle}
          captionSlot={<>{`${el.readyInMinutes} minutes`}</>}
          contentSlot={<>{`${el.calories ? Math.floor(el.calories) : 0} kcal`}</>}
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

export default observer(CardList);
