let cooldownTime = 0;

// Elements
const cooldownTimeElement = document.getElementById("cooldownTime");
const checkButtonElement = document.getElementById("checkButton");
const inputValueElement = document.getElementById("inputValue");
const resultElement = document.getElementById("result");

// Static
const WIN_TEXT =
  "ВААААААААААУУУУУУУУУ, НУ НИЧЕГО СЕБЕ, КАК НЕОЖИДАННО И ПРИЯТНО!!!! Вы выиграли путевку в Тарнув!!! А ключ то где искать? Может Дамблдор знает?";
const LOSE_TEXT = "Папе Свину подложили свинью - лотерейный билет пустой =(";
const WIN_TICKET_VALUE = "0710-071937-012";

/**
 * Throws an error if any of necessary elements is missing
 * @returns {void}
 */
(function validateElements() {
  const elements = [cooldownTimeElement, checkButtonElement, inputValueElement];
  if (elements.includes(undefined)) {
    throw new Error("One of core elements is undefined");
  }
})();

/**
 * Sets win state
 * @returns {void}
 */
function win() {
  alert(WIN_TEXT);
}

/**
 * Sets lose state
 * @returns {void}
 */
function lose() {
  disableInputAndButton();
  alert(LOSE_TEXT);
}

/**
 * Returns value from "inputValue" input element
 * @returns {String}
 */
function getInputValueOrThrow() {
  const inputValue = inputValueElement.value;
  if (!inputValue) throw new Error("Input value is undefined");

  return inputValue.trim();
}

/**
 * Sets either win or lose state based on inputted value
 * @returns {void}
 */
function checkButtonClickHandler() {
  const value = getInputValueOrThrow();
  value === WIN_TICKET_VALUE ? win() : lose();
}

/**
 * Sets cooldown in seconds
 * @returns {number} time in seconds
 */
function setCooldownSeconds(value = 10) {
  return (cooldownTime = value * 1000);
}

/**
 * Gets cooldown in seconds
 * @returns {number} time in seconds
 */
function getCooldownSeconds() {
  return cooldownTime / 1000;
}

/**
 * Disables input button and starts input cooldown
 * @returns {void}
 */
function disableInputAndButton() {
  setCooldownSeconds(10);

  inputValueElement.disabled = true;
  checkButtonElement.disabled = true;
  resultElement.style.display = "block";

  for (let i = 10; i >= 0; i--) {
    setTimeout(() => {
      cooldownTimeElement.innerText = getCooldownSeconds();
      setCooldownSeconds(getCooldownSeconds() - 1);
    }, i * 1000);
  }

  setTimeout(function () {
    inputValueElement.disabled = false;
    checkButtonElement.disabled = false;
    resultElement.style.display = "none";
  }, 10 * 1000);
}

checkButtonElement.addEventListener("click", checkButtonClickHandler);
