const topicElement = document.querySelector('.topic-card');
const topic = topicElement ? topicElement.getAttribute('data-topic') : 'software';
const storageKey = `comments_${topic}`;
const savedComments = JSON.parse(localStorage.getItem(storageKey)) || [];
const comments = savedComments.length ? savedComments : [];

const commentsBox = document.querySelector("#comments");
let nameInput = document.querySelector("#name");
let commentInput = document.querySelector("#comment");
const btnSubmit = document.querySelector("#btn-submit");
let replyIndex = null;
let editIndex = null;
let deleteIndex = null; // Track which comment is being deleted

// Popup element
const successPopup = document.getElementById('successPopup');
const confirmPopup = document.getElementById('confirmPopup');
const confirmYesBtn = document.getElementById('confirmYes');
const confirmNoBtn = document.getElementById('confirmNo');

// Function to format date
const formatDate = function (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

// Render comments
const renderComments = function (comments) {
    commentsBox.innerHTML = "";
    comments.forEach((item, index) => {
        commentsBox.insertAdjacentHTML(
            'beforeend',
            `<hr>
            <h4>
                <span>${item.name}</span>
                <span class="date">${item.time}</span>
            </h4>
            <p>${item.comment}</p>
            <div class="comment-actions">
                <button class="reply-btn" onclick="replyTo(${index})">Reply</button>
                <button class="edit-btn" onclick="editComment(${index})">Edit</button>
                <button class="delete-btn" onclick="confirmDelete(${index})">Delete</button>
            </div>
            <div id="replies-${index}" class="replies"></div>`
        );

        if (item.replies && item.replies.length > 0) {
            renderReplies(item.replies, index);
        }
    });
};

// Render replies
const renderReplies = function (replies, commentIndex) {
    const repliesBox = document.querySelector(`#replies-${commentIndex}`);
    repliesBox.innerHTML = "";
    replies.forEach(reply => {
        repliesBox.insertAdjacentHTML(
            'beforeend',
            `<div class="reply">
                <h5>${reply.name}</h5>
                <p>${reply.comment}</p>
                <span class="date">${reply.time}</span>
            </div>`
        );
    });
};

// Save comments to local storage
const saveComments = function () {
    localStorage.setItem(storageKey, JSON.stringify(comments));
};

// Show success popup
const showSuccessPopup = function () {
    successPopup.style.display = 'block';
    setTimeout(() => {
        successPopup.style.display = 'none';
    }, 2000);
};

// Handle submit button click
btnSubmit.onclick = function () {
    let nameStr = nameInput.value.replace(/<(\/?\w+)>/g, "&lt;$1&gt;");
    let commentStr = commentInput.value.replace(/<(\/?\w+)>/g, "&lt;$1&gt;");
    
    if (nameStr.trim() === '' || commentStr.trim() === '') {
        alert('Name and comment cannot be empty!');
        return;
    }

    const now = formatDate(new Date());

    if (editIndex !== null) {
        // Edit existing comment
        comments[editIndex].name = nameStr;
        comments[editIndex].comment = commentStr;
        comments[editIndex].time = now;
        editIndex = null;
    } else if (replyIndex !== null) {
        // Add a reply
        comments[replyIndex].replies.push({
            name: nameStr,
            comment: commentStr,
            time: now
        });
        replyIndex = null;
    } else {
        // Add a new post
        comments.unshift({
            name: nameStr,
            comment: commentStr,
            time: now,
            replies: []
        });
    }

    renderComments(comments);
    saveComments();

    // Reset form and indexes after submission
    nameInput.value = '';
    commentInput.value = '';
    replyIndex = null;
    editIndex = null;
    togglePostModal();

    // Show success popup
    showSuccessPopup();
};

// Edit a comment
const editComment = function (commentIndex) {
    editIndex = commentIndex;
    nameInput.value = comments[commentIndex].name;
    commentInput.value = comments[commentIndex].comment;
    document.getElementById("modalTitle").innerText = "Edit Post";
    togglePostModal();
};

// Reply to a comment
const replyTo = function (commentIndex) {
    replyIndex = commentIndex;
    document.getElementById("modalTitle").innerText = "Reply to Post";
    togglePostModal();
};

// Confirm delete
const confirmDelete = function (commentIndex) {
    deleteIndex = commentIndex;
    confirmPopup.style.display = 'block';
};

confirmYesBtn.onclick = function () {
    if (deleteIndex !== null) {
        comments.splice(deleteIndex, 1);
        renderComments(comments);
        saveComments();
        deleteIndex = null;
        confirmPopup.style.display = 'none';
    }
};

confirmNoBtn.onclick = function () {
    deleteIndex = null;
    confirmPopup.style.display = 'none';
};

// Toggle post modal
const togglePostModal = function () {
    const postModal = document.getElementById('postModal');
    const modalTitle = document.getElementById("modalTitle");

    postModal.style.display = postModal.style.display === 'flex' ? 'none' : 'flex';
    if (postModal.style.display === 'flex' && replyIndex === null && editIndex === null) {
        modalTitle.innerText = "New Post";
    }
};

// Go back
const goBack = function () {
    window.history.back();
};

// Initially render comments when the page loads
renderComments(comments);
