import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import MyGPUCard from "./MyGPUCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function DashboardPage({
  user,
  onLogOut,
  loggedIn,
  myGpuListProp,
}) {
  // const [myGpuList, setMyGpuList] = useState([myGpuListProp]);
  const [chevronDirection, setChevronDirection] = useState(true);
  // console.log(user)

  // useEffect(() => {
  //   if (user != null && myGpuList.length === 0) {
  //     fetch(BASE_URL + `/users/${user.id}/usergpus`)
  //       .then((r) => r.json())
  //       .then(setMyGpuList);
  //   }
  // }, []);
  // console.log(myGpuList)
  console.log(myGpuListProp);

  // function handleDeleteGpu(gpuToDelete) {
  //   const updatedMyGpuList = myGpuList.filter((gpu) => gpu.id !== gpuToDelete);
  //   setMyGpuList(updatedMyGpuList);
  // }

  function handleChevronDirectionChange() {
    setChevronDirection((chevronDirection) => !chevronDirection);
    console.log(chevronDirection);
  }

  const gpusItem = myGpuListProp.map((watch) => {
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
        // onDeleteGpu={handleDeleteGpu}
      />
  });
  console.log("dashboard gpu list:", myGpuListProp);
  // console.log("dashboard log", user);

  return (
    <div>
      {loggedIn ? null : <Redirect to="/" />}
      <div className="d-flex flex-row-reverse justify-content-end">
        <div className="col-12">
          <p>{user?.email}</p>
        </div>
        <button className="" style={{ width: "100px" }} onClick={onLogOut}>
          Logout
        </button>
      </div>
      {/* <Link to="/gpus">
        View GPU Database
      </Link> */}
      {/* <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseGpus"
        aria-controls="collapseGpus"
        aria-expanded="true"
        onClick={handleChevronDirectionChange}
      >
        {chevronDirection ? (
          <FontAwesomeIcon icon="chevron-down" />
        ) : (
          <FontAwesomeIcon icon="chevron-right" />
        )}{" "}
        Watched GPUs:
      </button> */}
      <div className="container">
        <div className="collapse show" id="collapseGpus">
          <div className="row">{gpusItem}</div>
        </div>
      </div>
    </div>
  );
}
