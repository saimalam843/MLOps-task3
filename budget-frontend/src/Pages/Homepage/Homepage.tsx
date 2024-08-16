import MainLayout from "../../Components/MainLayout/MainLayout";
import { Outlet } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <MainLayout>
       <Outlet></Outlet>
      </MainLayout>
    </div>
  );
};

export default Homepage;
