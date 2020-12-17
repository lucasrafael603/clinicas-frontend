import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.css';
import './styles.css'
import { List, message, Avatar, Button } from 'antd';
import {FiCheckCircle, FiAlertCircle} from 'react-icons/fi'
import {Link} from 'react-router-dom'

function Lista() {


  const [dataSource, setDataSource] = useState( [

    {
      name: "EHS SOLUÇÕES INTELIGENTES",
      endereço: "Rua Barão do Triunfo, 612 / CJ 901",
      cep: "04602-002",
      email: "contato@ehsss.com.br",
      whatsapp: "(11) 93477-9755",
      serviços : [{
      examesClinicos: "Disponível",
      examesComplementares: "Disponível",
      ppra: "Disponível",
      pcmso: "Disponível"
      }]
      },
      {
      name: "SA ASSESSORIA",
      endereço: "Rua Joaquim Guarani, 105",
      cep: "04707-060",
      email: "selma@saassessoria.com.br",
      whatsapp: "(11) 95182-8221",
      serviços : [{
      examesClinicos: "Disponível",
      examesComplementares: "Indisponível",
      ppra: "Indisponível",
      pcmso: "Disponível"
      }]
      },
      {
      name: "GEREMED SAUDE E SEGURANCA OCUPACIONAL",
      endereço: "Rua do Estilo Barroco, 452",
      cep: "04709-011",
      email: "nubia@geremed.com.br",
      whatsapp: "(11) 95536-9651",
      serviços : [{
      examesClinicos: "Disponível",
      examesComplementares: "Indisponível",
      ppra: "Disponível",
      pcmso: "Disponível"
      }]
      },
      {
      name: "CEMIP SAUDE",
      endereço: "AV. ADOLFO PINHEIRO, 2464 / 3º ANDAR SALA 31",
      cep: "04734-902",
      email: "cemip@cemip.com.br",
      whatsapp: "(11) 95521-1900",
      serviços : [{
      examesClinicos: "Disponível",
      examesComplementares: "Disponível",
      ppra: "Indisponível",
      pcmso: "Indisponível"
      }]
      },
      {
      name: "OCUPACIONAL SS SAÚDE E SEGURANÇA DO TRABALHO",
      endereço: "Rua Francisco Romeiro Sobrinho, 141",
      cep: "04710-180",
      email: "cleiton@ocupacionalss.com.br",
      whatsapp: "(11) 95181-0102",
      serviços : [{
      examesClinicos: "Disponível",
      examesComplementares: "Disponível",
      ppra: "Disponível",
      pcmso: "Disponível"
      }]
      },
      {
      name: "GBEN - GESTAO DE BENEFICIOS OCUPACIONAIS",
      endereço: "Rua Enxovia, 472 / Conj 2009",
      cep: "04711-030",
      email: "VANESSA@GBEN.COM.BR",
      whatsapp: "(11) 92776-2700",
      serviços: [{
      examesClinicos: "Disponível",
      examesComplementares: "Disponível",
      ppra: "Disponível",
      pcmso: "Disponível"
      }]
      },
      {
      name: "GRUPO MORATTI",
      endereço: "Rua Francisco de Morais, 219",
      cep: "04714-010",
      email: "",
      whatsapp: "(11) 93567-8031",
      serviços: [{
      examesClinicos: "Disponível",
      examesComplementares: "Indisponível",
      ppra: "Indisponível",
      pcmso: "Indisponível"
      }]
      },
      {
      name: "HEALTH MANAGER",
      endereço: "Rua Indiana, 1148 / Conj 02",
      cep: "04562-002",
      email: "comercial1@healthmanager.com.br",
      whatsapp: "(11) 95091-7416",
      serviços: [{
      examesClinicos: "Disponível",
      examesComplementares: "Disponível",
      ppra: "Disponível",
      pcmso: "Disponível"
      }]
      },
      {
      name: "S&MED CONSULTORIA E GESTAO DE SSO",
      endereço: "Avenida Engenheiro Luiz Carlos Berrini, 1140",
      cep: "04571-000",
      email: "CONTATO@SMEDGESTAO.COM.BR",
      whatsapp: "(11) 94280-8636",
      serviços: [{
      examesClinicos: 'Disponível',
      examesComplementares: 'Indisponível',
      ppra: 'Indisponível',
      pcmso: 'Indisponível',
      }]
      },
      {
      name: "MANTRIS",
      endereço: "Avenida das Nações Unidas, 11633 / 7º Andar",
      cep: "04578-000",
      email: "credenciamento@mantris.com.br",
      whatsapp: "(11) 92141-8000",
      serviços: [{
      examesClinicos: 'Disponível',
      examesComplementares: 'Indisponível',
      ppra: 'Disponível',
      pcmso: 'Disponível'
      }]
      },
  ])

  useEffect(() => {
  
    const count = parseInt(localStorage.getItem('@id')) 

    for(let i = 1; count > i ; i++){  

        setDataSource( d => [ ...d, JSON.parse(localStorage.getItem(i)) ])
        
    }
  
  },[])


  function sortItems(){

        setDataSource(dataSource.sort(function (a, b) {
	
          return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
          
        }))
        

  }

  return (
    <div >
      <button className='botaoClass, espacamento' onClick={sortItems}> Ordenar </button>
      <Button className='espacamento' ><Link to={'/Register'} > Adicionar Nova Clinica </Link></Button>
        <List
            dataSource={dataSource}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://img2.gratispng.com/20180703/aap/kisspng-hospital-computer-icons-clinic-clip-art-5b3b88d5128df6.584255131530628309076.jpg" />
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.email}
                />
                <div> 
                  <div style={{marginRight: '50px'}}>
                    <h2> Serviços </h2>
                    <div>
                      <ol>
                      {item.serviços.map((values) => {

                          return (
                            <>
                            <li> Exames Clinicos </li>
                            <Avatar src={values.examesClinicos === 'Disponível' ? <FiCheckCircle size={16} color="#00A86B"/> : <FiAlertCircle size={16} color="#E02041"/> }/> 
                            <span style={{fontWeight: '500'}}>{values.examesClinicos}</span>
                            <li> Exames Complementares </li>
                            <Avatar src={values.examesComplementares === 'Disponível' ? <FiCheckCircle size={16} color="#00A86B"/> : <FiAlertCircle size={16} color="#E02041"/> }/> 
                            <span style={{fontWeight: '500'}}>{values.examesComplementares}</span>
                            <li> PPRA </li>
                            <Avatar src={values.ppra === 'Disponível' ? <FiCheckCircle size={16} color="#00A86B"/> : <FiAlertCircle size={16} color="#E02041"/> }/> 
                            <span style={{fontWeight: '500'}}>{values.ppra}</span>
                            <li> PCMSO  </li>
                            <Avatar src={values.pcmso === 'Disponível' ? <FiCheckCircle size={16} color="#00A86B"/> : <FiAlertCircle size={16} color="#E02041"/> }/> 
                            <span style={{fontWeight: '500'}}>{values.pcmso}</span>
                            </>
                          )

                      })}
                      </ol>

                    </div>

                  </div>
                  <div>
                    <a href={`https://api.whatsapp.com/send?phone=55${item.whatsapp}`}>
                    <Avatar src="https://png.pngtree.com/element_origin_min_pic/00/00/05/31574d5cbd9f117.jpg" />
                     <span> {item.whatsapp} </span>
                     </a>
                  </div>
                </div>
              </List.Item>
            )}
          >
          </List>
    </div>
  );
}

export default Lista;
