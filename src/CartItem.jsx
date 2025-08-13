import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => { 
    return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
 
  };

  const handleContinueShopping = (e) => { 
    e.preventDefault();
    onContinueShopping(); // Call the function passed as a prop to continue shopping
   
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => { 
    const updatedQuantity = item.quantity + 1; // Increment the quantity by 1
    dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity })); // Dispatch the action to update the quantity
  };

  const handleDecrement = (item) => { 
    if (item.quantity > 1) { // Ensure quantity does not go below 1
      const updatedQuantity = item.quantity - 1; // Decrement the quantity by 1
      dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity })); // Dispatch the action to update the quantity
    }
   
  };

  const handleRemove = (item) => {  
    dispatch(removeItem(item.name)); // Dispatch the action to remove the item from the cart
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {  
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2); // Return the total cost formatted to two decimal places
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


