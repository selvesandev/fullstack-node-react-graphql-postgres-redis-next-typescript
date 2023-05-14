
import { getCookie } from 'cookies-next';


export const getAccessToken = (name: string) => {
    return getCookie(name);
}