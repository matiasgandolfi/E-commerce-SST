import React, { useContext, useState } from "react";
import Layout from "../../Comoponentes/Layout";
import OrderCard from "../../Comoponentes/OrderCard";
import { ShoppingCartContext } from "../../Context";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { totalPrice } from "../../utils";

function MyOrder() {

  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  if (index === 'last') index = context.order?.length - 1;

  const [formData, setFormData] = useState({
    state: "Finalizada",
    address: "Direccion",
    lastName: "Apellido",
    name: "Nombre",
    email: "email@email.com",
    phone: "+54 123456789",
    products: context.order?.[index]?.products || []
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://29cu776ppk.execute-api.us-east-1.amazonaws.com/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center relative mb-5 w-80">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>
        MyOrder
      </div>
      <div className="flex flex-col w-80">
        {
          context.order?.[index]?.products.map(product => (
            <OrderCard 
              key={product.sk}
              id={product.sk}
              name={product.name} 
              imageUrl={product.images[0]}
              price={product.price}
            />
          ))
        }
        <hr className="border-black w-4/5 mx-auto p-1"></hr>
        <div className='px-6 mb-6'>
          <p className='flex justify-between items-center'>
            <span className='font-light'>Total:</span>
            <span className='font-medium text-2xl'>$ {totalPrice(context.order?.[index]?.products)}</span>
          </p>
          <button className='bg-green-500 w-full py-4 text-white rounded-lg' onClick={handleSubmit}>Comprar</button>
        </div>
      </div>
    </Layout>
  );
}

export default MyOrder;
