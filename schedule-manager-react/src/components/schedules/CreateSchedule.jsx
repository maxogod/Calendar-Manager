import { scheduleQuestions, taskQuestions } from '../../utils/questions'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../../slices/scheduleSlice'
import { useNavigate } from 'react-router-dom';

function CreateSchedule() {

  const scheduleOptionsDefault = {
    name: null,
    sleep_schedule: null,
    sleep_time: null,
    bed_time: null,
  }
  
  const [scheduleOptions, setScheduleOptions] = useState(scheduleOptionsDefault)
  const [scheduleOptionsFilled, setScheduleOptionsFilled] = useState(false)
  const [taskList, setTaskList] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!scheduleOptions.name 
      || !scheduleOptions.sleep_schedule 
      || !scheduleOptions.sleep_time 
      || !scheduleOptions.bed_time) {
        alert("You didn't fill the information correctly")
        return
      }
    if (scheduleOptions.sleep_time < 6 || scheduleOptions.sleep_time > 9 ) {
      alert('sleep time must be between 6 and 9 hours')
      return
    }

    if (!taskList) {
      alert('You must add at least 1 task!')
      return
    }

    dispatch(actions.setSchedule({ scheduleOptions, taskList }))
    dispatch(actions.saveSchedule())
    
    setTimeout(() => {
      navigate('/')
    }, 500)

  }

  return (
    <div className='card'>
      <form onSubmit={handleSubmit}>
        {!scheduleOptionsFilled && <ScheduleQuestions scheduleOptions={scheduleOptions} setScheduleOptions={setScheduleOptions} filled={setScheduleOptionsFilled} />}
        {scheduleOptionsFilled && <TaskQuestions taskList={taskList} setTaskList={setTaskList} />}
        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>
    </div>
  )
}

function ScheduleQuestions({ scheduleOptions, setScheduleOptions, filled }) {

  const handleFill = (e) => {
    if (!scheduleOptions.name 
      || !scheduleOptions.sleep_schedule 
      || !scheduleOptions.sleep_time 
      || !scheduleOptions.bed_time) {
        alert('You must fill in the required information first!')
        return
      }
    if (scheduleOptions.sleep_time < 6 || scheduleOptions.sleep_time > 9 ) {
      alert('sleep time must be between 6 and 9 hours')
      return
    }

    filled(true)
    e.preventDefault()
  }

  const handleChange = (e) => {
    const state = Object.assign({}, scheduleOptions);
    state[e.target.name] = e.target.value
    setScheduleOptions(state)
  }

  return (
    <>
    <h3>Schedule questions</h3>
    {Object.keys(scheduleQuestions).map((key, index) => {
      return (
        <label key={index} htmlFor={key}>
          <small className='question'>{scheduleQuestions[key].question}</small>
          <input id={key} name={key} type={scheduleQuestions[key].type} onChange={handleChange} placeholder={scheduleQuestions[key].placeholder} />
        </label>
      )
    })}
    <button className='btn btn-primary' onClick={handleFill}>Next</button>
    </>
  )
}

function TaskQuestions({ taskList, setTaskList }) {

  const taskDefault = {
    title: '',
    description: '',
    days_a_week: '',
    starttime: '',
    endtime: '',
    importance: '',
  }
  const [task, setTask] = useState(taskDefault)

  const handleAddTask = (e) => {
    if (!task.title 
      || !task.description
      || !task.days_a_week
      || !task.importance) {
        alert('You must fill in the required information first!')
        return
      }
    if (task.days_a_week > 7) {
      alert("A week doesn't have more than 7 days!")
    }
    
    const newList = [...taskList, task]
    setTaskList(newList)
    setTask(taskDefault)
    e.preventDefault()
  }
  const handleChange = (e) => {
    const state = Object.assign({}, task);
    if (e.target.name === 'days_a_week' || e.target.name === 'importance') {
      state[e.target.name] = Number(e.target.value)
    } else {
      state[e.target.name] = e.target.value
    }
    setTask(state)
  }

  return (
    <>
    <h3>Task questions</h3>
    {Object.keys(taskQuestions).map((key, index) => {
      return (
        <label key={index} htmlFor={key}>
          <small className='question'>{taskQuestions[key].question}</small>
          <input id={key} name={key} type={taskQuestions[key].type} onChange={handleChange} value={task[key]} placeholder={taskQuestions[key].placeholder} />
        </label>
      )
    })}
    {/* Previous button */}
    <button className='btn btn-primary' onClick={handleAddTask}>Add</button>
    </>
  )
}

export default CreateSchedule