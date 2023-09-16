import { useEffect, useRef } from 'react';
import { ILocalStore } from 'models/CommonTypes/ILocalStore';
// сделаем функцию дженериком <T>, это значит что она принимает
// функцию creator, которая возвращает что-то типа T и сама
// функция useLocalStore возвращает это что-то типа T
export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  // повторили логику создания из компонента
  const container = useRef<null | T>(null);
  if (container.current === null) {
    container.current = creator();
  }

  useEffect(() => {
    return () => container.current?.destroy();
  }, []);

  return container.current;
};
