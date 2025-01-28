import axios from 'axios'

export async function postLogin(csrfToken: string) {
    const data = {
        email: "admin@admin.com",
        password: "12345678",
    }
    const headers = {
        "csrf-token": csrfToken
    }
    const res = await axios.post("https://marketplace.backend.wtsdemo.ru/api/login", data, { headers })
    if (res) {
        window.localStorage.setItem("token", res.data.data.tokens.accessToken)
    }
}

export async function getCSRF() {
    const { data } = await axios.get("https://marketplace.backend.wtsdemo.ru/api/csrf")
    return data
}
