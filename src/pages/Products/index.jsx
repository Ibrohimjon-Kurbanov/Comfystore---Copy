import "./index.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [sort, setSort] = useState("a-z");
  const [price, setPrice] = useState(1000);
  const [shipping, setShipping] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const navigate2 = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(
        `https://strapi-store-server.onrender.com/api/products?page=${currentPage}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data);
          setProducts(response.data.data);
          setFilterData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if (location.search) {
      setCurrentPage(location.search.substring(6));
    }
  }, [currentPage]);

  const handleRedirect = (id) => {
    navigate(`/products/${id}`);
  };

  function handleSubmit(e) {
    e.preventDefault();

    let filteredData = [...products];

    if (search) {
      filteredData = filteredData.filter((product) =>
        product.attributes.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      filteredData = filteredData.filter(
        (product) => product.attributes.category === category
      );
    }

    if (company !== "all") {
      filteredData = filteredData.filter(
        (product) => product.attributes.company === company
      );
    }

    if (sort == "high") {
      filteredData.sort((a, b) => b.attributes.price - a.attributes.price);
    }

    if (sort == "low") {
      filteredData.sort((a, b) => a.attributes.price - b.attributes.price);
    }

    if (price) {
      filteredData = filteredData.filter(
        (product) => Number(product.attributes.price) / 100 <= price
      );
    }

    if (shipping) {
      filteredData = filteredData.filter(
        (product) => product.attributes.shipping === true
      );
    }

    setFilterData(filteredData);
  }

  function handleReset() {
    setSearch("");
    setCategory("all");
    setCompany("all");
    setSort("a-z");
    setPrice(1000);
    setShipping(false);
    setFilterData(products);
  }

  function handlePagination(num) {
    navigate2(`/products?page=${num}`);
    setCurrentPage(num);
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
      navigate2(`/products?page=${currentPage - 1}`);
    } else {
      setCurrentPage(1);
      navigate2(`/products?page=1`);
    }
  }
  function handleNext() {
    if (currentPage < 3) {
      setCurrentPage((currentPage) => currentPage + 1);
      navigate2(`/products?page=${Number(currentPage) + 1}`);
    } else {
      setCurrentPage(3);
      navigate2(`/products?page=3`);
    }
  }

  return (
    <>
      <section className="filter">
        <div className="filter-container container">
          <form className="filter-form" onSubmit={handleSubmit}>
            <div className="form-box">
              <label htmlFor="search-input">Search Product</label>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="search"
                id="search-input"
              />
            </div>
            <div className="form-box">
              <label htmlFor="category">Select category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                name=""
                id="category"
              >
                <option value="all">all</option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </div>
            <div className="form-box">
              <label htmlFor="company">Select Company</label>
              <select
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                name=""
                id="company"
              >
                <option value="all">all</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Home</option>
              </select>
            </div>
            <div className="form-box">
              <label htmlFor="sort">Sort by</label>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
                name=""
                id="sort"
              >
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </select>
            </div>
            <div className="form-box">
              <div className="price-wrap">
                <label htmlFor="sort">Select Price</label>
                <span>${price}.00</span>
              </div>
              <input
                value={price}
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                }}
                type="range"
                id="price"
                min={0}
                max="1000"
                step="10"
              ></input>
              <div className="price-wrapp">
                <span>0</span>
                <span>Max: $1,000.00</span>
              </div>
            </div>
            <div className="form-box form-box-2">
              <label htmlFor="check">Free Shipping</label>
              <input
                value="Free Shipping"
                type="checkbox"
                id="check"
                checked={shipping}
                onChange={(e) => {
                  setShipping(e.target.checked);
                }}
              />
            </div>
            <div className="form-box">
              <button>SEARCH</button>
            </div>
            <div className="form-box">
              <a className="reset" href="#" onClick={handleReset}>
                RESET
              </a>
            </div>
          </form>
        </div>
      </section>

      <div className="container">
        <div className="card-wrapper">
          {filterData.length > 0 &&
            filterData.map((product, index) => {
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
                    <p>${(product.attributes.price / 100).toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-end mb-[100px]">
          <div className="join">
            <button
              className="join-item btn h-16 text-2xl font-normal "
              onClick={handlePrev}
            >
              PREV
            </button>
            <button
              className={`join-item btn w-20 h-16 text-2xl  ${
                currentPage == 1 ? "btn-active" : ""
              }`}
              onClick={() => {
                handlePagination(1);
              }}
            >
              1
            </button>
            <button
              className={`join-item btn  w-20 h-16 text-2xl ${
                currentPage == 2 ? "btn-active" : ""
              }`}
              onClick={() => {
                handlePagination(2);
              }}
            >
              2
            </button>
            <button
              className={`join-item btn w-20 h-16 text-2xl ${
                currentPage === 3 ? "btn-active" : ""
              }`}
              onClick={() => {
                handlePagination(3);
              }}
            >
              3
            </button>
            <button
              className={"join-item btn  h-16 text-2xl font-normal"}
              onClick={handleNext}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
