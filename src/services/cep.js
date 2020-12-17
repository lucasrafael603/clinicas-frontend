import axios from 'axios'

function cepService(cep){

  const response = axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    return response
}


export default cepService
