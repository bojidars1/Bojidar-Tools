function calculateRelativeTime(timeDifference) {
    let isInFuture = timeDifference < 0;
    if (isInFuture) {
        timeDifference = Math.abs(timeDifference);
    }
    let seconds = Math.floor(timeDifference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);

    if (years > 0) {
        return (isInFuture) ? `in ${years} years` : `${years} years ago`
    } else if (months > 0) {
       return (isInFuture) ? `in ${months} months` : `${months} months ago`
    } else if (days > 0) {
        return (isInFuture) ? `in ${days} days` : `${days} days ago`
    } else if (hours > 0) {
        return (isInFuture) ? `in ${hours} hours` : `${hours} hours ago`
    } else if (minutes > 0) {
        return (isInFuture) ? `in ${minutes} minutes` : `${minutes} minutes ago`
    } else {
        return (isInFuture) ? `in ${seconds} seconds` : `${seconds} seconds ago`
    }
}

function updateTable(timestamp, gmtString, localString, relativeTime, isTimestampConverting) {
    let result;
    if (isTimestampConverting) {
        result = document.querySelector('#result1');
        result.querySelector('#timestamp').textContent = timestamp;
        result.querySelector('#gmt').textContent = gmtString;
        result.querySelector('#local').textContent = localString;
        result.querySelector('#relative').textContent = relativeTime;

        result.style.display = 'block';
    } else {
        result = document.querySelector('#result2');
        result.querySelector('#timestamp').textContent = timestamp;
        result.querySelector('#gmt').textContent = gmtString;
        result.querySelector('#local').textContent = localString;
        result.querySelector('#relative').textContent = relativeTime;

        result.style.display = 'block';
    }
}

function convertTimestamp() {
    let timestampInput = document.getElementById('timestampInput').value;
    if (timestampInput === '') {
        alert('Please enter a Unix timestamp.');
        return;
    }

    let timestamp = parseInt(timestampInput, 10);
    let date = new Date(timestamp * 1000);

    let gmtString = date.toUTCString();
    let localString = date.toString();

    let now = Date.now();
    let timeDifference = now - date.getTime();
    let relativeTime = calculateRelativeTime(timeDifference);

    updateTable(timestamp, gmtString, localString, relativeTime, true);
}

function convertDate() {
    let year = document.getElementById('yearInput').value;
    let month = document.getElementById('monthInput').value;
    let day = document.getElementById('dayInput').value;
    let hour = document.getElementById('hourInput').value;
    let minute = document.getElementById('minuteInput').value;
    let second = document.getElementById('secondInput').value;

    if (year === '' || month === '' || day === '' || hour === '' || minute === '' || second === '') {
        alert('Please fill in all date and time fields.');
        return;
    }

    let date = new Date(year, month - 1, day, hour, minute, second);
    let timeStamp = Math.floor(date.getTime() / 1000);

    let gmtString = date.toUTCString();
    let localString = date.toString();

    let now = Date.now();
    let timeDifference = now - date.getTime();
    let relativeTime = calculateRelativeTime(timeDifference);

    updateTable(timeStamp, gmtString, localString, relativeTime, false)
}

document.getElementById('convertTimestampButton').addEventListener('click', convertTimestamp);
document.getElementById('convertButton').addEventListener('click', convertDate)