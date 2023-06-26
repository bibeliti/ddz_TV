let data = {}
data["countEvent"] = 0
data["countStrategy"] = 0
data["base"] = 0

function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
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
    if (isNaN(inputBase) || inputBase === "") {
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
    if (isNaN(inputRent) || inputRent === "") {
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
    let divForNameEvent = document.getElementById("divForNameEvent")
    let divForIntensityEvent = document.getElementById("divForIntensityEvent")
    let divForProbabilityEvent = document.getElementById("divForProbabilityEvent")
    document.querySelectorAll(".invalid-feedback").forEach(e => e.remove())
    document.getElementById("validationNameEvent").classList.remove("is-invalid")
    document.getElementById("validationIntensityEvent").classList.remove("is-invalid")
    document.getElementById("validationProbabilityEvent").classList.remove("is-invalid")

    let names = document.getElementsByClassName('eventName')
    let flag = true
    if (nameEvent === "") {
        flag = false
        let feedbackName = document.createElement("div")
        document.getElementById("validationNameEvent").setAttribute("class", "form-control is-invalid")
        feedbackName.setAttribute("class", "invalid-feedback")
        feedbackName.innerHTML = "Заполните это поле"
        divForNameEvent.appendChild(feedbackName)
    }
    if (intensityEvent === "") {
        flag = false
        let feedbackIntensity = document.createElement("div")
        document.getElementById("validationIntensityEvent").setAttribute("class", "form-control is-invalid")
        feedbackIntensity.setAttribute("class", "invalid-feedback")
        feedbackIntensity.innerHTML = "Заполните это поле"
        divForIntensityEvent.appendChild(feedbackIntensity)
    }
    if (probabilityEvent === "") {
        flag = false
        let feedbackProbability = document.createElement("div")
        document.getElementById("validationProbabilityEvent").setAttribute("class", "form-control is-invalid")
        feedbackProbability.setAttribute("class", "invalid-feedback")
        feedbackProbability.innerHTML = "Заполните это поле"
        divForProbabilityEvent.appendChild(feedbackProbability)
        for (let index = 0; index < names.length; index++) {
            if (nameEvent === names[index].innerText) {
                flag = false
                let feedbackEventName = document.createElement("div")
                document.getElementById("validationNameEvent").setAttribute("class", "form-control is-invalid")
                feedbackEventName.setAttribute("class", "invalid-feedback")
                feedbackEventName.innerHTML = "Названия событий не должны повторяться"
                divForNameEvent.appendChild(feedbackEventName)
                break
            }
        }
    }
    intensityEvent = intensityEvent.replace(/,/g, '.')

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
    probabilityEvent = probabilityEvent.replace(/,/g, '.')
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
        document.getElementById("validationIntensityEvent").setAttribute("class", "form-control is-invalid")
    }
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
        document.getElementById("validationIntensityEvent").setAttribute("class", "form-control is-invalid")

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

    for (let index = 0; index < names.length; index++) {
        if (nameEvent === names[index].innerText) {
            flag = false
            let feedbackEventName = document.createElement("div")
            document.getElementById("validationNameEvent").setAttribute("class", "form-control is-invalid")
            feedbackEventName.setAttribute("class", "invalid-feedback")
            feedbackEventName.innerHTML = "Названия событий не должны повторяться"
            divForNameEvent.appendChild(feedbackEventName)
            break
        }
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
    let divNameStrategy = document.getElementById("divForNameStrategy")
    let divCostStrategy = document.getElementById("divForCostStrategy")
    let divHowMach = document.getElementById("divForHowMach")
    document.querySelectorAll(".invalid-feedback").forEach(e => e.remove())
    document.getElementById("validationNameStrategy").classList.remove("is-invalid")
    document.getElementById("validationCostsStrategy").classList.remove("is-invalid")
    document.getElementById("validationAtWhichEvent").classList.remove("is-invalid")
    document.getElementById("validationByHowMuch").classList.remove("is-invalid")

    let names = document.getElementsByClassName('strategyName')

    let flag = true
    if (nameStrategy === "") {
        flag = false
        document.getElementById("validationNameStrategy").setAttribute("class", "form-control is-invalid")
        let feedbackName = document.createElement("div")
        feedbackName.setAttribute("class", "invalid-feedback")
        feedbackName.innerHTML = "Заполните это поле"
        divNameStrategy.appendChild(feedbackName)
    }
    if (atWhichEvent === "") {
        flag = false
        document.getElementById("validationCostsStrategy").setAttribute("class", "form-control is-invalid")
        let feedbackCost = document.createElement("div")
        feedbackCost.setAttribute("class", "invalid-feedback")
        feedbackCost.innerHTML = "Заполните это поле"
        divCostStrategy.appendChild(feedbackCost)
    }
    if (costStrategy === "") {
        flag = false
        document.getElementById("validationCostsStrategy").setAttribute("class", "form-control is-invalid")
        let feedbackCost = document.createElement("div")
        feedbackCost.setAttribute("class", "invalid-feedback")
        feedbackCost.innerHTML = "Заполните это поле"
        divCostStrategy.appendChild(feedbackCost)
    }
    if (howMach === "") {
        flag = false
        document.getElementById("validationByHowMuch").setAttribute("class", "form-control is-invalid")
        let feedbackHowMach = document.createElement("div")
        feedbackHowMach.setAttribute("class", "invalid-feedback")
        feedbackHowMach.innerHTML = "Заполните это поле"
        divHowMach.appendChild(feedbackHowMach)
    }
    costStrategy = costStrategy.replace(/,/g, '.')
    howMach = howMach.replace(/,/g, '.')
    for (let index = 0; index < names.length; index++) {
        if (nameStrategy === names[index].innerText) {
            flag = false
            let feedbackStrategyName = document.createElement("div")
            document.getElementById("validationNameStrategy").setAttribute("class", "form-control is-invalid")
            feedbackStrategyName.setAttribute("class", "invalid-feedback")
            feedbackStrategyName.innerHTML = "Названия стратегий не должны повторяться"
            divNameStrategy.appendChild(feedbackStrategyName)
            break
        }
    }
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
        document.getElementById("validationByHowMuch").setAttribute("class", "form-control is-invalid")
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
        newNameStrategy.setAttribute("class", "col-md-3 mb-3 strategyName")
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
        data["countStrategy"] += 1
        document.getElementById("divForButtonCalculate").classList.remove("displayNone")

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
                data["countStrategy"] -= 1
                if (data["countStrategy"] === 0) {
                    document.getElementById("divForButtonCalculate").setAttribute("class", "displayNone")
                }
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

function calculatePrintTable() {
    document.getElementById("buttonForCalculate").setAttribute("disabled", "disabled")
    document.getElementById("buttonMinimization").setAttribute("class", "displayNone")
    document.getElementById("buttonEvent").setAttribute("class", "displayNone")
    document.getElementById("buttonBase").setAttribute("class", "displayNone")
    tableEntry("Events", "userEvent")
    tableEntry("Strategies", "userMinimization")
    printRename("userEvent")
    printRename("userMinimization")
    printTableOfEventsCharacteristics()
    document.getElementById("printTable").classList.remove("displayNone")
    printTableOfStrategiesCharacteristics()
    printTableAltLoss()
    printTableConditionalBenefits()
    printTableEconomicEffectsAfterRealizationStrategy()
    printTableCalculationEstimatedCharacteristics()
    criteriaSavage()
    criteriaVald()
    criteriaGurvic()
}

function printRename(nameData) {
    let tbody
    if (nameData === "userEvent") {
        tbody = document.getElementById("tbodyForNameEvent")
    } else {
        tbody = document.getElementById("tbodyForNameStrategy")
    }
    for (let i = 0; i < data[nameData].length; i++) {
        let tr = document.createElement("tr")
        let tdNameOriginal = document.createElement("td")
        let tdNameReplacement = document.createElement("td")

        let original = document.createTextNode(data[nameData][i][0])
        let replacement
        if (nameData === "userEvent") {
            replacement = document.createTextNode("Событие-" + (i + 1))
            data[nameData][i][3] = "Событие-" + (i + 1)
        } else {
            replacement = document.createTextNode("Стратегия-" + (i + 1))
            data[nameData][i][4] = "Стратегия-" + (i + 1)
        }
        tdNameOriginal.appendChild(original)
        tdNameReplacement.appendChild(replacement)
        tr.appendChild(tdNameOriginal)
        tr.appendChild(tdNameReplacement)
        tbody.appendChild(tr)
    }
}

function tableEntry(nameTable, nameData) {
    let tableRisk = document.getElementById(nameTable)

    data[nameData] = []
    let currRows = tableRisk.getElementsByTagName("tr")

    for (let j = 0; j < currRows.length; j++) {
        data[nameData][j] = []
        let cells = currRows[j].getElementsByTagName("td")

        for (let k = 0; k < cells.length - 1; k++)
            data[nameData][j][k] = cells[k].textContent
    }
}

function printTableOfEventsCharacteristics() {
    let tbody = document.getElementById("tbodyCharacteristicsEvent")
    let trThead = document.getElementById("trTheadCharacteristicsEvent")
    let trSecondThead = document.getElementById("trCharacteristicsEvent")

    let th = document.createElement("td")
    th.setAttribute("colspan", data["countEvent"])
    let thText = document.createTextNode("События, провоцирующие возникновение риска")
    th.appendChild(thText)
    trThead.appendChild(th)
    for (let i = 0; i < data["countEvent"]; i++) {
        let td = document.createElement("td")
        let tdText = document.createTextNode(data["userEvent"][i][3])
        td.appendChild(tdText)
        trSecondThead.appendChild(td)
    }

    let tr = document.createElement("tr")
    let tdNumber = document.createElement("td")
    let number = document.createTextNode("1.")
    tdNumber.appendChild(number)
    let tdName = document.createElement("td")
    let name = document.createTextNode("Интенсивность возникновения i-го события")
    tdName.appendChild(name)
    tr.appendChild(tdNumber)
    tr.appendChild(tdName)
    for (let i = 0; i < data["countEvent"]; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["userEvent"][i][1])
        td.appendChild(text)
        tr.appendChild(td)
    }
    tbody.appendChild(tr)

    tr = document.createElement("tr")
    tdNumber = document.createElement("td")
    number = document.createTextNode("2.")
    tdNumber.appendChild(number)
    tdName = document.createElement("td")
    name = document.createTextNode("Вероятность наступления i-го события")
    tdName.appendChild(name)
    tr.appendChild(tdNumber)
    tr.appendChild(tdName)
    for (let i = 0; i < data["countEvent"]; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["userEvent"][i][2])
        td.appendChild(text)
        tr.appendChild(td)
    }
    tbody.appendChild(tr)


    tr = document.createElement("tr")
    tdNumber = document.createElement("td")
    number = document.createTextNode("3.")
    tdNumber.appendChild(number)
    tdName = document.createElement("td")
    name = document.createTextNode("Риск наступления i-го события")
    tdName.appendChild(name)
    tr.appendChild(tdNumber)
    tr.appendChild(tdName)
    for (let i = 0; i < data["countEvent"]; i++) {
        data["userEvent"][i][4] = round(Number(data["userEvent"][i][1]) * Number(data["userEvent"][i][2]), 3)
        let td = document.createElement("td")
        let text = document.createTextNode(data["userEvent"][i][4])
        td.appendChild(text)
        tr.appendChild(td)
    }
    tbody.appendChild(tr)

    tr = document.createElement("tr")
    tdNumber = document.createElement("td")
    number = document.createTextNode("4.")
    tdNumber.appendChild(number)
    tdName = document.createElement("td")
    name = document.createTextNode("База для расчета упущенной выгоды компании, тыс. руб")
    tdName.appendChild(name)
    tr.appendChild(tdNumber)
    tr.appendChild(tdName)
    for (let i = 0; i < data["countEvent"]; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["base"])
        td.appendChild(text)
        tr.appendChild(td)
    }
    tbody.appendChild(tr)

    tr = document.createElement("tr")
    tdNumber = document.createElement("td")
    number = document.createTextNode("5.")
    tdNumber.appendChild(number)
    tdName = document.createElement("td")
    name = document.createTextNode("Выгода упущенная компанией из-за снижения выручки в результате i-го события, тыс. руб")
    tdName.appendChild(name)
    tr.appendChild(tdNumber)
    tr.appendChild(tdName)
    for (let i = 0; i < data["countEvent"]; i++) {
        data["userEvent"][i][5] = round(data["base"] * data["userEvent"][i][4], 3)
        let td = document.createElement("td")
        let text = document.createTextNode(data["userEvent"][i][5])
        td.appendChild(text)
        tr.appendChild(td)
    }
    tbody.appendChild(tr)
}

function printTableOfStrategiesCharacteristics() {
    let tbody = document.getElementById("tbodyCharacteristicsStrategy")
    let trThead = document.getElementById("trTheadCharacteristicsStrategy")
    let trSecondThead = document.getElementById("trCharacteristicsStrategy")

    let th = document.createElement("td")
    th.setAttribute("colspan", data["countEvent"])
    let thText = document.createTextNode("События, провоцирующие возникновение риска")
    th.appendChild(thText)
    trThead.appendChild(th)
    for (let i = 0; i < data["countEvent"]; i++) {
        let td = document.createElement("td")
        let tdText = document.createTextNode(data["userEvent"][i][3])
        td.appendChild(tdText)
        trSecondThead.appendChild(td)
    }

    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        let trNameStrategy = document.createElement("tr")
        let tdNameStrategy = document.createElement("td")
        tdNameStrategy.setAttribute("class", "head")
        tdNameStrategy.setAttribute("colspan", data["countEvent"] + 2)
        let nameStrategy = document.createTextNode(data["userMinimization"][strategy][0])
        tdNameStrategy.appendChild(nameStrategy)
        trNameStrategy.appendChild(tdNameStrategy)
        tbody.appendChild(trNameStrategy)

        let tr = document.createElement("tr")
        let tdNumber = document.createElement("td")
        let number = document.createTextNode((strategy + 1) + ".1")
        tdNumber.appendChild(number)
        let tdName = document.createElement("td")
        let name = document.createTextNode("Интенсивность возникновения i-го события")
        tdName.appendChild(name)
        tr.appendChild(tdNumber)
        tr.appendChild(tdName)
        for (let i = 0; i < data["countEvent"]; i++) {
            let text
            if (data["userEvent"][i][0] === data["userMinimization"][strategy][1]) {
                data["userEvent"][i][5] = data["userEvent"][i][1] - 1
                text = document.createTextNode(data["userEvent"][i][5])
            } else {
                text = document.createTextNode(data["userEvent"][i][1])
            }
            let td = document.createElement("td")
            td.appendChild(text)
            tr.appendChild(td)
        }
        tbody.appendChild(tr)

        tr = document.createElement("tr")
        tdNumber = document.createElement("td")
        number = document.createTextNode((strategy + 1) + ".2")
        tdNumber.appendChild(number)
        tdName = document.createElement("td")
        name = document.createTextNode("Вероятность наступления i-го события")
        tdName.appendChild(name)
        tr.appendChild(tdNumber)
        tr.appendChild(tdName)
        for (let i = 0; i < data["countEvent"]; i++) {
            let text
            if (data["userEvent"][i][0] === data["userMinimization"][strategy][1]) {
                data["userEvent"][i][6] = round(data["userEvent"][i][2] * data["userMinimization"][strategy][3], 3)
                text = document.createTextNode(data["userEvent"][i][6])
            } else {
                text = document.createTextNode(data["userEvent"][i][2])
            }
            let td = document.createElement("td")
            td.appendChild(text)
            tr.appendChild(td)
        }
        tbody.appendChild(tr)

        tr = document.createElement("tr")
        tdNumber = document.createElement("td")
        number = document.createTextNode((strategy + 1) + ".3")
        tdNumber.appendChild(number)
        tdName = document.createElement("td")
        name = document.createTextNode("Риск наступления i-го события")
        tdName.appendChild(name)
        tr.appendChild(tdNumber)
        tr.appendChild(tdName)
        for (let i = 0; i < data["countEvent"]; i++) {
            let text
            if (data["userEvent"][i][0] === data["userMinimization"][strategy][1]) {
                data["userEvent"][i][7] = round(data["userEvent"][i][5] * data["userEvent"][i][6], 3)
                text = document.createTextNode(data["userEvent"][i][7])
            } else {
                let number = round(data["userEvent"][i][1] * data["userEvent"][i][2], 3)
                text = document.createTextNode(number)
            }
            let td = document.createElement("td")
            td.appendChild(text)
            tr.appendChild(td)
        }
        tbody.appendChild(tr)

        tr = document.createElement("tr")
        tdNumber = document.createElement("td")
        number = document.createTextNode((strategy + 1) + ".4")
        tdNumber.appendChild(number)
        tdName = document.createElement("td")
        name = document.createTextNode("База для расчета упущенной выгоды компании, тыс. руб")
        tdName.appendChild(name)
        tr.appendChild(tdNumber)
        tr.appendChild(tdName)
        for (let i = 0; i < data["countEvent"]; i++) {
            let td = document.createElement("td")
            let text = document.createTextNode(data["base"])
            td.appendChild(text)
            tr.appendChild(td)
        }
        tbody.appendChild(tr)

        tr = document.createElement("tr")
        tdNumber = document.createElement("td")
        number = document.createTextNode((strategy + 1) + ".5")
        tdNumber.appendChild(number)
        tdName = document.createElement("td")
        name = document.createTextNode("Выгода упущенная компанией из-за снижения выручки в результате i-го события, тыс. руб")
        tdName.appendChild(name)
        tr.appendChild(tdNumber)
        tr.appendChild(tdName)
        for (let i = 0; i < data["countEvent"]; i++) {
            let text
            if (data["userEvent"][i][0] === data["userMinimization"][strategy][1]) {
                data["userEvent"][i][8] = round(data["base"] * data["userEvent"][i][7], 0)
                text = document.createTextNode(data["userEvent"][i][8])
            } else {
                data["userEvent"][i][9] = round(data["base"] * data["userEvent"][i][2] * data["userEvent"][i][1], 0)
                text = document.createTextNode(data["userEvent"][i][9])
            }
            let td = document.createElement("td")
            td.appendChild(text)
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
}

function printTableAltLoss() {
    let tbody = document.getElementById("tbodyAltLoss")
    let trThead = document.getElementById("trAltLoss")
    let tdThead = document.getElementById("tdTheadAltLoss")
    tdThead.setAttribute("colspan", data["countEvent"])

    for (let i = 0; i < data["countEvent"]; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["userEvent"][i][3])
        td.appendChild(text)
        trThead.appendChild(td)
    }

    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let text = document.createTextNode(data["userMinimization"][strategy][4])
        td.appendChild(text)
        tr.appendChild(td)

        data["userMinimization"][strategy][5] = -9999999
        data["userMinimization"][strategy][6] = 9999999
        for (let event = 0; event < data["countEvent"]; event++) {
            let number
            if (data["userEvent"][event][0] === data["userMinimization"][strategy][1]) {
                number = data["userEvent"][event][8]
            } else {
                number = data["userEvent"][event][9]
            }
            let text = document.createTextNode(number)
            td = document.createElement("td")
            td.appendChild(text)
            tr.appendChild(td)
            if (number > data["userMinimization"][strategy][5]) {
                data["userMinimization"][strategy][5] = number
            }
            if (number < data["userMinimization"][strategy][6]) {
                data["userMinimization"][strategy][6] = number
            }
        }
        let tdMin = document.createElement("td")
        let minText = document.createTextNode(data["userMinimization"][strategy][6])
        tdMin.appendChild(minText)
        tr.appendChild(tdMin)

        let tdMax = document.createElement("td")
        let maxText = document.createTextNode(data["userMinimization"][strategy][5])
        tdMax.appendChild(maxText)
        tr.appendChild(tdMax)

        tbody.appendChild(tr)
    }
}

function printTableConditionalBenefits() {
    let tbody = document.getElementById("tbodyConditionalBenefits")
    let trThead = document.getElementById("trConditionalBenefits")
    let tdThead = document.getElementById("tdTheadConditionalBenefits")
    tdThead.setAttribute("colspan", data["countEvent"])
    data['vald'] = ""

    for (let i = 0; i < data["countEvent"]; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["userEvent"][i][3])
        td.appendChild(text)
        trThead.appendChild(td)
    }
    let minMaxValue = 9999999999
    let maxMinList = []

    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        data["userMinimization"][strategy][7] = -9999999999
        data["userMinimization"][strategy][8] = 9999999999
        for (let event = 0; event < data["countEvent"]; event++) {
            let number
            if (data["userEvent"][event][0] === data["userMinimization"][strategy][1]) {
                number = data["rent"] - data["userEvent"][event][8]
            } else {
                number = data["rent"] - data["userEvent"][event][9]
            }
            if (number > data["userMinimization"][strategy][7]) {
                data["userMinimization"][strategy][7] = number
            }
            if (number < data["userMinimization"][strategy][8]) {
                data["userMinimization"][strategy][8] = number
            }
            if ((minMaxValue > data["userMinimization"][strategy][7]) && (event === data["countEvent"] - 1)) {
                minMaxValue = data["userMinimization"][strategy][7]
                maxMinList = []
            }
            if (minMaxValue === number && !maxMinList.includes(strategy)) {
                maxMinList.push(strategy)
            }
        }
    }
    for (let i = 0; i < data["countEvent"]; i++)
        data["userEvent"][i][10] = 9999999999

    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let text = document.createTextNode(data["userMinimization"][strategy][4])
        if (maxMinList.includes(strategy)) {
            td.setAttribute("class", "blue")
            data['vald'] = data['vald'].concat(data["userMinimization"][strategy][0], '; ')
        }
        td.appendChild(text)
        tr.appendChild(td)

        data["userMinimization"][strategy][7] = -9999999999
        data["userMinimization"][strategy][8] = 9999999999
        for (let event = 0; event < data["countEvent"]; event++) {
            let number
            if (data["userEvent"][event][0] === data["userMinimization"][strategy][1]) {
                number = data["rent"] - data["userEvent"][event][8]
            } else {
                number = data["rent"] - data["userEvent"][event][9]
            }
            if (number < data["userEvent"][event][10]) {
                data["userEvent"][event][10] = number
            }
            let text = document.createTextNode(number)
            td = document.createElement("td")
            if (number === minMaxValue) {
                td.setAttribute("class", "blue")
            }
            td.appendChild(text)
            tr.appendChild(td)
            if (number > data["userMinimization"][strategy][7]) {
                data["userMinimization"][strategy][7] = number
            }
            if (number < data["userMinimization"][strategy][8]) {
                data["userMinimization"][strategy][8] = number
            }
            if ((minMaxValue > data["userMinimization"][strategy][7]) && (event === data["countEvent"] - 1)) {
                minMaxValue = data["userMinimization"][strategy][7]
                maxMinList = []
            }
            if (minMaxValue === number && !maxMinList.includes(strategy)) {
                maxMinList.push(strategy)
            }
        }
        let tdMax = document.createElement("td")
        let maxText = document.createTextNode(data["userMinimization"][strategy][8])
        tdMax.appendChild(maxText)
        tr.appendChild(tdMax)

        let tdMin = document.createElement("td")
        let minText = document.createTextNode(data["userMinimization"][strategy][7])
        tdMin.appendChild(minText)
        tr.appendChild(tdMin)

        tbody.appendChild(tr)
    }
    let tr = document.createElement("tr")
    let bTd = document.createElement("td")
    let bText = document.createTextNode("b")
    bTd.appendChild(bText)
    tr.appendChild(bTd)
    for (let i = 0; i < data["countEvent"]; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["userEvent"][i][10])
        if (data["userEvent"][i][10] === minMaxValue) {
            td.setAttribute("class", "blue")
        }
        td.appendChild(text)
        tr.appendChild(td)
    }
    tbody.appendChild(tr)
}

function printTableEconomicEffectsAfterRealizationStrategy() {
    let tbody = document.getElementById("tbodyEconomicEffectsAfterRealizationStrategy")
    let trThead = document.getElementById("trEconomicEffectsAfterRealizationStrategy")
    let tdThead = document.getElementById("tdTheadEconomicEffectsAfterRealizationStrategy")
    tdThead.setAttribute("colspan", data["countEvent"])

    data['savage'] = ""
    let max_risk = 0
    for (let i = 0; i < data["countEvent"]; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode(data["userEvent"][i][3])
        td.appendChild(text)
        trThead.appendChild(td)
    }

    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let text = document.createTextNode(data["userMinimization"][strategy][4])
        td.appendChild(text)
        tr.appendChild(td)

        data["userMinimization"][strategy][11] = -9999999
        for (let event = 0; event < data["countEvent"]; event++) {
            let number
            if (data["userEvent"][event][0] === data["userMinimization"][strategy][1]) {
                number = 0
            } else {
                number = data["userEvent"][event][9] - data["userEvent"][event][8]
            }
            let text = document.createTextNode(number)
            td = document.createElement("td")
            td.appendChild(text)
            tr.appendChild(td)
            if (number > data["userMinimization"][strategy][11]) {
                data["userMinimization"][strategy][11] = number
            }
        }

        let tdMax = document.createElement("td")
        let maxText = document.createTextNode(data["userMinimization"][strategy][11])
        if (data["userMinimization"][strategy][11] > max_risk) {
            max_risk = data["userMinimization"][strategy][11]
        }
        tdMax.appendChild(maxText)
        tr.appendChild(tdMax)

        tbody.appendChild(tr)
    }

    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        if (max_risk === data["userMinimization"][strategy][11]) {
            data['savage'] = data['savage'].concat(data["userMinimization"][strategy][0], '; ')
        }
    }
}

function printTableCalculationEstimatedCharacteristics() {
    let tbody = document.getElementById("tbodyCalculationEstimatedCharacteristics")
    let trThead = document.getElementById("trCalculationEstimatedCharacteristics")
    let tdThead = document.getElementById("tdTheadCalculationEstimatedCharacteristics")
    tdThead.setAttribute("colspan", 4)
    let iks = [5, 7, 8, 9]

    for (let i = 0; i < 4; i++) {
        let td = document.createElement("td")
        let text = document.createTextNode('x = 0,' + iks[i])
        td.appendChild(text)
        trThead.appendChild(td)
    }

    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let text = document.createTextNode(data["userMinimization"][strategy][4])
        td.appendChild(text)
        tr.appendChild(td)

        for (let event = 0; event < 4; event++) {
            let number = round(data["userMinimization"][strategy][8] * iks[event] * 0.1 + data["userMinimization"][strategy][7] * (1 - iks[event] * 0.1), 0)
            let text = document.createTextNode(number)
            td = document.createElement("td")
            td.appendChild(text)
            tr.appendChild(td)
        }

        tbody.appendChild(tr)
    }

    let tr = document.createElement("tr")
    let td = document.createElement("td")
    let text = document.createTextNode("Рекомендуемая стратегия")
    td.appendChild(text)
    tr.appendChild(td)

    for (let event = 0; event < 4; event++) {
        let max = 0
        let max_strategy = 0
        for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
            let number = round(data["userMinimization"][strategy][8] * iks[event] * 0.1 + data["userMinimization"][strategy][7] * (1 - iks[event] * 0.1), 0)
            if (number >= max) {
                max = number
                max_strategy = strategy
            }
        }
        let td = document.createElement("td")
        let text = document.createTextNode(data["userMinimization"][max_strategy][4])
        td.appendChild(text)
        tr.appendChild(td)
    }
    tbody.appendChild(tr)
}

function criteriaSavage() {
    let tbody = document.getElementById("tbodyTableResult")
    let tr = document.createElement("tr")

    let td = document.createElement("td")
    let text = document.createTextNode("1")
    td.appendChild(text)
    tr.appendChild(td)

    td = document.createElement("td")
    text = document.createTextNode("Критерий Сэвиджа")
    td.appendChild(text)
    tr.appendChild(td)

    td = document.createElement("td")
    text = document.createTextNode(data['savage'])
    td.appendChild(text)
    tr.appendChild(td)

    tbody.appendChild(tr)
}

function criteriaVald() {
    let tbody = document.getElementById("tbodyTableResult")
    let tr = document.createElement("tr")

    let td = document.createElement("td")
    let text = document.createTextNode("2")
    td.appendChild(text)
    tr.appendChild(td)

    td = document.createElement("td")
    text = document.createTextNode("Критерий Вальда")
    td.appendChild(text)
    tr.appendChild(td)

    td = document.createElement("td")
    text = document.createTextNode(data['vald'])
    td.appendChild(text)
    tr.appendChild(td)

    tbody.appendChild(tr)
}

function criteriaGurvic() {
    data['gurvicPessimist'] = ""
    let tbody = document.getElementById("tbodyTableResult")
    let tr = document.createElement("tr")

    let td = document.createElement("td")
    let text = document.createTextNode("3.1")
    td.appendChild(text)
    tr.appendChild(td)

    td = document.createElement("td")
    text = document.createTextNode("Критерий Гурвица(оптимистичный)")
    td.appendChild(text)
    tr.appendChild(td)

    td = document.createElement("td")
    let max = 0
    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        let number = round(data["userMinimization"][strategy][8] * 0.5 + data["userMinimization"][strategy][7] * 0.5, 0)
        if (number > max) {
            max = number
        }
    }
    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        let number = round(data["userMinimization"][strategy][8] * 0.5 + data["userMinimization"][strategy][7] * 0.5, 0)
        if (number === max) {
            data['gurvicPessimist'] = data['gurvicPessimist'].concat(data["userMinimization"][strategy][0], '; ')
        }
    }
    text = document.createTextNode(data['gurvicPessimist'])
    td.appendChild(text)
    tr.appendChild(td)

    tbody.appendChild(tr)

    data['gurvicOptimist'] = ""

    tr = document.createElement("tr")

    td = document.createElement("td")
    text = document.createTextNode("3.2")
    td.appendChild(text)
    tr.appendChild(td)

    td = document.createElement("td")
    text = document.createTextNode("Критерий Гурвица(пессимистичный)")
    td.appendChild(text)
    tr.appendChild(td)

    td = document.createElement("td")
    max = 0
    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        let number = round(data["userMinimization"][strategy][8] * 0.9 + data["userMinimization"][strategy][7] * 0.1, 0)
        if (number > max) {
            max = number
        }
    }
    for (let strategy = 0; strategy < data["countStrategy"]; strategy++) {
        let number = round(data["userMinimization"][strategy][8] * 0.9 + data["userMinimization"][strategy][7] * 0.1, 0)
        if (number === max) {
            data['gurvicOptimist'] = data['gurvicOptimist'].concat(data["userMinimization"][strategy][0], '; ')
        }
    }

    text = document.createTextNode(data['gurvicOptimist'])
    td.appendChild(text)
    tr.appendChild(td)

    tbody.appendChild(tr)
}
