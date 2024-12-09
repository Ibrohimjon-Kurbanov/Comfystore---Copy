import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Mainlayout from "./layout/Mainlayout";
import ProductsDetails from "./pages/ProductsDetails";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
function App() {
  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <Mainlayout>
              <Home></Home>
            </Mainlayout>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <Mainlayout>
              <About></About>
            </Mainlayout>
          }
        ></Route>
        <Route
          path="/products"
          element={
            <Mainlayout>
              <Products></Products>
            </Mainlayout>
          }
        ></Route>
        <Route
          path="/products/:id"
          element={
            <Mainlayout>
              <ProductsDetails></ProductsDetails>
            </Mainlayout>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <Mainlayout>
              <Cart></Cart>
            </Mainlayout>
          }
        ></Route>
        <Route
          path="*"
          element={
            <Mainlayout>
              <ErrorPage></ErrorPage>
            </Mainlayout>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
