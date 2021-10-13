const throttle = function (fn, wait) {
    let preTime = +new Date();
    return function () {
        let nowTime = +new Date();
        if (nowTime - preTime > wait) {
            fn();
            preTime = nowTime;
        }
    }
}