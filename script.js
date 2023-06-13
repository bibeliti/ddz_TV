// Forms the 'data' array and calls the table rendering functions
function consoleTable() {
    let data = {}
    data["base"] = Number(document.getElementById("baseValue").textContent)
    data["rent"] = Number(document.getElementById("rentValue").textContent)
    let koef = []
    koef[0] = 0.5
    koef[1] = 0.7
    koef[2] = 0.8
    koef[3] = 0.9
    data["koef"] = koef

    document.getElementById("inputCalculate").setAttribute("class", "disable")

    tableEntry("tableEvent", "event", data)
    tableEntry("tableMinimization", "minimization", data)
    let table = document.getElementById("tableEventsCharacteristics")
    table.innerHTML = "";
    console.log(data)
    printTableOfEventsCharacteristics(data)
    printTableOfStrategiesCharacteristics(data)
    printTableAltLoss(data)
    printTableConditionalBenefits(data)
    printTableEconomicEffectsAfterRealizationStrategy(data)
    printTableCalculationEstimatedCharacteristics(data)
    printTableChooseStrategyBySavageCriteria(data)
    printTableChooseStrategyByValdCriteria(data)
    printTableChooseStrategyByGurvicCriteria(data)
}

function autoFilling() {
    let Jopka = document.getElementById("Jopka")
    Jopka.setAttribute('onclick', "")
    let data = {}
    data['base'] = Number(60823)
    data['rent'] = Number(30289)
    data['event'] = [
        ['e1', 5, 0.008],
        ['e2', 2, 0.02],
        ['e3', 3, 0.015],
        ['e4', 2, 0.0125]
    ]
    data['minimization'] = [
        ['s1', 'e1', 5250, 0.875],
        ['s2', 'e2', 9860, 0.75],
        ['s3', 'e3', 4130, 0.666],
        ['s4', 'e4', 3950, 0.8]
    ]

    let koef = []
    koef[0] = 0.5
    koef[1] = 0.7
    koef[2] = 0.8
    koef[3] = 0.9
    data['koef'] = koef

    let table = document.getElementById("tableEventsCharacteristics")
    table.innerHTML = '';
    console.log(data)
    printTableOfEventsCharacteristics(data)
    printTableOfStrategiesCharacteristics(data)
    printTableAltLoss(data)
    printTableConditionalBenefits(data)
    printTableEconomicEffectsAfterRealizationStrategy(data)
    printTableCalculationEstimatedCharacteristics(data)
    ChooseStrategyBySavageCriteria(data)
    ChooseStrategyByValdCriteria(data)
    ChooseStrategyByGurvicCriteria(data)
    selectByGurvic(data)
}

// Function for rounding real numbers
function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

//??????????????????????????????????????????????????????
function printTableCalculationEstimatedCharacteristics(data) {
    const table = document.getElementById("tableCalculationEstimatedCharacteristics");
    document.getElementById("calculationEstimatedCharacteristics").classList.remove("class");

    const thHeader = document.createElement("tr");
    const tdStrategy = document.createElement("td");
    tdStrategy.classList.add("headerOfTable");
    thHeader.classList.add("setHeight");

    const countCols = data.event.length;
    const countRows = data.minimization.length;
    tdStrategy.setAttribute("rowspan", 1);

    const textTdStrategy = document.createTextNode("Стратегия");
    const textTdCost = document.createTextNode("Оценки по критерию Гурвица");

    tdStrategy.appendChild(textTdStrategy);
    thHeader.appendChild(tdStrategy);

    const bigTd = document.createElement("td");
    bigTd.setAttribute("colspan", 4);
    bigTd.setAttribute("rowspan", countRows + 2);

    const subMatrixBlock2 = document.createElement("div");
    subMatrixBlock2.classList.add("subMatrixBlock2");
    const subMatrix = document.createElement("table");
    subMatrix.classList.add("SubMatrix");

    let th = document.createElement("tr");
    let td = document.createElement("td");
    td.setAttribute("colspan", 4);
    th.setAttribute("style", "height: 60px");
    td.appendChild(textTdCost);
    td.classList.add("headerOfTable");
    th.appendChild(td);
    subMatrix.appendChild(th);

    th = document.createElement("tr");
    th.setAttribute("style", "height: 60px");

    for (let i = 0; i < data.koef.length; i++) {
        td = document.createElement("td");
        let text = document.createTextNode("x" + (i + 1) + "=" + data.koef[i]);
        td.appendChild(text);
        th.appendChild(td);
    }
    subMatrix.appendChild(th);

    const maxs = document.querySelectorAll(".maximum");
    const mins = document.querySelectorAll(".minimum");

    for (let i = 0; i < countRows; i++) {
        th = document.createElement("tr");
        for (let j = 0; j < data.koef.length; j++) {
            const value = Number(mins[i].textContent) * data.koef[j] + Number(maxs[i].textContent) * (1 - data.koef[j]);
            text = document.createTextNode(round(value, 2));
            td = document.createElement("td");
            td.appendChild(text);
            td.classList.add("Gurvic");
            th.appendChild(td);
        }
        subMatrix.appendChild(th);
    }
    subMatrixBlock2.appendChild(subMatrix);
    bigTd.appendChild(subMatrixBlock2);
    thHeader.appendChild(bigTd);
    table.appendChild(thHeader);

    let tr;
    const height = (41 * countRows + 20) - 41 * (countRows - 1);

    for (let i = 0; i < data.minimization.length; i++) {
        tr = document.createElement("tr");
        if (i === data.minimization.length - 1) {
            tr.style.height = height - 1 + "px";
        }
        const td = document.createElement("td");
        const text = document.createTextNode(data.minimization[i][0]);
        td.appendChild(text);
        tr.appendChild(td);
        table.appendChild(tr);
    }
}

function ChooseStrategyByGurvicCriteria(data) {
    let gurvic = document.getElementsByClassName("Gurvic")

    let max1 = 0
    let gur1 = 0
    for (let i = 0; i < data["minimization"].length; i++) {
        if (Number(gurvic[4 * i].textContent) > max1) {
            max1 = Number(gurvic[4 * i].textContent)
            gur1 = i
        }
    }

    let max2 = 0
    let gur2 = 0
    for (let i = 0; i < data["minimization"].length; i++) {
        if (Number(gurvic[4 * i + 3].textContent) > max2) {
            max2 = Number(gurvic[4 * i + 3].textContent)
            gur2 = i
        }
    }

    let table = document.getElementById("tableResults")
    document.getElementById("results").removeAttribute("class")

    let trGurvic1 = document.createElement("tr")

    let num1 = document.createElement("td")
    let criteria1 = document.createElement("td")
    let strategy1 = document.createElement("td")

    let number1 = document.createTextNode("3")
    let criteriaName1 = document.createTextNode("Критерий Гурвица (для оптимистичных и средних оценок)")
    let strategyText1 = document.createTextNode(data["minimization"][gur1][0])

    num1.appendChild(number1)
    criteria1.appendChild(criteriaName1)
    strategy1.appendChild(strategyText1)

    trGurvic1.appendChild(num1)
    trGurvic1.appendChild(criteria1)
    trGurvic1.appendChild(strategy1)

    let trGurvic2 = document.createElement("tr")

    let num2 = document.createElement("td")
    let criteria2 = document.createElement("td")
    let strategy2 = document.createElement("td")

    let number2 = document.createTextNode(" ")
    let criteriaName2 = document.createTextNode("Критерий Гурвица (для пессимистической оценки)")
    let strategyText2 = document.createTextNode(data["minimization"][gur2][0])

    num2.appendChild(number2)
    criteria2.appendChild(criteriaName2)
    strategy2.appendChild(strategyText2)

    trGurvic2.appendChild(num2)
    trGurvic2.appendChild(criteria2)
    trGurvic2.appendChild(strategy2)

    table.appendChild(trGurvic1)
    table.appendChild(trGurvic2)
}

function ChooseStrategyByValdCriteria(data) {

    let table = document.getElementById("tableResults")
    document.getElementById("results").removeAttribute("class")

    let trVald = document.createElement("tr")

    let num = document.createElement("td")
    let criteria = document.createElement("td")
    let strategy = document.createElement("td")

    let number = document.createTextNode("2")
    let criteriaName = document.createTextNode("Критерий Вальда")
    let strategyText = ""

    let crit = Number(document.getElementById('tdImportantToResult').textContent)
    for (let i = 0; i < data['minimization'].length; i++) {
        for (let j = 0; j < data['lost'].length; j++) {
            if (Number(data['rent'] - data['lost'][i][j]) == crit) {
                strategyText = strategyText.concat(data['minimization'][i][0], ' ')
                break
            }
        }
    }

    let strategyName = document.createTextNode(strategyText)

    console.log("Vald " + strategyText)
    num.appendChild(number)
    criteria.appendChild(criteriaName)
    strategy.appendChild(strategyName)

    trVald.appendChild(num)
    trVald.appendChild(criteria)
    trVald.appendChild(strategy)

    table.appendChild(trVald)
}

function ChooseStrategyBySavageCriteria(data) {
    let table = document.getElementById("tableResults")
    document.getElementById("results").removeAttribute("class")

    let trSavage = document.createElement("tr")

    let num = document.createElement("td")
    let criteria = document.createElement("td")
    let strategy = document.createElement("td")

    let strategyName = "no"
    let min = -1
    for (let i = 0; i < data["lost"].length; i++) {
        let max = 0
        for (let j = 0; j < data["lost"][i].length; j++) {
            if (data["lost"][i][j] > max) {
                max = data["lost"][i][j]
            }
        }
        if (max < min || min === -1) {
            min = max
            for (let j = 0; j < data["lost"][i].length; j++) {
                if (data["lost"][i][j] === min) {
                    strategyName = data["minimization"][i][0]
                    break
                }
            }
        }
    }

    let number = document.createTextNode("1")
    let criteriaName = document.createTextNode("Критерий Сэвиджа")
    let strategyText = document.createTextNode(strategyName)

    num.appendChild(number)
    criteria.appendChild(criteriaName)
    strategy.appendChild(strategyText)

    trSavage.appendChild(num)
    trSavage.appendChild(criteria)
    trSavage.appendChild(strategy)

    table.appendChild(trSavage)
}

//prints alternative Losses table
function printTableAltLoss(data) {
    let table = document.getElementById("tableAlternativeLosses")
    document.getElementById("MatrixAlternativeLosses").removeAttribute("class")
    // Шапка таблицы
    let thHeader = document.createElement("tr")
    let tdStrategy = document.createElement("td")
    thHeader.setAttribute("class", "setHeight")
    let tdCost = document.createElement("td")
    let tdMinValue = document.createElement("td")
    let tdMaxValue = document.createElement("td")
    tdStrategy.setAttribute("class", "headerOfTable")
    tdMinValue.setAttribute("class", "headerOfTable")
    tdMaxValue.setAttribute("class", "headerOfTable")

    let countCols = data["event"].length
    let countRows = data["minimization"].length
    tdStrategy.setAttribute("rowspan", 1)
    tdMinValue.setAttribute("rowspan", 1)
    tdMaxValue.setAttribute("rowspan", 1)

    let textTdStrategy = document.createTextNode("Стратегия")
    let textTdCost = document.createTextNode("Стоимость альтернативных убытков")
    let textTdMinValue = document.createTextNode("Минимальное значение (Min)")
    let textTdMaxValue = document.createTextNode("Максимальное значение (Max)")

    tdStrategy.appendChild(textTdStrategy)
    tdMinValue.appendChild(textTdMinValue)
    tdMaxValue.appendChild(textTdMaxValue)

    thHeader.appendChild(tdStrategy)

    let bigTd = document.createElement("td")
    bigTd.setAttribute("colspan", countCols)
    bigTd.setAttribute("rowspan", countRows + 2)

    let subMatrixBlock2 = document.createElement("div")
    subMatrixBlock2.setAttribute("class", "subMatrixBlock2")
    let subMatrix = document.createElement("table")
    subMatrix.setAttribute("class", "subSubMatrix")

    let th = document.createElement("tr")
    let td = document.createElement("td")
    td.setAttribute("colspan", countCols);
    th.setAttribute("style", "height: 60px")
    td.appendChild(textTdCost)
    td.setAttribute("class", "headerOfTable")
    th.appendChild(td)
    subMatrix.appendChild(th)

    th = document.createElement("tr")
    th.setAttribute("style", "height: 60px")

    //шапка подтаблицы
    for (let i = 0; i < countCols; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["event"][i][0])
        td.appendChild(text)
        th.appendChild(td)
    }
    subMatrix.appendChild(th)

    //заполнение подтаблицы
    for (let i = 0; i < countRows; i++) {
        th = document.createElement("tr")
        for (let j = 0; j < countCols; j++) {
            text = document.createTextNode(data["lost"][i][j])
            td = document.createElement("td")
            td.appendChild(text)
            th.appendChild(td)
        }
        subMatrix.appendChild(th)
    }
    subMatrixBlock2.appendChild(subMatrix)
    bigTd.appendChild(subMatrixBlock2)
    thHeader.appendChild(bigTd)

    thHeader.appendChild(tdMinValue)
    thHeader.appendChild(tdMaxValue)

    table.appendChild(thHeader)

    // Основное заполнение таблицы
    for (let i = 0; i < countRows; i++) {
        tr = document.createElement("tr")
        let td = document.createElement("td")
        let text = document.createTextNode(data["minimization"][i][0])
        td.appendChild(text)
        tr.appendChild(td)
        let minValue = 999999999
        let maxValue = 0
        for (let j = 0; j < countCols; j++) {
            text = document.createTextNode(data["lost"][i][j])
            if (Number(text.textContent) > maxValue)
                maxValue = Number(text.textContent)
            if (Number(text.textContent) < minValue)
                minValue = Number(text.textContent)
        }

        // Минимальное в строке
        td = document.createElement("td")
        text = document.createTextNode(minValue)
        td.appendChild(text)
        tr.appendChild(td)

        // Максимальное в строке
        td = document.createElement("td")
        text = document.createTextNode(maxValue)
        td.appendChild(text)
        tr.appendChild(td)
        table.appendChild(tr)
    }
}

// prints Conditional Benefits table
function printTableConditionalBenefits(data) {
    let table = document.getElementById("tableCalculationConditionalBenefits")
    let div = document.getElementById("calculationConditionalBenefits")
    div.removeAttribute("class")
    // Шапка таблицы
    let thHeader = document.createElement("tr")
    let tdStrategy = document.createElement("td")
    thHeader.setAttribute("class", "setHeight")
    let tdCost = document.createElement("td")
    let tdMinValue = document.createElement("td")
    let tdMaxValue = document.createElement("td")
    tdStrategy.setAttribute("class", "headerOfTable")
    tdMinValue.setAttribute("class", "headerOfTable")
    tdMaxValue.setAttribute("class", "headerOfTable")

    let countCols = data["event"].length
    let countRows = data["minimization"].length
    tdStrategy.setAttribute("rowspan", 1)
    tdMinValue.setAttribute("rowspan", 1)
    tdMaxValue.setAttribute("rowspan", 1)

    let textTdStrategy = document.createTextNode("Стратегия")
    let textTdCost = document.createTextNode("Условная выгода")
    let textTdMinValue = document.createTextNode("Минимальное значение (Min)")
    let textTdMaxValue = document.createTextNode("Максимальное значение (Max)")

    tdStrategy.appendChild(textTdStrategy)
    tdMinValue.appendChild(textTdMinValue)
    tdMaxValue.appendChild(textTdMaxValue)

    thHeader.appendChild(tdStrategy)

    //Вычисление минимумов столбцов
    let minim = []
    for (let i = 0; i < data['event'].length; i++) {
        let minValue = round(data['rent'] - data["lost"][0][i], 2)
        for (let j = 1; j < data['minimization'].length; j++) {
            let value = round(data['rent'] - data["lost"][j][i], 2)
            if (value < minValue) {
                minValue = value
            }
        }
        minim[i] = Number(minValue)
    }

    let bigTd = document.createElement("td")
    bigTd.setAttribute("colspan", countCols)
    bigTd.setAttribute("rowspan", countRows + 3)

    let subMatrixBlock2 = document.createElement("div")
    subMatrixBlock2.setAttribute("class", "subMatrixBlock2")
    let subMatrix = document.createElement("table")
    subMatrix.setAttribute("class", "subSubMatrix")

    let th = document.createElement("tr")
    let td = document.createElement("td")
    td.setAttribute("colspan", countCols);
    th.setAttribute("style", "height: 60px")
    td.appendChild(textTdCost)
    td.setAttribute("class", "headerOfTable")
    th.appendChild(td)
    subMatrix.appendChild(th)

    th = document.createElement("tr")
    th.setAttribute("style", "height: 60px")

    // шапка подтаблицы
    for (let i = 0; i < countCols; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["event"][i][0])
        td.appendChild(text)
        th.appendChild(td)
    }
    subMatrix.appendChild(th)

    // основное заполнение подтаблицы
    for (let i = 0; i < countRows; i++) {
        th = document.createElement("tr")
        for (let j = 0; j < countCols; j++) {
            text = document.createTextNode(data["rent"] - data["lost"][i][j])
            td = document.createElement("td")
            td.appendChild(text)
            th.appendChild(td)
        }
        subMatrix.appendChild(th)
    }
    th = document.createElement("tr")

    // строка минимумов
    for (let i = 0; i < data["event"].length; i++) {
        let minVal = document.createElement("td")
        let minName = document.createTextNode(minim[i])
        minVal.appendChild(minName)
        th.appendChild(minVal)
    }
    subMatrix.appendChild(th)
    subMatrixBlock2.appendChild(subMatrix)
    bigTd.appendChild(subMatrixBlock2)
    thHeader.appendChild(bigTd)

    thHeader.appendChild(tdMinValue)
    thHeader.appendChild(tdMaxValue)

    table.appendChild(thHeader)

    // Основное заполнение таблицы
    for (let i = 0; i < countRows; i++) {
        tr = document.createElement("tr")
        let td = document.createElement("td")
        let text = document.createTextNode(data["minimization"][i][0])
        td.setAttribute('class', 'strategy')
        td.appendChild(text)
        tr.appendChild(td)
        let minValue = 999999999
        let maxValue = 0
        for (let j = 0; j < countCols; j++) {
            text = document.createTextNode(round(data["rent"] - data["lost"][i][j], 2))
            if (Number(text.textContent) > maxValue)
                maxValue = Number(text.textContent)
            if (Number(text.textContent) < minValue)
                minValue = Number(text.textContent)
        }

        // Минимальное в строке
        td = document.createElement("td")
        text = document.createTextNode(round(minValue, 2))
        td.appendChild(text)
        td.setAttribute("class", "minimum")
        tr.appendChild(td)

        // Максимальное в строке
        td = document.createElement("td")
        text = document.createTextNode(round(maxValue, 2))
        td.appendChild(text)
        td.setAttribute("class", "maximum")
        tr.appendChild(td)
        table.appendChild(tr)
    }

    tr = document.createElement('tr')
    td = document.createElement("td")
    let minName = document.createTextNode("min")
    td.appendChild(minName)
    tr.appendChild(td)

    // минимально значение
    let need1 = minim[0]
    for (let i = 0; i < minim.length; i++) {
        if (minim[i] < need1) {
            need1 = minim[i]
        }
    }
    td = document.createElement("td")
    
    let min = document.createTextNode(need1)
    td.appendChild(min)
    tr.appendChild(td)

    // максимально значение
    let need2 = minim[0]
    for (let i = 0; i < minim.length; i++) {
        if (minim[i] > need2) {
            need2 = minim[i]
        }
    }
    td = document.createElement("td")
    let max = document.createTextNode(need2)
    td.appendChild(max)
    td.setAttribute('id', 'tdImportantToResult')
    tr.appendChild(td)

    table.appendChild(tr)
}

// print Economic Effects After Realization of every Strategy table
function printTableEconomicEffectsAfterRealizationStrategy(data) {
    let table = document.getElementById("tableCalculationEconomicEffectsAfterRealizationStrategy")
    document.getElementById("calculationEconomicEffectsAfterRealizationStrategy").removeAttribute("class")
    // Шапка таблицы
    let thHeader = document.createElement("tr")
    let tdStrategy = document.createElement("td")
    tdStrategy.setAttribute("class", "headerOfTable")
    thHeader.setAttribute("class", "setHeight")
    let tdMaxValue = document.createElement("td")
    tdMaxValue.setAttribute("class", "headerOfTable")

    let countCols = data["event"].length
    let countRows = data["minimization"].length
    tdStrategy.setAttribute("rowspan", 1)
    tdMaxValue.setAttribute("rowspan", 1)

    let textTdStrategy = document.createTextNode("Стратегия")
    let textTdCost = document.createTextNode("Экономические последствия рисков реализации стратегии")
    let textTdMaxValue = document.createTextNode("Максимальное значение (Max)")

    tdStrategy.appendChild(textTdStrategy)
    tdMaxValue.appendChild(textTdMaxValue)

    thHeader.appendChild(tdStrategy)

    let bigTd = document.createElement("td")
    bigTd.setAttribute("colspan", countCols)
    bigTd.setAttribute("rowspan", countRows + 2)

    let subMatrixBlock2 = document.createElement("div")
    subMatrixBlock2.setAttribute("class", "subMatrixBlock2")
    let subMatrix = document.createElement("table")
    subMatrix.setAttribute("class", "subSubMatrix")

    let th = document.createElement("tr")
    let td = document.createElement("td")
    td.setAttribute("colspan", countCols);
    th.setAttribute("style", "height: 60px")
    td.appendChild(textTdCost)
    td.setAttribute("class", "headerOfTable")
    th.appendChild(td)
    subMatrix.appendChild(th)

    th = document.createElement("tr")
    th.setAttribute("style", "height: 60px")

    // шапка подтаблицы
    for (let i = 0; i < countCols; i++) {
        td = document.createElement("td")
        let text = document.createTextNode(data["event"][i][0])
        td.appendChild(text)
        th.appendChild(td)
    }
    subMatrix.appendChild(th)

    // подсчёт минимального значения
    let minValues = []

    for (let i = 0; i < data["lost"].length; i++) {
        min = -1
        for (let j = 0; j < data["lost"].length; j++) {
            if (data["lost"][j][i] < min || min === -1) {
                min = data["lost"][j][i]
            }
        }
        minValues[i] = min
    }

    for (let i = 0; i < countRows; i++) {
        th = document.createElement("tr")
        for (let j = 0; j < countCols; j++) {
            text = document.createTextNode(round(data["lost"][i][j] - minValues[j], 2))
            td = document.createElement("td")
            td.appendChild(text)
            th.appendChild(td)
        }
        subMatrix.appendChild(th)
    }
    subMatrixBlock2.appendChild(subMatrix)
    bigTd.appendChild(subMatrixBlock2)
    thHeader.appendChild(bigTd)

    thHeader.appendChild(tdMaxValue)

    table.appendChild(thHeader)

    let tr

    // Основное заполнение таблицы
    for (let i = 0; i < data["minimization"].length; i++) {
        tr = document.createElement("tr")
        let td = document.createElement("td")
        let text = document.createTextNode(data["minimization"][i][0])
        td.appendChild(text)
        tr.appendChild(td)
        let maxValue = 0
        for (let j = 0; j < countCols; j++) {
            text = document.createTextNode(round(data["lost"][i][j] - minValues[j], 2))
            if (Number(text.textContent) > maxValue)
                maxValue = Number(text.textContent)
        }

        // Максимальное в строке
        td = document.createElement("td")
        text = document.createTextNode(round(maxValue, 2))
        td.appendChild(text)
        tr.appendChild(td)
        table.appendChild(tr)
    }
}

function printTableOfStrategiesCharacteristics(data) {
    let table = document.getElementById("tableStrategiesCharacteristics")
    document.getElementById("matrixStrategiesCharacteristics").removeAttribute("class")
    //Шапка таблицы(надписи)
    let thHeader = document.createElement("tr")
    thHeader.setAttribute("class", "fullWidth")
    let tdNumber = document.createElement("td")
    let tdName = document.createElement("td")
    let tdEventLoss = document.createElement("td")
    tdName.setAttribute("class", "headerOfTable")
    tdName.setAttribute("style", "width:35%")
    tdNumber.setAttribute("class", "headerOfTable")

    let textNumber = document.createTextNode("№")
    let textName = document.createTextNode("Имя параметра")
    let textEventLoss = document.createTextNode("События, провоцирующие возникновению проектного риска")

    tdNumber.appendChild(textNumber)
    tdName.appendChild(textName)

    let countColsForLast = data["event"].length

    tdEventLoss.setAttribute("rowspan", data["minimization"].length * 7 + 1)

    let block = document.createElement("div")
    block.setAttribute("class", "subMatrixBlock")
    console.log(Number(round(window.innerWidth * 0.9 * 0.8 * 0.6, 0)))
    let width = "width:" + Number(round(window.innerWidth * 0.9 * 0.8 * 0.6, 0)) + "px;"
    block.setAttribute("style", width)
    let eventsTable = document.createElement("table")
    eventsTable.setAttribute("class", "subSubMatrix")
    let textRow = document.createElement("tr")
    let textCell = document.createElement("td")
    textCell.setAttribute("colspan", countColsForLast)
    textCell.appendChild(textEventLoss)
    textCell.setAttribute("class", "headerOfTable fullWidth")
    textRow.appendChild(textCell)
    eventsTable.appendChild(textRow)

    data["lost"] = []

    for (let i = 0; i < data["minimization"].length; i++) {
        let th = document.createElement("tr")
        let tdHead = document.createElement("td")
        tdHead.setAttribute("colspan", countColsForLast + 2)
        let textTdHead = document.createTextNode(data["minimization"][i][0])
        tdHead.appendChild(textTdHead)
        th.appendChild(tdHead)
        eventsTable.appendChild(th)

        th = document.createElement("tr")
        for (let j = 0; j < data["event"].length; j++) {
            let td = document.createElement("td")
            let text
            if (data["minimization"][i][1] == data["event"][j][0])
                text = document.createTextNode(data["event"][j][1] - 1)
            else
                text = document.createTextNode(data["event"][j][1])
            td.appendChild(text)
            th.appendChild(td)
        }
        eventsTable.appendChild(th)

        th = document.createElement("tr")
        for (let j = 0; j < data["event"].length; j++) {
            let td = document.createElement("td")
            let text
            if (data["minimization"][i][1] == data["event"][j][0])
                text = document.createTextNode(round((data["event"][j][2]) * (data["minimization"][i][3]), 3))
            else
                text = document.createTextNode(data["event"][j][2])
            td.appendChild(text)
            th.appendChild(td)
        }
        eventsTable.appendChild(th)

        th = document.createElement("tr")
        for (let j = 0; j < data["event"].length; j++) {
            let td = document.createElement("td")
            let number = 0
            let text
            if (data["minimization"][i][1] == data["event"][j][0])
                text = document.createTextNode(round((data["event"][j][1] - 1) * (data["event"][j][2]) * (data["minimization"][i][3]), 3))
            else
                text = document.createTextNode(round(data["event"][j][1] * data["event"][j][2], 3))
            td.appendChild(text)
            th.appendChild(td)
        }
        eventsTable.appendChild(th)

        th = document.createElement("tr")
        for (let j = 0; j < data["event"].length; j++) {
            let td = document.createElement("td")
            let text = document.createTextNode(data["base"])
            td.appendChild(text)
            th.appendChild(td)
        }
        eventsTable.appendChild(th)

        th = document.createElement("tr")
        let sumLoss = 0

        data["lost"][i] = []

        for (let j = 0; j < data["event"].length; j++) {
            let td = document.createElement("td")
            let text
            if (data["minimization"][i][1] == data["event"][j][0])
                text = document.createTextNode(round((data["event"][j][1] - 1) * (data["event"][j][2]) * (data["minimization"][i][3]) * data["base"], 0))
            else
                text = document.createTextNode(round(data["event"][j][1] * data["event"][j][2] * data["base"], 0))
            sumLoss += Number(text.textContent)
            data["lost"][i][j] = round(Number(text.textContent), 2)
            td.appendChild(text)
            th.appendChild(td)
        }
        eventsTable.appendChild(th)

        let nodeSumLoss = document.createTextNode(sumLoss)

        th = document.createElement("tr")
        let td = document.createElement("td")
        td.setAttribute("colspan", countColsForLast)
        td.appendChild(nodeSumLoss)
        th.appendChild(td)
        eventsTable.appendChild(th)
    }

    block.appendChild(eventsTable)
    tdEventLoss.appendChild(block)

    //----------------------
    thHeader.appendChild(tdNumber)
    thHeader.appendChild(tdName)
    thHeader.appendChild(tdEventLoss)

    table.appendChild(thHeader)

    for (let i = 0; i < data["minimization"].length; i++) {
        let tr = document.createElement("tr")
        let tdHead = document.createElement("td")
        let textTdHead = document.createTextNode(data["minimization"][i][0])

        tr = document.createElement("tr")
        let td = document.createElement("td")
        let text = document.createTextNode(i + 1 + ".0")
        td.appendChild(text)
        tr.appendChild(td)
        td = document.createElement("td")
        text = document.createTextNode("Название стратегии")
        td.appendChild(text)
        tr.appendChild(td)
        table.appendChild(tr)

        // Интенсивность
        tr = document.createElement("tr")
        td = document.createElement("td")
        text = document.createTextNode(i + 1 + ".1")
        td.appendChild(text)
        tr.appendChild(td)
        td = document.createElement("td")
        text = document.createTextNode("Интенсивность возникновения i-го события")
        td.appendChild(text)
        tr.appendChild(td)
        table.appendChild(tr)

        // Вероятность
        tr = document.createElement("tr")
        td = document.createElement("td")
        text = document.createTextNode(i + 1 + ".2")
        td.appendChild(text)
        tr.appendChild(td)
        td = document.createElement("td")
        text = document.createTextNode("Вероятность наступления i-го события")
        td.appendChild(text)
        tr.appendChild(td)
        table.appendChild(tr)

        // Риск
        tr = document.createElement("tr")
        td = document.createElement("td")
        text = document.createTextNode(i + 1 + ".3")
        td.appendChild(text)
        tr.appendChild(td)
        td = document.createElement("td")
        text = document.createTextNode("Риск наступления i-го события")
        td.appendChild(text)
        tr.appendChild(td)
        table.appendChild(tr)

        // База
        tr = document.createElement("tr")
        td = document.createElement("td")
        text = document.createTextNode(i + 1 + ".4")
        td.appendChild(text)
        tr.appendChild(td)
        td = document.createElement("td")
        text = document.createTextNode("База для расчета упущенной выгоды компании")
        td.appendChild(text)
        tr.appendChild(td)
        table.appendChild(tr)

        // Потеря выручки
        tr = document.createElement("tr")
        td = document.createElement("td")
        text = document.createTextNode(i + 1 + ".5")
        td.appendChild(text)
        tr.appendChild(td)
        td = document.createElement("td")
        text = document.createTextNode("Потеря выручки компании в результате наступления i-го события")
        td.appendChild(text)
        tr.appendChild(td)
        table.appendChild(tr)

        // Общая потеря дохода компании
        tr = document.createElement("tr")
        td = document.createElement("td")
        text = document.createTextNode(i + 1 + ".6")
        td.appendChild(text)
        tr.appendChild(td)
        td = document.createElement("td")
        text = document.createTextNode("Общая потеря дохода компании в результате наступления i-го события")
        td.appendChild(text)
        tr.appendChild(td)
        table.appendChild(tr)
    }
}

function printTableOfEventsCharacteristics(data) {
    let table = document.getElementById("tableEventsCharacteristics")
    document.getElementById("matrixEventsCharacteristics").removeAttribute("class")

    //Шапка таблицы(надписи)
    let thHeader = document.createElement("tr")
    let tdNumber = document.createElement("td")
    let tdName = document.createElement("td")
    let tdEventLoss = document.createElement("td")

    tdNumber.setAttribute("class", "headerOfTable")
    tdName.setAttribute("class", "headerOfTable param")

    let textNumber = document.createTextNode("№")
    let textName = document.createTextNode("Имя параметра")
    let textEventLoss = document.createTextNode("События, провоцирующие возникновение риска")

    tdNumber.appendChild(textNumber)
    tdName.appendChild(textName)
    let countColsForLast = data["event"].length
    tdEventLoss.setAttribute("rowspan", 7)

    let subMatrixBlock = document.createElement("div")
    subMatrixBlock.setAttribute("class", "subMatrixBlock3")
    let eventsTable = document.createElement("table")
    eventsTable.setAttribute("class", "firstSubMatrix")
    let textRow = document.createElement("tr")
    let textCell = document.createElement("td")
    textCell.setAttribute("colspan", countColsForLast)
    textCell.appendChild(textEventLoss)
    textCell.setAttribute("class", "headerOfTable")
    textRow.appendChild(textCell)
    eventsTable.appendChild(textRow)
    let th = document.createElement("tr")
    for (let i = 0; i < data["event"].length; i++) {
        let td = document.createElement("td")
        let name = document.createTextNode(data["event"][i][0])
        td.appendChild(name)
        th.appendChild(td)
    }
    eventsTable.appendChild(th);
    th = document.createElement("tr")
    for (let cols = 0; cols < data["event"].length; cols++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["event"][cols][1])
        td.appendChild(text)
        th.appendChild(td)
    }
    eventsTable.appendChild(th)
    th = document.createElement("tr")
    for (let cols = 0; cols < data["event"].length; cols++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["event"][cols][2])
        td.appendChild(text)
        th.appendChild(td)
    }
    eventsTable.appendChild(th)
    th = document.createElement("tr")
    for (let cols = 0; cols < data["event"].length; cols++) {
        let td = document.createElement("td")
        let text = document.createTextNode(round(data["event"][cols][2] * data["event"][cols][1], 3))
        td.appendChild(text)
        th.appendChild(td)
    }
    eventsTable.appendChild(th)
    th = document.createElement("tr")
    for (let cols = 0; cols < data["event"].length; cols++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["base"])
        td.appendChild(text)
        th.appendChild(td)
    }
    eventsTable.appendChild(th)
    th = document.createElement("tr")
    for (let cols = 0; cols < data["event"].length; cols++) {
        let td = document.createElement("td")
        let text = document.createTextNode(round(data["base"] * data["event"][cols][2] * data["event"][cols][1], 0))
        td.appendChild(text)
        th.appendChild(td)
    }
    eventsTable.appendChild(th)

    subMatrixBlock.appendChild(eventsTable)
    tdEventLoss.appendChild(subMatrixBlock)


    thHeader.appendChild(tdNumber)
    thHeader.appendChild(tdName)
    thHeader.appendChild(tdEventLoss)

    table.appendChild(thHeader)

    //Интесивность
    let tr = document.createElement("tr")
    let td = document.createElement("td")
    let text = document.createTextNode("1")
    td.appendChild(text)
    tr.appendChild(td)
    td = document.createElement("td")
    text = document.createTextNode("Интенсивность возникновения i-го события")
    td.appendChild(text)
    tr.appendChild(td)
    table.appendChild(tr)

    //Вероятность
    tr = document.createElement("tr")
    td = document.createElement("td")
    text = document.createTextNode("2")
    td.appendChild(text)
    tr.appendChild(td)
    td = document.createElement("td")
    text = document.createTextNode("Вероятность наступления i-го события")
    td.appendChild(text)
    tr.appendChild(td)
    table.appendChild(tr)

    //Риск наступления
    tr = document.createElement("tr")
    td = document.createElement("td")
    text = document.createTextNode("3")
    td.appendChild(text)
    tr.appendChild(td)
    td = document.createElement("td")
    text = document.createTextNode("Риск наступления i-го события")
    td.appendChild(text)
    tr.appendChild(td)
    table.appendChild(tr)

    //База для расчета упущенной выгоды компании
    tr = document.createElement("tr")
    td = document.createElement("td")
    text = document.createTextNode("4")
    td.appendChild(text)
    tr.appendChild(td)
    td = document.createElement("td")
    text = document.createTextNode("База для расчета упущенной выгоды компании")
    td.appendChild(text)
    tr.appendChild(td)
    table.appendChild(tr)

    //Выгода упущенная компанией из-за снижения выручки
    tr = document.createElement("tr")
    td = document.createElement("td")
    text = document.createTextNode("5")
    td.appendChild(text)
    tr.appendChild(td)
    td = document.createElement("td")
    text = document.createTextNode("Выгода упущенная компанией из-за снижения выручки в результате i-го события")
    td.appendChild(text)
    tr.appendChild(td)
    table.appendChild(tr)
}

// fills the 'data' array by the specified key with data from the table
function tableEntry(nameTable, nameData, data) {
    let tableRisk = document.getElementById(nameTable)

    data[nameData] = []
    let currRows = tableRisk.getElementsByTagName("tr")

    for (let j = 0; j < currRows.length; j++) {
        data[nameData][j] = []
        let cells = currRows[j].getElementsByTagName("td")

        for (let k = 0; k < cells.length - 1; k++) {
            if ((k === 0) || (nameData === "minimization" && k === 1)) {
                data[nameData][j][k] = cells[k].textContent
            } else {
                data[nameData][j][k] = Number(cells[k].textContent)
            }
        }
    }
}


let myNodelist = document.getElementsByTagName("tr")
for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span")
    let txt = document.createTextNode("\u00D7")
    span.className = "close"
    span.appendChild(txt)
    myNodelist[i].appendChild(span)
}

let close = document.getElementsByClassName("close")
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement
        div.style.display = "none"
    }
}

// adds new event
function newEvent() {
    let tr = document.createElement("tr")
    let inputEventName = document.getElementById("inputEventName").value
    let inputEventIntensity = document.getElementById("inputEventIntensity").value
    let inputEventProbability = document.getElementById("inputEventProbability").value
    let textName = document.createTextNode(inputEventName)
    let textIntensive = document.createTextNode(inputEventIntensity)
    let textProbability = document.createTextNode(inputEventProbability)
    let name = document.createElement("td")
    let intensive = document.createElement("td")
    let probability = document.createElement("td")
    name.appendChild(textName)
    name.setAttribute("class", "eventName")
    intensive.appendChild(textIntensive)
    probability.appendChild(textProbability)
    tr.appendChild(name)
    tr.appendChild(intensive)
    tr.appendChild(probability)
    if (inputEventName === "" || inputEventIntensity === "" || inputEventProbability === "") {
        alert("Необходимо заполнить все поля!")
    } else {
        if (!isNaN(inputEventIntensity) && !isNaN(inputEventProbability) && (0 <= inputEventProbability) && (inputEventProbability <= 1) && (Number(inputEventIntensity) * Number(inputEventProbability) <= 1)) {
            document.getElementById("tableEvent").appendChild(tr)
            document.getElementById("tableEvent").removeAttribute("class")
        } else {
            alert("Введите корректные данные!");
        }
    }
    document.getElementById("inputEventName").value = ""
    document.getElementById("inputEventIntensity").value = ""
    document.getElementById("inputEventProbability").value = ""
    createCloseButton(tr)
}

function createCloseButton(tr) {
    let closeButton = document.createElement("td")
    let spanForClose = document.createElement("span")
    let txt = document.createTextNode("\u00D7")
    spanForClose.appendChild(txt)
    spanForClose.className = "close"
    closeButton.appendChild(spanForClose)
    closeButton.className = "lastTd"
    tr.appendChild(closeButton)

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement
            div.setAttribute("class", "deleteClass")
            const deleteElement = document.querySelector(".deleteClass")
            const parent = deleteElement.parentNode
            parent.removeChild(deleteElement)
        }
    }
}

// adds new strategi of minimization
function newMinimization(data) {
    let tr = document.createElement("tr")
    let inputNameMinimization = document.getElementById("inputNameMinimization").value
    let inputRiskStrategy = document.getElementById("inputWhatEventThisStrategy").value
    let inputCostMinimization = document.getElementById("inputCostMinimization").value
    let inputPowerAffect = document.getElementById("inputPowerAffect").value
    let textName = document.createTextNode(inputNameMinimization)
    let textRiskStrategy = document.createTextNode(inputRiskStrategy)
    let textCost = document.createTextNode(inputCostMinimization)
    let textPowerAffect = document.createTextNode(inputPowerAffect)
    let name = document.createElement("td")
    let riskStrategy = document.createElement("td")
    let cost = document.createElement("td")
    let powerAffect = document.createElement("td")
    name.appendChild(textName)
    riskStrategy.appendChild(textRiskStrategy)
    cost.appendChild(textCost)
    powerAffect.appendChild(textPowerAffect)
    tr.appendChild(name)
    tr.appendChild(riskStrategy)
    tr.appendChild(cost)
    tr.appendChild(powerAffect)
    if (inputRiskStrategy === "Выбор события") {
        alert("Выберите событие!")
    } else if (inputNameMinimization === "" || inputCostMinimization === "" || inputPowerAffect === "") {
        alert("Необходимо заполнить все поля!")
    } else {
        if (!isNaN(inputCostMinimization) && !isNaN(inputPowerAffect) && Number(inputCostMinimization) <= Number(document.getElementById("baseValue").textContent)) {
            document.getElementById("tableMinimization").appendChild(tr);
            document.getElementById("tableMinimization").removeAttribute("class");
        } else {
            alert("Введите корректные данные!");
        }
    }
    document.getElementById("inputNameMinimization").value = ""
    document.getElementById("inputCostMinimization").value = ""
    document.getElementById("inputPowerAffect").value = ""
    createCloseButton(tr)
}

// adds a base for calculations and a profitability threshold
function newBase() {
    let inputBase = document.getElementById("inputBase").value
    let inputRent = document.getElementById("inputRent").value
    if (inputBase === "" && inputRent === "") {
        alert("Необходимо заполнить все поля!");
    } else {
        if (!isNaN(inputBase) && !isNaN(inputRent) && (Number(inputRent) <= Number(inputBase))) {
            document.getElementById("baseValue").innerText = document.createTextNode(inputBase).nodeValue;
            document.getElementById("rentValue").innerText = document.createTextNode(inputRent).nodeValue;
            document.getElementById("forBase").removeAttribute("class");
            document.getElementById("forRent").removeAttribute("class");
            document.getElementById("addBtnBase").innerText = "Обновить";
        } else {
            alert("Введите корректные данные!");
        }
    }
    document.getElementById("inputBase").value = ""
    document.getElementById("inputRent").value = ""
}


function creatingTableWithLostProfits(data) {
    const table = document.getElementById("tableLostProfits")
    table.removeAttribute("class")
    let th = document.createElement("th")
    let tdColumnNumber = document.createElement("td")
    let tdNameParam = document.createElement("td")
    tdColumnNumber.appendChild(document.createTextNode("Number"))
    tdNameParam.appendChild(document.createTextNode("Name param"))

    th.appendChild(tdColumnNumber)

    table.appendChild(th)
}

function drawStrategy() {
    strategyNames = document.getElementsByClassName("eventName")
    document.getElementById("divEventTable").removeAttribute("class")
    document.getElementById("idForMinimization").removeAttribute("class")
    document.getElementById("divSaveEvent").setAttribute("class", "displayNone")
    document.getElementById("idForEvent").setAttribute("class", "displayNone")
    document.getElementById("idForBase").setAttribute("class", "displayNone")
    document.getElementById("divEventTable").setAttribute("style", "margin-top: 15px")
    let selector = document.getElementById("inputWhatEventThisStrategy")
    for (let i = 0; i < strategyNames.length; i++) {
        let option = document.createElement("option")
        option.innerHTML = strategyNames[i].textContent
        selector.appendChild(option)
    }
}
