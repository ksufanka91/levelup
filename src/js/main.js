//=require @splidejs/splide/dist/js/splide.js


//slider
let slider = new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    arrows: true,
    pagination: false,
    gap: '10px',
});

slider.mount();

// tooltip
tippy('.order-form-tooltip-name', {
    content: "Например: Иван Иванов",
});

tippy('.order-form-tooltip-phone', {
    content: "Например: 89049858987",
});


//timer 
function initializeClock(id, endtime) {
    let intervalId;
    let clock = document.getElementById(id);
    //let hoursSpan = clock.querySelector('.hours');
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');


    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());

        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);

        return {
            total: t,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function updateClock() {
        let t = getTimeRemaining(endtime);

        //hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0 && intervalId) {
            clearInterval(intervalId);
        }
    }

    updateClock();
    intervalId = setInterval(updateClock, 1000);
}

// для demo всегда отсчитываем 30 минут
let today = new Date().getTime();
let endtime = new Date(today + 30 * 60 * 1000);
initializeClock('countdown', endtime);


// scroll to element
document.querySelectorAll('.js-scroll-to').forEach(function (button) {
    button.addEventListener('click', function (event) {
        let element = document.querySelector(button.getAttribute('href'));

        if (element) {
            event.preventDefault();
            element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    });
});

