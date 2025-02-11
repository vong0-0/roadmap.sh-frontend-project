import { useState } from 'react';
import { data1, data2 } from './data';

export default function App(){
  return(
    <div className="page-wrapper">
      <h1 className="page-title">Flash Cards</h1>
      <div className="flash-card-container">
        <FlashCard
          content={data1}
        />
        <FlashCard
          content={data2}
        />
      </div>
    </div>
  )
}

function FlashCard({ content }){
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const progress = content.length ? Math.round((currentIndex + 1)* 100 / content.length) : 0;

  function handlePrev(){
    setCurrentIndex(prevIndex => (prevIndex - 1 + content.length) % content.length);
  }

  function handleNext(){
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  }

  function handleShowAnswer(){
    setShowAnswer(!showAnswer);
  }

  return(
   <div className="flash-card">
    <ProgressBar
      progress={progress}
    />
    <div className="flash-card-wrapper">
      <div className="flash-card-content">
        {showAnswer ? content[currentIndex].answer : content[currentIndex].question}
        <p className='counter'>{`${currentIndex + 1} / ${content.length}`}</p>
      </div>
      <div className="flash-card-controls">
        <button
          className="btn prev-btn"
          onClick={handlePrev}
        >
            &lt; Previous
        </button>
        <button
          className="btn show-answer-btn"
          onClick={handleShowAnswer}
        >
          {showAnswer ? "Show answer" : "Hide answer"}
        </button>
        <button
          className="btn next-btn"
          onClick={handleNext}
        >
          Next &gt;
        </button>
      </div>
    </div>
   </div>
  )
}

function ProgressBar({ progress }){
  return(
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{
          width: `${progress}%`
        }}
      >
        <p>{progress}%</p>
      </div>
    </div>
  )
}