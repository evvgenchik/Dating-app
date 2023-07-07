import { createContext, useState, useMemo } from 'react';

type Props = {
  children: JSX.Element;
};

type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: Props) => {
  const currentUser = JSON.parse(localStorage.getItem('user')) || null;
  const [user, setUser] = useState(currentUser);
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
