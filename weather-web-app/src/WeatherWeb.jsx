import { formatDate } from "./utilities";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";

export default function WeatherWeb(){
  const currentDate = new Date();
  return(
    <div className="max-w-[800px] ml:max-w-[992px] lg:max-w-[1050px] w-11/12 mx-auto flex flex-col gap-6">
      <div className="text-center md:text-start">
        <h1 className="font-bold text-2xl sm:text-4xl md:text-3xl">Weather forecast</h1>
        <p className="text-sm sm:text-lg md:text-base text-[rgba(0,0,0,.5)] underline underline-offset-2">{formatDate(currentDate)}</p>
      </div>
      <WeatherCard />
      <HourlyForecast />
      <WeeklyForecast />
    </div>
  )
}