import Axios from './axios.service'

let test = () => {
    return Axios.get('/test/')
}

export const Test = {
    test
}