"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bankapp_1 = require("./bankapp");
describe("Given an user named Test with 1000 in his account", () => {
    let testAccount;
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('es');
    beforeEach(() => {
        testAccount = new bankapp_1.Account('Test', 1000);
    });
    test("When calling deposit method, returns account money plus deposit money", () => {
        expect(testAccount.deposit(10)).toBe(1010);
    });
    test("When printing a statement, returns the last transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const logSpy = jest.spyOn(global.console, 'table');
        testAccount.deposit(200);
        testAccount.withdraw(100);
        testAccount.printStatement();
        expect(logSpy).toHaveBeenCalledWith([{ "amount": "+200.00", "balance": "1200.00", date }, { "amount": "-100.00", "balance": "1100.00", date }]);
    }));
});
