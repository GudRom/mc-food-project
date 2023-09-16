import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import Text from 'components/Text';
import HeartIcon from 'components/icons/HeartIcon';
import LogoIcon from 'components/icons/LogoIcon';
import ProfileIcon from 'components/icons/ProfileIcon';
import { NAVIGATION_LIST } from 'config/config.ts';
import style from './Header.module.scss';

type Props = {
  color?: string;
};

const Header: FC<Props> = () => {
  return (
    <header className={style.header}>
      <div className={style.header__mainPart}>
        <NavLink className={style.header__logoLink} to={'/recipes'}>
          <LogoIcon />
          <Text view="p-20">
            <>Food Client</>
          </Text>
        </NavLink>
        <nav className={style.header__navigation}>
          {NAVIGATION_LIST.map((link) => (
            <NavLink to={link.href} key={link.href} className={style.header__navLink} end>
              {({ isActive }) => (
                <Text view="p-16" tag="span" color={isActive ? 'accent' : 'primary'}>
                  <>{link.name}</>
                </Text>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className={style.header__iconButtonBox}>
        <HeartIcon className={style.header__iconButton} />
        <ProfileIcon className={style.header__iconButton} />
      </div>
    </header>
  );
};

export default memo(Header);
