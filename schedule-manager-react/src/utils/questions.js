
export const scheduleQuestions = {
    name: { type: 'text', question: 'Schedule name' },
    sleep_schedule: { type: 'text', question: 'Are you a night owl or morning bird?' },
    unavailability: { type: 'text', question: 'Do you want a time to be unavailable?' },
    sleep_time: { type: 'number', question: 'Hours of sleep' },
    bed_time: { type: 'number', question: 'Bed time' },
}

export const taskQuestions = {
    title: { type: 'text', question: 'Title' },
    description: { type: 'text', question: 'Description' },
    days_a_week: { type: 'number', question: 'How many days a week do you want to do this activity?' },
    starttime: { type: 'number', question: '' },
    endtime: { type: 'number', question: '' },
    importance: { type: 'number', question: 'Importance on a scale from 0 - 5' },
}