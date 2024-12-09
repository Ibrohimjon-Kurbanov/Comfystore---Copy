import "./index.css";
import slideimg1 from "../../assets/slide-img-1.webp";
import slideimg2 from "../../assets/slide-img-2.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://strapi-store-server.onrender.com/api/products")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data);
          setProducts(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRedirect = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <section className="home">
        <div className=" home__container container">
          <div className="hero__info">
            <h1>We are changing the way people shop</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat explicabo enim soluta temporibus asperiores aut obcaecati
              perferendis porro nobis.
            </p>
            <Link to="/products">OUR PRODUCTS</Link>
          </div>
          <div className="slide-images">
            <img
              className="w-[320px] h-[416px] rounded-3xl"
              src={slideimg1}
              alt=""
            />
            <img
              className="w-[320px] h-[416px] rounded-3xl"
              src={slideimg2}
              alt=""
            />
          </div>
        </div>
      </section>
      <div className="container">
        <h3 className="title">Featured Products</h3>
        <div className="line"></div>
        <div className="card-wrapper card-wraps">
          {products
            .filter((product) => product.attributes.featured == true)
            .map((product, index) => {
              return (
                <div
                  className="card"
                  key={index}
                  onClick={() => {
                    handleRedirect(product.id);
                  }}
                >
                  <div className="card-image">
                    <img
                      className="card-pic"
                      src={product.attributes.image}
                      alt=""
                    />
                  </div>
                  <div className="card-info">
                    <h3>{product.attributes.title}</h3>
                    <p>${product.attributes.price}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
