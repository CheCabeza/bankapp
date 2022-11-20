"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
class Account {
    constructor(name, money) {
        this.money = money;
        this.money = money;
        this.accountHolder = name;
        this.createAccount();
    }
    deposit(amount) {
        this.money += amount;
        this.registerTransaction("deposit", amount);
        console.log(`Deposited: ${amount} Balance: ${this.money}`);
        return this.money;
    }
    withdraw(amount) {
        this.money -= amount;
        this.registerTransaction("withdraw", amount);
        console.log(`Withdrawed: ${amount} Balance: ${this.money}`);
        return this.money;
    }
    printStatement() {
        const accountObj = this.readAccountProfile();
        console.table(accountObj.transactionLog.slice(-10));
    }
    registerTransaction(type, amount) {
        const accountProfile = this.readAccountProfile();
        const currentDate = new Date();
        const newTransaction = { date: currentDate.toLocaleDateString('es'), amount: type === 'deposit' ? `+${amount.toFixed(2)}` : `-${amount.toFixed(2)}`, balance: this.money.toFixed(2) };
        fs_extra_1.default.writeJsonSync('./src/accountInfo.json', { accountHolder: this.accountHolder, money: this.money, transactionLog: [...accountProfile.transactionLog, newTransaction] });
    }
    createAccount() {
        fs_extra_1.default.writeJsonSync('./src/accountInfo.json', { accountHolder: this.accountHolder, money: this.money, transactionLog: [] });
    }
    readAccountProfile() {
        return fs_extra_1.default.readJsonSync('./src/accountInfo.json');
    }
}
exports.Account = Account;
