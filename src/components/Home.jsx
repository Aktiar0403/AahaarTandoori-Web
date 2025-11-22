import React from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { menu } = useMenu();
  const { cart } = useCart();

  const featuredItems = menu.flatMap(category => 
    category.items.filter(item => item.available).slice(0, 2)
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gold mb-4">Welcome to Aahaar Tandoori</h1>
        <p className="text-xl text-gray-300 mb-8">Experience the finest Indian cuisine</p>
        <Link
          to="/menu"
          className="btn btn-gold text-lg"
        >
          Order Now
        </Link>
      </section>

      {/* Featured Items */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gold mb-8">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map(item => (
            <div key={item.id} className="bg-card rounded-2xl overflow-hidden shadow-lg">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-secondary mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gold">₹{item.price}</span>
                  <Link
                    to="/menu"
                    className="btn btn-gold"
                  >
                    Order
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gold mb-8">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {menu.map(category => (
            <Link
              key={category.id}
              to="/menu"
              className="bg-card rounded-2xl p-6 text-center hover:bg-gray-700 transition"
            >
              <h3 className="text-lg font-bold text-gold mb-2">{category.name}</h3>
              <p className="text-secondary">
                {category.items.filter(item => item.available).length} items
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-gold mb-2">{cart.length}</div>
            <div className="text-secondary">Items in Cart</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gold mb-2">25-35</div>
            <div className="text-secondary">Avg. Prep Time (min)</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gold mb-2">4.8</div>
            <div className="text-secondary">Customer Rating</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;