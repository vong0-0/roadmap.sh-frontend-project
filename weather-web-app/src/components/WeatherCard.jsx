import { useState, useEffect } from "react";

export default function WeatherCard(){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const API_KEY = "yout_api_key";
    const date = "today";
    const weatherLocation = ["Thailand", "Chiang Mai"];
    const unitGroup = "metric";
    const elements = "datetimeEpoch,datetime,temp,windspeed,precipprob,icon,conditions"
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}/${date}?key=${API_KEY}&unitGroup=${unitGroup}&elements=${elements}`;
    fetch(apiUrl)
      .then(response => {
        if(!response.ok){
          throw Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
  }, []);
  
  if(error){
    console.log(error);
  }

  if(loading){
    return(
      <div className="my-16 h-[200px]">
        <h2 className="font-bold text-3xl text-center mb-4 md:mb-8 underline underline-offset-4">Today forecast</h2>
        <div className="text-center font-bold text-xl">Loading...</div>
      </div>
    )
  }

  return(
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-[minmax(1px,650px)] auto-cols-auto md:grid-rows-2 auto-rows-auto md:grid-flow-col gap-x-4 gap-y-4 sm:gap-x-7 sm:gap-y-5">
        <div className="col-span-2 md:row-span-2 md:col-span-1 xxs:flex justify-between items-center border-4 border-solid border-primary px-4 py-4 xs:px-8 cs-shadow">
          <div className="text-center xxs:text-start">
            <p className="font-bold uppercase sm:text-2xl">{data.address.split(",")[0]}</p>
            <p className="text-[rgba(0,0,0,.5)] sm:text-xl">{data.address.split(",")[1]}</p>
            <p className="text-5xl mt-4 sm:text-8xl">{data.currentConditions.temp}<sup className="text-2xl xs:text-6xl">°</sup></p>
          </div>
          <div className="max-xxs:hidden w-40 sm:w-48">
            <img src={`./icons/condition-icons/weather-card-${data.currentConditions.icon}.png`} alt="" />
          </div>
        </div>
        <div className="col-span-1 xxs:flex justify-between items-center border-4 border-solid border-primary p-4 cs-shadow">
          <div className="text-center xxs:text-start">
            <p className="text-[#394a56] text-sm sm:text-base lg:text-lg font-bold leading-4">Wind speed</p>
            <p className="font-bold mt-1 sm:text-xl lg:text-2xl">{`${data.currentConditions.windspeed}km/h`}</p>
          </div>
          <div className="max-xxs:hidden w-16">
            <img src="./icons/windy.png" alt="" />
          </div>
        </div>
        <div className="col-span-1 xxs:flex justify-between items-center border-4 border-solid border-primary p-4 cs-shadow">
          <div className="text-center xxs:text-start">
            <p className="text-cs-blue text-sm sm:text-lg font-bold leading-4">likehood of rain</p>
            <p className="font-bold mt-1 sm:text-xl lg:text-2xl">{`${data.currentConditions.precipprob}%`}</p>
          </div>
          <div className="max-xxs:hidden w-16">
            <img src="./icons/rain-fall.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}