const tempValue = document.querySelector('.temp-value');
const fromUnitDropdown = document.querySelector('#from-unit-dropdown');
const toUnitDropdown = document.querySelector('#to-unit-dropdown');
const convertBtn = document.querySelector('.convert-btn');
const resultContainer = document.querySelector('.result');

function convertTemp(value, formUnit, toUnit){
  const conversion = {
    fahrenheit: {
      celsius: (value - 32) * 5 / 9,
      kelvin: (value - 32) * 5 / 9 + 273.15,
    },
    celsius: {
      fahrenheit: (value * 9) / 5 + 32,
      kelvin: value + 273.15,
    },
    kelvin: {
      fahrenheit: ((value - 273.15) * 9) / 5 + 32,
      celsius: value - 273.15,
    }
  }

  return conversion[formUnit][toUnit];
}

function tempConvert(){
  if(fromUnitDropdown.value === toUnitDropdown.value){
    resultContainer.innerText = `${tempValue.value} ${fromUnitDropdown.value} is ${tempValue.value} ${toUnitDropdown.value}`;
    return;
  }

  const result = convertTemp(Number(tempValue.value), fromUnitDropdown.value, toUnitDropdown.value);
  resultContainer.innerHTML = `${tempValue.value} ${fromUnitDropdown.value} is ${result.toFixed(2)} ${toUnitDropdown.value}`;
}

function enableConvertButton() {
  const isEnable = tempValue.value.trim() !== "" && fromUnitDropdown.value && toUnitDropdown.value;
    convertBtn.disabled = !isEnable;
    convertBtn.classList.toggle("disable", !isEnable);
}

convertBtn.addEventListener('click', tempConvert);
tempValue.addEventListener('input', enableConvertButton)
fromUnitDropdown.addEventListener('change', enableConvertButton)
toUnitDropdown.addEventListener('change', enableConvertButton)