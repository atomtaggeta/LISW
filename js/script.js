
// Retrieve existing comments from localStorage
const savedComments = JSON.parse(localStorage.getItem('comments')) || [];

// If there are saved comments, use them; otherwise, start with the initial comments
const comments = savedComments.length ? savedComments : [
    {
        name: "Jane",
        comment: "Hello World",
        time: "Sun Aug 25 2024",
    },
    {
        name: "Maggie",
        comment: "HAHAHA",
        time: "Sun Aug 25 2024",
    },
];

const commentsBox = document.querySelector("#comments");
let nameInput = document.querySelector("#name");
let commentInput = document.querySelector("#comment");
const btnSubmit = document.querySelector("#btn-submit");

const renderComments = function (comments) {
    commentsBox.innerHTML = "";
    comments.forEach((item) => {
        commentsBox.insertAdjacentHTML(
            'beforeend',
            `<hr>
            <h4>
                <span>${item.name}</span>
                <span class="date">${item.time}</span>
            </h4>
            <p>${item.comment}</p>
            `
        );
    });
};

// Initially render comments when the page loads
renderComments(comments);

// Save the comments to localStorage
const saveComments = function () {
    localStorage.setItem('comments', JSON.stringify(comments));
};

btnSubmit.onclick = function () {
    let nameStr = nameInput.value.replace(/<(\/?\w+)>/g, "&lt;$1&gt;");
    let commentStr = commentInput.value.replace(/<(\/?\w+)>/g, "&lt;$1&gt;");
    comments.unshift(
        {
            name: nameStr,
            comment: commentStr,
            time: new Date().toDateString(),
        }
    );
    renderComments(comments);
    saveComments(); // Save the updated comments to localStorage

    // Clear the input fields after posting
    nameInput.value = '';
    commentInput.value = '';
};
