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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [totalAll, setTotalAll] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 5;
  useEffect(() => {
    console.log("AAAAAA toan tesst")
    const locationParam = searchParams.get("location") || "";
    const typeParam = searchParams.get("type") || "hourly";
    const category = searchParams.get("category") ;
    setQueryHotel({
      ...queryHotel,
      city: locationParam,
      rent_types: typeParam,
      category,
      limit,
      page,
    });
  }, [location.pathname, searchParams, page]);
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
    if (Object.keys(queryHotel).length > 0) {
      getHotel();
    }
  }, [queryHotel]);
  const getHotel = async (query) => {
    setLoading(true);
    try {
      let result = await searchHotel(query || queryHotel);
      if (result?.hotels) {
        setDataHotel(result?.hotels);
        setTotal(result?.total_pages);
        setTotalAll(result?.total);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const getHotelLatLon = async (query) => {
    setLoading(true);
    try {
      let result = await searchHotel(query);
      if (result?.hotels) {
        setDataHotel(result?.hotels);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  console.log("AAAAA page", page);
  return (
    <RoomsView
      dataHotel={dataHotel}
      amenities={amenities}
      totalAll={totalAll}
      getHotel={getHotel}
      loading={loading}
      total={total}
      setPage={setPage}
      page={page}
      getHotelLatLon={getHotelLatLon}
      setLoading={setLoading}
      queryHotel={queryHotel}
      setQueryHotel={setQueryHotel}
    />
  );
};

export default RoomsController;
