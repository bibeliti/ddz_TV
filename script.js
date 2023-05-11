var myNodelist = document.getElementsByTagName("tr");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}


var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

function newRisk() {
    var tr = document.createElement("tr");
    var inputRiskAssessment = document.getElementById("inputRiskAssessment").value;
    var inputRiskIntensity = document.getElementById("inputRiskIntensity").value;
    var t = document.createTextNode(inputRiskAssessment);
    var v = document.createTextNode(inputRiskIntensity);
    var intensive = document.createElement("td")
    var assessment = document.createElement("td")
    assessment.appendChild(t)
    intensive.appendChild(v)
    tr.appendChild(assessment)
    tr.appendChild(intensive)
    if (inputRiskAssessment === '' || inputRiskIntensity === '') {
        alert("You must write something!");
    } else {
        document.getElementById("tableRiskAssessment").appendChild(tr);
    }
    document.getElementById("inputRiskAssessment").value = "";
    document.getElementById("inputRiskIntensity").value = "";

    var closeButton = document.createElement("td");
    var spanForClose =document.createElement("span")
    var txt = document.createTextNode("\u00D7");
    spanForClose.appendChild(txt)
    spanForClose.className = "close";
    closeButton.appendChild(spanForClose);
    closeButton.className = "lastTd"
    tr.appendChild(closeButton);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement.parentElement;
            div.style.display = "none";
        }
    }
}

function newBase() {
    var inputBase = document.getElementById("inputBase").value;
    if(inputBase === '') {
        alert("You must write something!");
    } else {
        document.getElementById("baseValue").innerText = document.createTextNode(inputBase).nodeValue;
        document.getElementById("forBase").removeAttribute("class");
        document.getElementById("addBtnBase").innerText = "Обновить";
    }
    document.getElementById("inputBase").value = "";
}
