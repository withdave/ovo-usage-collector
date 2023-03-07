// Add your email, password and customer id (since I haven't implemented an auto lookup for it yet)
const account = require('./account.json');

const fs = require('fs');

// Function to handle our requests
async function httpsFetch(url, settings) {
    try {
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.headers.get('set-cookie');
        
        return data;

    } catch (e) {
        return e;
    }
}

async function getCookie() {

    var fetchResponse = await fetch('https://my.ovoenergy.com/api/v2/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({"username": account.username, "password": account.password, "rememberMe": true})
    });

    const data = fetchResponse.headers.get('set-cookie');
    return data;

};

// async function getAccountId(ovoCookie) {

//     var fetchResponse = await fetch('https://smartpaymapi.ovoenergy.com/first-login/api/bootstrap/v2/', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Cookie': ovoCookie
//         }
//     });

//     const data = fetchResponse.json();
//     console.log('Next: ', data);
//     return data;

// }

async function getData(dataDate,ovoCookie) {

    var fetchResponse = await fetch('https://smartpaymapi.ovoenergy.com/usage/api/half-hourly/' + account.accountId + '?date=' + dataDate, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': await ovoCookie
        }
    });

    const data = await fetchResponse.json();
    fs.writeFile(dataDate + '.json', JSON.stringify(data), 'utf8', (err) => {
        if (err)
          console.log(err);
    });

}

async function iterDates(startDate,endDate) {

    const ovoCookie = getCookie();
    var days = [];
    for (var d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
        var currentDate = new Date(d);
        getData(currentDate.toISOString().split('T')[0],ovoCookie);

        days.push(currentDate.toISOString().split('T')[0]);
    }

    console.log(days);
    
    
}

iterDates('2023-01-01','2023-01-31');