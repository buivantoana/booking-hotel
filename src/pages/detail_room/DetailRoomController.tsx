import React, { useEffect, useState } from "react";
import DetailRoomView from "./DetailRoomView";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getAmenities,
  getAvailableRooms,
  getDetailHotelApi,
  getReviewHotel,
  searchHotel,
} from "../../service/hotel";
import { getHashtags } from "../../service/profile";

type Props = {};

const DetailRoomController = (props: Props) => {
  const { id: idPrams } = useParams();
  const [searchParams] = useSearchParams();
  const [detailHotel, setDetailHotel] = useState({});
  const [loading, setLoading] = useState(true);
  const [recommend, setRecommend] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [hastag, setHastag] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [idHotel, setIdHotel] = useState(null);
  const [amenities, setAmenities] = useState([]);
  useEffect(() => {
    const checkIn = searchParams.get("checkIn"); // 2025-12-06
    const checkOut = searchParams.get("checkOut"); // 2025-12-06
    const type = searchParams.get("type"); // hourly / daily
    const checkInTime = searchParams.get("checkInTime"); // 14:00
    const duration = Number(searchParams.get("duration")); // 2

    let finalCheckIn = checkIn;
    let finalCheckOut = checkOut;

    // Nếu type = hourly → convert datetime sang UTC
    if (type === "hourly") {
      // Tạo datetime local từ checkIn + checkInTime
      const localDateTime = new Date(`${checkIn}T${checkInTime}:00`);

      // Convert sang UTC
      const utcIn = localDateTime
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);

      // Tính checkOut theo duration (giờ)
      const localOut = new Date(
        localDateTime.getTime() + duration * 60 * 60 * 1000
      );
      const utcOut = localOut.toISOString().replace("T", " ").substring(0, 19);

      finalCheckIn = utcIn; // ví dụ: "2025-11-26 07:00:00"
      finalCheckOut = utcOut; // ví dụ: "2025-11-26 09:00:00"
    }

    // Gọi API
    getAvaibleRoom(idPrams, {
      check_in: finalCheckIn,
      check_out: finalCheckOut,
    });
  }, []);
  useEffect(() => {
    (async () => {
      try {
        let result = await getAmenities();

        if (result?.amenities?.length > 0) {
          setAmenities(
            result?.amenities.map((item) => {
              return {
                ...item,
                active: false,
              };
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    if (idPrams) {
      setIdHotel(idPrams);
    }
  }, [idPrams]);
  const getAvaibleRoom = async (id, query) => {
    try {
      let result = await getAvailableRooms(id, query);
      if (result.room_types) {
        setRooms(result.room_types);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (idHotel) {
      getDetailHotel();
      getReview();
      getHashtagsReview();
    }
  }, [idHotel]);
  const getDetailHotel = async () => {
    setLoading(true);
    try {
      let result = await getDetailHotelApi(idHotel);
      let recommend = await searchHotel({ category: "recommend" });

      if (recommend?.hotels?.length) {
        setRecommend(recommend?.hotels);
      }
      if (result && Object.keys(result).length > 0) {
        setDetailHotel(result);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const getReview = async (id) => {
    try {
      let review = await getReviewHotel(id || idHotel);
      console.log("AAAA review", review);
      if (review?.reviews) {
        setReviews(review?.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHashtagsReview = async () => {
    try {
      let hastag = await getHashtags();
      if (hastag?.hashtags?.length) {
        setHastag(hastag?.hashtags);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DetailRoomView
      detailHotel={detailHotel}
      recommend={recommend}
      loading={loading}
      reviews={reviews}
      getReviewHotel={getReview}
      hastag={hastag}
      rooms={rooms}
      amenities={amenities}
    />
  );
};

export default DetailRoomController;
