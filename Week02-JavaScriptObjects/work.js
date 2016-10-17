var Person = {
    firstName: 'George',
    lastName: 'Washington',
    fullName: function() {
        'use strict';
        return this.firstName + ' ' + this.lastName;
    }
};

function divider(title) {
    'use strict';
    console.log('====================================');
    console.log(title);
    console.log('====================================');
}

var calculator = {
    operator01: -1,
    operator02: -1,
    add: function() {
        'use strict';
        return this.operator01 + this.operator02;
    },
    subtract: function() {
        'use strict';
        return this.operator01 - this.operator02;
    },
    multiply: function() {
        'use strict';
        return this.operator01 * this.operator02;
    }
};

calculator.operator01 = Person.firstName.length;
calculator.operator02 = Person.lastName.length;

divider('Person');
console.log(Person.firstName);
console.log(Person.lastName);

console.log(Person.fullName());

divider('Calculator');
console.log('operator01 = ' + calculator.operator01);
console.log('operator02 = ' + calculator.operator02);
console.log('Add: = ' + calculator.add());
console.log('Subtract = ' + calculator.subtract());
console.log('Multiply = ' + calculator.multiply());
