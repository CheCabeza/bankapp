import { Account } from './bankapp';
import type { ClassType } from './types/index';


describe("Given an user named Test with 1000 in his account", () => {
  let testAccount: ClassType;
  const currentDate = new Date();
  const date: string = currentDate.toLocaleDateString('es');

  beforeEach(()=> {
    testAccount = new Account('Test', 1000) ;
  })

  test("When calling deposit method, returns account money plus deposit money", () => {
    expect(testAccount.deposit(10)).toBe(1010);
  });

  test("When printing a statement, returns the last transactions", async () => { 
    const logSpy = jest.spyOn(global.console, 'table');
    testAccount.deposit(200);
    testAccount.withdraw(100);
    testAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith([{"amount": "+200.00", "balance": "1200.00", date}, {"amount": "-100.00", "balance": "1100.00", date}]);
  }); 

})
