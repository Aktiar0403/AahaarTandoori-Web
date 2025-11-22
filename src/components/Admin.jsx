import React, { useState } from 'react';
import { useMenu } from '../context/MenuContext';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { menu, updateItem } = useMenu();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('menu');

  const handleToggleAvailability = (categoryId, itemId, currentStatus) => {
    updateItem(categoryId, itemId, { available: !currentStatus });
  };

  const handleEditPrice = (categoryId, item) => {
    const newPrice = prompt(`Enter new price for ${item.name}:`, item.price);
    if (newPrice && !isNaN(newPrice) && newPrice > 0) {
      updateItem(categoryId, item.id, { price: parseFloat(newPrice) });
    }
  };

  const handleEditHalfPrice = (categoryId, item) => {
    const newPrice = prompt(`Enter new half price for ${item.name}:`, item.halfPrice || '');
    if (newPrice && !isNaN(newPrice) && newPrice > 0) {
      updateItem(categoryId, item.id, { halfPrice: parseFloat(newPrice) });
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gold">Admin Panel</h1>
          <p className="text-secondary">Manage your restaurant</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-600 mb-6">
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'menu' 
              ? 'border-b-2 border-gold text-gold' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Menu Management
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'analytics' 
              ? 'border-b-2 border-gold text-gold' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'menu' ? (
        <div className="space-y-8">
          {menu.map(category => (
            <div key={category.id}>
              <h2 className="text-2xl font-bold text-gold mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map(item => (
                  <div key={item.id} className="bg-card rounded-2xl p-6">
                    <div className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-white">{item.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`inline-block w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span className={`px-2 py-1 rounded text-xs ${item.available ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                              {item.available ? 'Available' : 'Unavailable'}
                            </span>
                          </div>
                        </div>
                        <p className="text-secondary mb-4">{item.description}</p>
                        
                        <div className="flex gap-2 mb-4">
                          <button
                            onClick={() => handleEditPrice(category.id, item)}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Full: ₹{item.price}
                          </button>
                          {item.halfPrice && (
                            <button
                              onClick={() => handleEditHalfPrice(category.id, item)}
                              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Half: ₹{item.halfPrice}
                            </button>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleAvailability(category.id, item.id, item.available)}
                            className={`px-4 py-2 rounded text-sm ${
                              item.available 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                          >
                            {item.available ? 'Mark Unavailable' : 'Mark Available'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Analytics Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-gold mb-2">42</div>
              <div className="text-secondary">Today's Orders</div>
            </div>
            <div className="bg-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-gold mb-2">₹12,480</div>
              <div className="text-secondary">Today's Revenue</div>
            </div>
            <div className="bg-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-gold mb-2">86%</div>
              <div className="text-secondary">Availability Rate</div>
            </div>
            <div className="bg-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-gold mb-2">4.8★</div>
              <div className="text-secondary">Customer Rating</div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gold mb-4">Popular Items</h3>
            <div className="space-y-4">
              {menu.flatMap(category => category.items).slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-center gap-4">
                  <span className="text-gold font-bold text-lg">#{index + 1}</span>
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-secondary">₹{item.price}</div>
                  </div>
                  <div className="text-gold font-bold">28 orders</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;