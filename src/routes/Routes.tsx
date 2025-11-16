import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCoursesContext } from "../App";
import RegisterController from "../pages/register/RegisterController";
import LoginController from "../pages/login/LoginController";
import HomeController from "../pages/home/HomeController";
import RoomsController from "../pages/rooms/RoomsController";
import DetailRoomController from "../pages/detail_room/DetailRoomController";
import CheckOutController from "../pages/check_out/CheckOutController";
import PaymentResultController from "../pages/payment_result/PaymentResultController";
import ProfileController from "../pages/profile/ProfileController";
import LayoutWebsite from "../components/layouts/LayoutWebsite";

const Router = () => {
  const context: any = useCoursesContext();
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route path='/register' element={<RegisterController />} />
          <Route path='/rooms' element={<RoomsController />} />
          <Route path='/login' element={<LoginController />} />
          <Route path='/profile' element={<ProfileController />} />
          <Route path='/check-out' element={<CheckOutController />} />
          <Route path='' element={<HomeController />} />
          <Route path='/room/:id' element={<DetailRoomController />} />
        </Route>
        <Route path='/payment-result' element={<PaymentResultController />} />
      </Routes>
    </>
  );
};

export default Router;
