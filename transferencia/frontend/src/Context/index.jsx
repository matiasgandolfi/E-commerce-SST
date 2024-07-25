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

    //Search Product - Home
    const [searchByTitle, setSearchByTitle] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    const [searchByCategory, setSearchByCategory] = useState(null);
    
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => response.json())
            .then(data => {
            setItems(data)
        })}, [])


    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE'){
            return fliteredItemsByTitle(items, searchByTitle);
        } 
        if (searchType === 'BY_CATEGORY'){
            return fliteredItemsByCategory(items, searchByCategory);
        } 
        
        if (searchType === 'BY_TITLE_AND_BY_CATEGORY'){
            return fliteredItemsByCategory(items, searchByCategory).filter(item =>item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
        } 

        if (!searchType){
            return items;
        } 
    }

    const fliteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()) )
    }


    const fliteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()) )
    }

    useEffect(() => {
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory));
        if (searchByCategory && !searchByTitle) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory));
        if (!searchByCategory && !searchByTitle) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
        if (searchByCategory && searchByTitle) setFilteredItems(filterBy('BY_TITLE_AND_BY_CATEGORY', items, searchByTitle, searchByCategory));
    },[items, searchByTitle, searchByCategory]);

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
            searchByTitle, setSearchByTitle,
            filteredItems, setFilteredItems,
            searchByCategory, setSearchByCategory
            }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}