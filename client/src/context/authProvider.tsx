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
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: Props) => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || null;
  const [user, setUser] = useState<UserType>(storedUser);
  const { data, error, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => UserAPI.getUniqueUser(storedUser.id),
    enabled: !!storedUser,
  });
  const value = useMemo(() => ({ user, setUser, refetch }), [user]);
  console.log('AuthProvider');

  useEffect(() => {
    if (data) {
      console.log('AuthProvider useEffect');
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    }
  }, [data]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const userFromApi = (await UserAPI.getUniqueUser(id)) || null;
  //     setUser(userFromApi);
  //   };

  //   fetchUser();
  // }, []);

  // const { isLoading, data, error } = useQuery({
  //   queryKey: ['currentUser'],
  //   queryFn: UserAPI.getUniqueUser,
  // });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
