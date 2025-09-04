export const fetchData = {
  get: async () => {
    const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data');
    return await response.json();
  },
  send: async (newData) => {

    const response = await fetch(' https://31.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: newData,
    });
    return await response.json();
  },
};
