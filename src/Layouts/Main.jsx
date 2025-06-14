// helper Functions Import
import { fetchData } from "../helper";

// RRD Import
import { Outlet, useLoaderData } from "react-router-dom";

// components Import
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;

// DashBoard Loader
export const mainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};
