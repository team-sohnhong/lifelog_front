import axios, { AxiosInstance } from "axios"
// import cookies from "js-cookie"

const SERVER_ADDRESS = "http://localhost:3000"

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    "Content-Type": "application/json",
    // "access_token": cookies.get("access_token"),
  },
  // timeout: 30000,
})

  // ----react fetch에서 response 받고 json 변환 방법 = 따로 따로 방법 ------
  // const response = await fetch(
  //   `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
  // )
  // const json = await response


// axios, react fetch 차이
// axios를 쓰는게 json 변환도 되고, 보호도 더 된다고 하고, 만약 react를 안하는 날이 오더라도 axios는 그대로 사용할 수 있기 때문에 axios를 공부하는 게 낫겠다.
// https://kimtongting.tistory.com/entry/React-axios-vs-fetch-axios-fetch-%EC%B0%A8%EC%9D%B4-axios-fetch-%EC%B0%A8%EC%9D%B4%EC%A0%90
