const enquirer = require('enquirer');
const logUpdate = require('log-update');

const set = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let question = '', answer = '';

function simplePrompt(name) {
	return {
		type: 'input',
		name: name,
		message: 'What is your ' + name + '?'
	}
}

function main() {
	console.log('Welcome...');
	gameLoop();
}

async function gameLoop() {
	const letter = getRandomArrayElement(set);
	question += letter;
	await renderGame();
	const response = (await enquirer.prompt(simplePrompt('choice'))).choice.toUpperCase();
	if(response === question) {
		gameLoop();
	} else {
		console.log('you lost', question, answer);
	}
}

function renderGame() {
	return new Promise(async (resolve, reject) => {
		for (let i of question) {
			// Display the char
			logUpdate(i)
			// Keep it for 100ms
			await sleep(200);
			// Clear screen
			logUpdate('');
			// Keep it for 100ms
			await sleep(200);
		}
		resolve();
	});
}

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

function getRandomArrayElement(arr) {
  min = 0;
  max = arr.length;
  return arr[Math.floor(Math.random() * (max - min) + min)]; //The maximum is inclusive and the minimum is inclusive 
}

main();