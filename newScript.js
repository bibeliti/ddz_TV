let data = {}
data["countEvent"] = 0
data["base"] = 0

function main() {
    let data = {}
    data["base"] = Number(document.getElementById("baseValue").textContent)
    data["rent"] = Number(document.getElementById("rentValue").textContent)
    let coefficient = []
    coefficient[0] = 0.5
    coefficient[1] = 0.7
    coefficient[2] = 0.8
    coefficient[3] = 0.9
    data["coefficients"] = coefficient

    document.getElementById("inputCalculate").setAttribute("class", "disable")

    tableEntry("tableEvent", "userEvent", data)
    tableEntry("tableMinimization", "userMinimization", data)
    printRenameEvents(data)
    printRenameStr(data)
}

function tableEntry(nameTable, nameData, data) {
    let tableRisk = document.getElementById(nameTable)

    data[nameData] = []
    let currRows = tableRisk.getElementsByTagName("tr")

    for (let j = 0; j < currRows.length; j++) {
        data[nameData][j] = []
        let cells = currRows[j].getElementsByTagName("td")

        for (let k = 0; k < cells.length - 1; k++) {
            {
                data[nameData][j][k] = cells[k].textContent
            }
        }
    }
}

function printRenameEvents(data) {
    const table = document.getElementById("tableRenameEvents");
    document.getElementById("matrixRenameEvents").removeAttribute("class");
    const thHeader = document.createElement("th");
    const tdEvent = document.createElement("td");
    const tdRename = document.createElement("td");
    const textTdEvent = document.createTextNode("Название события");
    const textTdRename = document.createTextNode("Замена");

    table.appendChild(thHeader);
    thHeader.appendChild(tdEvent);
    thHeader.appendChild(tdRename);
    tdEvent.appendChild(textTdEvent);
    tdRename.appendChild(textTdRename);

    data["event"] = new Array(data["userEvent"].length)
    for (let i = 0; i < data["userEvent"].length; i++) {
        let tr = document.createElement("tr");
        let tdNameOriginal = document.createElement("td");
        let tdNameReplacement = document.createElement("td");

        let original = document.createTextNode(data["userEvent"][i][0]);
        let replacement = document.createTextNode("Событие-" + (i + 1));

        data["event"][i] = data["userEvent"][i]
        data["event"][i][0] = "e" + (i + 1)

        tdNameOriginal.appendChild(textTd);
        tdNameReplacement.appendChild(textTd2);
        tr.appendChild(tdNameOriginal);
        tr.appendChild(tdNameReplacement);
        table.appendChild(tr);
    }
}

function newBase() {
    let inputBase = document.getElementById("validationBaseValue").value
    let inputRent = document.getElementById("validationRentValue").value
    let divForBase = document.getElementById("divForBase")
    let divForRent = document.getElementById("divForRent")
    document.querySelectorAll(".invalid-feedback").forEach(e => e.remove())
    document.getElementById("validationBaseValue").classList.remove("is-invalid")
    document.getElementById("validationRentValue").classList.remove("is-invalid")
    let flag = true
    if (isNaN(inputBase)) {
        flag = false
        document.getElementById("validationBaseValue").setAttribute("class", "form-control is-invalid")
        let feedbackBase = document.createElement("div")
        feedbackBase.setAttribute("class", "invalid-feedback")
        feedbackBase.innerHTML = "Введите целое число"
        divForBase.appendChild(feedbackBase)
    } else if (Number(inputBase) < 0) {
        flag = false
        document.getElementById("validationBaseValue").setAttribute("class", "form-control is-invalid")
        let feedbackBase = document.createElement("div")
        feedbackBase.setAttribute("class", "invalid-feedback")
        feedbackBase.innerHTML = "Введите положительное число"
        divForBase.appendChild(feedbackBase)
    } else {
        inputBase = Number(inputBase)
    }
    if (isNaN(inputRent)) {
        flag = false
        document.getElementById("validationRentValue").setAttribute("class", "form-control is-invalid")
        let feedbackRent = document.createElement("div")
        feedbackRent.setAttribute("class", "invalid-feedback")
        feedbackRent.innerHTML = "Введите целое число"
        divForRent.appendChild(feedbackRent)
    } else if (Number(inputRent) < 0) {
        flag = false
        document.getElementById("validationRentValue").setAttribute("class", "form-control is-invalid")
        let feedbackRent = document.createElement("div")
        feedbackRent.setAttribute("class", "invalid-feedback")
        feedbackRent.innerHTML = "Введите положительное число"
        divForRent.appendChild(feedbackRent)
    } else {
        inputRent = Number(inputRent)
    }
    if ((flag === true) && (inputRent > inputBase)) {
        flag = false
        document.getElementById("validationRentValue").setAttribute("class", "form-control is-invalid")
        let feedbackRent = document.createElement("div")
        feedbackRent.setAttribute("class", "invalid-feedback")
        feedbackRent.innerHTML = "Рента не может быть больше базы"
        divForRent.appendChild(feedbackRent)
    }
    if (flag === true) {
        document.getElementById("valueOutput").removeAttribute("class")
        document.getElementById("valueOutput").setAttribute("class", "col-md-12 md-12 form-row")
        document.getElementById("pForBaseValue").innerText = inputBase
        document.getElementById("pForRentValue").innerText = inputRent
        data["base"] = inputBase
        data["rent"] = inputRent
    }
    document.getElementById("validationBaseValue").value = ""
    document.getElementById("validationRentValue").value = ""
}

function newEvent() {
    let nameEvent = document.getElementById("validationNameEvent").value
    let intensityEvent = document.getElementById("validationIntensityEvent").value
    let probabilityEvent = document.getElementById("validationProbabilityEvent").value
    let divForIntensityEvent = document.getElementById("divForIntensityEvent")
    let divForProbabilityEvent = document.getElementById("divForProbabilityEvent")
    document.querySelectorAll(".invalid-feedback").forEach(e => e.remove())
    document.getElementById("validationIntensityEvent").classList.remove("is-invalid")
    document.getElementById("validationProbabilityEvent").classList.remove("is-invalid")

    let flag = true
    if ((isNaN(intensityEvent)) || (Number(intensityEvent) < 0)) {
        flag = false
        let feedbackIntensity = document.createElement("div")
        document.getElementById("validationIntensityEvent").setAttribute("class", "form-control is-invalid")
        feedbackIntensity.setAttribute("class", "invalid-feedback")
        feedbackIntensity.innerHTML = "Введите положительное число"
        divForIntensityEvent.appendChild(feedbackIntensity)
    } else {
        intensityEvent = Number(intensityEvent)
    }
    if ((isNaN(probabilityEvent)) || (Number(probabilityEvent) < 0) || (Number(probabilityEvent) > 1)) {
        flag = false
        document.getElementById("validationProbabilityEvent").setAttribute("class", "form-control is-invalid")
        let feedbackProbability = document.createElement("div")
        feedbackProbability.setAttribute("class", "invalid-feedback")
        feedbackProbability.innerHTML = "Введите положительное дробное число меньшее 1"
        divForProbabilityEvent.appendChild(feedbackProbability)
    } else if (Number(probabilityEvent) * intensityEvent > 1) {
        flag = false
        document.getElementById("validationProbabilityEvent").setAttribute("class", "form-control is-invalid")

        let feedbackProbability = document.createElement("div")
        feedbackProbability.setAttribute("class", "invalid-feedback")
        feedbackProbability.innerHTML = "Риск наступления не должен превышать 1"
        divForProbabilityEvent.appendChild(feedbackProbability)
        let feedbackIntensity = document.createElement("div")
        feedbackIntensity.setAttribute("class", "invalid-feedback")
        feedbackIntensity.innerHTML = "Риск = Интенсивность * Вероятность"
        divForIntensityEvent.appendChild(feedbackIntensity)
    } else {
        probabilityEvent = Number(probabilityEvent)
    }

    if (flag) {
        let events = document.getElementById("Events")
        let event = document.createElement("tr")
        let newNameEvent = document.createElement("td")
        newNameEvent.setAttribute("class", "col-md-3 mb-3 eventName")
        newNameEvent.innerHTML = nameEvent
        let newIntensityEvent = document.createElement("td")
        newIntensityEvent.setAttribute("class", "col-md-3 mb-3")
        newIntensityEvent.innerHTML = intensityEvent
        let newProbabilityEvent = document.createElement("td")
        newProbabilityEvent.setAttribute("class", "col-md-3 mb-3")
        newProbabilityEvent.innerHTML = probabilityEvent
        let newDivClose = document.createElement("td")
        createCloseButton(newDivClose)

        event.appendChild(newNameEvent)
        event.appendChild(newIntensityEvent)
        event.appendChild(newProbabilityEvent)
        event.appendChild(newDivClose)
        event.classList.remove("displayNone")
        events.appendChild(event)

        data["countEvent"] += 1
        document.getElementById("formForStrategy").classList.remove("displayNone")
        let newOption = document.createElement("option")
        newOption.innerHTML = nameEvent
        document.getElementById("validationAtWhichEvent").appendChild(newOption)

        let close = document.getElementsByClassName("close")

        for (let i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                let div = this.parentElement.parentElement
                div.setAttribute("class", "deleteClass")
                const deleteElement = document.querySelector(".deleteClass")
                const parent = deleteElement.parentNode
                parent.removeChild(deleteElement)
                data["countEvent"] -= 1
                if (data["countEvent"] === 0) {
                    document.getElementById("formForStrategy").setAttribute("class", "displayNone")
                }
                let strategyNames = document.getElementsByClassName("eventName")
                let selector = document.getElementById("validationAtWhichEvent")
                selector.innerHTML = ''
                for (let i = 0; i < strategyNames.length; i++) {
                    let option = document.createElement("option")
                    option.innerHTML = strategyNames[i].textContent
                    selector.appendChild(option)
                }
            }
        }
    }

    document.getElementById("validationNameEvent").value = ""
    document.getElementById("validationIntensityEvent").value = ""
    document.getElementById("validationProbabilityEvent").value = ""

}

function createCloseButton(div) {
    let spanForClose = document.createElement("span")
    let txt = document.createTextNode("\u00D7")
    spanForClose.appendChild(txt)
    spanForClose.className = "close"
    div.appendChild(spanForClose)
}

function newMinimization() {
    let nameStrategy = document.getElementById("validationNameStrategy").value
    let atWhichEvent = document.getElementById("validationAtWhichEvent").value
    let costStrategy = document.getElementById("validationCostsStrategy").value
    let howMach = document.getElementById("validationByHowMuch").value
    let divCostStrategy = document.getElementById("divForCostStrategy")
    let divHowMach = document.getElementById("divForHowMach")
    document.querySelectorAll(".invalid-feedback").forEach(e => e.remove())
    document.getElementById("validationAtWhichEvent").classList.remove("is-invalid")
    document.getElementById("validationCostsStrategy").classList.remove("is-invalid")

    let flag = true
    if ((isNaN(costStrategy)) || (Number(costStrategy) < 0)) {
        flag = false
        document.getElementById("validationCostsStrategy").setAttribute("class", "form-control is-invalid")
        let feedbackCost = document.createElement("div")
        feedbackCost.setAttribute("class", "invalid-feedback")
        feedbackCost.innerHTML = "Введите положительное число"
        divCostStrategy.appendChild(feedbackCost)
    } else if (Number(costStrategy) > data["base"]) {
        flag = false
        document.getElementById("validationCostsStrategy").setAttribute("class", "form-control is-invalid")
        let feedbackCost = document.createElement("div")
        feedbackCost.setAttribute("class", "invalid-feedback")
        feedbackCost.innerHTML = "Стоимость стратегии не может быть больше базы"
        divCostStrategy.appendChild(feedbackCost)
    } else {
        costStrategy = Number(costStrategy)
    }
    if ((isNaN(howMach)) || (Number(howMach) < 0) || (Number(howMach) > 1)) {
        flag = false
        document.getElementById("validationProbabilityEvent").setAttribute("class", "form-control is-invalid")
        let feedbackHowMach = document.createElement("div")
        feedbackHowMach.setAttribute("class", "invalid-feedback")
        feedbackHowMach.innerHTML = "Введите положительное дробное число меньшее 1"
        divHowMach.appendChild(feedbackHowMach)
    } else {
        howMach = Number(howMach)
    }
    if (flag) {
        let strategies = document.getElementById("Strategies")
        let strategy = document.createElement("tr")
        let newNameStrategy = document.createElement("td")
        newNameStrategy.setAttribute("class", "col-md-3 mb-3")
        newNameStrategy.innerHTML = nameStrategy
        let newAtWhichEvent = document.createElement("td")
        newAtWhichEvent.setAttribute("class", "col-md-3 mb-3")
        newAtWhichEvent.innerHTML = atWhichEvent
        let newCostStrategy = document.createElement("td")
        newCostStrategy.setAttribute("class", "col-md-3 mb-3")
        newCostStrategy.innerHTML = costStrategy
        let newHowMAch = document.createElement("td")
        newHowMAch.setAttribute("class", "col-md-2 mb-2")
        newHowMAch.innerHTML = howMach
        let newDivClose = document.createElement("td")
        createCloseButton(newDivClose)

        strategy.appendChild(newNameStrategy)
        strategy.appendChild(newAtWhichEvent)
        strategy.appendChild(newCostStrategy)
        strategy.appendChild(newHowMAch)
        strategy.appendChild(newDivClose)
        strategy.classList.remove("displayNone")
        strategies.appendChild(strategy)
        let close = document.getElementsByClassName("close")

        for (let i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                let div = this.parentElement.parentElement
                div.setAttribute("class", "deleteClass")
                const deleteElement = document.querySelector(".deleteClass")
                const parent = deleteElement.parentNode
                parent.removeChild(deleteElement)
                let strategyNames = document.getElementsByClassName("eventName")
                let selector = document.getElementById("validationAtWhichEvent")
                selector.innerHTML = ''
                for (let i = 0; i < strategyNames.length; i++) {
                    let option = document.createElement("option")
                    option.innerHTML = strategyNames[i].textContent
                    selector.appendChild(option)
                }
            }
        }
    }

    document.getElementById("validationNameStrategy").value = ""
    document.getElementById("validationAtWhichEvent").value = ""
    document.getElementById("validationCostsStrategy").value = ""
    document.getElementById("validationByHowMuch").value = ""
}
