import { useState } from "react";
import { toast } from "react-toastify";
import { useProducts } from "./useProducts";

export const useCart = () => {
    const [cart, setCart] = useState([])
    const { products } = useProducts()

    // pang add to cart with validation kung zero stocks hindi makakabili
    const addToCart = (product) => {
        // kung yung product ay out of stocks hindi makakabili
                if(product.quantity <= 0) {
                    toast.error('Out of stock! Cannot proceed with purchase.', { position: 'top-right' })
                    return
                }
        
        // kung yung product ay existing nasa loob ng cart
                const existingCartItem = cart.find((item) => item._id === product._id)
                if (existingCartItem) {
                    if(existingCartItem.quantity >= product.quantity) {
                    toast.error('Product is already in the cart.', { position: 'top-right' });
                    return;
                    }
                    adjustQuantity(product._id, 1)
                } else {
                setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
                }
            }

                //para makapag remove ng Items sa cart
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId))
    }

    // para makapag dagdag kung ilan bibilhin
    const adjustQuantity = (productId, amount) => {
        setCart(prevCart =>
            prevCart.map(item => {
                if(item._id === productId) {
                    const newQuantity = item.quantity + amount
                    const product = products.find(p => p._id === productId)
                    if(product && newQuantity <= product.quantity && newQuantity >= 1) {
                        return { ...item, quantity: newQuantity}
                    } else if (newQuantity < 1) {
                        return null
                    }
                }
                return item   
            })
            .filter(item => item !== null)
        )
    };
    return { cart, addToCart, removeFromCart, adjustQuantity }
}