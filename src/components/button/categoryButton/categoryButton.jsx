import React, { useState, useEffect } from "react";
import styles from './categoryButton.module.css';
import { useTranslation } from "react-i18next";

const CategoryButton = ({ category, imageSrc, onClick }) => {
    const lang = localStorage.getItem("language");
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [i18n, lang]);

    return (
        <div className={styles.categoryButton} onClick={onClick}>
             <p>{t(category)}</p>
            <img src={imageSrc} alt={category} className={styles.image} />
        </div>
    );
};

export default CategoryButton;
