const column  = require('./column.json');
const getData = (start, limit) => {
    const res = []
    for (let i = 0 ; i < limit; i++) {
        const num = start + i + 1;
        res.push({
            id: num,
            name:`名称xx-${num}`,
            increase: (Math.random()-0.5),
            count: 0
        })
    }
    return res;
};
export {getData, column};