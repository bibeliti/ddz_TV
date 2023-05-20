function consoleTable() {
    let data = {}
    data['base'] = Number(document.getElementById("baseValue").textContent)
    tableEntry("tableEvent", "event", data)
    tableEntry("tableMinimization", "minimization", data)
    let table = document.getElementById("tableBodyAltLoss")
    table.innerHTML = '';
    printTableAltLoss(data)
}

function printTableAltLoss(data) {
    let table = document.getElementById("tableBodyAltLoss")
    document.getElementById("matrixAlternativeLosses").removeAttribute("class")

    //Шапка таблицы(надписи)
    let thHeader = document.createElement('tr')
    let tdStrategy = document.createElement("td")
    let tdLoss = document.createElement("td")
    let tdAllLoss = document.createElement("td")

    let textStrategy = document.createTextNode("Стратегия")
    let textLoss = document.createTextNode("Убытки от наступления события")
    let textAllLoss = document.createTextNode("Общие потери")

    tdStrategy.appendChild(textStrategy)
    tdLoss.appendChild(textLoss)
    tdAllLoss.appendChild(textAllLoss)
    let countColsForMiddle = data['event'].length
    tdLoss.setAttribute("colspan", countColsForMiddle)

    thHeader.appendChild(tdStrategy)
    thHeader.appendChild(tdLoss)
    thHeader.appendChild(tdAllLoss)

    table.appendChild(thHeader)

    // Вторая шапка таблицы для стобцов
    let th = document.createElement('tr')
    for (let i = 0; i < data['event'].length + 2; i++) {
        let td = document.createElement("td")
        if (i !== 0 && i !== data['event'].length + 1) {
            let name = document.createTextNode(data["event"][i - 1][0])
            td.appendChild(name)
        }
        th.appendChild(td)
    }
    table.appendChild(th);


    //Тело таблицы
    for (let rows = 0; rows < data['minimization'].length; rows++) {
        let tr = document.createElement("tr")
        for (let cols = 0; cols < data['event'].length + 2; cols++) {
            let text
            let td = document.createElement("td")
            if (cols === 0) {
                text = document.createTextNode(data["minimization"][rows][0])
            } else if (cols === data['event'].length + 1) {
                text = document.createTextNode("99999")
            } else {
                let lossMoneyNumber = data['base'] * data['event'][cols - 1][3]
                lossMoneyNumber = lossMoneyNumber.toString()
                text = document.createTextNode(lossMoneyNumber)
            }
            td.appendChild(text)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}


function tableEntry(nameTable, nameData, data) {
    let tableRisk = document.getElementById(nameTable)

    data[nameData] = []
    let currRows = tableRisk.getElementsByTagName('tr')

    for (let j = 0; j < currRows.length; j++) {
        data[nameData][j] = []
        let cells = currRows[j].getElementsByTagName('td')

        for (let k = 0; k < cells.length - 1; k++) {
            if( k === 0){
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
    let inputEventOccurrence = document.getElementById("inputEventOccurrence").value
    let textName = document.createTextNode(inputEventName)
    let textIntensive = document.createTextNode(inputEventIntensity)
    let textProbability = document.createTextNode(inputEventProbability)
    let textOccurrence = document.createTextNode(inputEventOccurrence)
    let name = document.createElement("td")
    let intensive = document.createElement("td")
    let probability = document.createElement("td")
    let occurrence = document.createElement("td")
    name.appendChild(textName)
    intensive.appendChild(textIntensive)
    probability.appendChild(textProbability)
    occurrence.appendChild(textOccurrence)
    tr.appendChild(name)
    tr.appendChild(intensive)
    tr.appendChild(probability)
    tr.appendChild(occurrence)
    if (inputEventName === '' || inputEventIntensity === '' || inputEventProbability === ''
        || inputEventOccurrence === '') {
        alert("You must write something!")
    } else {
        if (!isNaN(inputEventIntensity) && !isNaN(inputEventProbability) && !isNaN(inputEventOccurrence)
            && (0 <= inputEventProbability) && (inputEventProbability <= 100) && (0 <= inputEventOccurrence)
            && (inputEventOccurrence <= 100)) {
            document.getElementById("tableEvent").appendChild(tr)
            document.getElementById("tableEvent").removeAttribute("class")
        } else {
            alert("Digit please!");
        }
    }
    document.getElementById("inputEventName").value = ""
    document.getElementById("inputEventIntensity").value = ""
    document.getElementById("inputEventProbability").value = ""
    document.getElementById("inputEventOccurrence").value = ""
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
    let inputRiskStrategy = document.getElementById("inputWhatRiskThisStrategy").value
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
    if (inputNameMinimization === '' || inputRiskStrategy === '' || inputCostMinimization === '') {
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
    document.getElementById("inputWhatRiskThisStrategy").value = ""
    document.getElementById("inputCostMinimization").value = ""
    createCloseButton(tr)
}

function newBase() {
    let inputBase = document.getElementById("inputBase").value;
    let myRe = /\d*/g; // '' !!!!!!!!!
    if (inputBase === '') {
        alert("You must write something!");
    } else {
        document.getElementById("baseValue").innerText = document.createTextNode(inputBase).nodeValue
        document.getElementById("forBase").removeAttribute("class")
        document.getElementById("addBtnBase").innerText = "Обновить"
        if (!isNaN(inputBase)) { // null inputBase.match(/'[0-9]*'/gi)
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