function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatSecondsToTime(seconds) {
    const miliSeconds = seconds * 1000;

    const date = new Date(miliSeconds);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let secs = date.getSeconds();

    let amOrPm = hours >= 12 ? 'PM' : 'AM';

    hours %= 12;
    hours = hours ? hours : 12;

    let minutesStr = minutes < 10 ? '0' + minutes : minutes;
    let secondsStr = secs < 10 ? '0' + secs : secs;

    return `${hours}:${minutesStr}:${secondsStr} ${amOrPm}`;
}

function getSecondsSinceEpoch() {
    return Math.floor(Date.now() / 1000);
}

function updateTimestampInputPlaceHolder() {
   const timestampInput = document.getElementById("timestampInput");
   timestampInput.attributes.getNamedItem('placeholder').textContent = getSecondsSinceEpoch();
}

function updateDateTimeFields() {
    let now = new Date();

    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    document.querySelector('#yearInput').value = year;
    document.querySelector('#monthInput').value = month;
    document.querySelector('#dayInput').value = day;
    document.querySelector('#hourInput').value = hours;
    document.querySelector('#minuteInput').value = minutes;
    document.querySelector('#secondInput').value = seconds;
}

async function updateTimestampSeconds() {
    const timestampSeconds = document.getElementById("timestampSeconds");
    const timestampTime = document.getElementById("timestampTime");
    
    while (true) {
        const secondsSinceEpoch = getSecondsSinceEpoch();
        timestampSeconds.textContent = secondsSinceEpoch;
        timestampTime.textContent = formatSecondsToTime(secondsSinceEpoch);
        await sleep(1000);
    }
}

async function copyTimestamp() {
    let timestamp = document.getElementById('timestampSeconds').textContent;
    
    navigator.clipboard.writeText(timestamp);

    let copyBtn = document.getElementById('copyBtn');
    copyBtn.textContent = 'Copied!';
    await sleep(700);
    copyBtn.textContent = 'Copy';
}

document.getElementById('copyBtn').addEventListener('click', copyTimestamp);

updateTimestampInputPlaceHolder();
updateDateTimeFields();
updateTimestampSeconds();