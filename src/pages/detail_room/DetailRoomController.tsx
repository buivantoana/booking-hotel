import React, { useEffect, useState } from "react";
import DetailRoomView from "./DetailRoomView";
import { useParams } from "react-router-dom";
import { getDetailHotelApi, searchHotel } from "../../service/hotel";

type Props = {};

const DetailRoomController = (props: Props) => {
  const { id } = useParams();
  const [detailHotel,setDetailHotel] = useState({})
  const [loading, setLoading] = useState(true);
  const [recommend, setRecommend] = useState([]);
  useEffect(()=>{
    if(id){
      getDetailHotel()
    }
  },[id])
  const getDetailHotel = async ()=>{
    setLoading(true)
    try {
      let result = await getDetailHotelApi(id)
      let recommend = await searchHotel({ category: "recommend" });
      if (recommend?.hotels?.length) {
        setRecommend(recommend?.hotels);
      }
      if(result && Object.keys(result).length>0){
        setDetailHotel(result)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <DetailRoomView
      detailHotel={detailHotel}
      recommend={recommend}
      loading={loading}
    />
  );
};

export default DetailRoomController;
