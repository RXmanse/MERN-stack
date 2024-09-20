import React, { useContext, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import BlogContext from "../content/blogs/BlogContext";
import EditProduct from "./EditProduct";

const Card = () => {
  const context = useContext(BlogContext);
  const {
    state: { products, cart },
    dispatch,
    allProduct,
    product,
  } = context;
  const [menuVisible, setMenuVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  console.log("These are my product(s): ", products);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }
  const openEditModal = () => {
    setModalVisible(true)
  }
  const closeEditModal = () => {
    setModalVisible(false)
  }
  const saveEdit = (updateData) => {
    editProduct(_id, updateData)
    closeEditModal()
  }

  useEffect(() => {
    allProduct();
  }, []);

  return (
    <div className="container">
      <h4 className="news-heading">Our News!</h4>
      <div className="row">
        {product &&
          product.map((el) => {
            return (
              <div className="col-md-3">
                <div className="card" key={el.id}>
                  <img
                    src={`https://localhost:5000/uploads/${e.images[0]}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <div className="three-dots">
                      <h5 className="card-title">{el.title}</h5>
                      <BsThreeDots onClick={toggleMenu}/>
                      {
                        menuVisible && (
                          <div className="menu-options">
                            <button onClick={openEditModal}>Edit</button>
                            <button onClick={() => deleteWork(_id)}>Delete</button>
                          </div>
                        )
                      }
                    </div>
                    <p className="card-text">Rs {el.price}</p>
                    {cart && cart.some((p) => p._id === el._id) ? (
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: el,
                          })
                        }
                      >
                        Remove from cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          dispatch({
                            type: "ADD_TO_CART",
                            payload: el,
                          })
                        }
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
            {modalVisible && (
              <EditProduct
              product = {props.product}
              onClose={closeEditModal}
              onSave={saveEdit}
              />
            )}
          })}
      </div>
    </div>
  );
};
{
  /* <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <img src={coffee} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <img src={coffee} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <img src={coffee} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <img src={coffee} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="https://www.facebook.com/" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div> */
}
export default Card;
