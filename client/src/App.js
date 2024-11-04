// permite adicionar e gerenciar estados: textos de entrada, contadores, seleção de usuarios
import {useState, useEffect} from "react"
import './App.css';
import Axios from "axios"
import Card from "./components/cards/card";

function App() {
  // criado pelo useState
  // values variavel que armazena valores do campo
  // setValues função que permite atualizar valores sempre que o usuario digita
  const [values, setValues] = useState();

  const [listGames, setListGames] = useState();
  console.log(listGames);
  
  // pegar o valor do campo do input em formato de objeto
  // prev representa o estado atual de values antes da atualização
  // ... cria uma copia de prev para garantir que os valores antigos sejam preservados
  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }))
  }

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register",{
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {
      document.location.reload()

    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListGames(response.data)
      
    })
  }, [])

  return (
    <div className="app--container">
      <div className="register--container">
        
        <h1>Game Store</h1>

        <input placeholder="Nome" name="name" type="text" className="register--input" onChange={handleChangeValues} />
        
        <input placeholder="Preço" name="cost" type="number" className="register--input" onChange={handleChangeValues}/>
        
        <input placeholder="Categoria" name="category" type="text" className="register--input" onChange={handleChangeValues}/>

        <button className="register--btn" onClick={() => handleClickButton()}>Cadastrar</button>
      
      </div>
      {console.log(listGames)}
      { listGames && listGames.map((value) => {
        return (
          <Card
            key={value.id}
            listCard={listGames}
            setListGames={setListGames}
            id={value.id}
            name={value.name}
            cost={value.cost}
            category={value.category}
          />
        )
          

      }) }
    </div>
  );
}

export default App;
