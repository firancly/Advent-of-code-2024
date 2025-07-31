// Find similarities between two lists of numbers
require ('dotenv').config();
const cookie = process.env.SESSION_COOKIE;
async function fetchInput() {
    const { request } = require('https');
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'adventofcode.com',
            path: '/2024/day/1/input',
            method: 'GET',
            headers: {
                "Cookie": `session=${cookie}`
            }
        };
        
        const req = request(options, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Request failed. Status Code: ${res.statusCode}`));
                return;
            }

            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data.trim().split('\n')));
        });

        req.on('error', (e) => reject(new Error(`Problem with request: ${e.message}`)));
        req.end();
    });
}

async function main() {
    const input = await fetchInput();

    let first = [];
    let second = [];

    for (const line of input) {
        const [num1, num2] = line.trim().split(/\s+/);
        first.push(num1);
        second.push(num2);
    }

    let total = 0;
    for (let i = 0; i < first.length; i++) {
        let count = 0;
        for (let j = 0; j < second.length; j++) {
            if (first[i] === second[j]) {
                count++;
            }
        }

        total += first[i] * count;
    }

    console.log(`Total similarity score: ${total}`);
}

main()

