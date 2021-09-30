//reverses input string nothing else
function reverseStr(str) {
  var listOfChar = str.split("");
  var reversedListOfChar = listOfChar.reverse();
  var reversedStr = reversedListOfChar.join("");
  //   console.log("reversedStr:", reversedStr);
  return reversedStr;
}

// just compares and checks two string whether they are palindrome or not and returns true or false
function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

// this function converts the date which is in number form to string format

function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

//here we have just made more variables or date formats with the help of previous date object and just returning them in the form of array
function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

var date = {
  day: 2,
  month: 02,
  year: 2020,
};

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindrome = getAllDateFormats(date);

  var flag = false;

  for (var i = 0; i < listOfPalindrome.length; i++) {
    if (isPalindrome(listOfPalindrome[i])) {
      flag = true;
      break;
    }
  }

  return flag;
}
// console.log(checkPalindromeForAllDateFormats(date));

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

var resultParaRef = document.querySelector("#para-result");

function clickHandler() {
  var inputValue = inputBdayRef.value;

  if (inputValue !== "") {
    console.log("inputValue:", inputValue);
    var listOfBdayDate = inputValue.split("-");

    var date = {
      day: Number(listOfBdayDate[2]),
      month: Number(listOfBdayDate[1]),
      year: Number(listOfBdayDate[0]),
    };

    console.log(date);

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    console.log(isPalindrome);

    if (isPalindrome) {
      resultParaRef.innerText = "Yay it is a Palindrome";
    } else {
      resultParaRef.innerText = "No its not";
    }
  }
}

var inputBdayRef = document.querySelector("#input-bday");

var btnShowRef = document.querySelector("#btn-show");
btnShowRef.addEventListener("click", clickHandler);

// var nextDate = getNextPalindromeDate(date);
