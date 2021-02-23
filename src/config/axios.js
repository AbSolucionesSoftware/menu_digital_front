import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: 'https://digital-menu-back.herokuapp.com/api'
})


export default clienteAxios