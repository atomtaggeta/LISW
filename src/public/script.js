const comments = [
    {
        name: "Jane",
        comment:
            "Hello World",
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
// const btnClose = document.querySelector(".btn-close");

const rennderComments = function (comments) {
    commentsBox.innerHTML = ""
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
        )

    }
    )
}

rennderComments(comments);

// let isClosed = false;
btnSubmit.onclick = function () {
    let nameStr = nameInput.value.replace(/<(\/?\w+)>/g, "&lt;$1&gt;");
    let commentStr = commentInput.value.replace(/<(\/?\w+)>/g, "&lt;$1&gt;");
    comments.unshift(
        {
            name: nameStr,
            comment: commentStr,
            time: new Date(),
        }
    );
    rennderComments(comments);
    // if (!isClosed) {
    //     btnClose.textContent = "开启留言";
    // } else {
    //     btnClose.textContent = "关闭留言";
    // }
    // nameInput.disabled = !nameInput.disabled;
    // commentInput.disabled = !commentInput.disabled;
    // btnSubmit.disabled = !btnSubmit.disabled;
    // isClosed = !isClosed;
}