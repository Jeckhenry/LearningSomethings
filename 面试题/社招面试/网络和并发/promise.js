// 实现一个控制并发的函数，比如最多3个并发

const {
    urls,
    request
} = require('./urlData');

class PromiseQueue {
    constructor(options = {}) {
        this.max = options.max;
        this.currentCount = 0;
        this.pendingList = [];
    }

    add(task) {
        this.pendingList.push(task);;
        this.run();
    }

    run() {
        if (this.currentCount === this.max || this.pendingList.length === 0) {
            return;
        }
        this.currentCount++;
        const {
            fn
        } = this.pendingList.sort((a, b) => b.priority - a.priority).shift();
        const p = fn();
        p.then(this.completeOne.bind(this)).catch(this.completeOne.bind(this));
    }

    completeOne() {
        this.currentCount--;
        this.run();
    }
}

const queue = new PromiseQueue({
    max: 3,
});

const formatTask = (url) => {
    return {
        fn: () => request(url),
        priority: url.priority
    }
}

urls.forEach(url => {
    queue.add(formatTask(url));
});

const highPriority = {
    url: 'url high***',
    priority: 10,
    time: 1000,
};

queue.add(formatTask(highPriority));