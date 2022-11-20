import fs from 'fs-extra';
import type { AccountInfoJson, ClassType } from './types/index';

  export class Account implements ClassType {

    readonly accountHolder: string; 
  
    constructor (name: string, private money: number) {
      this.money = money; 
      this.accountHolder = name;
      this.createAccount();
    }

    public deposit(amount: number): number {
      this.money += amount;
      this.registerTransaction("deposit", amount);
      console.log(`Deposited: ${amount} Balance: ${this.money}`)
      return this.money;
    }

    public withdraw(amount: number): number {
      this.money -= amount;
      this.registerTransaction("withdraw", amount);
      console.log(`Withdrawed: ${amount} Balance: ${this.money}`);
      return this.money;
    }

    public printStatement(): void  {
      const accountObj = this.readAccountProfile();
      console.table(accountObj.transactionLog.slice(-10));
    }

    private registerTransaction (type: "deposit" | "withdraw", amount: number): void {
      const accountProfile = this.readAccountProfile();
      const currentDate = new Date();
      const newTransaction = {date: currentDate.toLocaleDateString('es'), amount: type === 'deposit' ? `+${amount.toFixed(2)}` : `-${amount.toFixed(2)}`, balance: this.money.toFixed(2)}
      fs.writeJsonSync('./src/accountInfo.json', {accountHolder: this.accountHolder, money: this.money, transactionLog: [...accountProfile.transactionLog , newTransaction] });
    }

    private createAccount (): void {
      fs.writeJsonSync('./src/accountInfo.json', {accountHolder: this.accountHolder, money: this.money, transactionLog: [] });
    }

    private readAccountProfile(): AccountInfoJson {
      return fs.readJsonSync('./src/accountInfo.json') as AccountInfoJson;
    }
  
  }

 
