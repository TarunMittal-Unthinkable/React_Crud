import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BrandList.css";
import { ToastContainer,toast } from "react-toastify";
import Modal from './AddBrand.jsx'
import { useNavigate, Link } from "react-router-dom";

function BrandList() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // You can make this dynamic if needed
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [editing, setEditing] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});
  const token = localStorage.getItem("Authorization");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/brand",
          {
            headers: {
              Authorization: `${token}`,
            },
            params: { page, limit, search },
          }
        );
        setRecords(response?.data?.data.records|| []);
        setTotalPages(response?.data?.data?.pages || 1);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    };
    if (token) {
      fetchRecords();
      setRefresh(false);
    }
  }, [token, page, limit, search,refresh]);

  const handleCancel = () => {
    setEditing(null)
  };

  const handleEdit = (record) => {
    console.log("",record);
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
        `http://localhost:3000/api/brand/${editedRecord.id}`,
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
      toast.success("Record updated successfully!");
    } catch (error) {
      console.error("Failed to update the record:", error);
      toast.error("Failed to update the record.");
    }
  };

  const handleDelete = async (recordId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/brand/${recordId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setRecords(records.filter((record) => record.id !== recordId));
      toast.success("Record deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the record:", error);
      toast.error("Failed to delete the record.");
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


  return (
    <div className="brand-records-container">
      <ToastContainer />
      <h3>Your brand Records</h3>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search records"
        />
       <button onClick={handleAddBrandClick}> Add Brand </button>
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBrandAdded={refreshBrands} />
      </div>
      <table className="brand-records-table">
        <thead>
          <tr>
          <th>Brand Code</th>
            <th>Brand Name</th>
            <th>Brand Description</th>
            <th>Creation Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
              <Link to={`/productlist?id=${record.id}`}>{
                  record.brandcode
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
      </table>
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

export default BrandList;
