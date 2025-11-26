import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useBookingContext } from "../App";
import RegisterController from "../pages/register/RegisterController";
import LoginController from "../pages/login/LoginController";
import HomeController from "../pages/home/HomeController";
import RoomsController from "../pages/rooms/RoomsController";
import DetailRoomController from "../pages/detail_room/DetailRoomController";
import CheckOutController from "../pages/check_out/CheckOutController";
import PaymentResultController from "../pages/payment_result/PaymentResultController";
import ProfileController from "../pages/profile/ProfileController";
import LayoutWebsite from "../components/layouts/LayoutWebsite";
import PrivateRouter from "../components/PrivateRouter";
import GuestRoute from "../components/GuestRoute";
import { useEffect } from "react";

const Router = () => {
  const context: any = useBookingContext();
  const { pathname } = useLocation();
  useEffect(() => {
    // window.scrollTo(0, 0);
    // hoặc mượt hơn:
     window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route path='/register' element={<GuestRoute ><RegisterController /></GuestRoute>} />
          <Route path='/rooms' element={<RoomsController />} />
          <Route path='/login' element={<GuestRoute ><LoginController /></GuestRoute>} />
          <Route path='/profile' element={ <PrivateRouter user={context.state.user}><ProfileController /></PrivateRouter>} />
          <Route path='/check-out' element={<PrivateRouter user={context.state.user}><CheckOutController /></PrivateRouter>} />
          <Route path='' element={<HomeController />} />
          <Route path='/room/:id' element={<DetailRoomController />} />
        </Route>
        <Route path='/payment-result' element={<PrivateRouter user={context.state.user}><PaymentResultController /></PrivateRouter>} />
      </Routes>
    </>
  );
};

export default Router;
