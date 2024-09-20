import React, { useContext } from "react";
import BlogContext from "../content/blogs/BlogContext";
import coffee from "../assets/coffee.jpg";
import { MdDelete } from "react-icons/md";

const Checkout = () => {
  const context = useContext(BlogContext);
  const {
    state: { cart },
    dispatch,
  } = context;

  const total = cart.reduce((acc, el) => acc + el.price * el.qty, 0)

  return (
    <div className="container">
      <h4 className="products-heading">
        {cart.length < 0 ? "Your cart is empty" : "Your cart"}
      </h4>
      <ul className="list-group">
        {cart &&
          cart.map((el) => {
            return (
              <li className="list-group-item" key={el.id}>
                <div className="row">
                  <div className="col-md-2">
                    <img
                      src={coffee}
                      alt={el.title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-2">
                    <h4>Name: {el.title}</h4>
                  </div>
                  <div className="col-md-2">
                    <h4>Price: {el.price}</h4>
                  </div>
                  <div className="col-md-2">
                    <select
                      value={el.qty}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: el.id,
                            qty: e.target.value
                          },
                        })
                      }
                      className="form-control"
                    >
                      {[...Array(el.stock).keys()].map((el) => (
                        <option key={el + 1} value={el + 1}>
                          {el + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: el,
                        })
                      }
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <div className="filter summary">
        <h4>Total products: {cart.length}</h4>
        <h3>Total: {total}</h3>
      </div>
    </div>
  );
};

export default Checkout;

{
  /* <div className="col-md-3">
                <div className="card">
                  <img
                    src={el.urlToImage ? el.urlToImage : coffee}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{el.title}</h5>
                    <p className="card-text">Rs {el.price}</p>
                    <button className="btn btn-warning"
                          onClick={() => dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: el
                            })}>
                            Remove from cart 
                          </button>
                  </div>
                </div>
              </div> */
}
