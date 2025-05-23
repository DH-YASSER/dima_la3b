// This file contains mathematical utility functions.

function is_palindrome(input) {
  const strInput = String(typeof input === 'number' ? Math.abs(input) : input);

  if (strInput.length === 0) {
    return true;
  }

  const reversedStrInput = strInput.split('').reverse().join('');
  return strInput === reversedStrInput;
}
