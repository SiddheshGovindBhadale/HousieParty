import axios from "axios";
import Config from "react-native-config";

export const FetchUserData = async (userId) => {
    try {
        const response = await axios.get(`${Config.API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};