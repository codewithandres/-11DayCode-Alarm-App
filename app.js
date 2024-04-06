
const timerRf = document.querySelector('.curret-time');
const hourInput = document.getElementById('hour-input');
const minutedInput = document.getElementById('minute-input');
const ActiveAlarm = document.querySelector('.alarm-list');
const setAlarm = document.getElementById('set');
const clearAlarm = document.querySelector('.clear');
const almarSund = new Audio('./alarm.mp3');


let alarmIndex = 0;
let alamrArray = [];
let initialHour = 0;
let initialMinute = 0;


const appendZero = value => (value < 10 ? '0' + value : value);

const displayTimer = () => {

    const date = new Date();
    const currentTime = date.toLocaleTimeString('es-CO', { hour12: false });

    timerRf.textContent = currentTime;

    alamrArray.map(alarm => {

        if (alarm.isActive && alarm.time === currentTime.slice(0, 5)) almarSund.play();

    });

};

const createAlarm = (hour, minuted) => {

    alarmIndex += 1;

    const alarmObj = {
        id: `${alarmIndex}_${hour}_${minuted}`,
        time: ` ${appendZero(hour)} : ${appendZero(minuted)} `,
        isActive: false
    };

    alamrArray.push(alarmObj);
    const alarmDiv = document.createElement('div');
    alarmDiv.className = 'alarm';
    alarmDiv.dataset.id = alarmObj.id;
    alarmDiv.innerHTML = `<span> ${alarmObj.time} </span>`;

    const checbox = document.createElement('input');
    checbox.type = 'checkbox';
    checbox.addEventListener('change', () => toggleAlarm(alarmObj));
    alarmDiv.appendChild(checbox);

    const deleteBotton = document.createElement('button');
    deleteBotton.innerHTML = '<i class="ri-delete-bin-line"></i>';
    deleteBotton.className = 'delteButton';
    deleteBotton.addEventListener('click', () => deleteAlarm(alarmObj));
    alarmDiv.appendChild(deleteBotton);

    ActiveAlarm.appendChild(alarmDiv);
};

const toggleAlarm = (alarm) => {

    alarm.isActive = !alarm.isActive;

    if (alarm.isActive) {

        const currentTime = new Date().toLocaleTimeString('es-US ', { hour12: false }).slice(0, 5);

        if (alarm.time === currentTime) almarSund.play();

    } else { almarSund.pause() };
};


const deleteAlarm = (alarm) => {

    const index = alamrArray.indexOf(alarm);

    if (index) {

        alamrArray.splice(index, 1);
        document.querySelector(`[data-id="${alarm.id}"]`).remove();
    };
};


clearAlarm.addEventListener('click', () => {

    alamrArray = [];
    ActiveAlarm.innerHTML = '';
});

setAlarm.addEventListener('click', () => {

    let hour = parseInt(hourInput.value) || 0;
    let minuted = parseInt(minutedInput.value) || 0;

    if (hour < 0 || hour > 23 || minuted < 0 || minuted > 59) {

        alert('Ingrese una hora valida');
        return;
    };

    if (!alamrArray.some(alarm => alarm.time === ` ${appendZero(hour)}: ${appendZero(minuted)} `)) {
        createAlarm(hour, minuted);
    };

    [hourInput.value, minutedInput.value] = ['', ''];
});

window.onload = () => {

    setInterval(displayTimer, 1000);
    [hourInput.value, minutedInput.value] = ['', ''];
}