import { useEffect, useState } from "react";
import QuizQuestion from "./components/QuizQuestion";
import FinalScore from "./components/FinalScore";

const quizQuestions = [
  {
    "question": "What type of language is JavaScript?",
    "choices": ["Compiled", "Interpreted", "Assembly", "Machine Code"],
    "correct": "Interpreted"
  },
  {
    "question": "What is the result of console.log(typeof [])?",
    "choices": ["\"array\"", "\"object\"", "\"undefined\"", "\"list\""],
    "correct": "\"object\""
  },
  {
    "question": "Which keyword is used to declare a variable that cannot be reassigned?",
    "choices": ["var", "let", "const", "static"],
    "correct": "const"
  },
  {
    "question": "What is the value of Boolean(\"false\")?",
    "choices": ["true", "false", "Asundefinedsembly", "NaN"],
    "correct": "true"
  },
  {
    "question": "How does == differ from === in JavaScript?",
    "choices": ["== checks value, === checks value and type", "== checks type, === checks value", "There is no difference", "=== only works with numbers"],
    "correct": "== checks value, === checks value and type"
  },
  {
    "question": "What is the result of typeof null?",
    "choices": ["\"null\"", "\"object\"", "\"undefined\"", "\"number\""],
    "correct": "\"object\""
  },
  {
    "question": "Which of the following can be used to create an array in JavaScript?",
    "choices": ["new Array()", "[]", "Array.of()", "All of the above"],
    "correct": "All of the above"
  },
  {
    "question": "What is the result of NaN === NaN?",
    "choices": ["true", "false", "undefined", "NaN"],
    "correct": "false"
  },
  {
    "question": "What is the output of console.log([] + {})?",
    "choices": ["[object Object]", "{}", "undefined", "null"],
    "correct": "[object Object]"
  },
  {
    "question": "What will let x = 5; console.log(++x); output?",
    "choices": ["5", "6", "undefined", "error"],
    "correct": "6"
  },
  {
    "question": "What is the result of JSON.stringify({ a: undefined })?",
    "choices": ["\"{}\"", "{\"a\":undefined}", "{\"a\":null}", "error"],
    "correct": "\"{}\""
  },
  {
    "question": "What does console.log(typeof function() {}) return?",
    "choices": ["\"true\"", "\"false\"", "\"undefined\"", "\"error\""],
    "correct": "\"false\""
  },
  {
    "question": "Which of the following correctly defines an arrow function?",
    "choices": ["let sum = (a, b) => { return a + b };", "let sum = function(a, b) => { return a + b };", "let sum = (a, b) => a + b;", "Both A and C"],
    "correct": "Both A and C"
  },
  {
    "question": "Which of the following correctly uses the map() function on an array?",
    "choices": ["[1,2,3].map(n => n * 2);", "[1,2,3].map(n => { return n * 2 });", "[1,2,3].map(n, i => n * i);", "Both A and B"],
    "correct": "Both A and B"
  },
  {
    "question": "What type of function is setTimeout?",
    "choices": ["Synchronous", "Asynchronous", "Recursive", "Callback"],
    "correct": "Asynchronous"
  },
  {
    "question": "What does let obj = {a: 1, b: 2}; console.log(Object.keys(obj)); return?",
    "choices": ["[\"a\", \"b\"]", "[1, 2]", "[[\"a\", 1], [\"b\", 2]]", "[\"a\", \"b\", 1, 2]"],
    "correct": "[\"a\", \"b\"]"
  },
  {
    "question": "What is the output of console.log([...new Set([1,2,2,3,4,4])])?",
    "choices": ["[1,2,2,3,4,4]", "[1,2,3,4]", "[[1,2,3,4]]", "undefined"],
    "correct": "[1,2,3,4]"
  },
  {
    "question": "Which of the following is considered \"truthy\" in JavaScript?",
    "choices": ["false", "0", "\"\"", "\"0\""],
    "correct": "\"0\""
  },
  {
    "question": "Which of the following correctly creates a Promise?",
    "choices": ["new Promise((resolve, reject) => { resolve(\"Done\"); })", "Promise.then(() => \"Done\")", "Promise.resolve(\"Done\")", "Both A and C"],
    "correct": "Both A and C"
  }
]

export default function QuizGame(){
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(1 * 60);

  useEffect(() => {
    if(!isTimerActive) return;
    let interval = setInterval(() => {
      setRemainingTime(prevTime => {
        if(prevTime <= 0){
          handleTimeOut();
          clearInterval(interval)
          return 0;
        }
        else{
          return prevTime - 1;
        }
      })
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive]);

  function handleTimeOut(){
    setIsTimerActive(false)
    setIsAnswered(true);
    setSelectedAnswer(quizQuestions[currentQuestionIndex].correct)
    score <= 0 ? setScore(0) : setScore(score - 1);
  }

  return(
    <main className="py-8 px-4">
      <section className="py-8" aria-label="Quiz game">
        <div className="max-w-[700px] w-full mx-auto">
          {isFinished
            ? <FinalScore
                quizQuestions={quizQuestions}
                score={score}
              />
            : <QuizQuestion
                quizQuestions={quizQuestions}
                isAnswered={isAnswered}
                currentQuestionIndex={currentQuestionIndex}
                answeredCount={answeredCount}
                selectedAnswer={selectedAnswer}
                remainingTime={remainingTime}
                setIsAnswered={setIsAnswered}
                setIsFinished={setIsFinished}
                setIsTimerActive={setIsTimerActive}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                setAnsweredCount={setAnsweredCount}
                setSelectedAnswer={setSelectedAnswer}
                setScore={setScore}
                setRemainingTime={setRemainingTime}
              />
          }
        </div>
      </section>
    </main>
  )
}