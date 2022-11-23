#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
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

  userAccount = new Account(userName.user_name, Number(initialMoney.user_money));
}

async function menu() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const answer = await inquirer.prompt({
    name: "menu_questions",
    type: "list",
    message: "Choose an option\n",
    choices: [
      "Deposit",
      "Withdraw",
      "Print Statement",
      "Exit",
    ],
  });

  await pickChoice(answer.menu_questions);

}

async function pickChoice (choice: string ) {

    switch (choice) {
    case "Deposit":
      await depositOrwithdrawOption("deposit");
      break;
    case "Withdraw":
      await depositOrwithdrawOption("withdraw");
      break;
    case "Print Statement":
      userAccount.printStatement();
      await sleep();
      await menu();
      break;
    default:
      shutdownApp();
  }

}

async function depositOrwithdrawOption(option: "deposit" | "withdraw") {
  const moneyToDeposit = await inquirer.prompt({
    name: "money",
    type: "input",
    message: `How much money do you want to ${option} into your account?\n`,
  });

  if (option === "deposit") {
    userAccount.deposit(Number(moneyToDeposit.money));
  } else {
    userAccount.withdraw(Number(moneyToDeposit.money));
  }

  await sleep();

  await menu();

}

function shutdownApp() {
  console.clear();

  console.log(
    chalk.green(
      `Thanks for using Bankapp. Bye!`
    )
  );

  process.exit(0);
}

console.clear(); 

await welcome();
await askName();
await menu();

