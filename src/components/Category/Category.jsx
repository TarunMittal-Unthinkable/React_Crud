import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Category.css";
import { ToastContainer,toast } from "react-toastify";
//import Modal from './AddCategory.jsx'
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Card from './CategoryCard.jsx'

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

  function useQuery() {
    return new URLSearchParams(location.search);
  }
  let query = useQuery();
  let id = query.get('productId');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        
        const response = await axios.get(
          "http://localhost:3000/api/category",
          {
            headers: {
              Authorization: `${token}`,
            },
            params: { page, limit, search,productId:id }
          }
        );
        setRecords(response?.data?.data|| []);
        setTotalPages(response?.data?.pages || 1);
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
    if (token) {
      fetchRecords();
      setRefresh(false);
    }
  }, [token, page, limit, search,refresh]);

//   const handleCancel = () => {
//     setEditing(null)
//   };

//   const handleEdit = (record) => {
//     setEditing(record.id);
//     setEditedRecord({ ...record });
//   };

//   const handleChange = (e, field) => {
//     setEditedRecord((prev) => ({ ...prev, [field]: e.target.value }));
//   };
//   const refreshBrands = () => {
//     setRefresh(true);
//   };


//   const handleSave = async () => {
//     try {
//        // debugger;
//       const response = await axios.put(
//         `http://localhost:3000/api/product/${editedRecord.id}`,
//         {name:editedRecord.name,
//         description:editedRecord.description},
//         {
//           headers: {
//             Authorization: `${token}`,
//           },
//         }
//       );
//       setRecords(
//         records.map((rec) =>
//           rec.id === editedRecord.id ? { ...rec, ...editedRecord } : rec
//         )
//       );
//       setEditing(null);
//       toast.success("Record updated successfully!");
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         toast.error('Unauthorized access. Invalid Token/Token Expired');
//         localStorage.removeItem("Authorization");
//         navigate('/login');
        
//       } else {
//         toast.error(error.response?.data?.message);
//       }
//     }
//   };

//   const handleDelete = async (recordId) => {
//     try {
//       await axios.delete(
//         `http://localhost:3000/api/product/${recordId}`,
//         {
//           headers: {
//             Authorization: `${token}`,
//           },
//         }
//       );
//       setRecords(records.filter((record) => record.id !== recordId));
//       toast.success("Record deleted successfully!");
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         toast.error('Unauthorized access. Invalid Token/Token Expired');
//         localStorage.removeItem("Authorization");
//         navigate('/login');
        
//       } else {
//         toast.error(error.response?.data?.message);
//       }
//     }
//   };

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

console.log(records);
  return (
    <div className="brand-records-container">
      <ToastContainer />
      <h3>Your Category Records</h3>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search records"
        />
       <button onClick={handleAddBrandClick}> Add Category </button>
       {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBrandAdded={refreshBrands} productId={Number(id)}/> */}
      </div>
     
        {(records?.length !==0)?
        (records.map((record) => (
            <div className="wrapper">
            <Card
                img="https://images.unsplash.com/photo-1569235080412-01b4eefa5fbe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                title={record.name}
                description={record.description}
                price={record.priceperquantity}
                    />
                     </div>
          ))):
      <div>
      <h2>No Category Exist for Product. Please Create Category</h2>
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
  );
}

export default ProductList;
