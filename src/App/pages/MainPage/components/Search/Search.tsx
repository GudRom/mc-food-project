import classNames from 'classnames';
import { FC, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import SearchIcon from 'components/icons/SearchIcon';
import styles from './Search.module.scss';

interface Props {
  className?: string;
}

const Search: FC<Props> = ({ className }) => {
  const [value, setValue] = useState<Option[]>([]);
  const [querry, setQuerry] = useState<string>('');
  const classForm = classNames(styles.form, className);
  const handleInput = (value: string) => {
    setQuerry(value);
  };
  const onSubmit = () => {
    // eslint-disable-next-line no-console
    console.log(querry);
  };

  return (
    <form className={classForm} onSubmit={onSubmit}>
      <div className={styles.form__inputBox}>
        <Input value={querry} className={styles.form__input} onChange={handleInput} />
        <Button className={styles.form__searchButton}>
          <SearchIcon />
        </Button>
      </div>
      <MultiDropdown
        className={styles.form__multidrop}
        options={[]}
        value={value}
        onChange={setValue}
        getTitle={(values: Option[]) =>
          values.length === 0 ? 'Categories' : values.map(({ value }) => value).join(', ')
        }
      />
    </form>
  );
};

export default Search;
