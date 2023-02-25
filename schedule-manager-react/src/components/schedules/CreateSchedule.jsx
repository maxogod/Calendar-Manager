import { scheduleQuestions, taskQuestions } from '../../utils/questions'
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../../slices/scheduleSlice'

function CreateSchedule() {

  const scheduleOptionsDefault = {
    name: null,
    sleep_schedule: null,
    unavailability: null,
    sleep_time: null,
    bed_time: null,
  }
  
  const [scheduleOptions, setScheduleOptions] = useState(scheduleOptionsDefault)
  const [scheduleOptionsFilled, setScheduleOptionsFilled] = useState(false)
  const [taskList, setTaskList] = useState([])
  const dispatch = useDispatch()
  
  const handleSubmit = (e) => {
    dispatch(actions.setSchedule({ scheduleOptions, taskList }))
    dispatch(actions.saveSchedule())
    e.preventDefault()
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
          <input id={key} name={key} type={scheduleQuestions[key].type} onChange={handleChange}/>
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
    const newList = [...taskList, task]
    setTaskList(newList)
    setTask(taskDefault)
    e.preventDefault()
  }
  const handleChange = (e) => {
    const state = Object.assign({}, task);
    state[e.target.name] = e.target.value
    setTask(state)
  }

  return (
    <>
    <h3>Task questions</h3>
    {Object.keys(taskQuestions).map((key, index) => {
      return (
        <label key={index} htmlFor={key}>
          <small className='question'>{taskQuestions[key].question}</small>
          <input id={key} name={key} type={taskQuestions[key].type} onChange={handleChange} value={task[key]} />
        </label>
      )
    })}
    {/* Previous button */}
    <button className='btn btn-primary' onClick={handleAddTask}>Add</button>
    </>
  )
}

export default CreateSchedule