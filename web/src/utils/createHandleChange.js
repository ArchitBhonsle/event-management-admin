export function createHandleChange(setState) {
  return (event) => {
    setState((state) => ({
      ...state,
      [event.target.name]: event.target.value
    }));
  };
}
