import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTestScore, updateCurrentQuestionValues } from "./redux/actions";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "./App.css";

export default function Questions() {
  const questions = [
    {
      id: 1,
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      id: 2,
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      id: 3,
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      id: 4,
      questionText: "The capital of Egypt is ",
      answerOptions: [
        { answerText: "Cairo", isCorrect: true },
        { answerText: "Alexandria", isCorrect: false },
        { answerText: "Desouq", isCorrect: false },
        { answerText: "Tanta", isCorrect: false },
      ],
    },
    {
      id: 5,
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ];
  console.log(questions);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const score = useSelector((state) => state.score);
  const [showScore, setShowScore] = useState(false);
  const currentQuestion = useSelector((state) => state.currentQuestion);
  const dispatch = useDispatch();

  function generateUniqueNumber(maxNumber = 5) {
    if (generatedNumbers.length === 5) {
      return;
    }
    let number = Math.random() * maxNumber;
    const checkNumber = validateNumberExistance(number);
    if (checkNumber) {
      generateUniqueNumber();
    } else {
      setGeneratedNumbers([...generatedNumbers, parseInt(number.toFixed(0))]);
    }
  }

  // in order to validate that there is no exisiting number equals to generated one.
  function validateNumberExistance(generatedNumb) {
    let exists = false;
    generatedNumbers.map((num) => {
      if (num === parseInt(generatedNumb.toFixed(0))) {
        return (exists = true);
      }
    });
    return exists ? true : false;
  }

  useEffect(() => {
    if (generatedNumbers.length < 5) generateUniqueNumber(5);
  }, [generatedNumbers]);

  console.log(questions[currentQuestion]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) dispatch(updateTestScore());

    const nextQuet = generatedNumbers[nextQuestion];
    if (nextQuestion < questions.length) {
      dispatch(updateCurrentQuestionValues(nextQuet));
      setNextQuestion(nextQuestion + 1);
    } else setShowScore(true);
  };

  // const [nextQuestion, setNextQuestion] = useState(0);
  //   const [generatedNumbers, setGeneratedNumbers] = useState([]);
  //   const score = useSelector((state) => state.score);
  //   const [showScore, setShowScore] = useState(false);
  //   const currentQuestion = useSelector((state) => state.currentQuestion);
  //   const dispatch = useDispatch();

  //   // in order to validate that there is no existing number equals to generated one.
  //   function generateAndCheck() {
  //       let generatedNumber = Math.random() * 4;
  //       let exists = false;
  //       generatedNumbers.map((num) => {
  //           if (num === parseInt(generatedNumber.toFixed(0))) {
  //               return (exists = true);
  //           }
  //       });

  //       if (exists) {
  //           exists = false;
  //           generateAndCheck();
  //       } else {
  //           console.log(generatedNumber)
  //           setGeneratedNumbers([...generatedNumbers, parseInt(generatedNumber.toFixed(0))]);
  //           return parseInt(generatedNumber.toFixed(0));
  //       }
  //   }

  //   const handleAnswerOptionClick = (isCorrect, randomNumber) => {
  //       if (isCorrect) dispatch(updateTestScore());

  //       // const nextQuet = generatedNumbers[nextQuestion];
  //       // if (nextQuestion <= questions.length) {
  //       //     dispatch(updateCurrentQuestionValues(nextQuet));
  //       //     setNextQuestion(nextQuestion + 1);
  //       // } else setShowScore(true);
  //       setNextQuestion(nextQuestion + 1);
  //       if (nextQuestion < questions.length) {
  //           dispatch(updateCurrentQuestionValues(randomNumber))
  //       } else {
  //           setShowScore(true);
  //       }
  //   };

  return (
    <Container maxWidth="sm" onLoad={prompt}>
      {" "}
      <Box
        sx={{
          width: 500,
          height: 500,
          backgroundColor: "#fff",
          marginTop: "50%",
        }}
      >
        {showScore ? (
          <div className="score-section">
            <span className="cong-span"> Congrates! </span>
            <br /> You've got {score} out of {questions.length};{" "}
          </div>
        ) : (
          <>
            <div className="question-section title">
              <div className="">Quiz Application</div>

              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="que_text">
                {questions[currentQuestion]?.questionText}
              </div>
            </div>
            <div className="option_list">
              {questions[currentQuestion]?.answerOptions?.map(
                (answerOption) => (
                  <button
                    className="option"
                    key={answerOption.id}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </Box>
    </Container>
  );
}
