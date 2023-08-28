import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import products from "../data/product.json";
import Header from "../components/header";
import Home from "./home";
import Cart from "./cart";
import { category } from "../category";
 
const Main = () => {
  const [data, setData] = useState(products.products);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("Sadykjon store");

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categoryClick = (text) => {
    
    const newp = products.products.filter((elem) => elem.category === text);
    setData([...newp]);
    setTitle(text);
  };

  const addToCart = (id) => {
    const newp = products.products.find((elem) => elem.id === id);
    setCart([...cart, newp]);
    if (newp) {
      alert("Product added successfully");
    }
  };

  const deleteToCart = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmed) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const searchClick = () => {
    const searchData = products.products.filter(
      (elem) => elem.title.toLowerCase().includes(input.toLowerCase())
    );
    setData(searchData);
  };

  return (
    <div>
      <Header
        category={category}
        categoryClick={categoryClick}
        input={input}
        setInput={setInput}
        searchClick={searchClick}
      />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                data={data}
                addToCart={addToCart}
                input={input}
                setInput={setInput}
                searchClick={searchClick}
                title={title}
                setTitle={setTitle}
              />
            }
          />
          <Route path="/cart" element={<Cart cart={cart} deleteToCart={deleteToCart} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default Main;
