import React, { createContext, useState } from "react";
import { User } from "../../models/User";

type PossibleUser = User | null;

interface iAuthContext {
  currentUser: PossibleUser;
  loadCurrentUser: (user: User) => void;
  isInPrivateSection: boolean;
  goToPrivateSection: () => void;
  goToPublicSection: () => void;
}

const startingValue: iAuthContext = {
  currentUser: null,
  loadCurrentUser: (user: User) => {},
  isInPrivateSection: false,
  goToPrivateSection: () => {},
  goToPublicSection: () => {}
};

export const AuthContext = createContext(startingValue);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<PossibleUser>(null);
  const [isInPrivateSection, setIsInPrivateSection] = useState(false);

  const loadCurrentUser = (user: User) => setCurrentUser(user);
  const goToPrivateSection = () => setIsInPrivateSection(true);
  const goToPublicSection = () => setIsInPrivateSection(false);

  const valuesToPass: iAuthContext = {
    currentUser,
    loadCurrentUser,
    isInPrivateSection,
    goToPrivateSection,
    goToPublicSection
  };

  return (
    <AuthContext.Provider value={{ ...valuesToPass }}>
      {children}
    </AuthContext.Provider>
  );
};
