import PropTypes from "prop-types"

const ProductModal = ({ sale, onClose }) => {
    const { customerName, totalAmount, products } = sale
  return (
    <div className="overlay">
        <div className="modal-content">
        <h2>Product Details</h2>
        <p><strong>Customer Name:</strong> {customerName}</p>
        <p><strong>Total Amount:</strong> ₱{totalAmount}</p>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>₱{product.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
        </div>
    </div>
  )
}

ProductModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    sale: PropTypes.shape({
      customerName: PropTypes.string.isRequired,
      totalAmount: PropTypes.number.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          productName: PropTypes.string,
          quantity: PropTypes.number,
          totalPrice: PropTypes.number,
        })
      ).isRequired,
    }).isRequired,
  };

export default ProductModal