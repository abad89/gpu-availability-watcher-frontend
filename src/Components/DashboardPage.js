import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import MyGPUCard from "./MyGPUCard";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function DashboardPage({ user, onLogOut }) {
  const [myGpuList, setMyGpuList] = useState([]);

  useEffect(() => {
    if (user != null) {
      fetch(BASE_URL + `/users/${user.id}/usergpus`)
        .then((r) => r.json())
        .then(setMyGpuList);
    }
  }, []);
  console.log(myGpuList)

  function handleDeleteGpu(gpuToDelete) {
    const updatedMyGpuList = myGpuList.filter(
      (gpu) => gpu.id !== gpuToDelete
    );
    setMyGpuList(updatedMyGpuList);
  }

  const gpusItem = myGpuList.map(watch => (
    <MyGPUCard
      key={watch.gpu.id}
      watchid={watch.id}
      gpuid={watch.gpu.id}
      name={watch.gpu.name}
      largeImage={watch.gpu.largeImage}
      salePrice={watch.gpu.salePrice}
      onlineAvailability={watch.gpu.onlineAvailability}
      url={watch.gpu.url}
      sku={watch.gpu.sku}
      user={user}
      onDeleteGpu={handleDeleteGpu}
    />
  ));
  console.log("dashboard gpu list:", myGpuList);
  console.log("dashboard log", user);
  return (
    <div>
      {user ? <p>Current user: {user.email}</p> : <Redirect to="/" />}
      <button onClick={onLogOut}>Logout</button>
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
