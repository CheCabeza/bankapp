#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { Account } from "./bankapp.js";
import type { ClassType } from './types/index';


let userAccount: ClassType;


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
  const userName = await inquirer.prompt({
    name: "user_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "DefaultUser";
    },
  });

  const initialMoney = await inquirer.prompt({
    name: "user_money",
    type: "input",
    message: "How much money do you have in your account?",
    default() {
      return 0;
    },
  });

  userAccount = new Account(userName.user_name, initialMoney.user_money);
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

  switch (answers.menuChoice) {
    case "Deposit":
      await depositOrwithdrawOption("deposit");
      break;
    case "Withdraw":
      await depositOrwithdrawOption("withdraw");
      break;
    case "Print Statement":
      userAccount.printStatement();
      break;
    default:
      process.exit(0);
  }

  return handleAnswer(answers.menuChoice === "Exit");
}

async function depositOrwithdrawOption(option: "deposit" | "withdraw") {
  const moneyToDeposit = await inquirer.prompt({
    name: "money",
    type: "input",
    message: `How much money do you want to ${option} into your account?\n`,
  });

  if (option === "deposit") {
    userAccount.deposit(moneyToDeposit.money);
  } else {
    userAccount.withdraw(moneyToDeposit.money);
  }

  await menu();

}

function shutdownApp() {
  console.clear();

  console.log(
    chalk.green(
      `Bank app shutting down after 30 seconds. Bye!`
    )
  );

  process.exit(0);
}

console.clear(); 

await welcome();
await askName();
await menu();
shutdownApp();
