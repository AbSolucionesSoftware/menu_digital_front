import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: 'https://digital-menu-back.herokuapp.com/api'
})


export default clienteAxios

// import axios from 'axios'

// const clienteAxios = axios.create({
//     baseURL:process.env.REACT_APP_AXIOS
// })


// export default clienteAxios