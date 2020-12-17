import React, {useState, useEffect} from 'react'
import 'antd/dist/antd.css';
import './styles.css'
import { Form , Input, Checkbox, Button, Alert, notification} from 'antd';
import cepService from '../../services/cep'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

export default function Register(){

  const [name, setName] = useState()
  const [concluido, setConcluido] = useState(false)
  const [email, setEmail] = useState()
  const [tel, setTel] = useState()
  const [cep, setCep] = useState()
  const [end, setEnd] = useState()
  const [muncipio, setMunicipio] = useState()
  const [uf, setUf] = useState()
  const [exameClinico, setExameClinico] = useState(false)
  const [exameComplementar, setExameComplementar] = useState(false)
  const [PPRA, setPPRA] = useState(false)
  const [PCMSO, setPCMSO] = useState(false)

  useEffect(() => {
    const count = localStorage.getItem('@id')

    if(!count){

      localStorage.setItem('@id', parseInt(1))

    }
  
  },[])


  const openNotificationError = (message) => {
    notification.open({
      message: 'Error',
      description:
        message,
        type : 'error',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const openNotificationWarning = (message) => {
    notification.open({
      message: 'Warning',
      description:
        message,
        type : 'warning',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };



  function setId(value){

    const valueId = localStorage.getItem('@id')
    const idAtual = localStorage.setItem(valueId, value)
    localStorage.setItem('@id', parseInt(localStorage.getItem('@id')) + 1)
  
    return idAtual
   
   }

  const generateCEP = async () => {

    const {data} = await cepService(cep)
    setEnd(`${data.logradouro} - ${data.bairro}`)
    setMunicipio(data.localidade)
    setUf(data.uf)

  }

  function IsEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const ValidateCEP = (cep) => {

    const regexCep = /[0-9]{8}/gi

   const validate = cep.match(regexCep)
   
   if(validate){

    return true

   }

    return false

}

function validPhone (phone) {

var regex = new RegExp('^\\([0-9]{2}\\)(9[0-9]{4}-[0-9]{4})$');

//   var regex = new RegExp('^\\([0-9]{2}\\)([0-9]{9})$');
//   var regex2 = new RegExp('([0-9]{11})$');

//   if(regex.test(phone) === true){

//       return regex.test(phone) 

//   }

//   if(regex2.test(phone) === true){

//     return regex2.test(phone) 

// }

if(regex.test(phone)){

  return regex.test(phone) 

}

}


    const ValidateDates = () => {

    if(!name | !email| !tel | !cep| !end | !muncipio | !uf){

      //window.alert('Favor preencher todos os campos')
      openNotificationWarning('Favor preencher todos os campos')

      }

      if(!exameClinico && !exameComplementar && !PPRA && !PCMSO){


        //window.alert('Favor selecionar pelo menos 1 serviço para a clinica')
        openNotificationWarning('Favor selecionar pelo menos 1 serviço para a clinica')

      }
    
    var validateName
    var validateUF
    var validateEnd
    var validateEmail
    var validateCEP
    var validateTel 

    if(name){
      
      validateName = name.length > 6 ? true : openNotificationError('favor ajustar o nome, a quantidade minima de caracteres é 6') 
      //window.alert('favor ajustar o nome, a quantidade minima de caracteres é 6')
      
    }

    if(uf){

      validateUF = uf.length === 2 ? true : openNotificationError('Favor preencher o estado corretamente') 
      //window.alert('Favor preencher o estado corretamente')

    }

    if(end){

      validateEnd = end.length > 8 ? true : openNotificationError('Favor preencher o endereço corretamente, a quantidade minima de caracteres é 8') 
      //window.alert('Favor preencher o endereço corretamente, a quantidade minima de caracteres é 8')

    }

    if(email){

      validateEmail = IsEmail(email) === true ? true : openNotificationError('Ajustar formato de email, Por favor') 
      //window.alert('Ajustar formato de email, Por favor')

    }

    if(cep){

      const dados = ValidateCEP(cep) 
      validateCEP = dados === true ? true : openNotificationError('Favor ajustar o CEP') 
      //window.alert('Favor ajustar o CEP') 

    }

    if(tel){

      validateTel = validPhone(tel) === true ? true : openNotificationError('Favor preencher o campo de Telefone corretamente, exemplo: (15) 99636-6532')
      // window.alert('Favor preencher o campo de Telefone corretamente')

    }

    
  if(validateName === true && validateUF === true && validateEnd === true && validateEmail === true && validateCEP === true && validateTel === true ){

    if(name && email && tel && cep && end && muncipio && uf && exameClinico || exameComplementar || PPRA || PCMSO){

    const newClinic = {
      name,
      endereço: end,
      cep,
      email,
      whatsapp: tel,
      serviços: [{
        examesClinicos: exameClinico === true ? 'Disponível' : 'Indisponível',
        examesComplementares: exameComplementar === true ? 'Disponível' : 'Indisponível',
        ppra: PPRA === true ? 'Disponível' : 'Indisponível',
        pcmso: PCMSO === true ? 'Disponível' : 'Indisponível',
        }]
    }

    setId(JSON.stringify(newClinic))

    console.log('Nova Clinica', newClinic)

    
    setCep()
    setTel()
    setUf('')
    setEnd('')
    setEmail('')
    setName('')
    setMunicipio('')
    // setExameClinico(false)
    // setExameComplementar(false)
    // setPCMSO(false)
    // setPCMSO(false)
    setConcluido(true)
  }
}

  }


  return (
    <>
    <div style={{backgroundColor: 'black', textAlign: 'center'}}>
      <h1 style={{color: 'white'}}> Cadastro de Clinica </h1>
    </div>
    <Link to='/'> <FiArrowLeft size='25' /> </Link>
    <Form id='formStyle'>  
      <Form.Item required label='Nome'>
        <Input placeholder='Digite o nome' value={name} onChange={(values) => setName(values.target.value)} className='inputDefault' type={'text'}></Input>
      </Form.Item>

      <Form.Item required label='CEP'>
        <Input placeholder='Somente numeros' value={cep} required={cep ? false : false} onBlur={generateCEP} onChange={(values) => setCep(values.target.value)} className='inputDefault' type={'number'}></Input>
        
      </Form.Item>

      <Form.Item required label='Endereço'>
        <Input placeholder='Digite o seu endereço' value={end} onChange={(values) => setEnd(values.target.value)} className='inputLarge' type={'text'}></Input>
      </Form.Item>


      <Form.Item required label='Municipio'>
        <Input placeholder='Digite o seu Municipio' value={muncipio} onChange={(values) => setMunicipio(values.target.value)} value={muncipio} className='inputDefault' type={'text'}></Input>
      </Form.Item>

      <Form.Item required label='UF'>
        <Input placeholder='UF'  value={uf} onChange={(values) => setUf(values.target.value)} className='inputLow' type={'text'}></Input>
      </Form.Item>
      
      <Form.Item label='Email'>
        <Input placeholder='Digite o seu Email' value={email} onChange={(values) => setEmail(values.target.value)}  className='inputDefault' type={'email'}></Input>
      </Form.Item>

      <Form.Item required label='Whatsapp'>
        <Input placeholder='Digite o N° do seu Tel' value={tel} onChange={(values) => setTel(values.target.value)} className='inputDefault' type={'tel'}></Input>
      </Form.Item>

      <Form.Item required label='Serviços'>
        <Checkbox  onChange={(value) => setExameClinico(value.target.checked)}> Exames Clinicos </Checkbox>
        <Checkbox  onChange={(value) => setExameComplementar(value.target.checked)}> Exames Complementares  </Checkbox>
        <Checkbox  onChange={(value) => setPPRA(value.target.checked)}> PPRA  </Checkbox>
        <Checkbox  onChange={(value) => setPCMSO(value.target.checked)}> PCMSO  </Checkbox>
      </Form.Item>

      <Button onClick={ValidateDates} > Cadastrar </Button>

      { concluido &&  <Alert
      message="Clinica cadastrada com Sucesso"
      type="success"
      closable
    /> }


    </Form>
      

    </>
        );


}

