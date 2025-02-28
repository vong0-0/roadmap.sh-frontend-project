export default function FinalScore({
  quizQuestions,
  score
}){
  return(
    <>
      <div className="border border-solid border-cs-black text-center px-4 py-4 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold underline underline-offset-8 mb-4">Final Score</h1>
        <div className="font-bold text-2xl text-[#e99720]">{`${score} / ${quizQuestions.length}`}</div>
      </div>
      {quizQuestions.map((quizQuestion, index) => (
        <div key={`Question ${index}`} className="my-8">
          <h2 className="text-2xl font-bold mb-4">{quizQuestion.question}</h2>
          <ul className="w-full flex flex-col gap-4" role="list">
            {quizQuestion.choices.map((choice, index) => (
              <li key={`answer choice ${index + 1}: ${choice}`} role="list-item">
                <button
                  className={`quiz-choice ${quizQuestion.correct === choice ? "correct" : "inactive"}`}
                  disabled={true}
                  role="button"
                  aria-labelledby={`choice-${index}`}
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
        </div>
      ))}
    </>
  )
}