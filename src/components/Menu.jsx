import React, { useState, useMemo } from 'react';
import { useMenu } from '../context/MenuContext';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const { menu } = useMenu();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [vegFilter, setVegFilter] = useState('all');

  const filteredMenu = useMemo(() => {
    let filtered = menu;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(category => category.id === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.items.length > 0);
    }

    // Apply veg filter
    if (vegFilter !== 'all') {
      filtered = filtered.map(category => ({
        ...category,
        items: category.items.filter(item => 
          vegFilter === 'veg' ? item.isVeg : !item.isVeg
        )
      })).filter(category => category.items.length > 0);
    }

    return filtered;
  }, [menu, searchQuery, selectedCategory, vegFilter]);

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setVegFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                vegFilter === 'all' ? 'bg-gold text-gray-900' : 'bg-gray-700 text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setVegFilter('veg')}
              className={`px-4 py-2 rounded-lg ${
                vegFilter === 'veg' ? 'bg-gold text-gray-900' : 'bg-gray-700 text-white'
              }`}
            >
              Veg
            </button>
            <button
              onClick={() => setVegFilter('nonveg')}
              className={`px-4 py-2 rounded-lg ${
                vegFilter === 'nonveg' ? 'bg-gold text-gray-900' : 'bg-gray-700 text-white'
              }`}
            >
              Non-Veg
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === 'all' ? 'bg-gold text-gray-900' : 'bg-gray-700 text-white'
            }`}
          >
            All
          </button>
          {menu.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category.id ? 'bg-gold text-gray-900' : 'bg-gray-700 text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-12">
        {filteredMenu.map(category => (
          <div key={category.id}>
            <h2 className="text-3xl font-bold text-gold mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map(item => (
                <div key={item.id} className="bg-card rounded-2xl overflow-hidden shadow-lg">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{item.name}</h3>
                      <span className={`inline-block w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    </div>
                    <p className="text-secondary mb-4">{item.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gold font-bold">₹{item.price}</span>
                      <span className="text-secondary">{item.cookingTime}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {item.halfPrice && (
                          <button
                            onClick={() => addToCart(item, 'half')}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-200"
                          >
                            Half (₹{item.halfPrice})
                          </button>
                        )}
                        <button
                          onClick={() => addToCart(item, 'full')}
                          className="bg-gold hover:bg-gold-dark text-gray-900 px-4 py-2 rounded transition duration-200"
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 3 }, (_, i) => (
                          <span key={i} className={i < item.spicyLevel ? 'text-red-500' : 'text-gray-600'}>
                            🌶
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredMenu.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-gold mb-4">No items found</p>
            <p className="text-secondary">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;