import { api } from '../services/Api'

export const changePass = async(email, password) => {
    try {
        const response = await api.post('/auth/changepass', { email, password })
        return response.data
    } catch(error){
        return error.response ? error.response.data : { message: 'Error validating PIN:' };
    }
}