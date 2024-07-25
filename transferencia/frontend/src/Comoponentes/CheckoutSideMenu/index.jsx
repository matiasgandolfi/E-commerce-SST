import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../OrderCard';
import {totalPrice} from '../../utils/index';

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext);
    const products = context.cartProducts;

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id );
        context.setCartProducts(filteredProducts);
    }

    const handleCheckout =() => {
        const orderToAdd = {
            date:'01-02-2024',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }
        context.setOrder([...context.order, orderToAdd]);
        context.setCartProducts([]);
        context.setSearchByTitle(null)
    }


    return (
        <aside className={` ${context.isShoppingCartOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            
            <div className='flex justify-between items-center'>
                <h2 className="font-medium text-xl">My Order</h2>
                <div 
                className='p-6'
                onClick={context.closeShoppingCart}>
                    <XMarkIcon 
                    onClick={() => {context.setIsShoppingCartOpen}}
                    className="h-6 w-6 cursor-pointer"/></div>
            </div>
            <div className='px-6 overflow-y-scroll'>
                {
                    products.map(product =>(
                        <OrderCard 
                            key={product.id}
                            id={product.id}
                            title={product.title} 
                            imageUrl={product.images}
                            price={product.price}
                            handleDelete={handleDelete}
                        /> 
                    ))
                }

            </div>
            <hr className="border-black w-4/5 mx-auto p-1"></hr>
            <div className='px-6 mb-6'>
                <p className='flex justify-between items-center'>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to="/my-orders/last">
                    <button className='bg-black w-full py-4 text-white rounded-lg' onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu;