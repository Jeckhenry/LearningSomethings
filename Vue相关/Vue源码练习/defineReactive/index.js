const obj = {}

function update() {
    app.innerHTML += new Date().toLocaleTimeString();
}
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log(`getting: ${key} + ${val}`);
            return val;
        },
        set(newVal) {   
            if (typeof newVal === 'object') {
                observe(newVal);
            }
            if (newVal !== val) {
                console.log(`setting: ${key} + ${newVal}`);
                val = newVal;
            }
            update();
        }
    });
}

function observe(obj) {
    if (obj === null || typeof obj !== 'object') {
        return;
    }
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
            observe(obj[key]);
        }
        defineReactive(obj, key, obj[key]);
    });
}

// defineReactive(obj, 'foo', 'foo');
// obj.foo;
// obj.foo = 'changefoo';

// obj.go = 'pp';
// obj.go = 'changegogogog';

// defineReactive(obj, 'male', {
//     name: 'lixx',
//     age: 27,
// });
// obj.male;
// obj.male.name;

const obj2 = {
    name: 'lixx',
    age: 27,
    sex: 'male',
    classInfo: {
        math: 'math',
        eng: 'eng',
    }
};
observe(obj2);
obj2.name;
obj2.age = 26;
obj2.classInfo.eng;
obj2.name = {
    ll: 'ss'
};
obj2.name.ll;

setInterval(() => {
    obj2.name.ll = 'aa';
}, 1000);