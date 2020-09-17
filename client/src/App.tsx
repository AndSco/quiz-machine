import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { PublicQuizzes } from "./components/sections/public/PublicQuizzes";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faTachometerAlt,
  faChevronRight,
  faQuestionCircle,
  faPlusCircle,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { PrivateSection } from "./components/sections/private/PrivateSection";
import { AuthContextProvider } from "./contexts/auth/Auth";
import { QuizzesContextProvider } from "./contexts/quizzes/Quizzes";
import { Navbar } from "./components/Navbar";
import { UserDashboard } from "./components/sections/private/UserDashboard";

library.add(
  faBookOpen,
  faTachometerAlt,
  faChevronRight,
  faQuestionCircle,
  faPlusCircle,
  faEye
);

const App: React.FC = () => {
  return (
    <div className="App">
      <QuizzesContextProvider>
        <AuthContextProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={PublicQuizzes} />
              <Route
                exact
                path="/login"
                render={() => <PrivateSection activity="login" />}
              />
              <Route
                exact
                path="/register"
                render={() => <PrivateSection activity="register" />}
              />
              <Route exact path="/myDashboard" component={UserDashboard} />
            </Switch>
          </Router>
        </AuthContextProvider>
      </QuizzesContextProvider>
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import "./App.css";
// import { QuizType, Question, Subject } from "./models/Question";
// import { NumQuestionsStep } from "./components/steps/NumQuestionsStep";
// import { DifficultyStep } from "./components/steps/DifficultyStep";
// import { Difficulty } from "./models/TriviaApi";
// import { SubjectsStep } from "./components/steps/SubjectsStep";
// import { FinalSummaryStep } from "./components/steps/FinalSummaryStep";
// import { ActualQuiz } from "./components/ActualQuiz";
// import { Navbar } from "./components/Navbar";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faBookOpen,
//   faTachometerAlt,
//   faChevronRight
// } from "@fortawesome/free-solid-svg-icons";

// library.add(faBookOpen, faTachometerAlt, faChevronRight);

// const App: React.FC = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [quizType, setQuizType] = useState<QuizType>(QuizType.TRIVIA);
//   const [numOfQuestions, setNumOfQuestions] = useState<number>(5);
//   const [difficultyLevel, setDifficultyLevel] = useState<Difficulty>("medium");
//   const [currentSubject, setCurrentSubject] = useState<Subject | "">("");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [startedQuiz, setStartedQuiz] = useState(false);

//   const reset = () => {
//     setStartedQuiz(false);
//     setCurrentStep(1);
//     setNumOfQuestions(5);
//     setDifficultyLevel("medium");
//   };

//   const chooseQuiz = (quizType: QuizType) => {
//     reset();
//     setQuizType(quizType);
//   };

//   const chooseAmountOfQuestions = (num: number) => {
//     setNumOfQuestions(num);
//   };

//   const changeLevel = (level: Difficulty) => setDifficultyLevel(level);

//   const chooseSubject = (subject: Subject) => {
//     setCurrentSubject(subject);
//   };

//   const goForward = () => setCurrentStep(prev => prev + 1);

//   const uploadQuestions = (questions: Question[]) => {
//     setQuestions(questions);
//     setStartedQuiz(true);
//   };

//   console.log("QST", questions);

//   const renderInstruction = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <SubjectsStep
//             quizType={quizType}
//             goForward={goForward}
//             updateSubject={chooseSubject}
//           />
//         );

//       case 2:
//         return (
//           <NumQuestionsStep
//             chooseAmountOfQuestions={chooseAmountOfQuestions}
//             currentAmount={numOfQuestions}
//             goForward={goForward}
//           />
//         );

//       case 3:
//         return (
//           <DifficultyStep
//             currentLevel={difficultyLevel}
//             changeLevel={changeLevel}
//             goForward={goForward}
//           />
//         );

//       case 4:
//         return (
//           <FinalSummaryStep
//             quizType={quizType}
//             numberOfQuestions={numOfQuestions}
//             difficulty={difficultyLevel}
//             subject={currentSubject as Subject}
//             uploadQuestions={uploadQuestions}
//             reset={reset}
//           />
//         );

//       default:
//         return <h1>SOMETHING WENT WRONG...</h1>;
//     }
//   };

//   return (
//     <div className="App">
//       <Navbar selectedQuiz={quizType} chooseQuiz={chooseQuiz} reset={reset} />
//       {!startedQuiz ? (
//         <header className="App-header">{renderInstruction()}</header>
//       ) : (
//         <ActualQuiz
//           subject={currentSubject as Subject}
//           allQuestions={questions}
//           reset={reset}
//         />
//       )}
//     </div>
//   );
// };

// export default App;
