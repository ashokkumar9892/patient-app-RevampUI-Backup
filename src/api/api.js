import axios from 'axios'
export function getToken() {
    return new Promise((resolve, reject) => {
        const token = getLocalToken();
        if (token) {
            return resolve(token)
        }
        axios.request({
            url: "/oauth2/v1/token",
            method: "post",
            baseURL: "https://appointmentapi.apatternclinic.com/",
            auth: {
                username: "0oady1uewg1C26P1X297",
                password: "AzW1B_E3PuijHjhqMtte5FmV8yggwc209qDqKxj9"
            },
            data: "grant_type=client_credentials&scope=athena/service/Athenanet.MDP.*"
        }).then(res => {
            localStorage.setItem('token', res?.data?.access_token);
            localStorage.setItem('expire', String((Number(res?.data?.expires_in) * 1000) + Date.now()));
            resolve(res?.data?.access_token)
        }).catch(() => reject(''))
    })
}

const getLocalToken = () => {
    const token = localStorage.getItem('token');
    const expire = localStorage.getItem('expire');
    if (token && Number(expire) > Date.now()) {
        return token;
    }
    return null;
}
