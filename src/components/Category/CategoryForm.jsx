import React, { useState, useEffect } from 'react';
import "./Category.css";

function CategoryForm(props) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sizes: '',
    colors: '',
    priceperquantity: '',
    totalQty: '',
    totalSold: ''
  });
  useEffect(() => {
    if (props.isedit && props.initialValues) {
      setFormData(props.initialValues);
    }
  }, [props.isedit, props.initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData",formData);
    props.handleAction(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="modal">
        <div className="modal-content">
          <h2>{props.isedit ? "Update Category" : "Add Category"}</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="size">Size:</label>
            <input
              id="size"
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="color">Color:</label>
            <input
              id="color"
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              name="priceperquantity"
              value={formData.priceperquantity}
              onChange={handleChange}
              required
            />        
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              name="totalQty"
              value={formData.totalQty}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sold">Sold:</label>
            <input
              id="sold"
              type="number"
              name="totalSold"
              value={formData.totalSold}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="save">{props.isedit ? "Update" : "Save"}</button>
            <button type="button" className="cancel" onClick={props.onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </form>
  );
  }
 
export default CategoryForm;