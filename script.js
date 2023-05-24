function consoleTable() {
    let data = {}
    data['base'] = Number(document.getElementById("baseValue").textContent)
    tableEntry("tableEvent", "event", data)
    tableEntry("tableMinimization", "minimization", data)
    let table = document.getElementById("tableBodyAltLoss")
    table.innerHTML = '';
    console.log(data)
    printTableAltLoss(data)
    printTableForRiskManagerStrategy(data)
}

function printTableForRiskManagerStrategy(data) {
    let table = document.getElementById("tableCalculationParametersStrategicRiskManagementOngoingProject")
    document.getElementById("calculationParametersStrategicRiskManagementOngoingProject").removeAttribute("class")
    //Шапка таблицы(надписи)
    let thHeader = document.createElement('tr')
    let tdNumber = document.createElement("td")
    let tdName = document.createElement("td")
    let tdEventLoss = document.createElement("td")

    let textNumber = document.createTextNode("№")
    let textName = document.createTextNode("Имя параметра")
    let textEventLoss = document.createTextNode("События, провоцирующие возникновению проектного риска")

    tdNumber.appendChild(textNumber)
    tdName.appendChild(textName)
    tdEventLoss.appendChild(textEventLoss)

    let countColsForLast = data['event'].length
    tdNumber.setAttribute("rowspan", 2)
    tdName.setAttribute("rowspan", 2)
    tdEventLoss.setAttribute("colspan", countColsForLast)

    thHeader.appendChild(tdNumber)
    thHeader.appendChild(tdName)
    thHeader.appendChild(tdEventLoss)

    table.appendChild(thHeader)

    for (let i = 0; i < data["minimization"].length; i++) {
        let tr = document.createElement("tr")
        let tdHead = document.createElement("td")
        tdHead.setAttribute("colspan", countColsForLast + 2)
        let textTdHead = document.createTextNode(data["minimization"][i][0])
        tdHead.appendChild(textTdHead)
        tr.appendChild(tdHead)
        table.appendChild(tr)

        // Интенсивность
        tr = document.createElement("tr")
        let td = document.createElement("td")
        let text = document.createTextNode(i + 1 + ".1")
        td.appendChild(text)
        tr.appendChild(td)
        td = document.createElement("td")
        text = document.createTextNode("Интенсивность возникновения i-го события")
        td.appendChild(text)
        tr.appendChild(td)

        for (let j = 0; j < data["event"].length; j++) {
            td = document.createElement("td")
            if (data["minimization"][i][1] == data["event"][j][0])
                text = document.createTextNode(data["event"][j][1] - 1)
            else
                text = document.createTextNode(data["event"][j][1])
            td.appendChild(text)
            tr.appendChild(td)
        }
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

        for (let j = 0; j < data["event"].length; j++) {
            td = document.createElement("td")
            text = document.createTextNode(data["event"][j][2])
            td.appendChild(text)
            tr.appendChild(td)
        }
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

        for (let j = 0; j < data["event"].length; j++) {
            td = document.createElement("td")
            let number = 0
            if (data["minimization"][i][1] == data["event"][j][0])
                text = document.createTextNode((data["event"][j][1] - 1) * data["event"][j][2])
            else
                text = document.createTextNode(data["event"][j][1] * data["event"][j][2])
            td.appendChild(text)
            tr.appendChild(td)
        }
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

        for (let j = 0; j < data["event"].length; j++) {
            td = document.createElement("td")
            text = document.createTextNode(data["base"])
            td.appendChild(text)
            tr.appendChild(td)
        }
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

        let sumLoss = 0
        for (let j = 0; j < data["event"].length; j++) {
            td = document.createElement("td")
            if (data["minimization"][i][1] == data["event"][j][0])
                text = document.createTextNode((data["event"][j][1] - 1) * (data["event"][j][2]) * data["base"])
            else
                text = document.createTextNode((data["event"][j][1]) * (data["event"][j][2]) * data["base"])
            sumLoss += Number(text.textContent)
            td.appendChild(text)
            tr.appendChild(td)
        }
        console.log(sumLoss)
        table.appendChild(tr)
        let nodeSumLoss = document.createTextNode(sumLoss)

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

        td = document.createElement("td")
        td.setAttribute("colspan", countColsForLast)
        td.appendChild(nodeSumLoss)
        tr.appendChild(td)
        table.appendChild(tr)
    }
}

function printTableAltLoss(data) {
    let table = document.getElementById("tableBodyAltLoss")
    document.getElementById("matrixAlternativeLosses").removeAttribute("class")

    //Шапка таблицы(надписи)
    let thHeader = document.createElement('tr')
    let tdNumber = document.createElement("td")
    let tdName = document.createElement("td")
    let tdEventLoss = document.createElement("td")

    let textNumber = document.createTextNode("№")
    let textName = document.createTextNode("Имя параметра")
    let textEventLoss = document.createTextNode("События, провоцирующие возникновение риска")

    tdNumber.appendChild(textNumber)
    tdName.appendChild(textName)
    tdEventLoss.appendChild(textEventLoss)

    let countColsForLast = data['event'].length
    tdNumber.setAttribute("rowspan", 2)
    tdName.setAttribute("rowspan", 2)
    tdEventLoss.setAttribute("colspan", countColsForLast)

    thHeader.appendChild(tdNumber)
    thHeader.appendChild(tdName)
    thHeader.appendChild(tdEventLoss)

    table.appendChild(thHeader)

    // Вторая шапка таблицы для стобцов
    let th = document.createElement('tr')
    for (let i = 0; i < data['event'].length; i++) {
        let td = document.createElement("td")
        let name = document.createTextNode(data["event"][i][0])
        td.appendChild(name)
        th.appendChild(td)
    }
    table.appendChild(th);

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
    for (let cols = 0; cols < data['event'].length; cols++) {
        td = document.createElement("td")
        text = document.createTextNode(data["event"][cols][1])
        td.appendChild(text)
        tr.appendChild(td)
    }
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
    for (let cols = 0; cols < data['event'].length; cols++) {
        td = document.createElement("td")
        text = document.createTextNode(data["event"][cols][2])
        td.appendChild(text)
        tr.appendChild(td)
    }
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
    for (let cols = 0; cols < data['event'].length; cols++) {
        td = document.createElement("td")
        text = document.createTextNode(data["event"][cols][2] * data["event"][cols][1])
        td.appendChild(text)
        tr.appendChild(td)
    }
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
    for (let cols = 0; cols < data['event'].length; cols++) {
        td = document.createElement("td")
        text = document.createTextNode(data["base"])
        td.appendChild(text)
        tr.appendChild(td)
    }
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
    for (let cols = 0; cols < data['event'].length; cols++) {
        td = document.createElement("td")
        text = document.createTextNode(data["base"] * data["event"][cols][2] * data["event"][cols][1])
        td.appendChild(text)
        tr.appendChild(td)
    }
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
            if (k === 0) {
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
        alert("You must write something!")
    } else {
        if (!isNaN(inputEventIntensity) && !isNaN(inputEventProbability) && (0 <= inputEventProbability) && (inputEventProbability <= 100)) {
            document.getElementById("tableEvent").appendChild(tr)
            document.getElementById("tableEvent").removeAttribute("class")
        } else {
            alert("Digit please!");
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

function newMinimization() {
    let tr = document.createElement("tr")
    let inputNameMinimization = document.getElementById("inputNameMinimization").value
    let inputRiskStrategy = document.getElementById("inputWhatEventThisStrategy").value
    let inputCostMinimization = document.getElementById("inputCostMinimization").value
    let textName = document.createTextNode(inputNameMinimization)
    let textRiskStrategy = document.createTextNode(inputRiskStrategy)
    let textCost = document.createTextNode(inputCostMinimization)
    let name = document.createElement("td")
    let riskStrategy = document.createElement("td")
    let cost = document.createElement("td")
    name.appendChild(textName)
    riskStrategy.appendChild(textRiskStrategy)
    cost.appendChild(textCost)
    tr.appendChild(name)
    tr.appendChild(riskStrategy)
    tr.appendChild(cost)
    if (inputRiskStrategy === 'Выбор события') {
        alert('Select any event!')
    } else if (inputNameMinimization === '' || inputCostMinimization === '') {
        alert("You must write something!")
    } else {
        if (!isNaN(inputCostMinimization)) {
            document.getElementById("tableMinimization").appendChild(tr);
            document.getElementById("tableMinimization").removeAttribute("class");
        } else {
            alert("Digits please!");
        }
    }
    document.getElementById("inputNameMinimization").value = ""
    document.getElementById("inputCostMinimization").value = ""
    createCloseButton(tr)
}

function newBase() {
    let inputBase = document.getElementById("inputBase").value
    if (inputBase === '') {
        alert("You must write something!");
    } else {
        if (!isNaN(inputBase)) {
            document.getElementById("baseValue").innerText = document.createTextNode(inputBase).nodeValue;
            document.getElementById("forBase").removeAttribute("class");
            document.getElementById("addBtnBase").innerText = "Обновить";
        } else {
            alert("Digits please!");
        }
    }
    document.getElementById("inputBase").value = ""
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
    console.log(strategyNames)
    document.getElementById("divEventTable").removeAttribute("class")
    document.getElementById("idForMinimization").removeAttribute("class")
    document.getElementById("divSaveEvent").setAttribute("class", "displayNone")
    document.getElementById("idForEvent").setAttribute("class", "displayNone")
    document.getElementById("idForBase").setAttribute("class", "displayNone")
    let selector = document.getElementById('inputWhatEventThisStrategy')
    for (let i = 0; i < strategyNames.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = strategyNames[i].textContent
        selector.appendChild(option)
    }
}
