import { lazy, Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import './App.css'

function App() {

  const ProductList = lazy(() => import('./pages/ProductList'))
  const AddProduct = lazy(() => import('./pages/AddProduct'))
  const ProductDetails = lazy(() => import('./pages/ProductDetails'))
  const PurchaseProduct = lazy(() => import('./pages/PurchaseProduct'))
  const UpdateProduct = lazy(() => import('./pages/UpdateProduct'))
  const SalesPage = lazy(() => import('./pages/SalesPage'))
  const SalesHistory = lazy(() => import('./pages/SalesHistory'))

  return (
    <>
    <ToastContainer />
     <Router>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/product/update/:id' element={<UpdateProduct/>}/>
          <Route path='/product/purchase/:id' element={<PurchaseProduct/>}/>
          <Route path='/add' element={<AddProduct/>}/>
          <Route path='/sales' element={<SalesPage/>}/>
          <Route path='/history' element={<SalesHistory/>}/>
        </Routes>
      </Suspense>
     </Router>
    </>
  )
}

export default App
