import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCoursesContext } from "../App";
import RegisterController from "../pages/register/RegisterController";
import LoginController from "../pages/login/LoginController";
import HomeController from "../pages/home/HomeController";

const Router = () => {
  const context: any = useCoursesContext();
  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterController />} />
        <Route path='/login' element={<LoginController />} />
        <Route path='' element={<HomeController />} />
      </Routes>
    </>
  );
};

export default Router;
