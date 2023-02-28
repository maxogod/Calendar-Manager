
export const scheduleQuestions = {
    name: { type: 'text', question: 'Routine name', placeholder: 'My Routine' },
    sleep_schedule: { type: 'text', question: 'Are you a night owl or morning bird?', placeholder: 'NIGHT / MORNING' },
    sleep_time: { type: 'number', question: 'Hours of sleep', placeholder: '6 - 9' },
    bed_time: { type: 'time', question: 'When is bed time for you?' },
}

export const taskQuestions = {
    title: { type: 'text', question: 'Title', placeholder: 'Tasky task' },
    description: { type: 'text', question: 'Description', placeholder: '...' },
    days_a_week: { type: 'number', question: 'Days a Week', placeholder: '1 - 7' },
    starttime: { type: 'time', question: 'Start Time' },
    endtime: { type: 'time', question: 'End Time' },
    importance: { type: 'number', question: 'Importance', placeholder: '0 - 5' },
}
