import React from 'react';
import styles from '@/styles/home/ItemCategory.module.css'


const ItemCategory = ({ item }) => {

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const title = titleCase(item.title);

    return (
        <div className={styles.container}>
            <img src={item.img} className={styles.image} />
            <h1 className={styles.title}>{title}</h1>
        </div>
    )
}

export default ItemCategory