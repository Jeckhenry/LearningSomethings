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


function getObj() {
    let obj = {
        name: 'lixx',
        sex: 'male'
    }
    return obj;
}
let pp1 = new P1(getObj());
let pp2 = new P2(getObj());

pp1.changeValue();

console.log(pp1.value);
console.log(pp2.value);