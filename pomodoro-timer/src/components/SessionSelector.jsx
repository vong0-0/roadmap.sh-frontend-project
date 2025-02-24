export default function SessionSelector({
  audioRef,
  sessions,
  sessionIndex,
  currentSession,
  isSessionEnded,
  setSessionIndex,
  setRemainingTime,
  setIsStarted,
  setIsTimerRunning,
  setIsSessionEnded
}){

  function changeSession(newSessionIndex){
    if(audioRef.current){
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if(isSessionEnded) setIsSessionEnded(false);
    setSessionIndex(newSessionIndex);
    setRemainingTime(sessions[newSessionIndex].duration);
    setIsStarted(false);
    setIsTimerRunning(false);
  }

  return(
    <div className="flex gap-2 sm:gap-4" aria-label="Session selector">
      <button
        className={`px-2 py-2 rounded-md ${sessionIndex === 0 ? "bg-zinc-800 hover:bg-zinc-700" : "hover:bg-zinc-800"} transition-colors duration-300`}
        aria-label={`Change ${currentSession} session to focus session button`}
        role="button"
        tabIndex={1}
        onClick={() => changeSession(0)}
      >
        <img className="w-4 h-4 sm:hidden" src="../src/assets/icons/keyboard-regular.svg" alt="" aria-hidden={true} />
        <span className="hidden sm:block">Focus</span>
      </button>
      <button
        className={`px-2 py-2 rounded-md ${sessionIndex === 1 ? "bg-zinc-800 hover:bg-zinc-700" : "hover:bg-zinc-800 font-light"} transition-colors duration-300`}
        aria-label={`Change ${currentSession} session to short break session button`}
        role="button"
        tabIndex={2}
        onClick={() => changeSession(1)}
      >
        <img className="w-4 h-4 sm:hidden" src="../src/assets/icons/mug-saucer-solid.svg" alt="" aria-hidden={true} />
        <span className="hidden sm:block">Short break</span>
      </button>
      <button
        className={`px-2 py-2 rounded-md ${sessionIndex === 2 ? "bg-zinc-800 hover:bg-zinc-700" : "hover:bg-zinc-800 font-light"} transition-colors duration-300`}
      aria-label={`Change ${currentSession} session to long break session button`}
        role="button"
        tabIndex={3}
        onClick={() => changeSession(2)}
      >
        <img className="w-4 h-4 sm:hidden" src="../src/assets/icons/utensils-solid.svg" alt="" aria-hidden={true} />
        <span className="hidden sm:block">Long break</span>
      </button>
    </div>
  )
}