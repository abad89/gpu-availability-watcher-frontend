const BASE_URL = process.env.REACT_APP_BASE_URL;

function MyGPUCard({ onDeleteGpu, name, onlineAvailability, salePrice, largeImage, url, sku, user, gpuid, watchid }) {

function handleStopWatchingClick(e){
    e.preventDefault()
    fetch(BASE_URL + `/users/${user.id}/usergpus/${watchid}`, {
        method: "DELETE",
    })
    .then(() => onDeleteGpu(watchid))

}

    return (
      <div className="col-12">
        <h4><a href={url}>{name}</a></h4>
        <img src={largeImage} alt={name}></img>
        {onlineAvailability ? <p>Available</p> : <p>Unavailable</p>}
        <p>Price: {salePrice}</p>
        {/* <p>{sku}</p> */}
        <button onClick={handleStopWatchingClick}>Stop Watching</button>
      </div>
    );
  }
  export default MyGPUCard;
  