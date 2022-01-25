import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import MyGPUCard from "./MyGPUCard";
import EditEmailForm from "./EditEmailForm";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function DashboardPage({ user, onLogOut, loggedIn }) {
  const [myGpuList, setMyGpuList] = useState([]);
  const [hideEditForm, setHideEditForm] = useState(true);
  // console.log(user)

  useEffect(() => {
    if (user != null && myGpuList.length===0) {
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
      {/* {loggedIn ? null : <Redirect to="/" />} */}
      <div>
        <p>Welcome back, {user?.email}<button onClick={handleEditClick}>Edit Email</button></p>
        {hideEditForm ? null : <EditEmailForm user={user} onLogOut={onLogOut} /> }
      </div>
      <button onClick={onLogOut}>Logout</button>
      <Link to="/gpus">
        View GPU Database
      </Link>
      <h1>Your watched GPUs:</h1>
      <div className="container">
        {gpusItem}
      </div>
    </div>
  );
}
