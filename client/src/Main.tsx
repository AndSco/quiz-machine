import React, { useContext } from "react";
import { LoadingContext } from "./contexts/loading/Loading";
import { Spinner } from "./components/UI/Spinner";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PublicQuizzes } from "./components/sections/public/PublicQuizzes";
import { PrivateSection } from "./components/sections/private/PrivateSection";
import { Navbar } from "./components/Navbar/Navbar";
import { UserDashboard } from "./components/sections/private/UserDashboard";
import { ActualPrivateQuiz } from "./components/sections/private/ActualPrivateQuiz";
import { RouteComponentProps } from "react-router";

interface MatchParams {
  quizId: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

export const Main: React.FC = () => {
  const { isLoading } = useContext(LoadingContext);
  return isLoading ? (
    <Spinner />
  ) : (
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
  );
};
