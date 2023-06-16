import { useState, useEffect } from "react";
import "./ArtistQuizQ1.css";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import { containerClasses } from "@mui/material";

function ArtistQuizQ1({ quizQuestionsList }) {
  //We need to get the question from the quizQuestionsList which question_type is "questionImage_answersText"

  const [questionItemObject, setQuestionItemObject] = useState({});
  const [answerOptionsList, setAnswerOptionsList] = useState([]);
  const [shuffledAnswerOptionList, setShuffledAnswerOptionList] = useState([]);
  const [isUserAnswerCorrect, setIsUserAnswerCorrect] = useState(false);
  const [userSelectedAnswer, setUserSelectedAnswer] = useState("");

  const filteredQuestion = quizQuestionsList.filter(
    (questionObject) =>
      questionObject.question_type === "questionImage_answersText"
  );

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    // console.log(shuffledArray);
    setShuffledAnswerOptionList(shuffledArray);
  }

  useEffect(() => {
    // console.log(filteredQuestion);

    setQuestionItemObject(filteredQuestion[0]);

    // setAnswerOptionsList([
    //   { correctAnswer: questionItemObject?.option0_text },
    //   { optionAnswer1: questionItemObject?.option1_text },
    //   { optionAnswer2: questionItemObject?.option2_text },
    //   { optionAnswer3: questionItemObject?.option3_text },
    // ]);
  }, [filteredQuestion]);

  useEffect(() => {
    setAnswerOptionsList([
      { optionAnswer: questionItemObject?.option0_text },
      { optionAnswer: questionItemObject?.option1_text },
      { optionAnswer: questionItemObject?.option2_text },
      { optionAnswer: questionItemObject?.option3_text },
    ]);
  }, [questionItemObject]);

  useEffect(() => {
    shuffleArray(answerOptionsList);
  }, [answerOptionsList]);

  function captureUserAnswer(event) {
    const userAnswer = event.target.innerHTML;
    setUserSelectedAnswer(userAnswer);

    const correctAnswer = filteredQuestion[0].option0_text;
    if (userAnswer === correctAnswer) {
      setIsUserAnswerCorrect(true);
    }
  }

  //next
  return (
    <div className="mainContainer">
      {/* Question text */}
      <h3 className="questionText"> {questionItemObject?.question_text} </h3>

      {/* Question Image */}
      <section className="questionImageContainer">
        <img
          src={questionItemObject?.question_image_url}
          alt=""
          className="questionImage"
        />
      </section>

      {/* Answer options */}
      <section className="answerOptionsContainer">
        {shuffledAnswerOptionList.map((shuffledAnswerOptionObject, i) => (
          <div
            onClick={(event) => captureUserAnswer(event)}
            key={i}
            className={
              shuffledAnswerOptionObject?.optionAnswer === userSelectedAnswer
                ? "selected"
                : null
            }
          >
            {shuffledAnswerOptionObject?.optionAnswer}
          </div>
        ))}
      </section>

      {/* action buttons */}
      <section>
        <Button>Check</Button>
        <Button>Next</Button>
      </section>
    </div>
  );
}

export default ArtistQuizQ1;