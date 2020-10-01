import React from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faTachometerAlt,
  faChevronRight,
  faQuestionCircle,
  faPlusCircle,
  faEye,
  faArrowCircleLeft,
  faCheckCircle,
  faTimesCircle,
  faTrashAlt,
  faPuzzlePiece,
  faLink,
  faEdit,
  faBrain,
  faThumbsUp,
  faThumbsDown,
  faEyeSlash,
  faCode
} from "@fortawesome/free-solid-svg-icons";
import { AuthContextProvider } from "./contexts/auth/Auth";
import { QuizzesContextProvider } from "./contexts/quizzes/Quizzes";
import { LoadingContextProvider } from "./contexts/loading/Loading";
import { Main } from "./Main";

library.add(
  faBookOpen,
  faTachometerAlt,
  faChevronRight,
  faQuestionCircle,
  faPlusCircle,
  faEye,
  faArrowCircleLeft,
  faCheckCircle,
  faTimesCircle,
  faTrashAlt,
  faPuzzlePiece,
  faLink,
  faEdit,
  faBrain,
  faThumbsUp,
  faThumbsDown,
  faEyeSlash,
  faCode
);

const App: React.FC = () => {
  return (
    <div className="App">
      <LoadingContextProvider>
        <QuizzesContextProvider>
          <AuthContextProvider>
            <Main />
          </AuthContextProvider>
        </QuizzesContextProvider>
      </LoadingContextProvider>
    </div>
  );
};

export default App;
