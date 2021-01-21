export default function fetcher(...args) {
  args[1] = {
    ...args[1],
    credentials : 'include'
  };

  return fetch(...args).then((res) => res.json());
}
