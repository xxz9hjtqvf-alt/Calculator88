let firstValue = '';
let secondValue = '';
let sign = '';
let finish = false;

const buttonsTitle = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/'];

const out = document.querySelector('.calc-screen p');
const calcHistory = document.querySelector('.calc-history')

let prevResults = []

function clearAll (){
    firstValue = '';
    secondValue = '';
    sign = '';
    finish = false;
    out.textContent = '0';
}


document.querySelector('.ac').onclick = clearAll;


document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('ac')) return;

    out.textContent = '';
    const key = event.target.textContent;
    
    if (buttonsTitle.includes(key)){
        if(secondValue === '' && sign === ''){
            firstValue += key;
            out.textContent = firstValue;
        }
        else if (firstValue!=='' && secondValue!=='' && finish){
            secondValue = key;
            finish = false;
            out.textContent = secondValue;
        }
        else {
            secondValue += key;
            out.textContent = secondValue;
        }
    }
    if(action.includes(key)){
        sign = key;
        out.textContent = sign;
    }
    if (key === '='){
        console.log('1 =>', firstValue)
        console.log('2 =>',secondValue)
        if (secondValue === '') secondValue = firstValue;
        switch (sign){
            case "+":
                prevResults = [...prevResults, `${firstValue} + ${secondValue} = ${+firstValue + +secondValue} `]
                prevResults.reverse().forEach(prevValue => calcHistory.innerHTML += `<div>${prevValue}<div>`)
                firstValue = (+firstValue) + (+secondValue)
                break;
            case "-":
                prevResults = [...prevResults, `${firstValue} - ${secondValue} = ${+firstValue - +secondValue} `]
                prevResults.reverse().forEach(prevValue => calcHistory.innerHTML += `<div>${prevValue}<div>`)
                firstValue = (+firstValue) - (+secondValue)
                break;
            case "x":
                prevResults = [...prevResults, `${firstValue} * ${secondValue} = ${+firstValue * +secondValue} `]
                prevResults.reverse().forEach(prevValue => calcHistory.innerHTML += `<div>${prevValue}<div>`)
                firstValue = (+firstValue) * (+secondValue)
                break;
            case "/":
                if (secondValue === '0') {
                    out.textContent = "ошибка"
                    firstValue = ''
                    secondValue = '';
                    sign = '';
                    return;
                }
                    firstValue = firstValue /secondValue;
                break;
        }
        finish = true;
        out.textContent = firstValue;
    }
}