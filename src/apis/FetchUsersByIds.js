import axios from "axios";
import Config from "react-native-config";

export const FetchUsersByIds = async (userIds) => {
    try {
        const response = await axios.post(`${Config.API_URL}/users/bulk`, {
            userIds: userIds,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// import axios from 'axios';
// import Config from 'react-native-config';

// const MAX_RETRIES = 3;
// const RETRY_DELAY = 2000; // 2 seconds

// export const FetchUsersByIds = async (idsArray, retries = MAX_RETRIES) => {
//     try {
//         const response = await axios.post(`${Config.API_URL}/users/bulk`, {
//             userIds: idsArray,
//         });
//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.status === 429 && retries > 0) {
//             console.warn(`Rate limit hit. Retrying in ${RETRY_DELAY}ms...`);
//             await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
//             return FetchUsersByIds(idsArray, retries - 1); // Retry request
//         } else {
//             console.error('Failed to load user data:', error);
//             throw error;
//         }
//     }
// };
