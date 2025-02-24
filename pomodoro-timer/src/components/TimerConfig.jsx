import { useState, useEffect, useRef } from "react";

export default function TimerConfig({
  isFormOpen,
  sessions,
  focusDuration,
  shortBreakDuration,
  longBreakDuration,
  onToggleForm,
  setSessions,
  setIsStarted,
  setIsTimerRunning
}){
  if(!isFormOpen) return null;
  const [focusDurationInput, setFocusDurationInput] = useState(focusDuration);
  const [shortBreakDurationInput, setShortBreakDurationInput] = useState(shortBreakDuration);
  const [longBreakDurationInput, setLongBreakDurationInput] = useState(longBreakDuration);
  const focusInputRef = useRef(null);
  const submitBtnRef = useRef(null);

  useEffect(() => {
    if(isFormOpen && focusInputRef.current){
      focusInputRef.current.focus();
    }
  }, [isFormOpen]);

  useEffect(() => {
    function handleKeyDown(e){
      if(e.key === "Escape"){
        onToggleForm();
      }
      if(e.key === "Enter" && submitBtnRef.current){
        submitBtnRef.current.click();
      }
    }
    if(isFormOpen){
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFormOpen]);

  function handleClose(){
    onToggleForm();
  }

  function handleSubmit(e){
    e.preventDefault();
    setSessions([
      { ...sessions[0], duration: focusDurationInput },
      { ...sessions[1], duration: shortBreakDurationInput },
      { ...sessions[2], duration: longBreakDurationInput },
    ]);
    setIsStarted(false);
    setIsTimerRunning(false);
    onToggleForm();
  }

  return (
    <div className="w-screen h-screen fixed left-0 top-0 z-50" aria-hidden={!isFormOpen} role="dialog" aria-modal="true">
      <div
        className="w-full h-full px-4 bg-[rgba(0,0,0,.8)]"
        onClick={handleClose}
      >
      </div>
      <form className="max-w-[400px] w-full rounded-xl bg-zinc-800 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-4 auto-rows-auto px-4 pt-9 sm:pt-10 pb-4 relative">
          <button
            className="absolute top-[5%] right-[5%]"
            aria-label="Close config timer duration form"
            role="button"
            onClick={handleClose}
          >
            <img className="w-5 h-5 sm:w-6 sm:h-6" src="icons/xmark-solid.svg" alt="xmark" aria-hidden={true} />
          </button>
          <div className="input-group col-span-2">
            <label htmlFor="configFocusDuration" className="text-zinc-400 text-xs sm:text-base">Pomodoro duration(minutes)</label>
            <input
              ref={focusInputRef}
              className="bg-zinc-700 px-1 py-1 rounded-md"
              id="configFocusDuration"
              name="configFocusDuration"
              type="number"
              aria-live="assertive"
              min={1}
              value={focusDurationInput / 60}
              onChange={(e) => {
                setFocusDurationInput(e.target.value * 60);
                e.target.value = focusDurationInput >= 0 ? focusDurationInput / 60 : 0;
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="configShortBreakDuration" className="text-zinc-400 text-xs sm:text-base">Short break(mins)</label>
            <input
              className="bg-zinc-700 px-1 py-1 rounded-md"
              id="configShortBreakDuration"
              name="configShortBreakDuration"
              type="number"
              aria-live="assertive"
              min={1}
              value={shortBreakDurationInput / 60}
              onChange={(e) => {
                setShortBreakDurationInput(e.target.value * 60);
                e.target.value = shortBreakDurationInput >= 0 ? shortBreakDurationInput / 60 : 0;
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="configLongBreakDuration" className="text-zinc-400 text-xs sm:text-base">Long Break(mins)</label>
            <input
              className="bg-zinc-700 px-1 py-1 rounded-md"
              id="configLongBreakDuration"
              name="configLongBreakDuration"
              type="number"
              aria-live="assertive"
              min={1}
              value={longBreakDurationInput / 60}
              onChange={(e) => {
                setLongBreakDurationInput(e.target.value * 60);
                e.target.value = longBreakDurationInput >= 0 ? longBreakDurationInput / 60 : 0;
              }}
            />
          </div>
          <button
            ref={submitBtnRef}
            className="px-4 py-2 rounded-md bg-cyan-800 text-zinc-200 col-span-2 sm:hover:bg-cyan-700 sm:hover:text-white transition-colors duration-300"
            type="button"
            aria-label="Update timer settings button"
            role="button"
            onClick={handleSubmit}
          >
            Update Settings
          </button>
        </div>
      </form>
    </div>
  )
}