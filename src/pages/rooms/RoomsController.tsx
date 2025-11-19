import React, { useEffect, useState } from "react";
import RoomsView from "./RoomsView";
import dayjs, { Dayjs } from "dayjs";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAmenities, searchHotel } from "../../service/hotel";

type Props = {};

const RoomsController = (props: Props) => {
  const [queryHotel, setQueryHotel] = useState({});
  const [dataHotel, setDataHotel] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [page,setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 2
  useEffect(() => {
    // Lấy query từ URL
    const locationParam = searchParams.get("location") || "";
    const typeParam = searchParams.get("type") || "hourly";
    const checkInTimeParam = searchParams.get("checkInTime") || "10:00";
    const durationParam = searchParams.get("duration") || 2;
    const checkInParam = searchParams.get("checkIn");
    const checkOutParam = searchParams.get("checkOut");
  
    setQueryHotel({
      city:locationParam,
      rent_types:typeParam,
      limit,
      page
    })
  
  }, [location.pathname, searchParams]);
  useEffect(()=>{
    (async()=>{
      try {
        let result = await getAmenities();

        if(result?.amenities?.length>0){
          setAmenities(result?.amenities)
        }
      } catch (error) {
        console.log(error)
      }
    })
  },[])
  useEffect(() => {
    if(Object.keys(queryHotel).length>0){
      getHotel()
    }
  }, [queryHotel]);
  const getHotel = async ()=>{
    setLoading(true)
    try {
      let result = await searchHotel(queryHotel)
      if(result?.hotels?.length>0){
        setDataHotel(result?.hotels);
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return <RoomsView dataHotel={dataHotel} loading={loading} setLoading={setLoading} />;
};

export default RoomsController;
