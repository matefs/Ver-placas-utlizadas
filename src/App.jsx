import { useEffect, useState, useRef} from 'react' 
import axios from 'axios'
import './App.css'


function App() {
  const [data, setData] = useState([])
  const FormRef = useRef()
  const [ atualizaGrid, setAtualizaGrid  ] = useState(false)
  const url = 'https://gelatinous-liberating-camp.glitch.me/'
  var UltimoIdCadastrado;

  async function CarregaDados() {
    await axios.get(url+'veiculos').then(response => setData(response.data))
    setAtualizaGrid(!atualizaGrid)
    UltimoIdCadastrado = data.at(-1).id
  }


  async function inputaDados(e) {
    e.preventDefault(); 
    const {inputDesc, inputCard, inputPlaca} = FormRef.current; 
    const dados = {
      "id" : UltimoIdCadastrado+1,
      "placa": inputPlaca.value,
      "card": inputCard.value,
      "descricao" : inputDesc.value,
    }

    await axios.post(url+'veiculos',dados)
  }

  async function Deletar(id) {
    await axios.delete(url+`veiculos/${id}`)
    setAtualizaGrid(!atualizaGrid)
  }


  useEffect(() => {
    CarregaDados(); 
  },[atualizaGrid])

  return (
    <div className="App">

      <h1>Visualizador de placas Utilizadas</h1>


      <form onSubmit={inputaDados} ref={FormRef}>
        <input type="text" id="inputPlaca" placeholder='Informe uma placa' />
        <input type="text" id="inputCard" placeholder='Informe o card' />
        <input type="text" id="inputDesc" placeholder='Informe uma descricao' />
        <button type="submit">Salvar</button>
      </form>
   
   
   
      {data.map((data) => {
        return(
          <ul key={data.id} >
          
          <li>Id: {data.id}</li> 
          <li>Placa: {data.placa}</li>
          <li>Card Vínculado: {data.card}</li>
          <li>Descrição: {data.descricao} </li>
 
          <button onClick={() => Deletar(data.id)}>Deletar</button>
          </ul>
        )
      })}
     
   
   
    </div>
  )
}

export default App
