import { useGetUserQuery } from "../redux";

export const useAuth = () => {
  const { data } = useGetUserQuery('')
  return {
    isAuth: !!data?.email,
    id: data?.id,
    email: data?.email,
    token: data?.token,
  }
}