const urls = [{
        url: 'link1',
        time: 3000,
        priority: 1,
    },
    {
        url: 'link2',
        time: 2000,
        priority: 1,
    },
    {
        url: 'link3',
        time: 5000,
        priority: 1,
    },
    {
        url: 'link4',
        time: 1000,
        priority: 1,
    },
    {
        url: 'link5',
        time: 1200,
        priority: 2,
    },
    {
        url: 'link6',
        time: 1000,
        priority: 2,
    },
    {
        url: 'link7',
        time: 2300,
        priority: 3,
    },
    {
        url: 'link8',
        time: 1800,
        priority: 1,
    },
    {
        url: 'link9',
        time: 1000,
        priority: 1,
    },
];

const request = function (d) {
    console.log(`url: ${d.url}, time:${d.time}`);
    return new Promise((resolve => {
        setTimeout(() => {
            // console.log(`url: ${d.url} complete`);
            resolve(d.url);
        }, d.time);
    }));
}

module.exports = {
    urls,
    request
}