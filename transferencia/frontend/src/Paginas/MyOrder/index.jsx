import { useContext } from "react";
import Layout from "../../Comoponentes/Layout"
import OrderCard from "../../Comoponentes/OrderCard";
import { ShoppingCartContext } from "../../Context";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { totalPrice } from "../../utils";


function MyOrder() {

  console.log("Esta pagina es MyOrder");

  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf('/')+1);
  if(index === 'last') index = context.order?.length-1

    return (
      <Layout>

        <div className="flex items-center justify-center relative mb-5 w-80">
          <Link to="/my-orders" className="absolute left-0">
            <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer"/>
          </Link>
          MyOrder
        </div>
      <div className="flex flex-col w-80">
        {
            context.order?.[index]?.products.map(product =>(
                <OrderCard 
                    key={product.sk}
                    id={product.sk}
                    name={product.name} 
                    imageUrl={product.images[0]}
                    price={product.price}
                /> 
          ))
        }

        {console.log(context.order)}
            <hr className="border-black w-4/5 mx-auto p-1"></hr>
            <div className='px-6 mb-6'>
                <p className='flex justify-between items-center'>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>$ {totalPrice(context.order?.[index]?.products)}</span>
                </p>
                    <button className='bg-green-500 w-full py-4 text-white rounded-lg' onClick={() => handleCheckout()}>Comprar</button>
            </div>
        

       

      </div>

      </Layout>
    )
  }
  
  export default MyOrder
  