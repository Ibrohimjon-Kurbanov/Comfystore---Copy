import "./index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [amount, setAmount] = useState();
  const { id } = useParams();
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleAddCart = () => {
    if (!selectedColor) {
      alert("Please choose color");
      return;
    }

    const cartItem = {
      title: product.attributes.title,
      company: product.attributes.company,
      price: product.attributes.price,
      color: selectedColor,
      image: product.attributes.image,
      amount: Number(amount),
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));

    alert("Item added to cart");
  };

  useEffect(() => {
    axios
      .get(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <div className="container">
        <div className="product-details">
          <div className="links">
            <Link to="/">Home</Link>
            <span>&gt;</span>
            <Link to="/products">Products</Link>
          </div>
          {product.id && (
            <div className="product-card">
              <div className="product-image">
                <img
                  src={product.attributes.image}
                  alt=""
                  className="w-[511px] h-[384px]"
                  width="511"
                />
              </div>
              <div className="products-card-info">
                <h2>{product.attributes.title}</h2>
                <h3>{product.attributes.company}</h3>
                <span className="products-price">
                  ${product.attributes.price}
                </span>
                <p>{product.attributes.description}</p>
                <h4>Colors</h4>
                <div className="colors">
                  {product.attributes &&
                    product.attributes.colors.map((color, index) => (
                      <label
                        key={index}
                        style={{
                          display: "inline-block",
                          marginRight: "8px",
                          marginBottom: "15px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name="color"
                          value={color}
                          onChange={() => handleColorChange(color)}
                          checked={selectedColor === color}
                          style={{ display: "none" }}
                        />
                        <span
                          style={{
                            backgroundColor: color,
                            display: "inline-block",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            border:
                              selectedColor === color
                                ? "2px solid #333"
                                : "2px solid transparent",
                          }}
                        ></span>
                      </label>
                    ))}
                </div>
                <h4>Amount</h4>
                <select
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <button className="products-add-btn" onClick={handleAddCart}>
                  ADD TO BAG
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
