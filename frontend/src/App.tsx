import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard, Landing, Layout, Repositories } from './components'
import Prlist from './components/Prlist'

function App() {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/dashboard' element={<Dashboard><Repositories/></Dashboard>}/>
            <Route path='/dashboard/:owner/:name/pulls' element={<Dashboard><Prlist/></Dashboard>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
