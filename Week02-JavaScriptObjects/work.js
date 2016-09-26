var Person = {
	firstName: "George",
	lastName: "Washington",
	fullName: function (){
		return this.firstName + " " + this.lastName;
	}
}
	
console.log(Person.firstName);	
console.log(Person.lastName);

console.log(Person.fullName());





