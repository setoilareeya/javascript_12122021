if (process.argv.length != 3) {
    console.log('Usage: node app.js FUND');
    process.exit();
}

var fundName = process.argv[2];
const http = require('https');

const options = {
    hostname: 'codequiz.azurewebsites.net',
    port: 443,
    headers: {
        'Content-Type': 'text/html',
        'Cookie': 'hasCookie=true'
    }
};

http.get(options, working);

function working(response) {
    let all = '';
    response.setEncoding('utf8');
    response.on('data', data => all += data);
    response.on('end', () => show(all) );
}

http.get(options, working);

function working(response) {
    let all = '';
    response.setEncoding('utf8');
    response.on('data', data => all += data);
    response.on('end', () => show(all) );
}

function show(data) {
    let start = data.indexOf('<table>');
    let finish = data.indexOf('</table>');
    let result = data.substring(start, finish);
    result = result + '</table>';
    result = result.replace(/ /g, "");
    result = result.replace(/<\/th><\/tr>/g, "</th></tr>\n");
    result = result.replace(/<\/td><\/tr>/g, "</td></tr>\n");
    let all = result.split('\n');
    for (let i = 0; i < all.length; i++) {
        if (all[i].startsWith("<tr><td>" + fundName)) {
            let pattern = '</td><td>';
            start  = all[i].indexOf(pattern);
            finish = all[i].indexOf(pattern, start + 1);
            let answer = all[i].substring(start + pattern.length, finish);
            console.log(+answer || 0);
        }
    }
}