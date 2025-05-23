import { is_palindrome } from './utils/math.js';

console.log("Testing is_palindrome:");

// Test cases
console.log("Is 'madam' a palindrome?", is_palindrome("madam")); // Expected: true
console.log("Is 'hello' a palindrome?", is_palindrome("hello")); // Expected: false
console.log("Is 121 a palindrome?", is_palindrome(121)); // Expected: true
console.log("Is 123 a palindrome?", is_palindrome(123)); // Expected: false
console.log("Is -121 a palindrome?", is_palindrome(-121)); // Expected: true
console.log("Is '' (empty string) a palindrome?", is_palindrome("")); // Expected: true
console.log("Is 0 a palindrome?", is_palindrome(0)); // Expected: true
console.log("Is -0 a palindrome?", is_palindrome(-0)); // Expected: true
console.log("Is 'A man, a plan, a canal: Panama' a palindrome?", is_palindrome('A man, a plan, a canal: Panama')); // Expected: false (due to spaces and punctuation)
console.log("Is 'Racecar!' a palindrome?", is_palindrome('Racecar!')); // Expected: false (due to capitalization and punctuation)
console.log("Is 1 a palindrome?", is_palindrome(1)); // Expected: true
console.log("Is '1' a palindrome?", is_palindrome('1')); // Expected: true
console.log("Is null a palindrome?", is_palindrome(null)); // Expected: false
console.log("Is undefined a palindrome?", is_palindrome(undefined)); // Expected: false
