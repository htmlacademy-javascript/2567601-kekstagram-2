const hasValidLength = (str, strLength) => str.length <= strLength;

const isPalindrome = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]/g, '') ===
  str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .split('')
    .reverse()
    .join('');

const findNumber = (str) => {
  let result = '';

  for (const i of String(str).split('')) {
    isNaN(parseInt(i, 10)) ? result : (result += parseInt(i, 10));
  }

  return result.length > 0 ? Number(result) : parseInt('a');
};

