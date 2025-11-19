import React, { useEffect, useState } from "react";
import HomeView from "./HomeView";
import { getLocation } from "../../service/hotel";

type Props = {};

const HomeController = (props: Props) => {
  const [location,setLocation] = useState([])
  

  useEffect(()=>{
    (async()=>{
      try {
        let result = await getLocation();
        console.log("AAA location",result)
        if(result?.locations){
          setLocation(result?.locations)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  },[])
  return <HomeView  location={location}/>;
};

export default HomeController;
