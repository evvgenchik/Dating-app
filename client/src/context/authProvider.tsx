import { UserAPI } from '@/api/services/userAPI';
import { UserType } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { createContext, useState, useMemo, useEffect } from 'react';

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
  const { id } = currentUser || '1';
  const [user, setUser] = useState<UserType>(currentUser);
  const value = useMemo(() => ({ user, setUser }), [user]);

  useEffect(() => {
    const fetchUser = async () => {
      const userFromApi = (await UserAPI.getUniqueUser(id)) || null;
      setUser(userFromApi);
    };

    fetchUser();
  }, [user]);

  // const { isLoading, data, error } = useQuery({
  //   queryKey: ['currentUser'],
  //   queryFn: UserAPI.getUniqueUser,
  // });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
