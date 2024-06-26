
function toggleMenu(id) {
  const menu = document.getElementById(`menu-${id}`);
  if (menu.style.display === "block") {
      menu.style.display = "none";
  } else {
      menu.style.display = "block";
  }
}

// function handleEdit(id) {
//   // Implement edit functionality
//   console.log(`Edit ${id}`);
// }



const handleEdit = async(props) => {
  try {
    const {name,description,price,totalQty,totalSold,colors,sizes} = props
    const response = await axios.put(
      `http://localhost:3000/api/category/${id}`,
      {name:name,
      description:description,
      totalQty:totalQty,
      totalSold:totalSold,
      colors:colors,
      sizes:sizes,
      priceperquantity:price
    },
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
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized access. Invalid Token/Token Expired');
      localStorage.removeItem("Authorization");
      navigate('/login');
      
    } else {
      toast.error(error.response?.data?.message);
    }
  }
};








// function handleDelete(id) {
//   // Implement delete functionality
//   console.log(`Delete ${id}`);
// }

  function Card(props) {

    return (
      <div className="card">
      <div className="card__img-wrapper">
          <img src={props.img} className="card__img" />
          <div className="card__menu">
              <button className="card__menu-btn" onClick={() => toggleMenu(props.id)}>⋮</button>
              <div className="card__menu-content" id={`menu-${props.id}`}>
                  <button onClick={() => handleEdit(props)}>Edit</button>
                  <button onClick={() => handleDelete(props)}>Delete</button>
              </div>
          </div>
      </div>
        <div className="card__body">
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
  
export default Card
  

