export default function TimerControllers({
  audioRef,
  sessions,
  isStarted,
  isTimerRunning,
  isSessionEnded,
  sessionIndex,
  focusCompletedCount,
  setIsStarted,
  setIsTimerRunning,
  setRemainingTime,
  setIsSessionEnded,
  setSessionIndex
}){
  // Start, Pause, Resume, Reset, Restart focus, short break, long break
  function handleStartTimer(){
    setIsStarted(true);
    setIsTimerRunning(true);
  }

  function handleToggleTimer(){
    setIsTimerRunning(!isTimerRunning);
  }

  function handleResetTimer(){
    setIsStarted(false);
    setIsTimerRunning(false);
    setRemainingTime(sessions[sessionIndex].duration);
  }

  function handleStartNewSession(newSessionIndex){
    if(audioRef.current){
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsTimerRunning(true);
    setRemainingTime(sessions[newSessionIndex].duration);
    setIsSessionEnded(false);
    setSessionIndex(newSessionIndex);
  }

  return(
    <div className="flex items-center gap-4 my-8">
      {isStarted ?
        isSessionEnded ?
          <>
            <button
              className="px-2 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
              aria-label="Restart focus session button"
              role="button"
              tabIndex={4}
              onClick={() => handleStartNewSession(0)}
            >
              <img className="w-4 h-4 sm:hidden" src="icons/arrow-rotate-right-solid.svg" alt="" aria-hidden="true" />
              <span className="hidden sm:block">Restart focus</span>
            </button>
            <button
              className="px-2 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
              aria-label="Start short break session button"
              role="button"
              tabIndex={5}
              onClick={() => handleStartNewSession(1)}
            >
              <img className="w-4 h-4 sm:hidden" src="icons/mug-saucer-solid.svg" alt="" aria-hidden="true" />
              <span className="hidden sm:block">Short break</span>
            </button>
            {focusCompletedCount % 4 === 0 &&
              <button
                className="px-2 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
                aria-label="Start long break session button"
                role="button"
                tabIndex={6}
                onClick={() => handleStartNewSession(2)}
              >
                <img className="w-4 h-4 sm:hidden" src="icons/utensils-solid.svg" alt="" aria-hidden="true" />
                <span className="hidden sm:block">Long break</span>
              </button>
            }
          </>
          :
          <>
            <button
              className="px-2 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
              aria-label={`${isTimerRunning ? "Pause" : "Resume"} timer button`}
              role="button"
              tabIndex={4}
              onClick={handleToggleTimer}
            >
              <img className="w-4 h-4 sm:hidden" src={`icons/${isTimerRunning ? "pause-solid.svg" : "play-solid.svg"}`} alt="" aria-hidden="true" />
              <span className="hidden sm:block">{isTimerRunning ? "Pause" : "Resume"}</span>
            </button>
            <button
              className="px-2 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
              aria-label="Reset timer button"
              role="button"
              tabIndex={5}
              onClick={handleResetTimer}
            >
              <img className="w-4 h-4 sm:hidden" src="icons/arrow-rotate-right-solid.svg" alt="" aria-hidden="true" />
              <span className="hidden sm:block">Reset</span>
            </button>
          </>
        :
        <button
          className="px-2 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
          aria-label="Start timer button"
          role="button"
          tabIndex={4}
          onClick={handleStartTimer}
        >
          <img className="w-4 h-4 sm:hidden" src="icons/play-solid.svg" alt="" aria-hidden="true" />
          <span className="hidden sm:block">Start</span>
        </button>
      }
    </div>
  )
}