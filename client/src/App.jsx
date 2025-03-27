/* react lib */
import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* react notif lib */
import { ToastContainer } from "react-toastify";
/* protected route */
import ProtectedRoute from "./hooks/Route/ProtectedRoute";

/* Lazy-loaded pages */
const ProductList = lazy(() => import("./pages/ProductList"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const PurchaseProduct = lazy(() => import("./pages/PurchaseProduct"));
const Purchase = lazy(() => import("./pages/Purchase"));
const UpdateProduct = lazy(() => import("./pages/UpdateProduct"));
const Overview = lazy(() => import("./pages/Overview"));
const SalesHistory = lazy(() => import("./pages/SalesHistory"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const Login = lazy(() => import("./pages/Login"));
const Layout = lazy(() => import("./components/Layout"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <div className="bg-[#F5F5F5]">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/forget" element={<ForgetPassword />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route
                element={
                  <Suspense fallback={<div>Loading Layout...</div>}>
                    <Layout />
                  </Suspense>
                }
              >
                <Route
                  path="/overview"
                  element={
                    <Suspense fallback={<div>Loading Overview...</div>}>
                      <Overview />
                    </Suspense>
                  }
                />
                <Route
                  path="/purchase"
                  element={
                    <Suspense fallback={<div>Loading Purchase...</div>}>
                      <Purchase />
                    </Suspense>
                  }
                />
                <Route
                  path="/add"
                  element={
                    <Suspense fallback={<div>Loading Add Product...</div>}>
                      <AddProduct />
                    </Suspense>
                  }
                />
                <Route
                  path="/list"
                  element={
                    <Suspense fallback={<div>Loading Product List...</div>}>
                      <ProductList />
                    </Suspense>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <Suspense fallback={<div>Loading Sales History...</div>}>
                      <SalesHistory />
                    </Suspense>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <Suspense fallback={<div>Loading Product Details...</div>}>
                      <ProductDetails />
                    </Suspense>
                  }
                />
                <Route
                  path="/product/update/:id"
                  element={
                    <Suspense fallback={<div>Loading Update Product...</div>}>
                      <UpdateProduct />
                    </Suspense>
                  }
                />
                <Route
                  path="/product/purchase"
                  element={
                    <Suspense fallback={<div>Loading Purchase Product...</div>}>
                      <PurchaseProduct />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
