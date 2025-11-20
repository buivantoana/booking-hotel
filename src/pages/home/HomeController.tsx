import React, { useEffect, useState } from "react";
import HomeView from "./HomeView";
import { getLocation, searchHotel } from "../../service/hotel";

type Props = {};

const HomeController = (props: Props) => {
  const [location, setLocation] = useState([]);
  const [newHotel, setNewHotel] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let result = await getLocation();
        let featured = await searchHotel({ category: "featured" });
        let recommend = await searchHotel({ category: "recommend" });
        let toprated = await searchHotel({ category: "toprated" });
        let newHotel = await searchHotel({ category: "new" });
        if (featured?.hotels?.length) {
          setFeatured(featured?.hotels);
        }
        if (recommend?.hotels?.length) {
          setRecommend(recommend?.hotels);
        }
        if (toprated?.hotels?.length) {
          setToprated(toprated?.hotels);
        }
        if (newHotel?.hotels?.length) {
          setNewHotel(newHotel?.hotels);
        }

        console.log("AAA location", result);
        if (result?.locations) {
          setLocation(result?.locations);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);
  return (
    <HomeView
      newHotel={newHotel}
      toprated={toprated}
      featured={featured}
      recommend={recommend}
      location={location}
      loading={loading}
    />
  );
};

export default HomeController;
