// 时间戳转天 时 秒
function formatDuring(mss){
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    return {
        days,
        hours,
        minutes
    }
}
// x.x 年
function formatYear(oldTime){
    let time = new Date().getTime();
    return (formatDuring(time - oldTime).days / 365).toFixed(1);
}
// xxxx-xx-xx
function formatDayTime(val) {
    if(val) {
        let date = new Date(val)
        let Y = date.getFullYear();
        let M = date.getMonth() + 1;
        let D = date.getDate();

        if(M < 10) {
            M = '0' + M;
        }
        if(D < 10) {
            D = '0' + D;
        }

        return Y + '-' + M + '-' + D ;
    } else {
        return '';
    }
}
export {formatDuring,formatYear,formatDayTime}