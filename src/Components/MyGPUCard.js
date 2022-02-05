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
      <div className="col-lg-4 col-sm-12">
        <div className="card text-center">
          <p><a href={url}>{name}</a></p>
          <img className="card-img-top" src={largeImage} alt={name}></img>
          {onlineAvailability ? <p>Available</p> : <p>Unavailable</p>}
          <p>Price: {salePrice}</p>
          {/* <p>{sku}</p> */}
          <button onClick={handleStopWatchingClick}>Stop Watching</button>
        </div>
      </div>
    );
  }
  export default MyGPUCard;
  