import { NavLink } from "react-router-dom"
import { ShoppingCartContext } from "../../Context"
import { useContext } from "react"
import { ShoppingBagIcon } from "@heroicons/react/24/solid"


const Navbar = () => {
    const activeStyle = "underline underline-offset-4"
    const context = useContext(ShoppingCartContext);


    const shoppingCart = () => {
        console.log('Prueba');
        if(context.isShoppingCartOpen){
            context.setIsShoppingCartOpen(false)         
        } 
        else
        {
            context.setIsShoppingCartOpen(true)
        }
    }
    


    return(
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 text-sm font-light">
            <ul className='flex items-center gap-3'>
                <li className="font-semibold text-lg">
                    <NavLink 
                        to='/'>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/'className={({isActive}) => 
                            isActive ? activeStyle : undefined}
                            onClick={() => context.setSearchByCategory()}>
                        All</NavLink>
                </li>
                <li>
                    <NavLink
                    to='/clothes'
                    onClick={() => context.setSearchByCategory('clothe')}
                    className={({isActive}) => 
                        isActive ? activeStyle : undefined}>Clothes</NavLink>
                </li>
                <li>
                    <NavLink to='/electronics'
                        onClick={() => context.setSearchByCategory('electronic')}
                        className={({isActive}) => 
                        isActive ? activeStyle : undefined}>Electronics</NavLink>
                </li>
                <li>
                    <NavLink to='/furnitures'
                        onClick={() => context.setSearchByCategory('furniture')}
                        className={({isActive}) => 
                        isActive ? activeStyle : undefined}>Furnitures </NavLink>
                </li>
                <li>
                    <NavLink to='/toys'
                        onClick={() => context.setSearchByCategory('toy')}
                        className={({isActive}) => 
                        isActive ? activeStyle : undefined}>Toys</NavLink>
                </li>
                <li>
                    <NavLink to='/others'
                        onClick={() => context.setSearchByCategory('other')}
                        className={({isActive}) => 
                        isActive ? activeStyle : undefined}>Others </NavLink>
                </li>
            </ul>

            <ul className="flex items-center gap-3">
                <li className="text-black/60">
                    teff@pruebas.com
                </li>
                <li>
                    <NavLink to='/my-order'
                        className={({isActive}) => 
                        isActive ? activeStyle : undefined}>MyOrder</NavLink>
                </li>
                <li>
                    <NavLink to='/my-orders'
                        className={({isActive}) => 
                        isActive ? activeStyle : undefined}>MyOrders</NavLink>
                </li>
                <li>
                    <NavLink to='/my-account'>My Account</NavLink>
                </li>
                <li>
                    <NavLink to='/sign-in'>Sign In</NavLink>
                </li>
                <li 
                    className="flex justify-center items-center"
                    onClick={() => shoppingCart()}>
                    <ShoppingBagIcon className="h-6 w-6"/>
                    <div>{context.cartProducts.length}</div>
                </li>
                <li>
                    <NavLink to='/'>Others</NavLink>
                </li>
            </ul>
        </nav>
    )

}

export default Navbar;
