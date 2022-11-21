import { Account } from './bankapp';
import type { ClassType } from './types/index';


describe("Given an user named Test with 1000 in his account", () => {
  jest.useFakeTimers();
  let testAccount: ClassType;
  const currentDate = new Date();
  const date: string = currentDate.toLocaleDateString('es');

  beforeEach(()=> {
    testAccount = new Account('Test', 1000) ;
  })

  afterEach(()=> {
    jest.clearAllMocks();
    jest.clearAllTimers();
  })

  test("When calling deposit method, returns account money plus deposit amount", () => {
    expect(testAccount.deposit(10)).toBe(1010);
  });

  test("When calling withdraw method, returns account money minus withdraw amount", () => {
    expect(testAccount.withdraw(10)).toBe(990);
  });

  test("When printing a statement, returns the last transactions", async () => { 
    const logSpy = jest.spyOn(global.console, 'table');
    testAccount.deposit(200);
    testAccount.withdraw(100);
    testAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith([{"amount": "+200.00", "balance": "1200.00", date}, {"amount": "-100.00", "balance": "1100.00", date}]);
  }); 

  test("App will show shutdown message after 30 seconds", () => {
    jest.spyOn(global, 'setTimeout');
    const shutdownMessage = jest.spyOn(global.console, 'log');
    jest.advanceTimersByTime(30000);

    // Expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(shutdownMessage).toHaveBeenLastCalledWith("Time's up -- shuttingdown app. Bye!");
  });

})
