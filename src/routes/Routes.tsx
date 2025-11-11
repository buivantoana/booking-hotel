import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCoursesContext } from "../App";
import Login from "../pages/login/Login";


const Router = () => {
  const context: any = useCoursesContext();
  return (
    <>
     
      <Routes>
      <Route path='' element={<Login />} />
      </Routes>
    </>
  );
};

export default Router;
