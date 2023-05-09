var myNodelist = document.getElementsByTagName("LI");
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

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

function newRisk() {
    var li = document.createElement("li");
    var inputRiskAssessment = document.getElementById("inputRiskAssessment").value;
    var inputRiskIntensity = document.getElementById("inputRiskIntensity").value;
    var t = document.createTextNode(inputRiskAssessment);
    var v = document.createTextNode(inputRiskIntensity);
    li.appendChild(t);
    li.appendChild(document.createTextNode(" "));
    li.appendChild(v);
    if (inputRiskAssessment === '' || inputRiskIntensity === '') {
        alert("You must write something!");
    } else {
        document.getElementById("UlRiskAssessment").appendChild(li);
    }
    document.getElementById("inputRiskAssessment").value = "";
    document.getElementById("inputRiskIntensity").value = "";

    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

function newBase() {
    var inputBase = document.getElementById("inputBase").value;
    if(inputBase === '') {
        alert("You must write something!");
    } else {
        document.getElementById("forBase").innerText = document.createTextNode(inputBase).nodeValue;
    }
    document.getElementById("inputBase").value = "";

    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    document.getElementById("forBase").appendChild(span);

    close.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}
