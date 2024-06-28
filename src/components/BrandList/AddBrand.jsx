import React, { useState,useEffect } from "react";
import axios from "axios";
import "./BrandList.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import constant from "../../utils/constant";
import endpoint from "../../utils/endpoint";


function Modal({ isOpen, onClose,onBrandAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem("Authorization");
  const navigate = useNavigate();

  const handleSave = async () => {

    const data = { name, description };

    try {
      const response = await axios.post(
        `http://localhost:3000/${endpoint.BRAND}`, data,
        {
          headers: {
            Authorization: `${token}`,
          }
        }
      );
       toast.success(constant.BRAND_CREATED);
        setName(''); 
        setDescription('');
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

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setDescription('');
    }
  }, [isOpen]);

  if (!isOpen) return null;


  return (

    <div className="modal">
    <div className="modal-content">
      <h2>Add Brand</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="button-container">
        <button className="save" onClick={handleSave}>Save</button>
        <button className="cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
  );
}

export default Modal;
