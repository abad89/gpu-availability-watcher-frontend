import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import MyGPUCard from "./MyGPUCard";
import EditEmailForm from "./EditEmailForm";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function DashboardPage({ user, onLogOut, loggedIn, lastUpdated }) {
  const [myGpuList, setMyGpuList] = useState([]);
  const [hideEditForm, setHideEditForm] = useState(true);

  useEffect(() => {
    if (user != null) {
      fetch(BASE_URL + `/users/${user.id}/usergpus`)
        .then((r) => r.json())
        .then(setMyGpuList);
    }
  }, []);
  // console.log(myGpuList)

  function handleDeleteGpu(gpuToDelete) {
    const updatedMyGpuList = myGpuList.filter(
      (gpu) => gpu.id !== gpuToDelete
    );
    setMyGpuList(updatedMyGpuList);
  }

  function handleEditClick(){
    setHideEditForm((setHideEditForm) => !setHideEditForm)
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
  // console.log("dashboard gpu list:", myGpuList);
  // console.log("dashboard log", user);


  return (
    <div>
      {loggedIn ? null : <Redirect to="/" />}
      <div>
        {loggedIn ? <p>Welcome back, {user.email}<button onClick={handleEditClick}>Edit Email</button></p> : null }
        {hideEditForm ? null : <EditEmailForm user={user} onLogOut={onLogOut} /> }
      </div>
      <button onClick={onLogOut}>Logout</button>
      <Link to="/gpus">
        View GPU Database
      </Link>
      Availability last updated: {lastUpdated[0].updated_at}
      <h1>Your watched GPUs:</h1>
      <div className="container">
        {gpusItem}
      </div>
    </div>
  );
}
