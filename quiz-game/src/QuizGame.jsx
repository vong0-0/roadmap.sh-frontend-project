import { useEffect, useState } from "react";
import QuizQuestion from "./components/QuizQuestion";

const quizData = [
  { question: "What is the capital of France?", choices: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
  { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter", "Venus"], correct: "Mars" },
  { question: "What is 2 + 2?", choices: ["3", "4", "5", "6"], correct: "4" },
  { question: "Who wrote 'To Kill a Mockingbird'?", choices: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Ernest Hemingway"], correct: "Harper Lee" }
];

export default function QuizGame(){
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemaining] = useState(1);

  useEffect(() => {
    if(!isTimerRunning) return;
    let interval = setInterval(() => {
      setRemaining(prevTime => {
        if(prevTime <= 0){
          onTimeOut();
          clearInterval(interval)
          return 0;
        }
        else{
          return prevTime - 1;
        }
      })
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  function onTimeOut(){
    setIsTimerRunning(false)
    setIsAnswered(true);
    setSelectedAnswer(quizData[currentQuestionIndex].correct)
    setScore(score - 1);
  }

  return(
    <main className="py-8 px-4">
      <div>{score}</div>
      <section className="py-8" aria-label="Quiz game">
        <div className="max-w-sm w-full mx-auto">
          <QuizQuestion
            quizData={quizData}
            isAnswered={isAnswered}
            currentQuestionIndex={currentQuestionIndex}
            answeredCount={answeredCount}
            selectedAnswer={selectedAnswer}
            remainingTime={remainingTime}
            setIsAnswered={setIsAnswered}
            setIsTimerRunning={setIsTimerRunning}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setAnsweredCount={setAnsweredCount}
            setSelectedAnswer={setSelectedAnswer}
            setScore={setScore}
            setRemaining={setRemaining}
          />
        </div>
      </section>
    </main>
  )
}