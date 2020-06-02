function toggle_id(id){
    elems = document.getElementById(id);
    console.log(elems.style.display)
    if (elems.style.display === "none") {
        elems.style.display = "block";
    } else {
        elems.style.display = "none";
    }
}