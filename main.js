/* globals window.COMMENTS */

const SITE_1 = "https://pioneer.app/blog/";
const SITE_2 = "https://www.era.com/";

document.addEventListener('DOMContentLoaded', () => window.trufURL = SITE_1);


/**
 * UX
 */
function toggle_id(id, display){
    const elems = document.getElementById(id);

    if (elems.style.display === "none") {
        elems.style.display = display || "block";
    } else {
        elems.style.display = "none";
    }
}

function postComment() {
  let postInput = document.getElementById("post-input");
  const comment = postInput.value;
  postInput.value = "";

  if (comment) {
    addCommentToThread({
      "commenter": "anter_user_2020",
      "commentID": Date.now(),
      "Comment Text": comment,
    });
  }

  return false;
}

function addCommentToThread(comment, threadId, upvotes = 0) {
  const thread = document.getElementById(threadId) || document.getElementById("chat-container");

  let commentElementContainer = document.createElement("div");
  commentElementContainer.id = `comment-${comment["commentID"]}`;

  // add upvotes
  let upvoteContainer = document.createElement('div');
  upvoteContainer.classList.add('upContainer');
  let upArrow = document.createElement('img'); 
  upArrow.src = "chevron-up.svg";
  upArrow.classList.add('upArrow');
  let downArrow = document.createElement('img'); 
  downArrow.src = "chevron-down.svg";
  downArrow.classList.add('downArrow');
  let upvotesD = document.createElement('div');
  upvotesD.innerHTML = upvotes;

  upvoteContainer.appendChild(upArrow);
  upvoteContainer.appendChild(upvotesD);
  upvoteContainer.appendChild(downArrow);

  let commentAuthorText = document.createElement("p");
  commentAuthorText.innerHTML = comment["commenter"];
  commentAuthorText.classList.add("comment-username");

  let commentElement = document.createElement("p");
  commentElement.innerHTML = comment["Comment Text"];

  let repliesElement = document.createElement("div");
  repliesElement.id = `comment-${comment["commentID"]}-replies`;
  repliesElement.classList.add("child-thread");

  commentElementContainer.appendChild(upvoteContainer);
  commentElementContainer.appendChild(commentAuthorText)
  commentElementContainer.appendChild(commentElement)
  commentElementContainer.appendChild(repliesElement)

  thread.appendChild(commentElementContainer)
  return commentElementContainer;
}


/**
 * loading and parsing comments
 */
function repopulateComments(url) {
  console.log("REPOPULATION COMMENCING")
  document.getElementById("chat-container").innerHTML = "";

  const comments = window.COMMENTS[url] || window.COMMENTS.default;
  for (comment of comments) {
    const thread = comment["Comment Level"] === "0"
      ? null
      : `comment-${comment["parentCommentID"]}-replies`;

    addCommentToThread(comment, thread);
  }
}


function switchSite() {
  window.trufURL = window.trufURL === SITE_1 ? SITE_2 : SITE_1;
  repopulateComments(window.trufURL);

  let iframe = document.getElementById('iframe-window');
  iframe.src = window.trufURL;

}


function parseComments(text) {
  const [columnLine, ...commentRows] = text.split('\n');

  const columns = columnLine.split(',');
  const comments = commentRows
    .map(commentRow => commentRow.split(','))
    .map(c => c.reduce(
      (out, value, index) => ({...out, [columns[index]]: value}),
      {}
    ));

  window.COMMENTS = {
    [SITE_1]: comments.filter(c => c.Website === "pioneer"),
    [SITE_2]: comments.filter(c => c.Website === "realestate"),
    default: comments.filter(c => !(c.Website === "realestate" || c.Website === "pioneer")),
  };
}


(function loadComments() {
  const csvUrl = "https://raw.githubusercontent.com/deneuro/deneuro.github.io/master/sample_comments.csv";
  const request = new XMLHttpRequest();
  request.open('GET', csvUrl);

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      parseComments(request.responseText);
      repopulateComments(window.trufURL);
    }
  }

  request.send(null);
})();
