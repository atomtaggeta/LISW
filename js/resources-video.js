let videoList = document.querySelectorAll('.video-list-container .list');

videoList.forEach(vid => {
    vid.onclick = () => {
        // 移除所有列表项的 active 类
        videoList.forEach(item => item.classList.remove('active'));

        // 为当前点击的列表项添加 active 类
        vid.classList.add('active');

        let src = vid.querySelector('.list-video').src;
        let title = vid.querySelector('.list-title').innerHTML;

        // 添加一个唯一的查询参数来强制重新加载iframe
        document.querySelector('.main-video-container .main-video').src = src + "&t=" + new Date().getTime();
        document.querySelector('.main-vid-title').innerHTML = title;
    };
});
