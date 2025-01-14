setInterval(function () {
    document.querySelectorAll('.mask').forEach(mask => {
        const show = mask.querySelector('span[data-show]');
        const next = show.nextElementSibling || mask.querySelector('span:first-child');
        const up = mask.querySelector('span[data-up]');

        if (up) {
            up.removeAttribute('data-up');
        }

        show.removeAttribute('data-show');
        show.setAttribute('data-up', '');

        next.setAttribute('data-show', '');
    });
}, 2000);


const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }else{
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                return;
            }
            entry.target.classList.remove("active");
        }
    });
}, { threshold: 0.8});

const hiddenElements = document.querySelectorAll(".flag");
hiddenElements.forEach((el) => observer.observe(el));