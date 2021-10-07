const BASE_URL = process.env.REACT_APP_BASE_URL

function GPUCard({ name, onlineAvailability, salePrice, largeImage, url, sku, gpuid, user }) {

    function handleWatchClick(e){
        e.preventDefault()
        const newUserGPU = {user_id: user.id, gpu_id: gpuid}
        fetch(BASE_URL + "/usergpus/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserGPU),
          })
            .then((r) => r.json())
            // .then(console.log("watching gpu"));

    }
  return (
    <div className="col-12">
      <div className="m-5">
        <h5 className=""><a href={url}>{name}</a></h5>
        {/* <p>Debug - gpu id: {gpuid}</p> */}
        <img src={largeImage} alt={name}></img>
        {onlineAvailability ? <p>Available!</p> : <p>Unavailable</p>}
        <p>Price: {salePrice}</p>
        <button className="btn" onClick={handleWatchClick}>Watch</button>
      </div>
    </div>
  );
}
export default GPUCard;
