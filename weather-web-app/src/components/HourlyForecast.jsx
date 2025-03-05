import { useEffect, useState } from "react"
import { convertUnixToTime } from "../utilities";

export default function HourlyForecast(){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const API_KEY = "yout_api_key";
    const date = "today";
    const weatherLocation = "Bangkok";
    const unitGroup = "metric";
    const include = "hours"
    const elements = "datetimeEpoch,datetime,temp,windspeed,precipprob,icon,conditions"
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}/${date}?key=${API_KEY}&unitGroup=${unitGroup}&include=${include}&elements=${elements}`;
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
    <div className="my-16">
      <h2 className="font-bold text-3xl text-center md:text-start mb-4 md:mb-8 underline underline-offset-4">Today</h2>
      <div className="w-full relative">
        <div className="absolute left-[-3%] top-0 w-[5%] h-full bg-[linear-gradient(to_right,white,transparent)]"></div>
        <div className="absolute right-0 top-0 w-[10%] h-full bg-[linear-gradient(to_left,white,transparent)]"></div>
        <div className="flex flex-nowrap gap-5 overflow-scroll">
          {data.days[0].hours.map((hour) => (
            <div key={hour.datetimeEpoch} className="border-[3px] border-solid border-primary px-4 py-2 sm:px-6 sm:py-6">
              <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:mb-4">
                <div>
                  <p className="text-xs xs:text-base ml:text-xl lg:text-3xl">{convertUnixToTime(hour.datetimeEpoch)}</p>
                  <p className="hidden lg:block text-[rgba(0,0,0,.5)] text-sm font-bold">{hour.conditions}</p>
                </div>
                <div className="w-9 lg:w-20">
                  <img src={`./icons/condition-icons/${hour.icon}.png`} alt="" />
                </div>
              </div>
              <div className="block lg:flex flex-row-reverse gap-4 items-center">
                <p className="font-bold text-2xl xs:text-4xl ml:text-5xl text-center lg:text-start my-2">{hour.temp}<sup className="text-lg xs:text-2xl">°</sup></p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5">
                      <img src="./icons/windy.png" alt="" />
                    </div>
                    <p className="text-sm xs:text-base ml:text-lg">{`${hour.windspeed}km/h`}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5">
                      <img src="./icons/raining.png" alt="" />
                    </div>
                    <p className="text-sm xs:text-base ml:text-lg">{`${hour.precipprob}%`}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}