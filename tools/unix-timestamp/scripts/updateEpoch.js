function updateEpoch() {
    let currentTime = new Date();
    let utcTime = new Date(currentTime.getUTCFullYear(), 
                         currentTime.getUTCMonth(), 
                         currentTime.getUTCDate(), 
                         currentTime.getUTCHours(), 
                         currentTime.getUTCMinutes(), 
                         currentTime.getUTCSeconds(), 
                         currentTime.getUTCMilliseconds());

    document.querySelector('#dateTime').textContent = dayjs(utcTime).format('MM/DD/YYYY @ h:mm A');
    document.querySelector('#zoneDateTime').textContent = dayjs(utcTime).format('YYYY-MM-DDTHH:mm:ss+00:00');
    document.querySelector('#dayDate').textContent = dayjs(utcTime).format('ddd, DD MMM YYYY HH:mm:ss +0000');
    document.querySelector('#utcDate').textContent = dayjs(utcTime).format('dddd, DD-MMM-YY HH:mm:ss UTC');
    document.querySelector('#rfcZoneDateTime').textContent = dayjs(utcTime).format('YYYY-MM-DDTHH:mm:ss+00:00');
}

updateEpoch();