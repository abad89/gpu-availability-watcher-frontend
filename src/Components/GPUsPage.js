import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom"
import GPUCard from "./GPUCard";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function GPUsPage({ user, loggedIn }) {
  // console.log("Gpus page user:", user)
  const [gpuList, setGpuList] = useState([]);
  const [filterGPUs, setFilterGPUs] = useState(false);

  useEffect(() => {
    fetch(BASE_URL + "/gpus")
      .then((r) => r.json())
      .then(gpus => {
        setGpuList(gpus.filter(function (gpu) {
          return gpu.url != null;
        }))
      });
  }, []);

  const gpusItem = gpuList.filter(function(gpu) {
    if (!filterGPUs) {return true}
    if (gpu.onlineAvailability) {return true}
    return false
  }).map((gpu) => (
    <GPUCard
      key={gpu.id}
      gpuid={gpu.id}
      name={gpu.name}
      largeImage={gpu.largeImage}
      salePrice={gpu.salePrice}
      onlineAvailability={gpu.onlineAvailability}
      url={gpu.url}
      sku={gpu.sku}
      user={user}
    />
  ));
  
  function handleToggleFilterClick(){
    setFilterGPUs((filterGPUs) => !filterGPUs)
  }

  return (
    <div>
      {/* <p>Current user: {user.email}</p> */}
      {loggedIn ? null : <Redirect to="/" />}
      <Link
        to={{
          pathname: "/dashboard",
        }}
      >
        Return to Dashboard
      </Link>
      {filterGPUs ? null : <button onClick={handleToggleFilterClick}>Hide Unavailable GPUs</button>}
      {filterGPUs ? <button onClick={handleToggleFilterClick}>Show All GPUs</button> : null}
      <div className="container">
        <div className="d-flex row p6">
          {gpusItem}
        </div>
      </div>
    </div>
  );
}
