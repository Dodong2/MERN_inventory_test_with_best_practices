import { useUpdate } from "../hooks/update product hooks/useUpdate"

const UpdateProduct = () => {
    const { product , handleChange, handleUpdate, handleDelete, stockRecord } = useUpdate()

  return (
    <>
        <form onSubmit={handleUpdate}>
            <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required/>
            <input type="text" name="price" value={product.price} onChange={handleChange} placeholder="Price" required/>
            <input type="text" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" required/>
            <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="description" required/>
            <button type="submit">Update</button>
        </form>
        <button onClick={() => handleDelete()}>Delete</button>

         {/* Display Stock Records */}
         <h3>Stock Update History</h3>
            <ul>
                {stockRecord.map((record, index) => (
                    <li key={index}>
                        {new Date(record.timestamp).toLocaleString()} - Added: {record.quantityAdded}
                    </li>
                ))}
            </ul>
    </>
  )
}

export default UpdateProduct