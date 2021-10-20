import {calculateRemainingTime} from "./auth-context";

const getNewToken = () => {
    fetch
}
export default function retrieveStoredToken() {
    const storedToken = localStorage.getItem('token');
    const storedExpiration = localStorage.getItem('tokenTimeout') as string;

    const remainingTime = calculateRemainingTime(storedExpiration);

    if (remainingTime <= 300000)
    {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimeout');
        

    }
}

