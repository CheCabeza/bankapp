export type AccountInfoJson = {
  accountHolder: string,
  money: number,
  transactionLog: TransactionLog[]
} 

export type TransactionLog = {
      date: Date,
      amount: number,
      balance: number
}

export type ClassType = {
  deposit: (amount: number) => number,
  withdraw: (amount: number) => number,
  printStatement: () => void
}
