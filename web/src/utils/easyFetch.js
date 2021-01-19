export default async function easyFetch(url, data, method = 'POST') {
  try {
    const response = await fetch(url, {
      headers     : {
        'Content-Type' : 'application/json'
      },
      credentials : 'include',
      method,
      body        : JSON.stringify(data)
    });
    const fetchedData = response.json();

    return {
      data  : fetchedData,
      error : null
    };
  } catch (error) {
    return {
      data  : null,
      error
    };
  }
}
