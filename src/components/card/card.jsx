import React from 'react';
import styles from './card.module.css';

const Card = ({ image, title, author, price, onClick, currency }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
        <div className={styles.footer}>
        <p className={styles.price}>
        {currency === "AZN" ? `₼ ${(price || 0).toLocaleString()}` : currency === "USD" ? `$ ${(price || 0).toLocaleString()}` : `${(price || 0).toLocaleString()}`}
</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
