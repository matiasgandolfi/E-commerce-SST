import { useContext } from 'react';
import './style.css';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);
  const product = context.productToShow;

  const renderDetail = () => {
    if (product && product.images && product.images.length > 0) {
      return (
        <figure className='px-6'>
          <img className="w-full h-full rounded-lg" src={product.images[0]} alt={product.name} />
        </figure>
      );
    } else {
      return <p>No image available</p>;
    }
  };

  return (
    <aside className={` ${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center'>
        <h2 className="font-medium text-xl">Detail</h2>
        <div 
          className='p-6'
          onClick={context.closeProductDetail}>
          <XMarkIcon className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
      {renderDetail()}
      {product && (
        <p className='flex flex-col p-6'>
          <span className='font-medium text-2xl'>Nombre: {product.name}</span>
          <span className='font-medium text-md'>Precio: ${product.price}</span>
          <span className='font-light text-sm'>Descripción: {product.detail}</span>
        </p>
      )}
    </aside>
  );
};

export default ProductDetail;
