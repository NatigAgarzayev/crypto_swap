import axios from "axios";

export async function getRate() {
    const accessToken = window.localStorage.getItem("token")
    const headers = {
        Authorization: "Bearer " + accessToken
    }
    try {
        const { data } = await axios.get("https://marketplace.backend.wtsdemo.ru/api/configuration/keys/15", { headers })
        return data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response
        }
        throw error
    }
}