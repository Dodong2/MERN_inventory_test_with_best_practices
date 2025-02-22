import { lazy, Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

function App() {

  const ProductList = lazy(() => import('./pages/ProductList'))

  return (
    <>
     <Router>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path='/list' element={<ProductList/>}/>
        </Routes>
      </Suspense>
     </Router>
    </>
  )
}

export default App
