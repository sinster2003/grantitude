import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Test from './components/Test'
import { Dashboard, Landing, Layout, Repositories } from './components'

function App() {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/dashboard' element={<Dashboard><Repositories/></Dashboard>}/>
            <Route path='/test' element={<Test/>}/>
            <Route path='/auth/github/callback' element={<Test/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
