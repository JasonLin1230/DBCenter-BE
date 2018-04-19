'use strict';

/**
 * 日期格式化
 *
 * @param { String } format 格式 Y:年 M:月 D:日 h:时 m:分 s:秒 default: YYYY-MM-DD hh:mm:ss
 * @param { Date } date 日期对象 default: 当前日期对象 default: 当前日期对象
 * 
 * @return { String } 根绝格式格式化日期对象后的字符串
 */
module.exports = function(format = 'YYYY-MM-DD hh:mm:ss', date = new Date()) {
    const dateObj = {
        'Y': date.getFullYear(),
        'M': date.getMonth() + 1,
        'D': date.getDate(),
        'h': date.getHours(),
        'm': date.getMinutes(),
        's': date.getSeconds()
    }

    for (let key in dateObj) {
        const reg = new RegExp(`${key}+`);

        let dateItem = dateObj[key].toString();

        format = format.replace(reg, (word) => {
            let diffLen = dateItem.length - word.length;

            if (diffLen > 0) {
                return dateItem.substring(dateItem.length - word.length);
            } else {
                diffLen = -diffLen

                while (diffLen > 0) {
                    dateItem = '0' + dateItem;
                    diffLen--;
                }

                return dateItem;
            }
        })
    }

    return format;
}