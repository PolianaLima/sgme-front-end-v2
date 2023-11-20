import Cookies from "js-cookie";

export const saveUserToCookie = (userData)=>{

    Cookies.set('user', userData, {expires:7})
}

export const getUserFromCookie = ()=>{
    const userData = Cookies.get('user');
    return userData ? userData : null;
}

export const removeUserFromCookie=()=>{
    return Cookies.remove('user')
}