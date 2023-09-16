import classNames from 'classnames';
import { FC, FormEvent, memo, useCallback, useEffect, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import SearchIcon from 'components/icons/SearchIcon';
import { DISH_TYPES } from 'config/config';
import { useRecipesContext } from '../..';
import styles from './Search.module.scss';

interface Props {
  className?: string;
}

const Search: FC<Props> = ({ className }) => {
  const [value, setValue] = useState<Option[]>([]);
  const [text, setText] = useState<string>('');

  const classForm = classNames(styles.form, className);
  const recipes = useRecipesContext();

  useEffect(() => {
    sessionStorage.query && setText(sessionStorage.query);
    sessionStorage.options && setValue(JSON.parse(sessionStorage.options));
  }, []);

  const handleInput = useCallback((value: string) => {
    setText(value);
  }, []);

  const onSubmit = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();
      recipes?.getRecipesList(text, value);
    },
    [recipes, text, value],
  );

  return (
    <form className={classForm} onSubmit={onSubmit}>
      <div className={styles.form__inputBox}>
        <Input value={text} className={styles.form__input} onChange={handleInput} />
        <Button className={styles.form__searchButton}>
          <SearchIcon />
        </Button>
      </div>
      <MultiDropdown
        className={styles.form__multidrop}
        options={DISH_TYPES}
        value={value}
        onChange={setValue}
        getTitle={(values: Option[]) =>
          values.length === 0 ? 'Categories' : values.map(({ value }) => value).join(', ')
        }
      />
    </form>
  );
};

export default memo(Search);
