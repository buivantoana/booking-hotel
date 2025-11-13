import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCoursesContext } from "../App";
import RegisterController from "../pages/register/RegisterController";

const Router = () => {
  const context: any = useCoursesContext();
  return (
    <>
      <Routes>
        <Route path='' element={<RegisterController />} />
      </Routes>
    </>
  );
};

export default Router;
