class P1 {
    constructor(value) {
        this.value = value;
    }
    changeValue() {
        this.value.sex = 'female';
    }
}

class P2 {
    constructor(value) {
        this.value = value;
    }
    changeValue() {

    }
}

let obj = {
    name: 'lixx',
    sex: 'male'
}
let obj1 = {
    name: 'lixx',
    sex: 'male'
}

function getObj() {
    let obj = {
        name: 'lixx',
        sex: 'male'
    }
    return obj;
}
// let pp1 = new P1(getObj());
// let pp2 = new P1(getObj());
// let pp1 = new P1(obj);
// let pp2 = new P1(obj1);

// // pp1.changeValue();
// pp2.changeValue();


// console.log(pp1.value, 'pp1');
// console.log(pp2.value, 'pp2');

class Obj {
    person = {}
    constructor(person) {
        this.person = person;
    }
    setAge() {
        this.person.age = 456
    }
}

const tmp = {
    name: 'aaaa',
    age: 12
}

const P01 = new Obj(tmp);
const P02 = new Obj({
    name: 'aaaa',
    age: 12
});
const P03 = new Obj({
    name: 'aaaa',
    age: 12
});
// P01.setAge();
// P02.setAge();
// console.log(P01);
// console.log(P02);
// console.log(P03);