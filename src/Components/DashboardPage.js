import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyGPUCard from "./MyGPUCard";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function DashboardPage({ user }) {
  const [myGpuList, setMyGpuList] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + `/users/${user.id}/gpus`)
      .then((r) => r.json())
      .then(setMyGpuList);
  }, []);

  const gpusItem = myGpuList.map((gpu) => (
    <MyGPUCard
      key={gpu.id}
      name={gpu.name}
      largeImage={gpu.largeImage}
      salePrice={gpu.salePrice}
      onlineAvailability={gpu.onlineAvailability}
      url={gpu.url}
      sku={gpu.sku}
    />
  ));
  console.log(myGpuList);
  console.log("dashboard log", user);
  return (
    <div>
        <p>Current user: {user.email}</p>
      <Link
        to={{
          pathname: "/gpus",
        }}
      >
        View GPU Database
      </Link>
      <h1>Your watched GPUs:</h1>
      {gpusItem}
    </div>
  );
}
