import { useContext } from "react";
import Layout from "../../Comoponentes/Layout"
import { ShoppingCartContext } from "../../Context";
import OrdersCard from "../../Comoponentes/OrdersCard";
import { Link } from "react-router-dom";


function MyOrders() {
  const context = useContext(ShoppingCartContext);


    return (
      <Layout>
          <h1 className="font-medium mb-4 text-xl">MyOrders</h1>
        {
          context.order.map((order, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
                <OrdersCard 
                totalPrice={order.totalPrice}
                totalProducts={order.totalProducts } />
            </Link>)
          )
        }
      </Layout>
    )
  }
  
  export default MyOrders
  