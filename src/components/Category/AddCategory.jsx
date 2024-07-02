import React, { useState,useEffect } from "react";
import axios from "axios";
import "./Category.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./CategoryForm.jsx";
import constant from "../../utils/constant";
import endpoint from "../../utils/endpoint";

function Modal({ isOpen, onClose,onBrandAdded,productId }) {
  const token = localStorage.getItem("Authorization");
  const navigate = useNavigate();
  const BASE_URL= import.meta.env.VITE_BASE_URL;
  const handleSave = async (data) => {
    data.productId=productId;
    data.priceperquantity=parseFloat(data.priceperquantity);
    data.totalSold=parseInt(data.totalSold);
    data.totalQty=parseInt(data.totalQty);

    try {
      await axios.post(`${BASE_URL}/${endpoint.CATEGORY}`, data,
        {
          headers: {
            Authorization: `${token}`,
          }
        }
      );
       toast.success(constant.CATEGORY_CREATED);
        onClose();
        onBrandAdded();
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

  if (!isOpen) return null;

  return (
    <CategoryForm isedit={false} handleAction={handleSave} onClose={onClose} initialValues={null} />
  );
}

export default Modal;
