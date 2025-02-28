export default function QuizQuestion({
  quizQuestions,
  isAnswered,
  currentQuestionIndex,
  answeredCount,
  selectedAnswer,
  remainingTime,
  setIsAnswered,
  setIsFinished,
  setIsTimerActive,
  setCurrentQuestionIndex,
  setAnsweredCount,
  setSelectedAnswer,
  setScore,
  setRemainingTime
}){

  function handleSelectAnswer(choice){
    const correctAnswer = quizQuestions[currentQuestionIndex].correct;
    const correct = correctAnswer === choice;
    if(correct){
      setScore(prevCount => prevCount + 1);
    }
    setIsTimerActive(false);
    setAnsweredCount(prevCount => prevCount + 1);
    setSelectedAnswer(choice);
    setIsAnswered(true);
  }

  function handleNextQuestion(){
    console.log(currentQuestionIndex)
    if(currentQuestionIndex >= quizQuestions.length - 1){
      setIsFinished(true);
      return;
    }
    setIsTimerActive(true);
    setRemainingTime(1 * 60);
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
      <h2 className="font-bold text-3xl tracking-widest">Math quiz</h2>
      <div className="w-full">
        <div className="w0full h-1 bg-cs-black rounded-full overflow-x-hidden">
          <div
            className="bg-cs-grey h-full transition-all duration-300"
            style={{
              width:`${(answeredCount * 100) / quizQuestions.length}%`
            }}
          >
          </div>
        </div>
        <p className="text-xs my-1">{`${answeredCount} / ${quizQuestions.length}`}</p>
      </div>
      <h2 className="text-4xl tracking-wide text-center mb-8">{quizQuestions[currentQuestionIndex].question}</h2>
      <ul className="max-w-96 w-full flex flex-col gap-4" role="list">
        {quizQuestions[currentQuestionIndex].choices.map((choice, index) => (
          <li key={`answer choice ${index + 1}: ${choice}`} role="list-item">
            <button
              className={`quiz-choice ${selectedAnswer ?  choice === quizQuestions[currentQuestionIndex].correct ? "correct" : selectedAnswer === choice ? "wrong" : "inactive" : ""}`}
              aria-disabled={isAnswered}
              role="button"
              aria-labelledby={`choice-${index}`}
              onClick={() => handleSelectAnswer(choice)}
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
      <p aria-live="polite" className={`${isAnswered ? "hidden" : "block"} text-sm font-bold underline`}>{formatTime(remainingTime)}</p>
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