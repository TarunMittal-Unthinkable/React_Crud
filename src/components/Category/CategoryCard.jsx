
  function Card(props) {
    return (
      <div className="card">
        <img src={props.img} className="card__img" />
        <div className="card__body">
          <h2 className="card__title">{props.title}</h2>
          <p className="card__description">{props.description}</p>
          <h3 className="card__price">{props.price}</h3>
          <button className="card__btn">Add to Cart</button>
        </div>
      </div>
    );
  }
  
export default Card
  