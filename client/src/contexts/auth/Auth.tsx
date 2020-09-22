import React, { createContext, useState, useEffect } from "react";
import { User } from "../../models/User";
import { PrivateQuiz } from "../../models/PrivateQuiz";
import { getUserQuizzes } from "../../utils/dbFunctions";

type PossibleUser = User | null;

interface iAuthContext {
  currentUser: PossibleUser;
  loadCurrentUser: (user: User) => void;
  isInPrivateSection: boolean;
  goToPrivateSection: () => void;
  goToPublicSection: () => void;
  userQuizzes: PrivateQuiz[] | [];
  refreshUserQuizzes: () => void;
}

const startingValue: iAuthContext = {
  currentUser: null,
  loadCurrentUser: (user: User) => {},
  isInPrivateSection: false,
  goToPrivateSection: () => {},
  goToPublicSection: () => {},
  userQuizzes: [],
  refreshUserQuizzes: () => {}
};

export const AuthContext = createContext(startingValue);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<PossibleUser>(null);
  const [isInPrivateSection, setIsInPrivateSection] = useState(false);
  const [userQuizzes, setUserQuizzes] = useState<PrivateQuiz[]>([]);

  const uploadUserQuizzes = async () => {
    const userQuizzesFromDB = await getUserQuizzes(currentUser!._id);
    setUserQuizzes(userQuizzesFromDB);
  };

  const refreshUserQuizzes = () => uploadUserQuizzes();

  useEffect(() => {
    if (currentUser) {
      uploadUserQuizzes();
    }
  }, [currentUser]);

  const loadCurrentUser = (user: User) => {
    setCurrentUser(user);
  };
  const goToPrivateSection = () => setIsInPrivateSection(true);
  const goToPublicSection = () => setIsInPrivateSection(false);

  const valuesToPass: iAuthContext = {
    currentUser,
    loadCurrentUser,
    isInPrivateSection,
    goToPrivateSection,
    goToPublicSection,
    userQuizzes,
    refreshUserQuizzes
  };

  return (
    <AuthContext.Provider value={{ ...valuesToPass }}>
      {children}
    </AuthContext.Provider>
  );
};
