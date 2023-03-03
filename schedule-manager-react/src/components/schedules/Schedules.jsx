import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../slices/scheduleSlice'
import { useNavigate } from 'react-router-dom'


function Schedules() {

  const schedules = useSelector((state) => state.user).schedules
  const user = useSelector((state) => state.user).user
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (e) => {
    setTimeout(() => {
      navigate(`/routine/${e.target.id}`)
    }, 500)
  }

  const handleDelete = (e) => {
    dispatch(actions.deleteRoutine(Number(e.target.id)))
    window.location.reload(true)
  }

  const handleSignIn = () => {
    setTimeout(() => {
      navigate('/login')
    }, 100);
  }

  const handleCreateRoutine = () => {
    setTimeout(() => {
      navigate('/create-routine')
    }, 100);
  }

  return (
    <div className='container routine-wrapper'>
      {!user.username ? 
      <div className='card col-3 gap-3 routine' onClick={handleSignIn}>
        <div>
          <div className='task-count blank'>-</div>
          <h5 className='card-title'>Sign In</h5>
          <p className='card-subtile'>to see your routines</p>
        </div>
      </div>
      :
      (
      schedules.length === 0 ?
      <div className='card col-3 gap-3 routine' onClick={handleCreateRoutine}>
        <div>
          <div className='task-count blank'>-</div>
          <h5 className='card-title'>There's Nothing Here</h5>
          <p className='card-subtile'>create a routine</p>
        </div>
      </div>
      :
      <>
      {Array.isArray(schedules) && schedules.map((key, index) => {
        return (
          <div className='card col-3 gap-3 routine' id={key.id} key={index}>
            <div id={key.id} onClick={handleClick}>
              <div className='task-count' id={key.id} onClick={handleClick}>{key.task_count}</div>
              <h5 className='card-title' id={key.id} onClick={handleClick}>{key.name}</h5>
              <p className='card-subtile' id={key.id} onClick={handleClick}>{key.sleep_schedule === 'NIGHT' ? 'NIGHT OWL' : 'MORNING BIRD'}</p>
              <p className='card-text' id={key.id} onClick={handleClick}>sleep time: {key.sleep_time}h - bed time: {key.bed_time}</p>
            </div>
            <i class="bi bi-trash delete" id={key.id} onClick={handleDelete}></i>
          </div>
        )
      })}
      </>)
      }
    </div>
  )
}

export default Schedules