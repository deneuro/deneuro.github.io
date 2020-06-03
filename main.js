function toggle_id(id){
    elems = document.getElementById(id);
    console.log(elems.style.display)
    if (elems.style.display === "none") {
        elems.style.display = "block";
    } else {
        elems.style.display = "none";
    }
}

function addCommentToThread(comment, threadId) {
  const thread = document.getElementById(threadId)
    || document.getElementById("chat-container");

  let commentElementContainer = document.createElement("div")
  commentElementContainer.classList.add("padded-comment");

  let commentElement = document.createElement("p")
  commentElement.innerHTML = comment

  commentElementContainer.appendChild(commentElement)
  thread.appendChild(commentElementContainer)
}

function loadComments(url) {
  switch(url) {
    case "https://spamfighter.app":
    default:
      addCommentToThread('test comment');
  }
}


function main() {
  window.trufURL = "https://spamfighter.app";
  loadComments(window.trufURL);
}

document.addEventListener('DOMContentLoaded', main);
