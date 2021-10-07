import { useState, useEffect } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Header({}) {
  const [lastUpdated, setLastUpdated] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + `/updates`)
      .then((r) => r.json())
      .then(setLastUpdated);
  }, []);

//   console.log(lastUpdated[0].updated_at);

  return (
    <div>
      <h4>GPU Availability Watcher</h4>
      {/* <p>Last availability check: {lastUpdated[0].updated_at}</p> */}
    </div>
  );
}
