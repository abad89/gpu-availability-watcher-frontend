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
    <div className="col-lg-4 col-sm-12" style={{ padding: 25 }}>
      <div className="card text-center">
      <p className=""><a href={url}>{name}</a></p>
      {/* <p>Debug - gpu id: {gpuid}</p> */}
      <img className="card-img-top" src={largeImage} alt={name}></img>
      {onlineAvailability ? <p className="bg-success text-primary">Available!</p> : <p className="bg-secondary text-warning">Unavailable</p>}
      <p>Price: {salePrice}</p>
      {/* <button className="btn" onClick={handleWatchClick}>Watch</button> */}
      </div>
    </div>
  );
}
export default GPUCard;
