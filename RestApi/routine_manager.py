import datetime


# This is the routine manager algorithm that orginizes the routine
# based on the importance of tasks and time available

class RoutineManager:
    """
    Routine manager sets the dates and times for each task when process is called, and
    it returns a list of the edited tasks.

    routine: Model important info:{ sleep_schedule, unavailability, sleep_time, bed_time }
    tasks: [
        {
            title: '',
            description: '',
            days_a_week: '',
            days: [],
            starttime: 'xx:yy',
            endtime: 'xx:yy',
            importance: '',
        }
    ]
    """

    def __init__(self, routine, tasks) -> None:
        self.routine = routine
        self.tasks = tasks
        self.today = datetime.datetime.now()

    def process(self):
        for task in self.tasks:
            task['days'] = []
            day = 1
            while day < 29:
                for i in range(task['days_a_week']):
                    task['days'].append(
                        str(self.today + datetime.timedelta(days=day+i)))
                day += 7
            hour_start, minute_start = task['starttime'].split(':')
            task['starttime'] = datetime.time(
                int(hour_start), int(minute_start))
            hour_end, minute_end = task['endtime'].split(':')
            task['endtime'] = datetime.time(int(hour_end), int(minute_end))
        return self.tasks
