const textBoxContainer = document.querySelector('.text-boxes');

function createTextBoxElement(container, maxLength = 255){
    const textBox = document.createElement('div');
    textBox.setAttribute('class', 'text-box');

    const textArea = document.createElement('textarea');
    textArea.setAttribute('class', 'message-input');
    textArea.maxLength = maxLength;
    textArea.placeholder = "Start typeing...";
    textArea.addEventListener('input', () => {
        if(textArea.value.length >= maxLength){
            textBox.classList.add('limited');
        }
        else{
           textBox.classList.remove('limited'); 
        }
        charCounter.innerHTML = `${textArea.value.length} / ${maxLength}`;
    });
    textBox.appendChild(textArea);

    const charCounter = document.createElement('p');
    charCounter.setAttribute('class', 'char-counter');
    charCounter.innerText = `${textArea.value.length} / ${maxLength}`
    textBox.appendChild(charCounter);

    container.appendChild(textBox);
}

function renderTextBox(){
    createTextBoxElement(textBoxContainer);
    createTextBoxElement(textBoxContainer);
    createTextBoxElement(textBoxContainer);
}

renderTextBox();