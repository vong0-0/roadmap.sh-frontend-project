export default function ProgressBar({  remainingTime, initDuration }){
  const progress = (((initDuration - remainingTime) / initDuration) * 100);
  return(
    <div className="max-w-52 sm:max-w-96 w-full h-1 bg-zinc-700 rounded-2xl relative overflow-hidden" aria-label="Progess bar">
      <div style={{width: `${progress}%`}} className="w-0 h-full absolute left-0 top-0 bg-zinc-600 transition-all duration-300"></div>
    </div>
  )
}