import React from "react";
import "./App.css";
import { AuthContextProvider } from "./contexts/auth/Auth";
import { QuizzesContextProvider } from "./contexts/quizzes/Quizzes";
import { LoadingContextProvider } from "./contexts/loading/Loading";
import { Main } from "./Main";
import { registerIcons } from "./utils/registerFontawesomeIcons";

registerIcons();

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
