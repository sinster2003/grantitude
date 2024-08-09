import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard, Landing, Layout, Repositories } from './components'
import Prlist from './components/Prlist'
import { useAuth } from './components/Layout';

function App() {
  const auth = useAuth();
  {console.log("Auth", auth?.authStatus)}

  return (
    <>
      <Layout>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/dashboard' element={<Dashboard><Repositories/></Dashboard>}/>
            <Route path='/dashboard/:owner/:name/pulls' element={<Dashboard><Prlist/></Dashboard>}/>
          </Routes>
      </BrowserRouter>
      </Layout>
    </>
  )
}

export default App
