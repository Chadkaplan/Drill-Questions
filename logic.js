// Someone has attempted to censor my strings by replacing every vowel with a *, l*k* th*s. Luckily, I've been able to find the vowels that were removed.
// Given a censored string and a string of the censored vowels, return the original uncensored string.

const uncensor = (str, vowels) => {
    const arr = vowels.split('');
    return str.replace(/\*/g, () => arr.shift());
  };

//   =======================================================================================

// Write a function that takes an array and a number as arguments. Add the number to the end of the array, then remove the first element of the array. The function should then return the updated array.

// nextInLine([5, 6, 7, 8, 9], 1) ➞ [6, 7, 8, 9, 1]

// nextInLine([7, 6, 3, 23, 17], 10) ➞ [6, 3, 23, 17, 10]

// nextInLine([1, 10, 20, 42 ], 6) ➞ [10, 20, 42, 6]

// nextInLine([], 6) ➞ "No array has been selected"

const nextInLine = (arr, addition) => {
    if (arr !== []){
        arr.shift();
        arr.push(addition)
        console.log(arr)
        return arr
    }
    else {
        return "No array has been selected"
    }
}

nextInLine([5,6,7,8,9],1)