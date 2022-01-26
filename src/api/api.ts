import axios, { AxiosInstance } from "axios"
// import cookies from "js-cookie"

const BASE_URL = "http://localhost:3000"

export const apiRequest: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    // "access_token": cookies.get("access_token"),
  },
  // timeout: 30000,
})

apiRequest.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === "401") {
      // error handling code
		}
		console.log('error is', error)
    return Promise.reject(error)
  }
)

const ExampleApiCall = async () => {
  try {
    const response = await apiRequest.get("/questions")
    const userId = response.data.userId
    console.log(response)
  } catch (err) {
    console.log("Error is", err)
  }
}
