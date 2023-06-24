let data = {}
data["countEvent"] = 0

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

    data['event'] = new Array(data['userEvent'].length)
    for (let i = 0; i < data['userEvent'].length; i++) {
        let tr = document.createElement("tr");
        let tdNameOriginal = document.createElement("td");
        let tdNameReplacement = document.createElement("td");

        let original = document.createTextNode(data['userEvent'][i][0]);
        let replacement = document.createTextNode('Событие-' + (i + 1));

        data['event'][i] = data['userEvent'][i]
        data['event'][i][0] = 'e' + (i + 1)

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
    document.querySelectorAll('.invalid-feedback').forEach(e => e.remove())
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
    document.querySelectorAll('.invalid-feedback').forEach(e => e.remove())
    document.getElementById("validationNameEvent").classList.remove("is-invalid")
    document.getElementById("validationIntensityEvent").classList.remove("is-invalid")
    document.getElementById("validationProbabilityEvent").classList.remove("is-invalid")

    let names = document.getElementsByClassName('eventName')
    console.log(names)

    let flag = true
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
        let event = document.createElement('tr')
        let newNameEvent = document.createElement('td')
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
        console.log(close)

        for (let i = 0; i < close.length; i++) {
            console.log(i)
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
    // let close = document.querySelectorAll(".close")
}
