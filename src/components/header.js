import React, { useState } from "react";
import { FaShoppingCart, FaHeart,FaTrash } from "react-icons/fa"; // Используем иконки для корзины и избранного
import Order from "./order";

const showOrders = (props, clearOrders) => {
  let summa = 0;
  props.orders.forEach((el) => (summa += Number.parseFloat(el.price)));

  return (
    <div>
      {props.orders.map((el) => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className="summa">
        Сумма: {new Intl.NumberFormat().format(summa)}₽
        <button onClick={clearOrders} className="takeorder">
          Оформить заказ
        </button>
      </p>
    </div>
  );
};

const showNothing = () => {
  return <div className="empty"><h2>Товаров нет</h2></div>;
};

const showFavorites = (props) => {
  return (
    <div>
      {props.favorites.length > 0 ? (
        props.favorites.map((el) => (
          <div key={el.id} className="favorite-item">
            <img src={'./img/' + el.img} alt={el.title} />
            <p className="test">{el.title}</p>
            <FaTrash className="roflan" onClick={() => props.removeFromFavorites(el.id)} />
          
          </div>
        ))
      ) : (
        <p>Нет избранных товаров.</p>
      )}
    </div>
  );
};

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false); // Состояние для панели избранных товаров

  const clearOrders = () => {
    props.clearOrders();
  };

  const toggleFavorites = () => {
    setFavoritesOpen(!favoritesOpen);
  };

  return (
    <header>
      <div>
        <span className="logo">Taurus</span>
        <ul className="nav">
          <li>Про нас</li>
          <li>Контакты</li>
          <li onClick={props.toggleSidebar}>Кабинет</li>
        </ul>
        <FaShoppingCart
          onClick={() => setCartOpen(!cartOpen)}
          className={`shop-cart-button ${cartOpen && "active"}`}
        />
        <FaHeart
          onClick={toggleFavorites}
          className={`favorites-button ${favoritesOpen && "active"}`}
        />

        {cartOpen && (
          <div className="shop-cart">
            {props.orders.length > 0
              ? showOrders(props, clearOrders)
              : showNothing()}
            {props.successMessage && (
              <p className="order-success">{props.successMessage}</p>
            )}
          </div>
        )}

        {favoritesOpen && (
          <div className="shop-cart">
            <h2>Избранные товары</h2>
            {showFavorites(props)} {/* Отображаем товары из избранного */}
          </div>
        )}
      </div>
      {props.sidebarOpen && (
        <div className="sidebar">
          <button className="close-sidebar" onClick={props.toggleSidebar}>
            ×
          </button>
          <h2>Ваши заказы</h2>
          {props.orderSummary.length > 0 ? (
            <div>
              <h3>Все ваши заказы</h3>
              {props.orderSummary.map((order) => (
                <div key={order.orderNumber}>
                  <p className="number">Номер заказа: {order.orderNumber}</p>
                  <p>Сумма: {new Intl.NumberFormat().format(order.totalSum)}₽</p>
                  <p>Товары в заказе:</p>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.title} - {item.price}₽
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p>У вас нет заказов.</p>
          )}
        </div>
      )}
      <div className="presentation"></div>
    </header>
  );
}
