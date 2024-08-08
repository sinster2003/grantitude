import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Test from './components/Test'
import { Dashboard, Landing } from './components'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
