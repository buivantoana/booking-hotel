import React, { useEffect, useState } from "react";
import DetailRoomView from "./DetailRoomView";
import { useParams } from "react-router-dom";
import { getDetailHotelApi } from "../../service/hotel";

type Props = {};

const DetailRoomController = (props: Props) => {
  const { id } = useParams();
  const [detailHotel,setDetailHotel] = useState({})
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(id){
      getDetailHotel()
    }
  },[id])
  const getDetailHotel = async ()=>{
    setLoading(true)
    try {
      let result = await getDetailHotelApi(id)
      if(result && Object.keys(result).length>0){
        setDetailHotel(result)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return <DetailRoomView detailHotel={detailHotel} loading={loading} />;
};

export default DetailRoomController;
