import { useState, useEffect, useRef } from "react";
import SessionSelector from "./components/SessionSelector";
import DisplayTimer from "./components/DisplayTimer";
import ProgressBar from "./components/ProgressBar";
import TimerControllers from "./components/TimerControllers";
import TimerConfig from "./components/TimerConfig";

// const sessions = [
//   {
//     name: "Focus",
//     duration: 25 * 60,
//   },
//   {
//     name: "Short Break",
//     duration: 5 * 60,
//   },
//   {
//     name: "Long Break",
//     duration: 15 * 60,
//   },
// ]

export default function PomodoroTimer(){
  const [isStarted, setIsStarted] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessions, setSessions] = useState([
    { name: "Focus", duration: 25 * 60 },
    { name: "Short Break", duration: 5 * 60 },
    { name: "Long Break", duration: 15 * 60 },
  ]);
  const [isSessionEnded, setIsSessionEnded] = useState(false);
  const [isConfigFormOpen, setIsConfigFormOpen] = useState(false);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(sessions[sessionIndex].duration);
  const [sessionCount, setSessionCount] = useState(0);
  const [focusCompletedCount, setFocusComplatedCount] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    setRemainingTime(sessions[sessionIndex].duration);
  }, [isConfigFormOpen]);

  useEffect(() => {
    let intervalId;
    if(isTimerRunning){
      intervalId = setInterval(() => {
        setRemainingTime(prevTime => {
          if(prevTime <= 0){
            sessionEnded();
            return 0;
          }
          else{
            return prevTime - 1;
          }
        })
      }, 1000);
    }
    else{
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  useEffect(() => {
    const sound = audioRef.current;
    function handleTimeUpdate(){
      if(sound.currentTime >= 5){
        sound.pause();
        sound.currentTime = 0;
      }
    }

    sound.addEventListener("timeupdate", handleTimeUpdate);
    return () => sound.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  function sessionEnded(){
    setFocusComplatedCount(prevCount => {
      if(sessionIndex === 0){
        return prevCount + 1;
      }
      else{
        return prevCount;
      }
    });
    playSound();
    setIsTimerRunning(false);
    setIsSessionEnded(true);
    setSessionCount(prevCount => prevCount + 1);
  }

  function playSound(){
    const sound = audioRef.current;
    if(sound){
      sound.play();
      sound.currentTime = 0;
    }
  }

  function toggleConfigDurationForm(){
    setIsConfigFormOpen(prevState => !prevState);
  }

  return(
    <main >
      <section className="flex justify-center items-center h-screen bg-cs-black relative" aria-label="Pomodoro timer controls">
        <button
          className="absolute top-[5%] right-[6%]"
          aria-label="Open config timer duration form button"
          role="button"
          onClick={toggleConfigDurationForm}
        >
          <img className="w-5 h-5 sm:w-6 sm:h-6" src="../src/assets/icons/sliders-solid.svg" alt="Slider" aria-hidden={true} />
        </button>
        <TimerConfig
          isFormOpen={isConfigFormOpen}
          sessions={sessions}
          focusDuration={sessions[0].duration}
          shortBreakDuration={sessions[1].duration}
          longBreakDuration={sessions[2].duration}
          onToggleForm={toggleConfigDurationForm}
          setSessions={setSessions}
        />
        <audio ref={audioRef} src="../src/assets/audio/cell-phone-ring-tone-rock-n-roll.wav" aria-hidden={true} />
        <div className="max-w-[28rem] w-11/12 flex flex-col items-center">
          <SessionSelector
            audioRef={audioRef}
            sessions={sessions}
            sessionIndex={sessionIndex}
            currentSession={sessions[sessionIndex].name}
            isSessionEnded={isSessionEnded}
            setSessionIndex={setSessionIndex}
            setRemainingTime={setRemainingTime}
            setIsStarted={setIsStarted}
            setIsTimerRunning={setIsTimerRunning}
            setIsSessionEnded={setIsSessionEnded}
          />
          <DisplayTimer
            remainingTime={remainingTime}
            currentSession={sessions[sessionIndex].name}
          />
          <ProgressBar
            remainingTime={remainingTime}
            initDuration={sessions[sessionIndex].duration}
          />
          <TimerControllers
            audioRef={audioRef}
            sessions={sessions}
            isStarted={isStarted}
            isTimerRunning={isTimerRunning}
            isSessionEnded={isSessionEnded}
            sessionIndex={sessionIndex}
            focusCompletedCount={focusCompletedCount}
            setIsStarted={setIsStarted}
            setIsTimerRunning={setIsTimerRunning}
            setRemainingTime={setRemainingTime}
            setIsSessionEnded={setIsSessionEnded}
            setSessionIndex={setSessionIndex}
          />
        </div>
        <div className="absolute text-gray-400 text-sm font-bold bottom-[4%] left-1/2 -translate-x-1/2 sm:text-base" aria-live="polite">
         {sessionCount ? `${sessionCount} sessions completed` : "No session today"}
        </div>
      </section>
    </main>
  )
}