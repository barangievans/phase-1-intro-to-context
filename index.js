// helpers.js

// Function to create an employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Function to create a time-in event for an employee
function createTimeInEvent(employee, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    let timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
}

// Function to create a time-out event for an employee
function createTimeOutEvent(employee, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    let timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
}

// Function to calculate hours worked on a specific date for an employee
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date for an employee
function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate all wages earned by an employee
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((totalWages, event) => {
        return totalWages + wagesEarnedOnDate(employee, event.date);
    }, 0);
}

// Function to calculate total payroll for an array of employee records
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
    }, 0);
}

// Exporting functions for testing purposes
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
};

