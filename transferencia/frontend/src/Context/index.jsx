import { createContext, useState, useEffect} from "react";


export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {

    //Shopping Cart - Increment quantity  
    const [count, setCount] = useState(0);

    //Product Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);


    //Shopping Cart - Open/Close
    const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
    const openShoppingCart = () => setIsShoppingCartOpen(true);
    const closeShoppingCart = () => setIsShoppingCartOpen(false);

    //Product Detail - Show product
    const [productToShow, setProductToShow] = useState({});


    //Shopping Cart - Add Products to cart
    const [cartProducts, setCartProducts] = useState([]);


    //Shopping Cart - Order
    const [order, setOrder] = useState([]);

    //Get Products
    const [items, setItems] = useState(null);
    const [products, setProducts] = useState(null);

    //Search Product - Home
    const [searchByName, setSearchByName] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    const [searchByCategory, setSearchByCategory] = useState(null);

        useEffect(() => {
            fetch('https://29cu776ppk.execute-api.us-east-1.amazonaws.com/products')
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
            })}, [])


    const filterBy = (searchType, items, searchByName, searchByCategory) => {
        if (searchType === 'BY_NAME'){
            return fliteredItemsByName(items, searchByName);
        } 
        if (searchType === 'BY_CATEGORY'){
            return fliteredItemsByCategory(items, searchByCategory);
        } 
        
        if (searchType === 'BY_NAME_AND_BY_CATEGORY'){
            return fliteredItemsByCategory(items, searchByCategory).filter(item =>item.name.toLowerCase().includes(searchByname.toLowerCase()));
        } 

        if (!searchType){
            return items;
        } 
    }

    const fliteredItemsByName = (items, searchByName) => {
        return items?.filter(item => item.name.toLowerCase().includes(searchByName.toLowerCase()) )
    }


    const fliteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()) )
    }

    useEffect(() => {
        if (searchByName && !searchByCategory) setFilteredItems(filterBy('BY_NAME', items, searchByName, searchByCategory));
        if (searchByCategory && !searchByName) setFilteredItems(filterBy('BY_CATEGORY', items, searchByName, searchByCategory));
        if (!searchByCategory && !searchByName) setFilteredItems(filterBy(null, items, searchByName, searchByCategory));
        if (searchByCategory && searchByName) setFilteredItems(filterBy('BY_NAME_AND_BY_CATEGORY', items, searchByName, searchByCategory));
    },[items, searchByName, searchByCategory]);

    return (

        <ShoppingCartContext.Provider value={{
            count, setCount,
            isProductDetailOpen, setIsProductDetailOpen,
            openProductDetail, closeProductDetail,
            productToShow, setProductToShow,
            cartProducts, setCartProducts,
            isShoppingCartOpen, setIsShoppingCartOpen,
            openShoppingCart, closeShoppingCart,
            order, setOrder,
            items, setItems,
            searchByName, setSearchByName,
            filteredItems, setFilteredItems,
            searchByCategory, setSearchByCategory,
            products, setProducts
            }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}