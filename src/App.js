import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Items from "./components/items";
import Categories from "./components/categories";
import ShowFullitem from "./components/showFullitem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      favorites: [], 
      currentItems: [], 
      items: [
        {
          id: 1,
          title: 'Джемпер темно-синий',
          img: 'cardican dark blue.png',
          desc: 'Джемпер мужской...',
          category: 'cardigan',
          price: '3000'
        },
        {
          id: 2,
          title: 'Джемпер серый',
          img: 'cardigan grey.png',
          desc: 'Джемпер мужской...',
          category: 'cardigan',
          price: '3000'
        },
        {
          id: 3,
          title: 'Джемпер бордовый',
          img: 'cardigan dark red.png',
          desc: 'Джемпер мужской...',
          category: 'cardigan',
          price: '3000'
        },
        {
          id: 4,
          title: 'Джинсы черные',
          img: 'jeans black.png',
          desc: 'Для любого сезона...',
          category: 'jeans',
          price: '2000'
        },
        {
          id: 5,
          title: 'Джинсы синие',
          img: 'jeans blue.png',
          desc: 'Для любого сезона...',
          category: 'jeans',
          price: '2000'
        },
        {
          id: 6,
          title: 'Джинсы коричневые',
          img: 'jeans brown.png',
          desc: 'Для любого сезона...',
          category: 'jeans',
          price: '2000'
        },
      ],
      ShowFullitem: false,
      fullitem: {},
      orderNumber: 1,
      successMessage: '',
      orderSummary: [],
      sidebarOpen: false,
    };
    this.state.currentItems = this.state.items; 
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
    this.clearOrders = this.clearOrders.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this); 
    this.removeFromFavorites = this.removeFromFavorites.bind(this); 
  }

  toggleSidebar() {
    this.setState((prevState) => ({
      sidebarOpen: !prevState.sidebarOpen,
    }));
  }

  addToFavorites(item) {
    this.setState((prevState) => {
      const isFavorite = prevState.favorites.some((fav) => fav.id === item.id);
      return {
        favorites: isFavorite
          ? prevState.favorites.filter((fav) => fav.id !== item.id)
          : [...prevState.favorites, item],
      };
    });
  }

  removeFromFavorites(itemId) {
    this.setState((prevState) => ({
      favorites: prevState.favorites.filter((item) => item.id !== itemId),
    }));
  }

  render() {
    return (
      <div className="wrapper">
        <Header
          orderSummary={this.state.orderSummary}
          orders={this.state.orders}
          onDelete={this.deleteOrder}
          clearOrders={this.clearOrders}
          sidebarOpen={this.state.sidebarOpen}
          toggleSidebar={this.toggleSidebar}
          favorites={this.state.favorites}
          removeFromFavorites={this.removeFromFavorites} 
        />
        <Categories chooseCategory={this.chooseCategory} />
        <Items
          onShowItem={this.onShowItem}
          items={this.state.currentItems}
          onAdd={this.addToOrder}
          addToFavorites={this.addToFavorites} // Передаем функцию добавления в избранное
          favorites={this.state.favorites} // Передаем список избранных товаров
        />
        {this.state.ShowFullitem && (
          <ShowFullitem
            onAdd={this.addToOrder}
            onShowItem={this.onShowItem}
            item={this.state.fullitem}
          />
        )}
        <Footer />
      </div>
    );
  }

  onShowItem(item) {
    this.setState({ fullitem: item });
    this.setState({ ShowFullitem: !this.state.ShowFullitem });
  }

  clearOrders() {
    const totalSum = this.state.orders.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );

    this.setState((prevState) => ({
      orders: [],
      orderSummary: [
        ...prevState.orderSummary,
        {
          orderNumber: prevState.orderNumber,
          totalSum: totalSum,
          items: prevState.orders,
        },
      ],
      successMessage: `Успешный заказ! Ваш номер ${prevState.orderNumber}.`,
      orderNumber: prevState.orderNumber + 1,
      sidebarOpen: true,
    }));
  }

  chooseCategory(category) {
    if (category === "all") {
      this.setState({ currentItems: this.state.items });
      return;
    }

    this.setState({
      currentItems: this.state.items.filter((el) => el.category === category),
    });
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter((el) => el.id !== id) });
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });

    if (!isInArray) {
      this.setState({ orders: [...this.state.orders, item] });
    }
  }
}

export default App;
