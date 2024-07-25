import { useContext } from 'react'
import './style.css'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'


const ProductDetail = () => {
    const context = useContext(ShoppingCartContext);
    const product = context.productToShow;

    return (
        <aside className={` ${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            
            <div className='flex justify-between items-center'>
                <h2 className="font-medium text-xl">Detail</h2>
                <div 
                className='p-6'
                onClick={context.closeProductDetail}>
                    <XMarkIcon 
                    onClick={() => {context.closeProductDetail}}
                    className="h-6 w-6 cursor-pointer"/></div>

            </div>
            <figure className='px-6'>
                <img className="w-full h-full rounded-lg" src={product.images} alt={context.title} />
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-2xl'>Nombre: {product.title}</span>
                <span className='font-medium text-md'>Precio: ${product.price}</span>
                <span className='font-lght text-sm'>Description: {product.description}</span>
            </p>

        </aside>
    )
}

export default ProductDetail;