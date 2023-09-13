#!/usr/bin/env node

import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import chalkAnimation from "chalk-animation";
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

let sleep = async (ms = 3000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
    const rainbowColor = chalkAnimation.rainbow('Welcome to the Console Game');
    await sleep();
    rainbowColor.stop();

    console.log(`
        ${chalk.bgBlue(' How are you ? ')}
        I am a process on your computer.
        if you get any question wrong I will be ${chalk.bgRed(' Killed ')} by your fiancé 💀.
        So get all the questions right... 
    `);
    await sleep(7000);
}

async function askName() {
    const player = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What do you call me ?',
        default() {
            return 'If I call you Fatso';
        }
    });

    playerName = player.player_name;
}


async function start() {
    await askName();
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (playerName === 'dumb' | playerName === 'meanie') {
        spinner.success({ text: `Nice work Fatso. That's a legit answer` });
        await welcome();

    } else {
        spinner.error({ text: `💀💀💀 Sorry wrong answer` });
        process.exit(1);
    }
}


async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work Fatso. That's a legit answer` });
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose Fatso!` });
        process.exit(1);
    }
}

async function handleAnswer2(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work Fatso. You know me quite good` });
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose Fatso! \n COME ON I AM NOT THAT HEARTLESS` });
        process.exit(1);
    }
}

async function handleAnswer3(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `If this was your first option that came to your mind I will definitely have my revenge just you wait` });
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose Fatso! \n BE MORE HUMBLE` });
        process.exit(1);
    }
}

function winner() {
    console.clear();
    figlet(`Congrats , Fatso !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');

        console.log(
            chalk.green(
                `I am cool right ? 😎`
            )
        );
        process.exit(0);
    });
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'What do I like ? \n',
        choices: [
            'movies',
            'hiking',
            'cricket',
        ],
    });

    return handleAnswer(answers.question_1 === 'movies');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'What do I want you to get ?\n',
        choices: ['ASDH', 'MBBS', 'BDS'],
    });
    return handleAnswer2(answers.question_2 === 'ASDH');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `What is my strength ? \n`,
        choices: ['brain', 'muscles', 'heart', 'nothing'],
    });

    return handleAnswer3(answers.question_3 === 'nothing');
}


await start();
// Run it with top-level await
console.clear();
await question1();
await question2();
await question3();
winner();
