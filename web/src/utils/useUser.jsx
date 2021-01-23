import useSWR from "swr";

export default function useUser() {
  const { data, error, revalidate, mutate, isValidating } = useSWR(
    "http://localhost:4000/auth/me"
  );

  return {
    user: data?.data,
    userFetchError: error ? error : data?.error,
    revalidateUser: revalidate,
    mutateUser: mutate,
    isUserValidating: isValidating,
  };
}
