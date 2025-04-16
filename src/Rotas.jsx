import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Principal from './Paginas/Principal'
import Visualizacao from './Paginas/Visualizacao'

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Principal />} />
          <Route path='/visualizacao' element={<Visualizacao />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
