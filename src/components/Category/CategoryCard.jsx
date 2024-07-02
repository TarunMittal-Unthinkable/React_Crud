import React, { useState } from 'react';
import CategoryForm from './CategoryForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import constant from '../../utils/constant';
import endpoint from '../../utils/endpoint';
import { useNavigate } from "react-router-dom";

function Card(props) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("Authorization");
  const navigate= useNavigate()
  const BASE_URL= import.meta.env.VITE_BASE_URL;

  const toggleMenu = (id) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = (props) => {
    const data = {
      name: props.name,
      description: props.description,
      sizes: props.sizes,
      colors: props.colors,
      priceperquantity: props.priceperquantity,
      totalQty: props.totalQty,
      totalSold: props.totalSold
    };
    setEditData(data);
    setIsFormVisible(true);
    setIsMenuOpen(false);
  };

  const handleSave = async (data) => {
    data.priceperquantity = parseFloat(data.priceperquantity);
    data.totalSold = parseInt(data.totalSold);
    data.totalQty = parseInt(data.totalQty);
    try {
      await axios.put(
        `${BASE_URL}/${endpoint.CATEGORY}/${props.id}`,
        data,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success(constant.CATEGORY_UPDATED);
      handleCloseForm();
      props.onBrandAdded();
    } catch (error) {
      if (error.response && error.response.status === constant.UNAUTHORIZED_STATUS) {
        toast.error(constant.UNAUTHORIZED_ACCESS);
        localStorage.removeItem("Authorization");
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/${endpoint.CATEGORY}/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success(constant.CATEGORY_DELETED);
      props.onBrandAdded();
    } catch (error) {
      if (error.response && error.response.status === constant.UNAUTHORIZED_STATUS) {
        localStorage.removeItem("Authorization");
        navigate('/login');
        toast.error(constant.UNAUTHORIZED_ACCESS);
        
      } else {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditData(null);
  };

  return (
    <div className="card">
      <div className="card__img-wrapper">
        <img src={props.img} className="card__img" />
        <div className="card__menu">
          <button className="card__menu-btn" onClick={() =>toggleMenu(props.id)}>⋮</button>
          {isMenuOpen && (
            <div className="card__menu-content" id={`menu-${props.id}`}>
              <button onClick={() => handleEdit(props)}>Edit</button>
              <button onClick={() => handleDelete(props.id)}>Delete</button>
            </div>
          )}
        </div>
        {isFormVisible && (
          <div className="form-overlay">
            <CategoryForm
              isedit={true}
              handleAction={handleSave}
              onClose={handleCloseForm}
              initialValues={editData}
            />
          </div>
        )}
      </div>
      <div className="card__body">
      <h3 className="card__color"><span>Category Code:</span> {props.categorycode}</h3>
        <h2 className="card__title">{props.title}</h2>
        <p className="card__description">{props.description}</p>
        <div className="card__info">
          <h3 className="card__color"><span>Color:</span> {props.colors}</h3>
          <h3 className="card__size"><span>Size:</span> {props.sizes}</h3>
        </div>
        <div className="card__info">
          <h3 className="card__totalqty"><span>Quantity:</span> {props.totalQty}</h3>
          <h3 className="card__totalsold"><span>Sold:</span> {props.totalSold}</h3>
        </div>
        <h3 className="card__price">Rs {props.price}</h3>
      </div>
    </div>
  );
}

export default Card;
