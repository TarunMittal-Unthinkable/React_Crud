import React, { useState,useEffect } from "react";
import axios from "axios";
import "./Category.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Modal({ isOpen, onClose,onBrandAdded,productId }) {
  const token = localStorage.getItem("Authorization");
  const navigate = useNavigate();

  const handleSave = async (event) => {
    event.preventDefault();
    console.log(productId);
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    data.productId=productId;
    data.priceperquantity=parseFloat(data.priceperquantity);
    data.totalSold=parseInt(data.totalSold);
    data.totalQty=parseInt(data.totalQty);

    try {
      await axios.post("http://localhost:3000/api/category", data,
        {
          headers: {
            Authorization: `${token}`,
          }
        }
      );
       toast.success("Category Created Successfully");
        onClose();
        onBrandAdded();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized access. Invalid Token/Token Expired');
        localStorage.removeItem("Authorization");
        navigate('/login');
        
      } else {
        toast.error(error.response?.data?.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSave} className="form">
    <div className="modal">
    <div className="modal-content">
      <h2>Add Category</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"

        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="size">Size:</label>
        <input
          id="size"
          type="text"
          name="sizes"
        />
      </div>
      <div className="form-group">
        <label htmlFor="color">Color:</label>
        <input
          id="color"
          type="text"
          name="colors"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          name="priceperquantity"
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          type="number"
          name="totalQty"
        />
      </div>
      <div className="form-group">
        <label htmlFor="sold">Sold:</label>
        <input
          id="sold"
          type="number"
          name="totalSold"
        />
      </div>
      <div className="button-container">
        <button type="submit" className="save">Save</button>
        <button className="cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
  </form>
  );
}

export default Modal;
