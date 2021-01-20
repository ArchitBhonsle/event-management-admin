export default async function easyFetch(path, data = {}, method = 'POST') {
  try {
    const response = await fetch(`http://localhost:4000/admin/${path}`, {
      headers     : {
        'Content-Type' : 'application/json'
      },
      credentials : 'include',
      method,
      body        : JSON.stringify(data)
    });
    const fetchedData = await response.json();

    return fetchedData;
  } catch (error) {
    return {
      data    : null,
      error,
      message : null
    };
  }
}
