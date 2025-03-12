import { useAdd } from "../hooks/add product hooks/useAdd"

const AddProduct = () => {
    const { handleChange, handleSubmit } = useAdd()

  return (
    <>
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleChange} placeholder="name product" required/>
                <input type="text" name="category" onChange={handleChange} placeholder="category" required/>
                <input type="text" name="quantity" onChange={handleChange} placeholder="quantity" required/>
                <input type="text" name="price" onChange={handleChange} placeholder="price" required/>
                <textarea name="description" onChange={handleChange} placeholder="description" required/>
                <button type="submit">add product</button>
            </form>
        </div>
    </>
  )
}

export default AddProduct