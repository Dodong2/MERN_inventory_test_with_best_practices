import { lazy, Suspense, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './hooks/Route/ProtectedRoute';
import './App.css'

function App() {
  const ProductList = lazy(() => import('./pages/ProductList'))
  const AddProduct = lazy(() => import('./pages/AddProduct'))
  const ProductDetails = lazy(() => import('./pages/ProductDetails'))
  const PurchaseProduct = lazy(() => import('./pages/PurchaseProduct'))
  const UpdateProduct = lazy(() => import('./pages/UpdateProduct'))
  const SalesPage = lazy(() => import('./pages/SalesPage'))
  const SalesHistory = lazy(() => import('./pages/SalesHistory'))
  const ForgetPassword = lazy(() => import('./pages/ForgetPassword'))
  const Login = lazy(() => import ('./pages/Login'))
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  return (
    <>
    <ToastContainer />
     <Router>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path='/' element={<Login onLogin={handleLogin}/>}/>
          
          
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
          <Route path='/forget' element={<ForgetPassword/>}/>
          <Route path='/add' element={<AddProduct/>}/>
          <Route path='/list' element={<ProductList/>}/>
          <Route path='/sales' element={<SalesPage/>}/>
          <Route path='/history' element={<SalesHistory/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/product/update/:id' element={<UpdateProduct/>}/>
          <Route path='/product/purchase' element={<PurchaseProduct/>}/>
          
        </Route>
        </Routes>
      </Suspense>
     </Router>
    </>
  )
}

export default App
