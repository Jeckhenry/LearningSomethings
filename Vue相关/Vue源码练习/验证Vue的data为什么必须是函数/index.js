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

function getObj() {
    let obj = {
        name: 'lixx',
        sex: 'male'
    }
    return obj;
}
// let pp1 = new P1(getObj());
let pp2 = new P1(getObj());
let pp1 = new P1(obj);
// let pp2 = new P1(obj);

// pp1.changeValue();
pp2.changeValue();


console.log(pp1.value, 'pp1');
console.log(pp2.value, 'pp2');