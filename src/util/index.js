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

        return {
            first: Y + '年' + M + '月' + D + '日',
            second: Y + '-' + M + '-' + D 
        }
    } else {
        return '';
    }
}

// js时间戳转时间（年-月-日 时:分:秒）
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = change(date.getDate()) + ' ';
    let h = change(date.getHours()) + ':';
    let m = change(date.getMinutes()) + '';
    // let s = change(date.getSeconds());
    return Y + M + D + h + m;
}
function change(t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}

/*1.用浏览器内部转换器实现html转码*/
function htmlEncode(html){
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement ("div");
    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(旧版火狐，google支持)
    (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    var output = temp.innerHTML;
    temp = null;
    return output;
}
/*2.用浏览器内部转换器实现html解码*/
function htmlDecode(text){
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text;
    //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}

// 匹配第一个 p 标签的内容，转换为 HTML 。使用 innerText 提取文字内容。并截取省略
function getPText(p){
    var reg = /<p[^>]*>(?:(?!<\/p>)[\s\S])*<\/p>/;
    var str = p.match(reg);
    var div = document.createElement('div');
    div.innerHTML = str;
    if (div && div.innerText.length > 90) {
        div.innerText = div.innerText.substring(0,90)+ "......"
    }
    return div.innerText;
}

export {formatDuring,formatYear,formatDayTime,timestampToTime,htmlEncode,htmlDecode,getPText}