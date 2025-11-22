import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    phone: '',
    instructions: ''
  });

  const handleQuantityChange = (itemId, portion, change) => {
    const item = cart.find(item => item.id === itemId && item.portion === portion);
    if (item) {
      updateQuantity(itemId, portion, item.quantity + change);
    }
  };

  const handleRemoveItem = (itemId, portion) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      removeFromCart(itemId, portion);
    }
  };

  const handleCheckout = () => {
    if (!deliveryDetails.name || !deliveryDetails.address || !deliveryDetails.phone) {
      alert('Please fill in all required delivery details');
      return;
    }

    if (cart.length === 0) {
      alert('Please add items to your cart before checkout');
      return;
    }

    if (window.confirm(`Total Amount: ₹${getTotalPrice()}\n\nProceed with checkout?`)) {
      alert(`Your order has been placed successfully!\nOrder Total: ₹${getTotalPrice()}\nEstimated delivery time: 35-45 minutes`);
      clearCart();
      // Reset form
      setDeliveryDetails({
        name: '',
        address: '',
        phone: '',
        instructions: ''
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-3xl text-gold mb-4">Your cart is empty</p>
        <p className="text-secondary mb-8">Browse our menu and add some delicious items</p>
        <a
          href="/menu"
          className="btn btn-gold text-lg"
        >
          Browse Menu
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Cart Items */}
      <div>
        <h2 className="text-3xl font-bold text-gold mb-6">Order Items</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={`${item.id}-${item.portion}`} className="bg-card rounded-2xl p-6">
              <div className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.portion)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-secondary mb-2">{item.portion === 'half' ? 'Half Portion' : 'Full Portion'}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gold font-bold">
                      ₹{item.portion === 'half' && item.halfPrice ? item.halfPrice : item.price}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.portion, -1)}
                        className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="text-white font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.portion, 1)}
                        className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Form */}
      <div>
        <h2 className="text-3xl font-bold text-gold mb-6">Delivery Details</h2>
        <div className="bg-card rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              value={deliveryDetails.name}
              onChange={(e) => setDeliveryDetails(prev => ({ ...prev, name: e.target.value }))}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number *</label>
            <input
              type="tel"
              value={deliveryDetails.phone}
              onChange={(e) => setDeliveryDetails(prev => ({ ...prev, phone: e.target.value }))}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Delivery Address *</label>
            <textarea
              value={deliveryDetails.address}
              onChange={(e) => setDeliveryDetails(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
              className="input textarea"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Special Instructions (optional)</label>
            <textarea
              value={deliveryDetails.instructions}
              onChange={(e) => setDeliveryDetails(prev => ({ ...prev, instructions: e.target.value }))}
              rows={2}
              className="input textarea"
            />
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-600 pt-4">
            <h3 className="text-xl font-bold text-gold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Subtotal</span>
                <span className="text-white">₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Delivery Fee</span>
                <span className="text-white">₹30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Tax (5%)</span>
                <span className="text-white">₹{(getTotalPrice() * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-600 pt-2">
                <span className="text-gold">Total</span>
                <span className="text-gold">
                  ₹{(getTotalPrice() + 30 + (getTotalPrice() * 0.05)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-gold w-full text-lg mt-6"
            >
              Place Order • ₹{(getTotalPrice() + 30 + (getTotalPrice() * 0.05)).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;