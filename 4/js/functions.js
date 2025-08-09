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
    if (!isNaN(parseInt(i, 10))) {
      result += parseInt(i, 10);
    }
  }

  return result.length > 0 ? Number(result) : parseInt('a', 10);
};

hasValidLength('dfddd', 10);
isPalindrome('lalal');
findNumber('qwert!22');
