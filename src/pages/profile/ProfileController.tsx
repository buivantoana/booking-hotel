import React, { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import { getHashtags, historyBookingContact } from "../../service/profile";

type Props = {};

const ProfileController = (props: Props) => {
  const [historyBooking, setHistoryBooking] = useState([]);
  const [hastag, setHastag] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getHistoryBooking();
  }, []);
  const getHistoryBooking = async () => {
    setLoading(true);
    try {
      let hastag = await getHashtags();
      if (hastag?.hashtags?.length) {
        setHastag(hastag?.hashtags);
      }
      let result = await historyBookingContact();
      console.log("AAAA result", result);
      if (result) {
        setHistoryBooking(result);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <ProfileView
      historyBooking={historyBooking}
      getHistoryBooking={getHistoryBooking}
      hastag={hastag}
      loading={loading}
    />
  );
};

export default ProfileController;
