import { useReducer, useState } from "react";
import BlogContext from "./BlogContext";
import CartReducers from "../Reducers";

export default function BlogState(props) {

  const products = [
    {
      "id": "111as",
      "title": "coffee",
      "description": "Himalayan coffee from Nepal",
      "price": 150,
      "stock": 5
    },
    {
      "id": "112as",
      "title": "tea",
      "description": "Himalayan tea from Nepal",
      "price": 200,
      "stock": 3
    },
  ]

const [state, dispatch] = useReducer(CartReducers,
  {
    products: products,
    cart: []
  }

)
const [product, setProduct] = useState(["mango", "orange"])

console.log("this is our product from backend",product);

  const allProduct = async()=>{
    const  response= await  fetch("http://localhost:5000/api/product/getallproduct",{
        method : "GET",
        headers:{
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        }
    })
    let parseData= await response.json()
    console.log(parseData);
    setProduct(parseData)
  }


  return (
    <BlogContext.Provider value={{ state, dispatch, allProduct }}>
      {props.children}
    </BlogContext.Provider>
  );
}
