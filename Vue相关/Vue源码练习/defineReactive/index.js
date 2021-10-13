const obj = {}

function update() {
    app.innerHTML = new Date().toLocaleTimeString();
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
            if (Object.prototype.toString.call(obj[key]) === '[object Array]') {

            }
        }
        defineReactive(obj, key, obj[key]);
    });
}

function set(obj, key, val) {
    defineReactive(obj, key, val);
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
    },
    arr: [1, 2, 3],
};
observe(obj2);
obj2.name;
obj2.age = 26;
obj2.classInfo.eng;
obj2.name = {
    ll: 'ss'
};
obj2.name.ll;

// set(obj2, 'lll', 123);
// obj2.lll
// obj2.lll = 1232

obj2.arr

// setInterval(() => {
// obj2.name.ll = 'aa';
// }, 1000);