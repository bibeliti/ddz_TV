
function consoleTable() {
    let data = {}

    let tables = document.getElementsByTagName('table')
    console.log(tables)
// table
    console.log(tables.length)
    for (let i = 0; i < tables.length; i++) {
        data[i] = []
        let currTable = tables[i]
        let currRows = currTable.getElementsByTagName('tr')

        // tr
        for (let j = 0; j < currRows.length; j++) {
            data[i][j] = []
            let currRow = currRows[j]
            let cells = currRow.getElementsByTagName('td')

            // td
            for (let k = 0; k < cells.length; k++) {
                data[i][j][k] = cells[k].textContent
                console.log(cells[k].textContent)
            }
        }
    }

    console.log(data)
}


var myNodelist = document.getElementsByTagName("tr");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}


var close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

function newRisk() {
    var tr = document.createElement("tr");
    var inputRiskName = document.getElementById("inputRiskName").value;
    var inputRiskAssessment = document.getElementById("inputRiskAssessment").value;
    var inputRiskIntensity = document.getElementById("inputRiskIntensity").value;
    var textName = document.createTextNode(inputRiskName);
    var textAssessment = document.createTextNode(inputRiskAssessment);
    var textIntensive = document.createTextNode(inputRiskIntensity);
    var name = document.createElement("td")
    var intensive = document.createElement("td")
    var assessment = document.createElement("td")
    name.appendChild(textName)
    assessment.appendChild(textAssessment)
    intensive.appendChild(textIntensive)
    tr.appendChild(name)
    tr.appendChild(intensive)
    tr.appendChild(assessment)
    if (inputRiskAssessment === '' || inputRiskIntensity === '' || inputRiskName === '') {
        alert("You must write something!");
    } else {
        document.getElementById("tableRiskAssessment").appendChild(tr);
        document.getElementById("tableRiskAssessment").removeAttribute("class");
    }
    document.getElementById("inputRiskName").value = "";
    document.getElementById("inputRiskAssessment").value = "";
    document.getElementById("inputRiskIntensity").value = "";

    var closeButton = document.createElement("td");
    var spanForClose = document.createElement("span")
    var txt = document.createTextNode("\u00D7");
    spanForClose.appendChild(txt)
    spanForClose.className = "close";
    closeButton.appendChild(spanForClose);
    closeButton.className = "lastTd"
    tr.appendChild(closeButton);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement.parentElement;
            div.style.display = "none";
        }
    }
}

function newMinimization() {
    var tr = document.createElement("tr");
    var inputNameMinimization = document.getElementById("inputNameMinimization").value;
    var inputRiskStrategy = document.getElementById("inputWhatRiskThisStrategy").value;
    var inputCostMinimization = document.getElementById("inputCostMinimization").value;
    var textName = document.createTextNode(inputNameMinimization);
    var textRiskStrategy = document.createTextNode(inputRiskStrategy);
    var textCost = document.createTextNode(inputCostMinimization);
    var name = document.createElement("td")
    var riskStrategy = document.createElement("td")
    var cost = document.createElement("td")
    name.appendChild(textName)
    riskStrategy.appendChild(textRiskStrategy)
    cost.appendChild(textCost)
    tr.appendChild(name)
    tr.appendChild(riskStrategy)
    tr.appendChild(cost)
    if (inputNameMinimization === '' || inputRiskStrategy === '' || inputCostMinimization === '') {
        alert("You must write something!");
    } else {
        document.getElementById("tableMinimization").appendChild(tr);
        document.getElementById("tableMinimization").removeAttribute("class");
    }
    document.getElementById("inputNameMinimization").value = "";
    document.getElementById("inputWhatRiskThisStrategy").value = "";
    document.getElementById("inputCostMinimization").value = "";

    var closeButton = document.createElement("td");
    var spanForClose = document.createElement("span")
    var txt = document.createTextNode("\u00D7");
    spanForClose.appendChild(txt)
    spanForClose.className = "close";
    closeButton.appendChild(spanForClose);
    closeButton.className = "lastTd"
    tr.appendChild(closeButton);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement.parentElement.parentElement;
            console.log(div)
            div.removeChild(tr)
        }
    }
}

function newBase() {
    var inputBase = document.getElementById("inputBase").value;
    if (inputBase === '') {
        alert("You must write something!");
    } else {
        document.getElementById("baseValue").innerText = document.createTextNode(inputBase).nodeValue;
        document.getElementById("forBase").removeAttribute("class");
        document.getElementById("addBtnBase").innerText = "Обновить";
    }
    document.getElementById("inputBase").value = "";
}

