import React, { useEffect, useState } from "react";
import DetailRoomView from "./DetailRoomView";
import { useParams, useSearchParams } from "react-router-dom";
import {
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

  useEffect(() => {
    const check_in = searchParams.get("checkIn");
    const check_out = searchParams.get("checkOut");

    getAvaibleRoom(idPrams, { check_in, check_out });
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
    />
  );
};

export default DetailRoomController;
