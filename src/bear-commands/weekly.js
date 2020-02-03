const action = 'create'
const command = 'weekly'
const description = 'Create a weekly report template.'

const dateUtils = require('../utils/date-utils')

module.exports = {

    action, command, description,

    parseArgs(args) {
        let now = new Date()
        let monday = now
        if (now.getDay() > 1) {
            monday = new Date(Date.now() - (now.getDay() - 1) * 24 * 60 * 60 * 1000)
        }
        let year = now.getFullYear()
        let body =
            `#工作/日志/${year}

## 本周主要目标
### 工作


### 生活


### 修行


## 日志
`
        for (let i = 0; i < 5; i++) {
            let day = new Date(monday.getTime() + i * 24 * 60 * 60 * 1000)
            let title =
                `### ${day.getMonth() + 1}.${day.getDate()} 周${dateUtils.numberToChinese(i + 1)}
- 

`
            body += title
        }

        return {
            title: `Week ${dateUtils.getweek()}`,
            text: body
        }
    }
}
