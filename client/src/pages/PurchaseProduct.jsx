import { usePurchase } from "../hooks/purchase product hooks/usePurchase"

const PurchaseProduct = () => {
  const { setCustomerName, handlePurchase, cart, customerName } = usePurchase()

  return (
    <>
        <div className="border ml-[14rem] mt-[3.5rem]">
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
        </div>
    </>
  )
}

export default PurchaseProduct