import { history } from './history';

export const getUserInfo = () => {
    var userInfo = sessionStorage.getItem('tokenInfo');
    if (userInfo == null || userInfo === undefined) {
        history.push('/');
        window.location.reload();
    } else {
        return JSON.parse(userInfo);
    }
}

export const hideLoader = () => {
    if (document.getElementsByClassName("loader-container")[0] !== undefined) {
        document.getElementsByClassName("loader-container")[0].style.display = 'none';
    }
}

export const showLoader = () => {
    if (document.getElementsByClassName("loader-container")[0] !== undefined) {
        document.getElementsByClassName("loader-container")[0].style.display = 'flex';
    }
}