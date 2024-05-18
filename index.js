#! /usr/bin/env node
import inquirer from "inquirer";
//BANK ACCOUNT CLASS
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //DEBIT MONEY
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} Successfull!, Remaining Balance is: $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance.");
        }
    }
    //CREDIT MONEY
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //1 dollar fee charged if more than $100 deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} Successfull. Remaining Balance is: $${this.balance}`);
    }
    //CHECK BALANCE
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
//Customer class
class Customer {
    firstName;
    lastName;
    Gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, Gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.Gender = Gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//CREATE BANK ACCOUNTS
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
//CREATE CUSTOMERS
const customers = [
    new Customer("Hamza", "khan", "Male", 35, 3162224440, accounts[0]),
    new Customer("Aliza", "Yaseen", "Female", 40, 3332224440, accounts[1]),
    new Customer("Sadia", "Altaf", "Male", 25, 3062224440, accounts[2])
];
//function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number.",
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: " Select an operation!",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the Amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the Amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank Program");
                    console.log("\nThank You For Using Our Bank Services. Have a great day!;");
                    return;
            }
        }
        else {
            console.log("Invalid Account Number, Try Again!");
        }
    } while (true);
}
service();
