import { api } from "./Api";

export const validatePIN = async (pin) => {
    try {
        const response = await api.post('/pin/pin', { pin } )
        return response.data
    } catch (error) {
        return error.response ? error.response.data : { message: 'Error validating PIN:', error };
    }
}