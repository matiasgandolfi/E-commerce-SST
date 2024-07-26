import Layout from "../../Comoponentes/Layout";
import ProductDetail from "../../Comoponentes/ProductDetail";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import Card from "../../Comoponentes/Card";

function Home() {
  const context = useContext(ShoppingCartContext);


    console.log("Esta pagina es Home");
    const renderView = () => {
      if (context.products?.length > 0){
          return(
            context.products?.map(item => (
              <Card key={item.sk} data={item}/>
            ))
          )
        }
        else{
          return(
            <h2>We don't have anything</h2>
          )
        }
      }  

    if (context.products) {
      const products = context.products;
    }


    return (
      <>
        <Layout>
          <div className="flex items-center justify-center relative w-80 mb-4">
            <h1 className="font-medium mb-4 text-xl">Exclsuive Products</h1>
          </div>
          <input 
          type="text" 
          placeholder="Search a product"
          className="rounded-lg border border-black w-80 p-4 mb-4"
          onChange={(event) => context.setSearchByName(event.target.value)

          }
          />

          <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">

            {renderView()}
          </div>
          <ProductDetail />
        </Layout>
      
      </>
    )
  }
  export default Home
  