export default function QuizQuestion({
  quizData,
  isAnswered,
  currentQuestionIndex,
  answeredCount,
  selectedAnswer,
  remainingTime,
  setIsAnswered,
  setIsTimerRunning,
  setCurrentQuestionIndex,
  setAnsweredCount,
  setSelectedAnswer,
  setScore,
  setRemaining
}){

  function handleAnswerQuestion(choice){
    const correctAnswer = quizData[currentQuestionIndex].correct;
    const correct = correctAnswer === choice;
    if(correct){
      setScore(prevCount => prevCount + 1);
    }
    setIsTimerRunning(false);
    setAnsweredCount(prevCount => prevCount + 1);
    setSelectedAnswer(choice);
    setIsAnswered(true);
  }

  function handleNextQuestion(){
    if(currentQuestionIndex >= quizData.length){
      setIsFinished(true);
      return;
    }
    setIsTimerRunning(true);
    setRemaining(1 * 60);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  }

  function formatTime(secs){
    const minutes = Math.floor(secs / 60);
    const seconds =  secs % 60;
    return `${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;
  }

  return(
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-3xl tracking-widest">Math quiz</h1>
      <div className="w-full">
        <div className="w0full h-1 bg-cs-black rounded-full overflow-x-hidden">
          <div
            className="bg-cs-grey h-full transition-all duration-300"
            style={{
              width:`${(answeredCount * 100) / quizData.length}%`
            }}
          >
          </div>
        </div>
        <p className="text-xs my-1">{`${answeredCount} / ${quizData.length}`}</p>
      </div>
      <h2 className="text-4xl tracking-wide">{quizData[currentQuestionIndex].question}</h2>
      <ul className="w-full flex flex-col gap-4" role="list">
        {quizData[currentQuestionIndex].choices.map((choice, index) => (
          <li key={`answer choice ${index + 1}: ${choice}`} role="list-item">
            <button
              className={`choice-button ${selectedAnswer ?  choice === quizData[currentQuestionIndex].correct ? "correct" : selectedAnswer === choice ? "wrong" : "unselected" : ""}`}
              disabled={isAnswered}
              aria-label={`Answer choice ${index + 1}: ${choice}`}
              role="button"
              aria-labelledby={`choice-${index}`}
              onClick={() => handleAnswerQuestion(choice)}
            >
              <p
                id={`choice-${index}`}
                className={`choice-text`}
              >
                {choice}
              </p>
            </button>
          </li>
        ))}
      </ul>
      <p className={`${isAnswered ? "hidden" : "block"} text-sm font-bold underline`}>{formatTime(remainingTime)}</p>
      <button
        className={`${isAnswered ? "block" : "hidden"} py-4 px-8 border border-solid border-cs-black rounded-2xl hover:shadow-[0_4px_0_var(--primary)] hover:-translate-y-1 transition-all duration-300`}
        role="button"
        aria-label="Next question button"
        onClick={handleNextQuestion}
      >
        Next
      </button>
    </div>
  )
}