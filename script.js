function consoleTable() {
    let data = {}
    data['base'] = document.getElementById("baseValue").textContent;
    tableEntry("tableRiskAssessment", "risk", data)
    tableEntry("tableMinimization", "minimization", data)

    console.log(data)
}

function tableEntry(nameTable, nameData, data) {
    let tableRisk = document.getElementById(nameTable)

    data[nameData] = [];
    let currRows = tableRisk.getElementsByTagName('tr')

    for (let j = 0; j < currRows.length; j++) {
        data[nameData][j] = []
        let cells = currRows[j].getElementsByTagName('td')

        for (let k = 0; k < cells.length - 1; k++) {
            data[nameData][j][k] = cells[k].textContent
        }
    }
}


let myNodelist = document.getElementsByTagName("tr");
let i;
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

let close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
    }
}

function newRisk() {
    let tr = document.createElement("tr");
    let inputRiskName = document.getElementById("inputRiskName").value;
    let inputRiskAssessment = document.getElementById("inputRiskAssessment").value;
    let inputRiskIntensity = document.getElementById("inputRiskIntensity").value;
    let textName = document.createTextNode(inputRiskName);
    let textAssessment = document.createTextNode(inputRiskAssessment);
    let textIntensive = document.createTextNode(inputRiskIntensity);
    let name = document.createElement("td")
    let intensive = document.createElement("td")
    let assessment = document.createElement("td")
    name.appendChild(textName)
    assessment.appendChild(textAssessment)
    intensive.appendChild(textIntensive)
    tr.appendChild(name)
    tr.appendChild(intensive)
    tr.appendChild(assessment)
    if (inputRiskAssessment === '' || inputRiskIntensity === '' || inputRiskName === '') {
        alert("You must write something!");
    } else {
        if(!isNaN(inputRiskIntensity) && !isNaN(inputRiskAssessment) && (0 <= inputRiskAssessment) && (inputRiskAssessment <= 100)){
        document.getElementById("tableRiskAssessment").appendChild(tr);
        document.getElementById("tableRiskAssessment").removeAttribute("class");
        }
        else {
            alert("Digit please!");
        }
    }
    document.getElementById("inputRiskName").value = "";
    document.getElementById("inputRiskAssessment").value = "";
    document.getElementById("inputRiskIntensity").value = "";
    createCloseButton(tr);
}

function createCloseButton(tr) {
    let closeButton = document.createElement("td");
    let spanForClose = document.createElement("span")
    let txt = document.createTextNode("\u00D7");
    spanForClose.appendChild(txt)
    spanForClose.className = "close";
    closeButton.appendChild(spanForClose);
    closeButton.className = "lastTd"
    tr.appendChild(closeButton);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            div.setAttribute('class', 'deleteClass');
            const deleteElement = document.querySelector('.deleteClass');
            const parent = deleteElement.parentNode;
            parent.removeChild(deleteElement);
        }
    }
}

function newMinimization() {
    let tr = document.createElement("tr");
    let inputNameMinimization = document.getElementById("inputNameMinimization").value;
    let inputRiskStrategy = document.getElementById("inputWhatRiskThisStrategy").value;
    let inputCostMinimization = document.getElementById("inputCostMinimization").value;
    let textName = document.createTextNode(inputNameMinimization);
    let textRiskStrategy = document.createTextNode(inputRiskStrategy);
    let textCost = document.createTextNode(inputCostMinimization);
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
        alert("You must write something!");
    } else {
        if(!isNaN(inputCostMinimization) ){
        document.getElementById("tableMinimization").appendChild(tr);
        document.getElementById("tableMinimization").removeAttribute("class");
        } else {
            alert("Digits please!");
        }
    }
    document.getElementById("inputNameMinimization").value = "";
    document.getElementById("inputWhatRiskThisStrategy").value = "";
    document.getElementById("inputCostMinimization").value = "";
    createCloseButton(tr);
}

// function newBase() {
//     let inputBase = document.getElementById("inputBase").value;
//     if (inputBase === '') {
//         alert("You must write something!");
//     } else {
//     }
//     document.getElementById("inputBase").value = "";
// }


function newBase() {
    var inputBase = document.getElementById("inputBase").value;
    var myRe = /\d*/g; // '' !!!!!!!!!
    if(inputBase === '') {
        alert("You must write something!");
    } else {
        if(!isNaN(inputBase)){ // null inputBase.match(/'[0-9]*'/gi)
            document.getElementById("baseValue").innerText = document.createTextNode(inputBase).nodeValue;
            document.getElementById("forBase").removeAttribute("class");
            document.getElementById("addBtnBase").innerText = "Обновить";
        } else{
            alert("Digits please!");
        }
    }
    document.getElementById("inputBase").value = "";
}