import { useEffect } from "react";

export default function DisplayTimer({ remainingTime, currentSession }){
  useEffect(() => {
    document.title =  `${formatTime(remainingTime)} - ${currentSession}`;
    if(remainingTime === 0){
      document.title = "Time's up!";
    }
  }, [remainingTime]);

  function formatTime(seconds){
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" + mins : mins} : ${secs < 10 ? "0" + secs : secs}`;
  }

  return(
    <div className="my-8" aria-label="Pomodoro timer">
      <div className="font-bold text-6xl sm:text-9xl">
        <span>{formatTime(remainingTime)}</span>
      </div>
    </div>
  )
}