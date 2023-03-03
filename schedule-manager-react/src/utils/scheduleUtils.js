const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function range(end) {
    const { result } = Array.from({ length: end }).reduce(
        ({ result, current }) => ({
            result: [...result, current],
            current: current + 1
        }),
        { result: [], current: 1 }
    )
    return result
}

export function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate()
}

export function getSortedDays(month, year) {
    const dayIndex = new Date(year, month, 1).getDay()
    return [...dayNames.slice(dayIndex), ...dayNames.slice(0, dayIndex)]
}

export function getTasksByDate(tasks) {
    let tasksPerDay = {}
    try {
        for (let task of tasks) {
            for (let dayStr of task.days) {
                let [year, month, day] = dayStr.split(' ')[0].split('-')
                const date = `${year}-${Number(month) - 1}-${Number(day)}`
                if (tasksPerDay.hasOwnProperty(date)) {
                    tasksPerDay[date].push(task)
                } else {
                    tasksPerDay[date] = [task]
                }
            }
        }
    } catch {
        window.location.reload(true)
    }

    return tasksPerDay
}