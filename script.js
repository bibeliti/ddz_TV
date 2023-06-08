function consoleTable() {
    let data = {}
    data['base'] = Number(document.getElementById("baseValue").textContent)
    data['rent'] = Number(document.getElementById("rentValue").textContent)
    let koef = []
    koef[0] = 0.5
    koef[1] = 0.7
    koef[2] = 0.8
    koef[3] = 0.9
    data['koef'] = koef

    tableEntry("tableEvent", "event", data)
    tableEntry("tableMinimization", "minimization", data)
    let table = document.getElementById("tableBodyAltLoss")
    table.innerHTML = '';
    console.log(data)
    printTableCalculationProfitsBasicCase(data)
    printTableForRiskManagerStrategy(data)
    printTableAltLoss(data)
    printTableConditionalBenefits(data)
    printTableEconomicEffectsAfterRealizationStrategy(data)
    printTableCalculationEstimatedCharacteristics(data)
    printTableChooseStrategyBySavageCriteria(data)
    printTableChooseStrategyByValdCriteria(data)
    printTableChooseStrategyByGurvicCriteria(data)
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function printTableCalculationEstimatedCharacteristics(data) {
    let table = document.getElementById("tableCalculationEstimatedCharacteristics")
    document.getElementById("CalculationEstimatedCharacteristics").removeAttribute("class")

    let thHeader = document.createElement('tr')
    let tdStrategy = document.createElement("td")
    tdStrategy.setAttribute("id", "headerOfTable")
    thHeader.setAttribute("class", "regulirovochka")

    let countCols = data['event'].length
    let countRows = data['minimization'].length
    tdStrategy.setAttribute("rowspan", 1)

    let textTdStrategy = document.createTextNode("Стратегия")
    let textTdCost = document.createTextNode("Оценки по критерию Гурвица")

    tdStrategy.appendChild(textTdStrategy)

    thHeader.appendChild(tdStrategy)

    let bigTd = document.createElement('td')
    bigTd.setAttribute('colspan', 4)
    bigTd.setAttribute('rowspan', countRows + 2)

    let subMatrixBlock2 = document.createElement('div')
    subMatrixBlock2.setAttribute('class', 'subMatrixBlock2')
    let subMatrix = document.createElement('table')
    subMatrix.setAttribute("class", "SubMatrix")

    let th = document.createElement("tr")
    let td = document.createElement("td")
    td.setAttribute('colspan', 4);
    th.setAttribute('style', 'height: 60px')
    td.appendChild(textTdCost)
    td.setAttribute("id", "headerOfTable")
    th.appendChild(td)
    subMatrix.appendChild(th)

    th = document.createElement("tr")
    th.setAttribute('style', 'height: 60px')

    for (let i = 0; i < data['koef'].length; i++) {
        td = document.createElement("td")
        let text = document.createTextNode('x' + String(i + 1) +  '='  + String(data['koef'][i]))
        td.appendChild(text)
        th.appendChild(td)
    }
    subMatrix.appendChild(th)

    let maxs = document.getElementsByClassName('maximum')
    let mins = document.getElementsByClassName('minimum')

    for (let i = 0; i < countRows; i++) {
        th = document.createElement('tr')
        for (let j = 0; j < data['koef'].length; j++) {
            let value = Number(mins[i].textContent) * data['koef'][j] + Number(maxs[i].textContent) * (1 - data['koef'][j])
            text = document.createTextNode(round(value, 2))
            td = document.createElement("td")
            td.appendChild(text)
            td.setAttribute('class', 'Gurvic')
            th.appendChild(td)
        }
        subMatrix.appendChild(th)
    }
    subMatrixBlock2.appendChild(subMatrix)
    bigTd.appendChild(subMatrixBlock2)
    thHeader.appendChild(bigTd)

    table.appendChild(thHeader)

    let tr

    let height = (41 * countRows + 20) - 41 * (countRows - 1);
    // Основное заполнение таблицы
    for (let i = 0; i < data["minimization"].length; i++) {
        tr = document.createElement("tr")
        if (i == data["minimization"].length - 1) {
            tr.setAttribute('style', 'height: ' + round(height, 2) - 1 + 'px')
        }
        let td = document.createElement("td")
        let text = document.createTextNode(data["minimization"][i][0])
        td.appendChild(text)
        tr.appendChild(td)

        table.appendChild(tr)
    }
}

function printTableChooseStrategyByGurvicCriteria(data) {
    let gurvic = document.getElementsByClassName('Gurvic')

    let max1 = 0
    let gur1 = 0
    for (let i = 0; i < data['minimization'].length; i++) {
        console.log(Number(gurvic[4 * i].textContent) )
        if (Number(gurvic[4 * i].textContent) > max1) {
            max1 = Number(gurvic[4 * i].textContent) 
            gur1 = i
        }
    }

    let max2 = 0
    let gur2 = 0
    for (let i = 0; i < data['minimization'].length; i++) {
        console.log(Number(gurvic[4 * i + 3].textContent) )
        if (Number(gurvic[4 * i].textContent) > max2) {
            max2 = Number(gurvic[4 * i + 3].textContent) 
            gur2 = i
        }
    }

    let table = document.getElementById("tableResults")
    document.getElementById("results").removeAttribute("class")

    let trGurvic1 = document.createElement('tr')

    let num1 = document.createElement('td')
    let criteria1 = document.createElement('td')
    let strategy1 = document.createElement('td')

    let number1 = document.createTextNode('3')
    let criteriaName1 = document.createTextNode('Критерий Гурвица (для оптимистичных и средних оценок)')
    let strategyText1 = document.createTextNode(data['minimization'][gur1][0])

    num1.appendChild(number1)
    criteria1.appendChild(criteriaName1)
    strategy1.appendChild(strategyText1)

    trGurvic1.appendChild(num1)
    trGurvic1.appendChild(criteria1)
    trGurvic1.appendChild(strategy1)

    let trGurvic2 = document.createElement('tr')

    let num2 = document.createElement('td')
    let criteria2 = document.createElement('td')
    let strategy2 = document.createElement('td')

    let number2 = document.createTextNode(' ')
    let criteriaName2 = document.createTextNode('Критерий Гурвица (для пессимистической оценки)')
    let strategyText2 = document.createTextNode(data['minimization'][gur2][0])

    num2.appendChild(number2)
    criteria2.appendChild(criteriaName2)
    strategy2.appendChild(strategyText2)

    trGurvic2.appendChild(num2)
    trGurvic2.appendChild(criteria2)
    trGurvic2.appendChild(strategy2)

    table.appendChild(trGurvic1)
    table.appendChild(trGurvic2)
}

function printTableChooseStrategyByValdCriteria(data) {
    let mode = 'z'

    let table = document.getElementById("tableResults")
    document.getElementById("results").removeAttribute("class")

    let trVald = document.createElement('tr')

    let num = document.createElement('td')
    let criteria = document.createElement('td')
    let strategy = document.createElement('td')

    let number = document.createTextNode('2')
    let criteriaName = document.createTextNode('Критерий Вальда')
    let strategyText = ''

    if (mode === 'z') {
        let max = 0
        for (let i = 0; i < data['lost'].length; i++) {
            let min = -1
            for (let j = 0; j < data['lost'][i].length; j++) {
                if (min === -1 || data['rent'] - data['lost'][i][j] < min) {
                    min = data['rent'] - data['lost'][i][j]
                }
            }
            
            if (max < min) {
                max = min
            }
        }

        for (let i = 0; i < data['lost'].length; i++) {
            let min = -1
            for (let j = 0; j < data['lost'][i].length; j++) {
                if (min === -1 || data['rent'] - data['lost'][i][j] < min) {
                    min = min = data['rent'] - data['lost'][i][j]
                }
            }
            if (min === max) {
                console.log(data['minimization'][i][0])
                strategyText = strategyText.concat(' ',data['minimization'][i][0])
            }
        }
    }

    if (mode === 'h') {
        let max = 0
        for (let i = 0; i < data['lost'][0].length; i++) {
            let min = -1
            for (let j = 0; j < data['lost'].length; j++) {
                if (min === -1 || data['rent'] - data['lost'][j][i] < min) {
                    min = data['rent'] - data['lost'][j][i]
                }
            }
            
            if (max < min) {
                max = min
            }
        }

        for (let i = 0; i < data['lost'][0].length; i++) {
            let min = -1
            for (let j = 0; j < data['lost'].length; j++) {
                if (min === -1 || data['rent'] - data['lost'][j][i] < min) {
                    min = min = data['rent'] - data['lost'][j][i]
                }
            }
            if (min === max) {
                console.log(data['minimization'][i][0])
                strategyText = strategyText.concat(' ',data['minimization'][i][0])
            }
        }
    }

    let strategyName = document.createTextNode(strategyText)

    console.log('Vald ' + strategyText)
    num.appendChild(number)
    criteria.appendChild(criteriaName)
    strategy.appendChild(strategyName)

    trVald.appendChild(num)
    trVald.appendChild(criteria)
    trVald.appendChild(strategy)

    table.appendChild(trVald)
}

function printTableChooseStrategyBySavageCriteria(data) {
    let table = document.getElementById("tableResults")
    document.getElementById("results").removeAttribute("class")

    let trSavage = document.createElement('tr')

    let num = document.createElement('td')
    let criteria = document.createElement('td')
    let strategy = document.createElement('td')

    let strategyName = 'no'
    let min = -1
    for (let i = 0; i < data['lost'].length; i++) {
        let max = 0
        for (let j = 0; j < data['lost'][i].length; j++) {
            if (data['lost'][i][j] > max) {
                max = data['lost'][i][j]
            }
        }
        if (max < min || min === -1) {
            min = max
            for (let j = 0; j < data['lost'][i].length; j++) {
                if (data['lost'][i][j] === min) {
                    strategyName = data['minimization'][i][0]
                    break
                }
            }
        }
    }


    let number = document.createTextNode('1')
    let criteriaName = document.createTextNode('Критерий Сэвиджа')
    let strategyText = document.createTextNode(strategyName)

    num.appendChild(number)
    criteria.appendChild(criteriaName)
    strategy.appendChild(strategyText)

    trSavage.appendChild(num)
    trSavage.appendChild(criteria)
    trSavage.appendChild(strategy)

    table.appendChild(trSavage)
}

function printTableAltLoss(data) {
    let table = document.getElementById("tableCalculationLostProfitsBasicCase")
    document.getElementById("calculationLostProfitsBasicCase").removeAttribute("class")
    // Шапка таблицы
    let thHeader = document.createElement('tr')
    let tdStrategy = document.createElement("td")
    thHeader.setAttribute("class", "regulirovochka")
    let tdCost = document.createElement("td")
    let tdMinValue = document.createElement("td")
    let tdMaxValue = document.createElement("td")
    tdStrategy.setAttribute("id", "headerOfTable")
    tdMinValue.setAttribute("id", "headerOfTable")
    tdMaxValue.setAttribute("id", "headerOfTable")

    let countCols = data['event'].length
    let countRows = data['minimization'].length
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

    let bigTd = document.createElement('td')
    bigTd.setAttribute('colspan', countCols)
    bigTd.setAttribute('rowspan', countRows + 2)

    let subMatrixBlock2 = document.createElement('div')
    subMatrixBlock2.setAttribute('class', 'subMatrixBlock2')
    let subMatrix = document.createElement('table')
    subMatrix.setAttribute("class", "subSubMatrix")

    let th = document.createElement("tr")
    let td = document.createElement("td")
    td.setAttribute('colspan', countCols);
    th.setAttribute('style', 'height: 60px')
    td.appendChild(textTdCost)
    td.setAttribute("id", "headerOfTable")
    th.appendChild(td)
    subMatrix.appendChild(th)

    th = document.createElement("tr")
    th.setAttribute('style', 'height: 60px')

    for (let i = 0; i < countCols; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["event"][i][0])
        td.appendChild(text)
        th.appendChild(td)
    }
    subMatrix.appendChild(th)
    for (let i = 0; i < countRows; i++) {
        th = document.createElement('tr')
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

function printTableConditionalBenefits(data) {
    let table = document.getElementById("tableCalculationConditionalBenefits")
    document.getElementById("calculationConditionalBenefits").removeAttribute("class")
    // Шапка таблицы
    let thHeader = document.createElement('tr')
    let tdStrategy = document.createElement("td")
    thHeader.setAttribute("class", "regulirovochka")
    let tdCost = document.createElement("td")
    let tdMinValue = document.createElement("td")
    let tdMaxValue = document.createElement("td")
    tdStrategy.setAttribute("id", "headerOfTable")
    tdMinValue.setAttribute("id", "headerOfTable")
    tdMaxValue.setAttribute("id", "headerOfTable")

    let countCols = data['event'].length
    let countRows = data['minimization'].length
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

    let bigTd = document.createElement('td')
    bigTd.setAttribute('colspan', countCols)
    bigTd.setAttribute('rowspan', countRows + 2)

    let subMatrixBlock2 = document.createElement('div')
    subMatrixBlock2.setAttribute('class', 'subMatrixBlock2')
    let subMatrix = document.createElement('table')
    subMatrix.setAttribute("class", "subSubMatrix")

    let th = document.createElement("tr")
    let td = document.createElement("td")
    td.setAttribute('colspan', countCols);
    th.setAttribute('style', 'height: 60px')
    td.appendChild(textTdCost)
    td.setAttribute("id", "headerOfTable")
    th.appendChild(td)
    subMatrix.appendChild(th)

    th = document.createElement("tr")
    th.setAttribute('style', 'height: 60px')

    for (let i = 0; i < countCols; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["event"][i][0])
        td.appendChild(text)
        th.appendChild(td)
    }
    subMatrix.appendChild(th)
    for (let i = 0; i < countRows; i++) {
        th = document.createElement('tr')
        for (let j = 0; j < countCols; j++) {
            text = document.createTextNode(data['rent'] - data["lost"][i][j])
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
            text = document.createTextNode(round(data['rent'] - data["lost"][i][j], 2))
            if (Number(text.textContent) > maxValue)
                maxValue = Number(text.textContent)
            if (Number(text.textContent) < minValue)
                minValue = Number(text.textContent)
        }

        // Минимальное в строке
        td = document.createElement("td")
        text = document.createTextNode(round(minValue, 2))
        td.appendChild(text)
        td.setAttribute('class', 'minimum')
        tr.appendChild(td)

        // Максимальное в строке
        td = document.createElement("td")
        text = document.createTextNode(round(maxValue, 2))
        td.appendChild(text)
        td.setAttribute('class', 'maximum')
        tr.appendChild(td)
        table.appendChild(tr)
    }
}

function printTableEconomicEffectsAfterRealizationStrategy(data) {
    let table = document.getElementById("tableCalculationEconomicEffectsAfterRealizationStrategy")
    document.getElementById("CalculationEconomicEffectsAfterRealizationStrategy").removeAttribute("class")
    // Шапка таблицы
    let thHeader = document.createElement('tr')
    let tdStrategy = document.createElement("td")
    tdStrategy.setAttribute("id", "headerOfTable")
    thHeader.setAttribute("class", "regulirovochka")
    let tdMaxValue = document.createElement("td")
    tdMaxValue.setAttribute("id", "headerOfTable")

    let countCols = data['event'].length
    let countRows = data['minimization'].length
    tdStrategy.setAttribute("rowspan", 1)
    tdMaxValue.setAttribute("rowspan", 1)

    let textTdStrategy = document.createTextNode("Стратегия")
    let textTdCost = document.createTextNode("Экономические последствия рисков реализации стратегии")
    let textTdMaxValue = document.createTextNode("Максимальное значение (Max)")

    tdStrategy.appendChild(textTdStrategy)
    tdMaxValue.appendChild(textTdMaxValue)

    thHeader.appendChild(tdStrategy)

    let bigTd = document.createElement('td')
    bigTd.setAttribute('colspan', countCols)
    bigTd.setAttribute('rowspan', countRows + 2)

    let subMatrixBlock2 = document.createElement('div')
    subMatrixBlock2.setAttribute('class', 'subMatrixBlock2')
    let subMatrix = document.createElement('table')
    subMatrix.setAttribute("class", "subSubMatrix")

    let th = document.createElement("tr")
    let td = document.createElement("td")
    td.setAttribute('colspan', countCols);
    th.setAttribute('style', 'height: 60px')
    td.appendChild(textTdCost)
    td.setAttribute("id", "headerOfTable")
    th.appendChild(td)
    subMatrix.appendChild(th)

    th = document.createElement("tr")
    th.setAttribute('style', 'height: 60px')

    for (let i = 0; i < countCols; i++) {
        td = document.createElement("td")
        let text = document.createTextNode(data["event"][i][0])
        td.appendChild(text)
        th.appendChild(td)
    }
    subMatrix.appendChild(th)

    let minValues = []

    for (let i = 0; i < data["lost"].length; i++) {
        min = -1
        for (let j = 0; j < data["lost"].length; j++) {
            if (data['lost'][j][i] < min || min === -1) {
                min = data['lost'][j][i]
            }
        }
        minValues[i] = min
    }

    for (let i = 0; i < countRows; i++) {
        th = document.createElement('tr')
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

function printTableForRiskManagerStrategy(data) {
    let table = document.getElementById("tableCalculationParametersStrategicRiskManagementOngoingProject")
    document.getElementById("calculationParametersStrategicRiskManagementOngoingProject").removeAttribute("class")
    //Шапка таблицы(надписи)
    let thHeader = document.createElement('tr')
    thHeader.setAttribute("class", "perebivka")
    let tdNumber = document.createElement("td")
    let tdName = document.createElement("td")
    let tdEventLoss = document.createElement("td")
    tdName.setAttribute("id", "headerOfTable")
    tdName.setAttribute("style", "width:35%")
    tdNumber.setAttribute("id", "headerOfTable")

    let textNumber = document.createTextNode("№")
    let textName = document.createTextNode("Имя параметра")
    let textEventLoss = document.createTextNode("События, провоцирующие возникновению проектного риска")

    tdNumber.appendChild(textNumber)
    tdName.appendChild(textName)

    let countColsForLast = data['event'].length

    // tdNumber.setAttribute("rowspan", 2)
    // tdName.setAttribute("rowspan", 2)
    tdEventLoss.setAttribute("rowspan", data["minimization"].length * 7 + 1)

    let block = document.createElement('div')
    block.setAttribute('class', 'subMatrixBlock')
    let eventsTable = document.createElement('table')
    eventsTable.setAttribute('class', 'subSubMatrix')
    let textRow = document.createElement('tr')
    let textCell = document.createElement('td')
    textCell.setAttribute('colspan', countColsForLast)
    textCell.appendChild(textEventLoss)
    textCell.setAttribute("id", "headerOfTable")
    textCell.setAttribute('class', 'perebivka')
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

        th = document.createElement('tr')
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

        th = document.createElement('tr')
        for (let j = 0; j < data["event"].length; j++) {
            let td = document.createElement("td")
            let text
            if (data["minimization"][i][1] == data["event"][j][0])
                text = document.createTextNode(round((data["event"][j][2]) * (data["minimization"][i][3]), 2))
            else
                text = document.createTextNode(data["event"][j][2])
            td.appendChild(text)
            th.appendChild(td)
        }
        eventsTable.appendChild(th)

        th = document.createElement('tr')
        for (let j = 0; j < data["event"].length; j++) {
            let td = document.createElement("td")
            let number = 0
            let text
            if (data["minimization"][i][1] == data["event"][j][0])
                text = document.createTextNode(round((data["event"][j][1] - 1) * (data["event"][j][2]) * (data["minimization"][i][3]), 2))
            else
                text = document.createTextNode(round(data["event"][j][1] * data["event"][j][2], 2))
            td.appendChild(text)
            th.appendChild(td)
        }
        eventsTable.appendChild(th)

        th = document.createElement('tr')
        for (let j = 0; j < data["event"].length; j++) {
            let td = document.createElement("td")
            let text = document.createTextNode(data["base"])
            td.appendChild(text)
            th.appendChild(td)
        }
        eventsTable.appendChild(th)

        th = document.createElement('tr')
        let sumLoss = 0

        data["lost"][i] = []

        for (let j = 0; j < data["event"].length; j++) {
            let td = document.createElement("td")
            let text
            if (data["minimization"][i][1] == data["event"][j][0])
                text = document.createTextNode(round((data["event"][j][1] - 1) * (data["event"][j][2]) * (data["minimization"][i][3]) * data["base"], 2))
            else
                text = document.createTextNode(round(data["event"][j][1] * data["event"][j][2] * data["base"], 2))
            sumLoss += Number(text.textContent)
            data["lost"][i][j] = round(Number(text.textContent), 2)
            td.appendChild(text)
            th.appendChild(td)
        }
        eventsTable.appendChild(th)

        let nodeSumLoss = document.createTextNode(sumLoss)

        th = document.createElement('tr')
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

function printTableCalculationProfitsBasicCase(data) {
    let table = document.getElementById("tableBodyAltLoss")
    document.getElementById("matrixAlternativeLosses").removeAttribute("class")

    //Шапка таблицы(надписи)
    let thHeader = document.createElement('tr')
    let tdNumber = document.createElement("td")
    let tdName = document.createElement("td")
    tdName.setAttribute("class", "param")
    let tdEventLoss = document.createElement("td")

    tdNumber.setAttribute("id", "headerOfTable")
    tdName.setAttribute("id", "headerOfTable")

    let textNumber = document.createTextNode("№")
    let textName = document.createTextNode("Имя параметра")
    let textEventLoss = document.createTextNode("События, провоцирующие возникновение риска")

    tdNumber.appendChild(textNumber)
    tdName.appendChild(textName)
    let countColsForLast = data['event'].length
    tdEventLoss.setAttribute("rowspan", 7)

    let subMatrixBlock = document.createElement('div')
    subMatrixBlock.setAttribute('class', 'subMatrixBlock3')
    let eventsTable = document.createElement('table')
    eventsTable.setAttribute("class", "firstSubMatrix")
    eventsTable.setAttribute("id", "sorry")
    let textRow = document.createElement('tr')
    let textCell = document.createElement('td')
    textCell.setAttribute('colspan', countColsForLast)
    textCell.appendChild(textEventLoss)
    textCell.setAttribute("id", "headerOfTable")
    textRow.appendChild(textCell)
    eventsTable.appendChild(textRow)
    let th = document.createElement('tr')
    for (let i = 0; i < data['event'].length; i++) {
        let td = document.createElement("td")
        let name = document.createTextNode(data["event"][i][0])
        td.appendChild(name)
        th.appendChild(td)
    }
    eventsTable.appendChild(th);
    th = document.createElement('tr')
    for (let cols = 0; cols < data['event'].length; cols++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["event"][cols][1])
        td.appendChild(text)
        th.appendChild(td)
    }
    eventsTable.appendChild(th)
    th = document.createElement('tr')
    for (let cols = 0; cols < data['event'].length; cols++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["event"][cols][2])
        td.appendChild(text)
        th.appendChild(td)
    }
    eventsTable.appendChild(th)
    th = document.createElement('tr')
    for (let cols = 0; cols < data['event'].length; cols++) {
        let td = document.createElement("td")
        let text = document.createTextNode(round(data["event"][cols][2] * data["event"][cols][1], 2))
        td.appendChild(text)
        th.appendChild(td)
    }
    eventsTable.appendChild(th)
    th = document.createElement('tr')
    for (let cols = 0; cols < data['event'].length; cols++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["base"])
        td.appendChild(text)
        th.appendChild(td)
    }
    eventsTable.appendChild(th)
    th = document.createElement('tr')
    for (let cols = 0; cols < data['event'].length; cols++) {
        let td = document.createElement("td")
        let text = document.createTextNode(round(data["base"] * data["event"][cols][2] * data["event"][cols][1], 2))
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


function tableEntry(nameTable, nameData, data) {
    let tableRisk = document.getElementById(nameTable)

    data[nameData] = []
    let currRows = tableRisk.getElementsByTagName('tr')

    for (let j = 0; j < currRows.length; j++) {
        data[nameData][j] = []
        let cells = currRows[j].getElementsByTagName('td')

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
    name.setAttribute('class', 'eventName')
    intensive.appendChild(textIntensive)
    probability.appendChild(textProbability)
    tr.appendChild(name)
    tr.appendChild(intensive)
    tr.appendChild(probability)
    if (inputEventName === '' || inputEventIntensity === '' || inputEventProbability === '') {
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
            div.setAttribute('class', 'deleteClass')
            const deleteElement = document.querySelector('.deleteClass')
            const parent = deleteElement.parentNode
            parent.removeChild(deleteElement)
        }
    }
}

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
    if (inputRiskStrategy === 'Выбор события') {
        alert('Выберите событие!')
    } else if (inputNameMinimization === '' || inputCostMinimization === '' || inputPowerAffect === '') {
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

function newBase() {
    let inputBase = document.getElementById("inputBase").value
    let inputRent = document.getElementById("inputRent").value
    if (inputBase === '' && inputRent === '') {
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
    table.removeAttribute('class')
    let th = document.createElement('th')
    let tdColumnNumber = document.createElement('td')
    let tdNameParam = document.createElement('td')
    tdColumnNumber.appendChild(document.createTextNode("Number"))
    tdNameParam.appendChild(document.createTextNode("Name param"))

    th.appendChild(tdColumnNumber)

    table.appendChild(th)
}

function drawStrategy() {
    strategyNames = document.getElementsByClassName('eventName')
    document.getElementById("divEventTable").removeAttribute("class")
    document.getElementById("idForMinimization").removeAttribute("class")
    document.getElementById("divSaveEvent").setAttribute("class", "displayNone")
    document.getElementById("idForEvent").setAttribute("class", "displayNone")
    document.getElementById("idForBase").setAttribute("class", "displayNone")
    document.getElementById('divEventTable').setAttribute('style', 'margin-top: 15px')
    let selector = document.getElementById('inputWhatEventThisStrategy')
    for (let i = 0; i < strategyNames.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = strategyNames[i].textContent
        selector.appendChild(option)
    }
}
