import React, { useEffect, useState } from "react";
import DetailRoomView from "./DetailRoomView";
import { useParams } from "react-router-dom";
import {
  getDetailHotelApi,
  getReviewHotel,
  searchHotel,
} from "../../service/hotel";
import { getHashtags } from "../../service/profile";

type Props = {};

const DetailRoomController = (props: Props) => {
  const { id:idPrams } = useParams();
  const [detailHotel, setDetailHotel] = useState({});
  const [loading, setLoading] = useState(true);
  const [recommend, setRecommend] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [hastag, setHastag] = useState([]);
  const [idHotel,setIdHotel] = useState(null);
  useEffect(()=>{
    if(idPrams){
      setIdHotel(idPrams)
    }
  },[idPrams])
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
    setLoading(true);
    try {
      let review = await getReviewHotel(id||idHotel);
      console.log("AAAA review",review)
      if (review?.reviews) {
        setReviews(review?.reviews);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
    />
  );
};

export default DetailRoomController;
