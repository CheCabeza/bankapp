#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { Account } from "./bankapp";
import type { ClassType } from './types/index';


let userAccount: ClassType;

// eslint-disable-next-line no-promise-executor-return
const sleep = async (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  console.log(`${chalk.bgBlue("Welcome to your bank app")}`);

  await sleep();

  console.log(`
    ${chalk.bgBlue("MENU")} 
    Choose one option from the menu
  `);
}

async function handleAnswer(isCorrect: boolean) {
   
  const spinner = createSpinner("Loading ...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Thanks ${userAccount.accountHolder}. Transaction done`,
    });
  } else {
    spinner.error({ text: `💀 Error ${userAccount.accountHolder}!` });
    process.exit(1);
  }
}

async function askName() {
  let answers = await inquirer.prompt({
    name: "user_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "DefaultUser";
    },
  });

  answers = await inquirer.prompt({
    name: "user_money",
    type: "input",
    message: "How much money do you have in your account?",
    default() {
      return 0;
    },
  });

  userAccount = new Account(answers.user_name, 0);
}

async function shutdownApp() {
  console.clear();

  console.log(
    chalk.green(
      `Bank app shutting down after 30 seconds. Bye!`
    )
  );

  await sleep();

  process.exit(0);
}

async function menu() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Choose an option\n",
    choices: [
      "Deposit",
      "Withdraw",
      "Print Statement",
      "Exit",
    ],
  });

  // Switch (answers.menuChoice) {
  //   case "Deposit":
  //     console.log("F1")
  //     break;
  //   case "Withdraw":
  //     console.log("F2")
  //     break;
  //   case "Print Statement":
  //     console.log("F3")
  //     break;
  //   default:
  //     console.log("F4")
  //     break;
  // }

  return handleAnswer(answers.menuChoice === "Exit");
}

console.clear();
await welcome();
await askName();
await menu();
await shutdownApp();
