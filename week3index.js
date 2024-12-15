function EmployeeInfo(name, Salary) {
    console.log("Wellcome " + name + " Your monthly Salary is " + Salary)
}

console.log("This is my first program")
var EmpName = "John"
var EmpSalary = 50000

EmployeeInfo(EmpName, EmpSalary)

const EmpSkills = (skills) => {
    console.log("Expert in " + skills)
}

EmpSkills("java")

const student = require('./StudentInfo')
const person = require('./Person')

console.log("Student Name:" + student.getName())
console.log(student.Location())
console.log(student.dob)
console.log(student.Studentgrade())
console.log("grade is " + student.Studentgrade(55))

const person1 = new person("Jim", "USA", "myemail@gmail.com")
console.log("using Person Module", person1.getPersonInfo())
console.log("Program ended")
