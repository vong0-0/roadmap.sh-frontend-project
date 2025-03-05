import { useState, useEffect } from "react";
import { convertUnixToDay } from "../utilities";

export default function WeeklyForecast(){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const API_KEY = "yout_api_key";
    const date = "next7days";
    const weatherLocation = "Bangkok";
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
    console.log(error)
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
    <div className="my-16">
      <h2 className="font-bold text-3xl text-center md:text-start mb-4 md:mb-8 underline underline-offset-4">Week</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 ml:grid-cols-3 auto-rows-auto gap-6 lg:gap-8">
        {data.days.map((day, index) => (
          <div key={day.datetimeEpoch} className={`border-4 border-solid ${index === 0 ? "border-cs-yellow" : "border-primary"} px-4 py-4 rounded-2xl ${index === 0 ? "cs-shadow-yellow" : "cs-shadow"}`}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="">
                  <p className="text-xl xs:text-2xl">{index === 0 ? "Today" : convertUnixToDay(day.datetimeEpoch)}</p>
                  <p className="text-sm xs:text-base text-[rgba(0,0,0,.5)] font-bold">{day.conditions}</p>
                </div>
                <div className="w-16">
                  <img src={`./icons/condition-icons/weather-card-${day.icon}.png`} alt="" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5">
                      <img src="./icons/windy.png" alt="" />
                    </div>
                    <p className="text-sm xs:text-base ml:text-lg">{`${day.windspeed}km/h`}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5">
                      <img src="./icons/raining.png" alt="" />
                    </div>
                    <p className="text-sm xs:text-base ml:text-lg">{`${day.precipprob}%`}</p>
                  </div>
                </div>
                <p className="font-bold text-5xl ml:text-5xl my-2">{day.temp}<sup className="text-2xl xs:text-2xl">°</sup></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}