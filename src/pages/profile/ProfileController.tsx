import React, { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import { getHashtags, historyBookingContact } from "../../service/profile";

type Props = {};

const ProfileController = (props: Props) => {
  const [historyBooking, setHistoryBooking] = useState([]);
  const [hastag, setHastag] = useState([]);

  useEffect(() => {
    getHistoryBooking();
  }, []);
  const getHistoryBooking = async () => {
    try {
      let hastag = await getHashtags();
      if (hastag?.hashtags?.length) {
        setHastag(hastag?.hashtags);
      }
      let result = await historyBookingContact();
      console.log("AAAA result", result);
      if (result.length > 0) {
        setHistoryBooking(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProfileView
      historyBooking={historyBooking}
      getHistoryBooking={getHistoryBooking}
      hastag={hastag}
    />
  );
};

export default ProfileController;
