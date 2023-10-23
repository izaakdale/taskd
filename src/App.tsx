import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Tasks from './pages/Tasks'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/tasks' element={<Tasks/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App