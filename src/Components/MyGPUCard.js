function MyGPUCard({ name, onlineAvailability, salePrice, largeImage, url, sku, user }) {
    return (
      <div>
        <h1><a href={url}>{name}</a></h1>
        <img src={largeImage} alt={name}></img>
        <p>{onlineAvailability}</p>
        <p>Price: {salePrice}</p>
        <p>{sku}</p>
      </div>
    );
  }
  export default MyGPUCard;
  