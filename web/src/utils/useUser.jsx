import useSWR from 'swr';

export default function useUser() {
  const { data, error } = useSWR('http://localhost:4000/admin/me');

  console.log(data, error);
}
