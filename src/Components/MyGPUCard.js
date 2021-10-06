const BASE_URL = process.env.REACT_APP_BASE_URL;

function MyGPUCard({ onDeleteGpu, name, onlineAvailability, salePrice, largeImage, url, sku, user, gpuid, watchid }) {

function handleStopWatchingClick(e){
    e.preventDefault()
    fetch(BASE_URL + `/users/${user.id}/usergpus/${watchid}`, {
        method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => onDeleteGpu(watchid))

}

    return (
      <div>
        <h1><a href={url}>{name}</a></h1>
        <img src={largeImage} alt={name}></img>
        <p>{onlineAvailability}</p>
        <p>Price: {salePrice}</p>
        {/* <p>{sku}</p> */}
        <button onClick={handleStopWatchingClick}>Stop Watching</button>
      </div>
    );
  }
  export default MyGPUCard;
  