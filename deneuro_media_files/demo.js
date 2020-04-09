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
