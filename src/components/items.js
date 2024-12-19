import React, { Component } from 'react';
import Item from './item'; // Импортируем компонент Item

export class Items extends Component {
  render() {
    const { items, onShowItem, onAdd, addToFavorites, favorites } = this.props; // Деструктурируем пропсы

    return (
      <main>
        {items.map(el => (
          <Item
            key={el.id}
            item={el}
            onShowItem={onShowItem} // Передаем функцию для отображения подробной информации
            onAdd={onAdd}           // Передаем функцию для добавления в корзину
            addToFavorites={addToFavorites}  // Передаем функцию для добавления в избранное
            favorites={favorites} // Передаем избранные товары
          />
        ))}
      </main>
    );
  }
}

export default Items;
