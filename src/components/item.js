import React, { Component } from 'react';
import { FaShoppingCart, FaHeart } from "react-icons/fa"; 

export class Item extends Component {
  render() {
    const { item, onShowItem, onAdd, addToFavorites, favorites } = this.props; // Деструктурируем пропсы

    // Проверяем, находится ли товар в избранном
    const isFavorite = favorites.some(fav => fav.id === item.id);

    return (
      <div className='item'>
        <img
          src={'./img/' + item.img}
          alt={item.title}
          onClick={() => onShowItem(item)} // Открыть полный просмотр товара
        />
        <h2>{item.title}</h2>
        <p>{item.desc}</p>
        <b>{item.price}₽</b>
        <div className='add-to-cart' onClick={() => onAdd(item)}>+</div>
        <FaHeart 
          className={`addToLike ${isFavorite ? 'active' : ''}`} 
          onClick={() => addToFavorites(item)} 
        />
      </div>
    );
  }
}

export default Item;
