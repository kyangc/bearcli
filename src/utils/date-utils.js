const units = '个十百千万@#%亿^&~'
const chars = '零一二三四五六七八九'

module.exports = {

    getweek(dateString) {
        let da = ''
        if (dateString === undefined) {
            const now = new Date()
            let now_m = now.getMonth() + 1
            now_m = (now_m < 10) ? '0' + now_m : now_m
            let now_d = now.getDate()
            now_d = (now_d < 10) ? '0' + now_d : now_d
            da = now.getFullYear() + '-' + now_m + '-' + now_d
        } else {
            da = dateString
        }
        const date1 = new Date(da.substring(0, 4), parseInt(da.substring(5, 7)) - 1, da.substring(8, 10))
        const date2 = new Date(da.substring(0, 4), 0, 1)
        let dateWeekNum = date2.getDay() - 1
        if (dateWeekNum < 0) {dateWeekNum = 6}
        if (dateWeekNum < 4) {
            date2.setDate(date2.getDate() - dateWeekNum)
        } else {
            date2.setDate(date2.getDate() + 7 - dateWeekNum)
        }
        const d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
        return Math.ceil((d + 1) / 7)
    },


    numberToChinese(number) {
        const a = (number + '').split(''), s = []
        if (a.length > 12) {
            throw new Error('too big')
        } else {
            for (var i = 0, j = a.length - 1; i <= j; i++) {
                if (j === 1 || j === 5 || j === 9) {//两位数 处理特殊的 1*
                    if (i === 0) {
                        if (a[i] !== '1') s.push(chars.charAt(a[i]))
                    } else {
                        s.push(chars.charAt(a[i]))
                    }
                } else {
                    s.push(chars.charAt(a[i]))
                }
                if (i !== j) {
                    s.push(units.charAt(j - i))
                }
            }
        }

        return s.join('').replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) {
            b = units.indexOf(d)
            if (b !== -1) {
                if (d === '亿') return d
                if (d === '万') return d
                if (a[j - b] === '0') return '零'
            }
            return ''
        }).replace(/零+/g, '零').replace(/零([万亿])/g, function (m, b) {
            return b
        }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function (m) {
            return { '@': '十', '#': '百', '%': '千', '^': '十', '&': '百', '~': '千' }[m]
        }).replace(/([亿万])([一-九])/g, function (m, d, b, c) {
            c = units.indexOf(d)
            if (c !== -1) {
                if (a[j - c] === '0') return d + '零' + b
            }
            return m
        })
    }
}
