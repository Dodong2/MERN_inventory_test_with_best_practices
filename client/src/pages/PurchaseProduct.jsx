import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { purchaseProduct } from "../services/Api"

const PurchaseProduct = () => {
  const { id } = useParams()

  const [purchaseData, setPurchaseData] = useState({
    productId: id || "",
    quantity: 1,
  })
  const [response, setResponse] = useState(null)

  useEffect(() => {
      setPurchaseData((prev) => ({ ...prev, productId: id }))
  }, [id])

  const handleChange = (e) => {
    setPurchaseData({...purchaseData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await purchaseProduct(purchaseData)
      setResponse(result)
    } catch(error) {
      console.error("Error purchasing product:", error)
    }
  }

  return (
    <>
        <div>
            <h1>Purchase Product</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" name="productId" value={purchaseData.productId} readOnly/>
              <input type="number" name="quantity" value={purchaseData.quantity} onChange={handleChange} placeholder="Quantity" required/>
              <button type="submit">Purchase</button>
            </form>
            {response && (
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
            )}
        </div>
    </>
  )
}

export default PurchaseProduct