import styles from './Divider.module.scss';

const Divider = () => {
  return (
    <div className={styles.divider}>
      <div className={styles.divider__circle}></div>
      <div className={styles.divider__line}></div>
    </div>
  );
};

export default Divider;
