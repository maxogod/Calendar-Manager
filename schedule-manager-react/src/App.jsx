import { useSelector, useDispatch } from 'react-redux'
import { actions } from './slices/counterSlice'

function App() {

  // Dummy redux slice
  const counter = useSelector((state) => state.counter)

  const dispactch = useDispatch()

  const inc = () => {
    dispactch(actions.inc())
  }

  const dec = () => {
    dispactch(actions.dec())
  }

  return (
    <div>
      <h1>Athus</h1>
      <h2>{counter}</h2>
      <button onClick={inc}>INC</button>
      <button onClick={dec}>DEC</button>
    </div>
  );
}

export default App;
