import "./index.css";
import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleRemove = (index) => {
    const newCart = cartItems.filter((item, id) => {
      return id !== index;
    });
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="cart">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-wrapper ">
            <div className="cart-wrap">
              <h3 className="title">Shopping Cart</h3>
              <div className="line mb-12"></div>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="cart-item flex gap-[50px] mb-[50px]"
                >
                  <div className="cart-block1 flex gap-[50px]">
                    <img
                      src={item.image}
                      alt=""
                      className="w-[128px] h-[128px] rounded-xl"
                    />
                    <div className="cart-info">
                      <h3 className="mb-5">{item.title}</h3>
                      <p className="mb-5">{item.company}</p>
                      <h4 className="flex items-center gap-3">
                        Color:
                        <span style={{ backgroundColor: item.color }}></span>
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h4>Amount</h4>
                    <select>
                      <option>{item.amount}</option>
                    </select>
                    <button
                      onClick={() => {
                        handleRemove(index);
                      }}
                      className="mr-auto text-blue-500 hover:underline"
                    >
                      remove
                    </button>
                  </div>
                  <span className="products-price">${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="title">Your cart is empty</h3>
            <div className="line"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
