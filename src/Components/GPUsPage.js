import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import GPUCard from "./GPUCard";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function GPUsPage({ user }) {
  console.log("Gpus page user:", user)
  const [gpuList, setGpuList] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + "/gpus")
      .then((r) => r.json())
      .then(setGpuList);
  }, []);

  let activeGPUS = gpuList.filter(function (gpu) {
    return gpu.url != null;
  });

  const gpusItem = activeGPUS.map((gpu) => (
    <GPUCard
      key={gpu.id}
      name={gpu.name}
      largeImage={gpu.largeImage}
      salePrice={gpu.salePrice}
      onlineAvailability={gpu.onlineAvailability}
      url={gpu.url}
      sku={gpu.sku}
    />
  ));

  return (
    <div>
      <p>Current user: {user.email}</p>
      <Link
        to={{
          pathname: "/dashboard",
        }}
      >
        Return to Dashboard
      </Link>
      {gpusItem}
    </div>
  );
}
