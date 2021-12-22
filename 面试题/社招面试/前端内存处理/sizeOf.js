const seen = new WeakSet();
const sizeOfObject = function (object) {
    if (object === null) return 0;
    let bytes = 0;
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i];
        if (object[k] !== null && typeof object[k] === 'object') {
            if (seen.has(object[k])) {
                continue;
            }
            seen.add(object[k]);
        }
        bytes += caculator(k);
        bytes += caculator(object[k]);
    }
    return bytes;
}
const caculator = function (object) {
    const type = typeof object;
    switch (type) {
        case 'string':
            return object.length * 2;
        case 'number':
            return 8;
        case 'boolean':
            return 4;
        case 'object':
            if (Array.isArray(object)) {
                return object.map(caculator).reduce((acc, cur) => acc + cur);
            } else {
                return sizeOfObject(object);
            }
            default:
                return 0;
    }
}

/**
 * string: 一个字符占两个字节
 * boolean：4个字节
 * number： 8个字节
 * object：单独处理
 * array：每一个元素长度和
 */
const test = {
    a: 11, // 10
    b: 'ss', // 6
    222: false // 10
}
console.log(caculator(test));