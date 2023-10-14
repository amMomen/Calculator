let keys = document.querySelectorAll("#calculator button");

let operators = ["+", "–", "×", "÷", "^", "%"];

let decimalAdded = false;

keys.forEach((e) => {
  e.addEventListener("click", (btn) => {
    // Get the input and button values
    let input = document.querySelector(".screen");
    let inputVal = input.innerHTML;
    let btnVal = e.innerHTML;

    // If clear key is pressed, erase everything
    if (btnVal == "AC") {
      input.innerHTML = "0";
      decimalAdded = false;
    } else if (input.innerHTML == "0") {
      input.innerHTML = e.innerHTML;
    }
    // If eval key is pressed, calculate and display the result
    else if (btnVal == "=") {
      let equation = inputVal; //append equation to letiable
      let lastChar = equation[equation.length - 1]; //target the end of the eval string
      console.log(lastChar);
      // Use regex to replace all instances of x, ÷, ^ with *, / and **
      equation = equation
        .replace("×", "*")
        .replace("÷", "/")
        .replace("^", "**")
        .replace("–", "-");

      //Use regex to remove decimals from the end of an equation
      if (operators.indexOf(lastChar) > -1 || lastChar == ".")
        equation = equation.replace(/.$/, "");

      // use javascript's eval function to get the result

      if (equation) input.innerHTML = eval(equation);
      decimalAdded = false;
    }

    // Javascript checks

    // No two operators should be added consecutively.
    else if (operators.indexOf(btnVal) > -1) {
      // Get the last character from the equation
      let lastChar = inputVal[inputVal.length - 1];

      // Only add operator if input is not empty
      if (inputVal != "" && operators.indexOf(lastChar) == -1)
        input.innerHTML += btnVal;
      // Allow minus operator if the string is empty
      else if (inputVal == "" && btnVal == "-") input.innerHTML += btnVal;

      // Replace the last operator (if exists) with the newly pressed operator
      if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
        input.innerHTML = inputVal.replace(/.$/, btnVal);
      }

      decimalAdded = false;
    }
    // allow decimal point input
    else if (btnVal == ".") {
      if (!decimalAdded) {
        input.innerHTML += btnVal;
        decimalAdded = true;
      }
    }

    // if any other key is pressed, just append it after the decimal
    else {
      input.innerHTML += btnVal;
    }
    log(operators.indexOf(lastChar));
    // prevent page jumps
    btn.preventDefault();
  });
});
