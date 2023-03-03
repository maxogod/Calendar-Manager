import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetRoutineById } from '../../hooks/useFetchRoutine'
import { useMemo } from 'react'
import { range, getDaysInMonth, getSortedDays, getTasksByDate, monthNames } from '../../utils/scheduleUtils'
import NotFound from '../page-info/NotFound'

function Schedule() {

  const { id } = useParams()
  const dispatch = useDispatch()
  const routine = useGetRoutineById(dispatch, id)
  const tasksPerDay = useMemo(() => {
    return getTasksByDate(routine.taskList)
  }, [routine.taskList])

  // useEffect(() => {window.location.reload(true)}, [tasksPerDay])
  
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [taskExpand, setTaskExpand] = useState(null)
  const user = useSelector((state) => state.user)

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1)
    } else {
      setCurrentMonth(0)
      setCurrentYear((prev) => prev + 1)
    }
  }

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1)
    } else {
      setCurrentMonth(11)
      setCurrentYear((prev) => prev - 1)
    }
  }

  const handleTaskExpand = (e) => {
    for (let taskObj of routine.taskList) {
      if (Number(taskObj.id) === Number(e.target.id)) {
        setTaskExpand(taskObj)
      }
    }
  }

  const validUrl = () => {
    if (!user.user.username) {
      return false
    }
    for (let routine of user.schedules) {
      if (routine.id == id) {
        return true
      }
    }
    return false
  }

  return (
    <>
    {validUrl() ?
    <div className='container'>
      <div className='calendar-buttons-wrapper'>
        <i class="bi bi-arrow-left-circle calendar-button" onClick={prevMonth}></i>
        <p className='month-name'>{monthNames[currentMonth]} {currentYear}</p>
        <i class="bi bi-arrow-right-circle calendar-button" onClick={nextMonth}></i>
      </div>
      <div className='day-names-wrapper'>
        {getSortedDays(currentMonth, currentYear).map((key, index) => {
          return (
            <div className='day-names' key={index}>{key}</div>
          )
        })}
      </div>
      <div className='days-wrapper'>
        {range(getDaysInMonth(currentMonth, currentYear)).map((day) => (
          <div className='card calendar-day' key={day}>
            <small className='day-number'>{day}</small>
            <div className='task-wrap'>
              {tasksPerDay[`${currentYear}-${currentMonth}-${day}`] && tasksPerDay[`${currentYear}-${currentMonth}-${day}`].map((key, index) => {
                return (
                  <div className={`task importance-${key.importance}`} id={key.id} onClick={handleTaskExpand}>
                    <p className='task-title' key={index} id={key.id} onClick={handleTaskExpand}>{key.title}</p>
                    <small className='task-time' id={key.id} onClick={handleTaskExpand}>{key.starttime}</small>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <TaskExpand task={taskExpand} setTask={setTaskExpand} />
    </div>
    :
    <NotFound />
    }
    </>
  )
}

function TaskExpand({ task, setTask }) {

  const handleClose = () => {
    setTask(null)
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Escape'){
      setTask(null)
    }
  }

  return (
    task && 
    (
    <>
    <div className={`task-expand importance-${task.importance}`} onKeyDown={handleKeyPress} tabIndex="0">
      <i class="bi bi-x-lg exit calendar-button" onClick={handleClose}></i>
      <h3 className='task-expand-title'>
        {task.title}
      </h3>
      <p className='task-expand-description'>{task.description}</p>
      <div className='task-expand-times'>
        <h5 className='task-expand-time'><i class="bi bi-clock"></i>start: {task.starttime}</h5>
        <h5 className='task-expand-time'><i class="bi bi-clock-fill"></i>end: {task.endtime}</h5>
      </div>
      <div className='stars'>
        {range(5).map((key, index) => {
          if (task.importance > index) {
            return (<i class="bi bi-star-fill"></i>)
          } else {
            return (<i class="bi bi-star"></i>)
          }
        })}
      </div>
    </div>
    </>
    )
  )
}

export default Schedule