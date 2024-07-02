import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Category.css";
import { ToastContainer,toast } from "react-toastify";
import Modal from './AddCategory.jsx'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Card from './CategoryCard.jsx'
import { debounce } from 'lodash';
import endpoint from "../../utils/endpoint";
import constant from "../../utils/constant";
import Loader from '../Loader/Loader.jsx';
import DynamicBreadcrumbs from "../BreadCrumb/BreadCrumb";

function ProductList() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("Authorization");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const navigate= useNavigate()
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const BASE_URL= import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);

  function useQuery() {
    return new URLSearchParams(location.search);
  }
  let query = useQuery();
  let id = query.get('productId');
// console.log("productId",id);
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
          `${BASE_URL}/${endpoint.CATEGORY}`,
          {
            headers: {
              Authorization: `${token}`,
            },
            params: { page, limit, search,productId:id }
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
  }, [token, page, limit, debouncedSearch,refresh]);
  const refreshBrands = () => {
    setRefresh(true);
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

  return (
    <div>
      <ToastContainer />
    {loading ? (
      <Loader />
    ) :(
    <div className="brand-records-container">
       <DynamicBreadcrumbs />
      <h3>Your Category Records</h3>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search records"
        />
       <button onClick={handleAddBrandClick}> Add Category </button>
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBrandAdded={refreshBrands} productId={Number(id)}/>
      </div>
      <div className="wrapper">
        {(records?.length !==0)?
        (records.map((record) => (
            
            <Card
                key={record.id}
                img="https://thumbs.dreamstime.com/b/blue-jeans-isolated-white-34440719.jpg"
                title={record.name}
                description={record.description}
                price={record.priceperquantity}
                {...record}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onBrandAdded={refreshBrands}
                    />
                     
          ))):
      <div>
      <h2>No Category Exist for Product. Please Create Category</h2>
    </div>
}
</div>
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
