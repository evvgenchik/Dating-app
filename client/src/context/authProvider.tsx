import { UserApi } from '@/api/services/userApi';
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
  const storedUser = JSON.parse(localStorage.getItem('user')) || 'br';
  const [user, setUser] = useState<UserType>(storedUser);
  const { data, error, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => UserApi.getUniqueUser(storedUser.id),
    enabled: !!storedUser,
  });
  const value = useMemo(() => ({ user, setUser, refetch }), [user]);

  useEffect(() => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    }
  }, [data]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
