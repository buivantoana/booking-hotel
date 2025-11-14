import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCoursesContext } from "../App";
import RegisterController from "../pages/register/RegisterController";
import LoginController from "../pages/login/LoginController";

const Router = () => {
  const context: any = useCoursesContext();
  return (
    <>
      <Routes>
        <Route path='' element={<RegisterController />} />
        <Route path='/login' element={<LoginController />} />
      </Routes>
    </>
  );
};

export default Router;
