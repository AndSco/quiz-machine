import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from "react";
import { User } from "../../models/User";
import { PrivateQuiz } from "../../models/PrivateQuiz";
import { getUserQuizzes, logoutUser } from "../../utils/dbFunctions";
import { LoadingContext } from "../../contexts/loading/Loading";
import {
  saveUserInSessionStorage,
  getUserFromSessionStorage,
  removeUserFromSessionStorage
} from "../../utils/functions";

type PossibleUser = User | null;

interface iAuthContext {
  currentUser: PossibleUser;
  loadCurrentUser: (user: User) => void;
  isInPrivateSection: boolean;
  goToPrivateSection: () => void;
  goToPublicSection: () => void;
  userQuizzes: PrivateQuiz[] | [];
  refreshUserQuizzes: () => void;
  logout: () => void;
}

const startingValue: iAuthContext = {
  currentUser: null,
  loadCurrentUser: (user: User) => {},
  isInPrivateSection: false,
  goToPrivateSection: () => {},
  goToPublicSection: () => {},
  userQuizzes: [],
  refreshUserQuizzes: () => {},
  logout: () => {}
};

export const AuthContext = createContext(startingValue);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<PossibleUser>(
    getUserFromSessionStorage()
  );
  const [isInPrivateSection, setIsInPrivateSection] = useState(false);
  const [userQuizzes, setUserQuizzes] = useState<PrivateQuiz[]>([]);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const uploadUserQuizzes = useCallback(async () => {
    try {
      startLoading();
      const userQuizzesFromDB = await getUserQuizzes(currentUser!._id);
      setUserQuizzes(userQuizzesFromDB);
      stopLoading();
    } catch (err) {
      console.error(err);
      stopLoading();
    }
  }, [currentUser, startLoading, stopLoading]);

  const refreshUserQuizzes = () => uploadUserQuizzes();

  useEffect(() => {
    if (currentUser) {
      uploadUserQuizzes();
    }
  }, [currentUser, uploadUserQuizzes]);

  const loadCurrentUser = (user: User) => {
    saveUserInSessionStorage(user);
    setCurrentUser(user);
  };
  const goToPrivateSection = () => setIsInPrivateSection(true);
  const goToPublicSection = () => setIsInPrivateSection(false);

  const logout = () => {
    logoutUser();
    removeUserFromSessionStorage();
    setCurrentUser(null);
  };

  const valuesToPass: iAuthContext = {
    currentUser,
    loadCurrentUser,
    isInPrivateSection,
    goToPrivateSection,
    goToPublicSection,
    userQuizzes,
    refreshUserQuizzes,
    logout
  };

  return (
    <AuthContext.Provider value={{ ...valuesToPass }}>
      {children}
    </AuthContext.Provider>
  );
};
