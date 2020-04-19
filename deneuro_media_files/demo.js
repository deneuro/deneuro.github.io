// slide open something
function slideOpen(evt, sliding){
    var items;
    items = document.getElementsByClassName("rolldown");
    if (document.getElementById(sliding).style.display !== "block"){
        for (i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }
        // $("#"+sliding+"-expand").velocity("slideUp",{duration: 100}) im not gonna have buttons
        $("#"+sliding).velocity("slideDown",{duration: 500});
    } else {
        $("#"+sliding).velocity("slideUp",{duration: 300});
        // $("#"+sliding+"-expand").velocity("slideDown",{duration: 100})
    }
}

function openDIV(name) {
    var divs = document.getElementsByClassName(name);
    var i;
    for (i = 0; i < divs.length; i++){
        if (divs[i].style.display === "none") {
            divs[i].style.display = "block";
        } else {
            divs[i].style.display = "none";
        }
    }
}

async function fetchAsync (url, text1, text2, search) {
    let response = await fetch(url, {
            method: 'POST',
            body: {
                'text1': JSON.stringify(text1),
                'text2': JSON.stringify(text2),
                'loc' : search,
                'condense': false,
                'k': 5
            },
            protocol: 'http:',
            headers: { 'Content-Type': 'application/json' },
        });
    let data = await response.json();
    return data;
}

function queryAPI(){
    var text1 = document.getElementById("ltext").value;
    var text2 = document.getElementById("rtext").value;
    var checkedbool = document.querySelector('.messageCheckbox').checked;
    var search = "google";
    if (checkedbool){
        search = "arxiv_search";
    } else {
        search = "google";
    }
    data = fetchAsync("http://127.0.0.1:8000/snippets/", text1, text2, search);
    console.log(data);
    console.log("does this terminate");
}

var apiCallMade = false;

function jqueryAPI(){
    clearresults();
    newdiv = document.createElement('div')  // first mark the search result time
    newdiv.innerText = "Sending query at " + new Date().toLocaleString() + " ...";
    newdiv.style = "font-weight: bold";
    enddiv.appendChild(newdiv);
    if (apiCallMade){
        newdiv = document.createElement('div')  // first mark the search result time
        newdiv.innerText = "Web tool can only process one search at a time";
        newdiv.style = "font-weight: bold";
        enddiv.appendChild(newdiv);
        return; // this way user can only call one inquery per time
    } else {
        apiCallMade = true;
    }

    var text1 = document.getElementById("ltext").value;
    var text2 = document.getElementById("rtext").value;
    var checkedbool = document.querySelector('.messageCheckbox').checked;
    var search = "google";
    if (checkedbool){
        search = "google";
    } else {
        search = "arxiv_search";
    }
    var data={
        "loc":"arxiv_search",
        "query": text1,
        "search_terms": text2, // good example is "covid OR coronavirus OR SARS-CoV-V2"
        "condense": false,
        "k": 15,
        "summary": "", "authors":"", "date":"","pdf_url":"", "title":""
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://35.202.140.218:80/snippets/");
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        // add them all as divs
        apiCallMade = false;
        clearresults();
        response = JSON.parse(this.responseText);
        titles = response["title"]
        abstracts = response["summary"]
        authors = response["authors"]
        date = response["date"]
        url = response["pdf_url"]
        enddiv = document.getElementById("results")
        newdiv = document.createElement('div')  // first mark the search result time
        newdiv.innerText = "Filtering " + response["query"] + " results from "
        newdiv.innerText += search.split("_").join(" ") + " at " + new Date().toLocaleString();
        newdiv.style = "font-weight: bold";
        enddiv.appendChild(newdiv)
        for(var i = 0; i < titles.length; i++){
            newdiv = document.createElement('div');
            newa = document.createElement('a')
            newa.innerText = titles[i].split("\n").join(" "); // first, title
            newa.href = url[i]; // with url linked
            newa.target = "_blank"
            newa.rel = "noopener noreferrer"
            newa.style = "font-weight: bold; font-size: 20px; color: #0000FF; ";
            newa.style.textDecoration = "underline";
            newdiv.appendChild(newa)
            enddiv.appendChild(newdiv);
            newdiv = document.createElement('div');
            newdiv.innerText = authors[i].replace(/\n/g, ' '); // author
            // newdiv.style = "font-weight: bold";
            enddiv.appendChild(newdiv);
            newdiv = document.createElement('div');
            newdiv.innerText = "arxiv.org first publication date: " + date[i].replace(/\n/g, ' '); // date
            // newdiv.style = "font-weight: bold";
            enddiv.appendChild(newdiv);
            // full paragraph only display on click of "more"
            newdiv = document.createElement('div');
            // newdiv.innerHTML = abstracts[i].replace(/\n/g, ' '); // last, summary
            var stripped = abstracts[i].replace(/\n/g, ' ');
            var temp = stripped.split("__B0LD_DIVIDER__")
            var temp2 = temp[1].split("__B1LD_DIVIDER__")
            // newdiv.innerHTML =
            newdiv.className = "expanders " + i;
            newdiv.style = "display: None;"
            newdiv.innerHTML = temp[0] + temp2[0].bold() + temp2[1]
            newa = document.createElement('a')
            newa.innerHTML = " &#9653 Click to contract &#9653"
            newa.style = "color: #0000FF; ";
            newdiv.setAttribute("onClick", "openDIV(\"expanders "+i+"\")")
            newdiv.appendChild(newa)
            enddiv.appendChild(newdiv);
            // just display bold most relevant para before more is clicked
            newdiv = document.createElement('div');
            // newdiv.innerHTML =
            newdiv.className = "expanders " + i;
            newdiv.style = "display: block;"
            //
            newdiv.innerHTML = "[...]" + temp2[0].bold() + "[...] "
            newa = document.createElement('a')
            newa.innerHTML = "&#9663 Click to expand &#9663"
            newa.style = "color: #0000FF; ";
            newdiv.setAttribute("onClick", "openDIV(\"expanders "+i+"\")")
            newdiv.appendChild(newa)
            enddiv.appendChild(newdiv);
        }

    };
}

function clearform(id){
    document.getElementById(id).value = "";
}

function clearresults(){
    enddiv = document.getElementById("results");
    enddiv.innerHTML = '';
}

function covid_research_example(){
    document.getElementById("ltext").value = "We argue that random testing (polling the fraction of infected people in the population) is central to managing the COVID-19 pandemic because it both measures the key variable controlled by restrictive measures, and anticipates the load on the healthcare system via the progression of the disease. Knowledge of random testing outcomes will therefore (i) significantly improve the predictability of the course of the pandemic, (ii) allow informed and optimized decisions on how to modify restrictive measures, with much shorter delay times than the present ones, and (iii) enable the real-time assessment of the efficiency of new means to reduce transmission rates (such as new tracing strategies based on the mobile telephone network, wearing face masks, etc.). Frequent random testing for COVID-19 infections has the essential benefit of providing more reliable and refined data than currently available, in both time and space. This is crucial to accompany and monitor the safe release of restrictive measures. Here we show that independent of the total size of population with frequent interactions among its members, about 15000 tests with randomly selected people per day suffice to obtain valuable data about the current number of infections and their evolution in time. In contrast to testing confined to particular subpopulations such as those displaying symptoms, this will allow close to real-time assessment of the quantitative effect of restrictive measures. With yet higher testing capacity, random testing further allows detection of geographical differences in spreading rates and thus the formulation of optimal strategies for a safe reboot of the economy. Most importantly, with daily random testing in place, a reboot could be attempted while the fraction of infected people is still an order of magnitude higher than the level required for a reboot without such polling."
    document.getElementById("rtext").value = "covid OR coronavirus OR SARS-CoV-V2";
}

function news_example(){

}
