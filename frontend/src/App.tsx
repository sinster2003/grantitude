import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard, Landing, Layout, Repositories } from './components'
import Prlist from './components/Prlist'
import { useAuth } from './components/Layout';
import Component404 from './components/Component404';

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
            <Route path='*' element={<Dashboard><Component404/></Dashboard>} />
          </Routes>
      </BrowserRouter>
      </Layout>
    </>
  )
}

export default App
