import { useState} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { purchaseProduct } from "../services/productApi"
import { toast } from "react-toastify"

const PurchaseProduct = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const cart = location.state?.cart || []
  const [customerName, setCustomerName] = useState("")
  // const { id } = useParams()

  // const [purchaseData, setPurchaseData] = useState({
  //   productId: id || "",
  //   quantity: 1,
  // })
  // const [response, setResponse] = useState(null)

  // useEffect(() => {
  //     setPurchaseData((prev) => ({ ...prev, productId: id }))
  // }, [id])

  // //pang onchange
  // const handleChange = (e) => {
  //   setPurchaseData({...purchaseData, [e.target.name]: e.target.value })
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const result = await purchaseProduct(purchaseData)
  //     setResponse(result)
  //   } catch(error) {
  //     console.error("Error purchasing product:", error)
  //   }
  // }

  //kukunin yung cart data from useLocation
  const handlePurchase = async (e) => {
    e.preventDefault()
    if(!customerName.trim()) {
      toast.error('Please enter customer name')
      return
    }

      try {
        const response = await purchaseProduct({
          cart, // Send the entire cart sa backend
          customerName,
        })
        toast.success(`Purchase successful! Total amount: ₱${response.salesRecord.totalAmount.toFixed(2)}`)
        navigate('/')
      } catch (error) {
        console.error("Error purchasing products:", error);
        console.error("Error purchasing product:", error)
      }
  }

  return (
    <>
        <div>
            <h1>Purchase Product</h1>
            <form onSubmit={handlePurchase}>
              <table>
                <thead>
                  <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Sub-Total</th>
                  </tr>
                </thead>
                <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity || 1}</td>
                    <td>₱{item.price.toFixed(2)}</td>
                    <td>₱{(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              <br/>
              <h3>Total Price: ₱{(cart.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2)}</h3>
              <input type="text" name="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Enter customer name" required/>
              <button type="submit">Purchase</button>
            </form>
            {/* {response && (
              <div>
                <h2>Purchase Summary</h2>
                <p>Product: {response.productName}</p>
                <p>Quantity {response.quantityPurchased}</p>
                <p>Total Price: {response.totalPrice}</p>
                <p>Remaining Stock: {response.remainingStock}</p>
                <Link to='/'>
                <button>Done</button>
              </Link> 
              </div>
            )} */}
        </div>
    </>
  )
}

export default PurchaseProduct