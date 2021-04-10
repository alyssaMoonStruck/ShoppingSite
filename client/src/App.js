import React, { useEffect,useState } from 'react'
import NetworkManager from './NetworkManager';

function App() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    let instance = NetworkManager.createManager()
    instance.get("/product").then(res => {
      setProducts(res.data.data)
    })
    // let newcart = {
    //   productId: "606a51b8ce71232b0702a25a",
    //   quantity: 5,
    //   price: '2.00',
    //   total: '10.00'
    // }

    // instance.post("/cart", newcart).then(res => {
    //   console.log(res.data)
    // })
    
  }, [])
  return (
    <div className="App">
        <p>Shopping Site</p>
        <ul>
          {products ? products.map(item => <li>{item.name}</li>) : "Loading Items"}
        </ul>
        
    </div>
  );
}

export default App;
