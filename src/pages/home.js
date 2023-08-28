import React from 'react';
import CartItem from '../components/cart-item';

const Home = ({ data, addToCart, title }) => {
  

  return (
    <div> 
      <h1> {title} {title === "Sadykjon store" ? null :data.length}</h1>
      <div className='d-flex flex-wrap gap-4 justify-content-around'>
        {data.map((product, index) => (
          <CartItem onClick={() => addToCart(product.id)} children="Add to cart" key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
