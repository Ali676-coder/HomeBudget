// helper Functions Import
import { fetchData } from "../helper";

// RRD Import
import { Outlet, useLoaderData } from "react-router-dom";

// assets Import
import wave from "../assets/wave_modified.svg";

// components Import
import Nav from "../components/nav";

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      {/* <img src={wave} alt="Logo" /> */}
      <div className="fotter">Footer</div>
    </div>
  );
};

export default Main;

// DashBoard Loader
export const mainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};
