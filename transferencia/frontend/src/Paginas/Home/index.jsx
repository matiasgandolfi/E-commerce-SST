import Layout from "../../Comoponentes/Layout";
import Card from "../../Comoponentes/Card";
import ProductDetail from "../../Comoponentes/ProductDetail";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.filteredItems?.length > 0){
        return(
          context.filteredItems?.map(item => (
            <Card key={item.id} data={item}/>
          ))
        )
      }
      else{
        return(
          <h2>We don't have anything</h2>
        )
      }
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
          onChange={(event) => context.setSearchByTitle(event.target.value)

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
  