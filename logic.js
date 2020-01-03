// Someone has attempted to censor my strings by replacing every vowel with a *, l*k* th*s. Luckily, I've been able to find the vowels that were removed.
// Given a censored string and a string of the censored vowels, return the original uncensored string.

const uncensor = (str, vowels) => {
    const arr = vowels.split('');
    return str.replace(/\*/g, () => arr.shift());
  };