// 2/main.js
// This script fetches input data from Advent of Code and processes it.
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
    while (first.length > 0 && second.length > 0) {
        let smallestOne = Infinity;
        let smallestOneIndex = null;
        for (let i = 0; i < first.length; i++) {
            if (first[i] < smallestOne) {
                smallestOne = first[i];
                smallestOneIndex = i;
            }
        }

        let smallestTwo = Infinity;
        let smallestTwoIndex = null;
        for (let i = 0; i < second.length; i++) {
            if (second[i] < smallestTwo) {
                smallestTwo = second[i];
                smallestTwoIndex = i;
            }
        }

        total += Math.abs(parseInt(smallestOne) - parseInt(smallestTwo));
        first.splice(smallestOneIndex, 1);
        second.splice(smallestTwoIndex, 1);
    }

    console.log("Total:", total);
}

main()

