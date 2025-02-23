import { lazy, Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

function App() {

  const ProductList = lazy(() => import('./pages/ProductList'))
  const AddProduct = lazy(() => import('./pages/AddProduct'))

  return (
    <>
     <Router>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path='/list' element={<ProductList/>}/>
          <Route path='/add' element={<AddProduct/>}/>
        </Routes>
      </Suspense>
     </Router>
    </>
  )
}

export default App
