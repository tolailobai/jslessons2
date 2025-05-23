'use strict';
// let startCalc = document.querySelector('#start');
let startCalc = document.getElementById("start"); //Получить кнопку "Начать расчет" через id
console.log(startCalc);

let budget = document.querySelector('.budget-value'),
    dayBudget = document.querySelector('.daybudget-value'),
    level = document.querySelector('.level-value'),
    expenses = document.querySelector('.expenses-value'),
    optionalExpenses = document.querySelector('.optionalexpenses-value'),
    income = document.querySelector('.income-value'),
    monthSavings = document.querySelector('.monthsavings-value'),
    yearSavings = document.querySelector('.yearsavings-value'),
    wrapper = document.querySelector('.wrapper'),

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesCalc = document.getElementsByTagName("button")[0],
    optionalExpensesBtn = document.getElementsByTagName("button")[1],
    countBtn = document.getElementsByTagName("button")[2],
    optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    savingsCheck = document.querySelector('#savings'),
    chooseSum = document.querySelector('#sum'),
    choosePercent = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');
console.log(expensesItem);

// expensesCalc[0].onclick = function() {
//     alert('Ну наконец-то Вы нажали её!');
//     alert('Вы опять нажали её!');    
// }

// expensesCalc[0].addEventListener('click', function() {
//     alert('Ну наконец-то Вы нажали её!');
//     // alert('Вы опять нажали её!');  
// })
// expensesCalc[0].addEventListener('click', function() {
//     // alert('Ну наконец-то Вы нажали её!');
//     alert('Вы опять нажали её!');  
// })
// expensesCalc[0].addEventListener('mouseenter', function() {
//     alert('Вы навели на FB');
// })

// expensesCalc[0].addEventListener('click', function(event) {
//     let target = event.target;
//     target.style.display = 'none';
//     // console.log('Произошло событие: ' + event.type + ' на элементе ' + event.target);
// })

// optionalExpensesItems.forEach(function(item) {
//     item.addEventListener('mouseleave', function() {
//         console.log('мышь покинула');
//     })
// })

    // expensesItemCalc = document.getElementByClassName('expenses-item-btn'),
    // optionalexpensesCalc = document.getElementByClassName('optionalexpenses-btn'),
    // expensesItem1 = document.getElementById("expenses1"),
    // expensesItem2 = document.getElementById("expenses2"),
    // expensesItem3 = document.getElementById("expenses3"),
    // expensesItem4 = document.getElementById("expenses4");

let money, time, expensesSum,start;
expensesSum = 0;

// кнопки делаются неактивными


startCalc.addEventListener('click', function() {
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц? (в руб.)", "");
    start = true;
    wrapper.classList.remove('hidden');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budget.textContent = money.toFixed() + ' руб.';
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
})

expensesCalc.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
        
            if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {        
                console.log ("done");        
                appData.expenses[a] = b;
                sum += +b
            } else {
                console.log ("bad result");
                i = i - 1;
            }
        
        }
        expenses.textContent = sum;
        expensesSum = sum;
})

optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i <= optionalExpensesItems.length; i++) {
            let optEx = optionalExpensesItems[i].value;
            appData.optionalExpenses[i] = optEx;
            optionalExpenses.textContent += appData.optionalExpenses[i] + ' ';
        }
});

countBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
    // if (appData.budget == true) {
    appData.moneyPerDay = ((appData.budget - expensesSum) / 30).toFixed();    
    dayBudget.textContent = appData.moneyPerDay;

    //уровень дохода    
    if (appData.moneyPerDay < 100) {
        level.textContent = "Нищета, голыдьба";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        level.textContent = "Это средний уровень достатка!";
    } else if (appData.moneyPerDay > 2000) {
        level.textContent = "Богато живем!";
    } else {
        level.textContent = "Ошибочка...!";
    }} else {alert('не указан бюджет на месяц. Нажмите Расчёт для начала');
        level.textContent = 'Ошибка. Не указан бюджет на месяц. Нажмите "Начать расчёт"';
    }
});

// Статьи возможных доходов
chooseIncome.addEventListener('change', function() {
    let items = chooseIncome.value;
    appData.income = items.split(", ");
    income.textContent = appData.income;
});

savingsCheck.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {appData.savings = true;}
});

chooseSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});

choosePercent.addEventListener('input', function() {
     if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});
    
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,    
};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}