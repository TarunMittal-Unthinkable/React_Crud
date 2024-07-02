import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.css";
import { ToastContainer,toast } from "react-toastify";
import Modal from './AddProduct.jsx'
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import constant from "../../utils/constant";
import endpoint from "../../utils/endpoint";
import Loader from '../Loader/Loader.jsx';
import DynamicBreadcrumbs from "../BreadCrumb/BreadCrumb";

function ProductList() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});
  const token = localStorage.getItem("Authorization");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const navigate= useNavigate()
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const BASE_URL= import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  function useQuery() {
    return new URLSearchParams(location.search);
  }
  let query = useQuery();
  let id = query.get('brandId');

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearch(search);
    }, 800); 
    handler();

    // Cleanup function
    return () => {
      handler.cancel();
    };
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/${endpoint.PRODUCT}`,
          {
            headers: {
              Authorization: `${token}`,
            },
            params: { page, limit, search,brandId:id,sortField, sortOrder }
          }
        );
        setTimeout(() => {
          setRecords(response?.data?.data?.records || []);
          setTotalPages(response?.data?.data?.pages || 1);
          setLoading(false);
        }, 200);
      } catch (error) {
        if (error.response && error.response.status === constant.UNAUTHORIZED_STATUS) {
          toast.error(constant.UNAUTHORIZED_ACCESS);
          localStorage.removeItem("Authorization");
          navigate('/login');
          
        } else {
          toast.error(error.response?.data?.message);
        }
        setLoading(false);
      }
    };
    if (token) {
      fetchRecords();
      setRefresh(false);
    }
  }, [token, page, limit, debouncedSearch,refresh,sortField, sortOrder]);

  const handleCancel = () => {
    setEditing(null)
  };

  const handleEdit = (record) => {
    setEditing(record.id);
    setEditedRecord({ ...record });
  };

  const handleChange = (e, field) => {
    setEditedRecord((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const refreshBrands = () => {
    setRefresh(true);
  };


  const handleSave = async () => {
    try {
       // debugger;
      const response = await axios.put(
        `${BASE_URL}/${endpoint.PRODUCT}/${editedRecord.id}`,
        {name:editedRecord.name,
        description:editedRecord.description},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setRecords(
        records.map((rec) =>
          rec.id === editedRecord.id ? { ...rec, ...editedRecord } : rec
        )
      );
      setEditing(null);
      toast.success(constant.PRODUCT_UPDATED);
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

  const handleDelete = async (recordId) => {
    try {
      await axios.delete(
        `${BASE_URL}/${endpoint.PRODUCT}/${recordId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setRecords(records.filter((record) => record.id !== recordId));
      toast.success(constant.PRODUCT_DELETED);
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handleAddBrandClick = () => {
    setIsModalOpen(true);
  };
  const handleSort = (field) => {
    const order = field === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div>
       <ToastContainer />
    {loading ? (
      <Loader />
    ) : (
    <div className="brand-records-container">
     <DynamicBreadcrumbs />
      <h3>Your Product Records</h3>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search records"
        />
       <button onClick={handleAddBrandClick}> Add Product </button>
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBrandAdded={refreshBrands} brandId={Number(id)}/>
      </div>
      {
        (records?.length !==0)?
      <table className="brand-records-table">
        <thead>
                <tr>
                    <th>
                    Product Code
                      <span onClick={() => handleSort('productcode')}>
                        {sortOrder === 'asc' && sortField === 'brandcode' ? '↑' : '↓'}
                      </span>
                    </th>
                    <th>
                    Product Name
                      <span onClick={() => handleSort('name')}>
                        {sortOrder === 'asc' && sortField === 'name' ? '↑' : '↓'}
                      </span>
                    </th>
                    <th>
                    Product Description
                      <span onClick={() => handleSort('description')}>
                        {sortOrder === 'asc' && sortField === 'description' ? '↑' : '↓'}
                      </span>
                    </th>
                    <th>
                    Brand Name
                      <span onClick={() => handleSort('description')}>
                        {sortOrder === 'asc' && sortField === 'description' ? '↑' : '↓'}
                      </span>
                    </th>
                    <th>
                    Product Creation Date
                      <span onClick={() => handleSort('created_at')}>
                        {sortOrder === 'asc' && sortField === 'created_at' ? '↑' : '↓'}
                      </span>
                    </th>
                    <th>Action</th>
                </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
               <td>
              <Link to={`/categorylist?productId=${record.id}`}>{
                  record.productcode
                }</Link>
              
              </td>
              <td>
              {editing === record.id ? (
                  <input
                    type="text"
                    value={editedRecord.name}
                    onChange={(e) => handleChange(e, "name")}
                  />
                ) : (
                  record.name
                )}
              </td>
              <td>
                {editing === record.id ? (
                  <input
                    type="text"
                    value={editedRecord.description}
                    onChange={(e) => handleChange(e, "description")}
                  />
                ) : (
                  record.description
                )}
              </td>
              <td>
                {
                  new Date(record.created_at).toLocaleDateString()
                }
              </td>
              <td>
            {record.brand_name}
              </td>
              <td>
                {editing === record.id ? (
                  <>
                  <button
                    className="save-button"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                  className="cancle-button"
                  onClick={handleCancel}
                >
                  Cancle
                </button>
                </>
                ) : (
                  <>
                    <button
                      className="update-button"
                      onClick={() => handleEdit(record)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>:
      <div>
      <h2>No Product Exist for Brand. Please Create Product</h2>
    </div>
    }
      <div className="pagination-container">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
    )}
    </div>
  );
}

export default ProductList;
