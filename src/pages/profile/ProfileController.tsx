import React, { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import { historyBookingContact } from "../../service/profile";

type Props = {};

const ProfileController = (props: Props) => {
  const [historyBooking,setHistoryBooking] = useState([])


  useEffect(()=>{
    getHistoryBooking()
  },[])
  const getHistoryBooking =async () => {
    try {
      let result = await historyBookingContact();
      console.log("AAAA result",result)
      if( result.length>0){
        setHistoryBooking(result)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return <ProfileView historyBooking={historyBooking} />;
};

export default ProfileController;
