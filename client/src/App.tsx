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
  faEye,
  faArrowCircleLeft,
  faCheckCircle,
  faTimesCircle,
  faTrashAlt,
  faPuzzlePiece,
  faLink,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import { PrivateSection } from "./components/sections/private/PrivateSection";
import { AuthContextProvider } from "./contexts/auth/Auth";
import { QuizzesContextProvider } from "./contexts/quizzes/Quizzes";
import { Navbar } from "./components/Navbar";
import { UserDashboard } from "./components/sections/private/UserDashboard";
import { ActualPrivateQuiz } from "./components/sections/private/ActualPrivateQuiz";

import { RouteComponentProps } from "react-router";

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
  faEdit
);

interface MatchParams {
  quizId: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

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
              <Route
                path="/quiz/:quizId"
                render={({ match }: MatchProps) => (
                  <ActualPrivateQuiz quizId={match.params.quizId} />
                )}
              />
            </Switch>
          </Router>
        </AuthContextProvider>
      </QuizzesContextProvider>
    </div>
  );
};

export default App;
