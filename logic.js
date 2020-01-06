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


//   =======================================================================================

// Fibonacci numbers are created in the following way:

// F(0) = 0
// F(1) = 1
// ...
// F(n) = F(n-2) + F(n-1)

// Write a function that calculates the nth Fibonacci number.

// My solution
function fib(n) {
    // Handle the first two numbers not having two previous numbers to add
	if(n==0){
		return 0;
	}
	else if(n==1){
        return 1;
    }
    // Calculating typical Fibonacci numbers
	else{
        return fib(n-1)+fib(n-2);
	}
}

// A nifty es6 solution that I did not come up with using a ternary operator in an arrow function
const fib = num => (num < 2 ? num : fib(num - 1) + fib(num - 2));


//   =======================================================================================

// EXPERT PROBLEM

// Each person in Italy has an unique identifying ID code issued by the national tax office after the birth registration: the Fiscal Code (Codice Fiscale). Check the Resources tab for more info on this.

// Given an object containing the personal data of a person (name, surname, gender and date of birth) return the 11 code characters as a string following these steps:

// Generate 3 capital letters from the surname, if it has:

// At least 3 consonants then the first three consonants are used. (Newman -> NWM).
// Less than 3 consonants then vowels will replace missing characters in the same order they appear (Fox -> FXO | Hope -> HPO).
// Less than three letters then "X" will take the third slot after the consonant and the vowel (Yu -> YUX).
// Generate 3 capital letters from the name, if it has:

// Exactly 3 consonants then consonants are used in the order they appear (Matt -> MTT).
// More than 3 consonants then first, third and fourth consonant are used (Samantha -> SNT | Thomas -> TMS).
// Less than 3 consonants then vowels will replace missing characters in the same order they appear (Bob -> BBO | Paula -> PLA).
// Less than three letters then "X" will take the the third slot after the consonant and the vowel (Al -> LAX).
// Generate 2 numbers, 1 letter and 2 numbers from date of birth and gender:

// Take the last two digits of the year of birth (1985 -> 85).
// Generate a letter corresponding to the month of birth (January -> A | December -> T) using the table for conversion included in the code.
// For males take the day of birth adding one zero at the start if is less than 10 (any 9th day -> 09 | any 20th day -> 20).
// For females take the day of birth and sum 40 to it (any 9th day -> 49 | any 20th day -> 60).

// Examples:

// fiscalCode({
//     name: "Matt",
//     surname: "Edabit",
//     gender: "M",
//     dob: "1/1/1900"
//   }) ➞ "DBTMTT00A01"
  
//   fiscalCode({
//     name: "Helen",
//     surname: "Yu",
//     gender: "F",
//     dob: "1/12/1950"
//   }) ➞ "YUXHLN50T41"
  
//   fiscalCode({
//     name: "Mickey",
//     surname: "Mouse",
//     gender: "M",
//     dob: "16/1/1928"
//   }) ➞ "MSOMKY28A16"

// This is a dirty, lengthy solution that took lots of research with methods, regex, and trial and error. The code is broken down into the 3 sections that the question presents and finally returns the solution of concatenating those answers together.
const months = {1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T"};

function fiscalCode(person) {
	const checkConsonants = /[^AEIOU]/;
	const checkVowels = /[AEIOU]/;
	const first = function() {
		let code = person.surname.toUpperCase().split("");
		let consonants = code.filter(v => checkConsonants.test(v));
		let vowels = code.filter(v => checkVowels.test(v));
		if (consonants.length >= 3) {code = consonants.slice(0,3).join("")}
		else {code = consonants.join("") + vowels.slice(0,3-consonants.length).join("")}
		if (code.length !== 3) {code += "X".repeat(3-code.length)}
		return code;
	}

	const second = function() {
		let code = person.name.toUpperCase().split("");
		let consonants = code.filter(v => checkConsonants.test(v));
		let vowels = code.filter(v => checkVowels.test(v));
		if (consonants.length === 3) {code = consonants.join("")}
		else if (consonants.length > 3) {code = consonants[0] + consonants.slice(2,4).join("")}
		else {code = consonants.join("") + vowels.slice(0,3-consonants.length).join("")}
		if (code.length !== 3) {code += "X".repeat(3-code.length)}
		return code;
	}

	const third = function() {
		let dob = person.dob.split("/");
		let year = dob[2].split("").slice(2).join("");
		let month = months[dob[1]];
		let day = Number(dob[0]);
		if (person.gender === "F") {day = 40 + day}
		if (day < 10) {day = "0" + day}
		return year + month + day;
	}
	
	return first()+second()+third();
}