import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './App.css';
import api from './services/Api';

function App() {
  const [input, setInput] = React.useState('');
  const [results, setResults] = React.useState({});

  async function handleClick() {
    if (input === '') {
      alert('Digite um cep');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setResults(response.data);
      setInput('');
    } catch {
      alert('Desculpe, mas esse cep não é válido!');
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title"> Buscar pelo Cep </h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="buttonSearch" onClick={handleClick}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>
      {Object.keys(results).length > 0 && (
        <main className="main">
          <h2> Cep: {results.cep} </h2>
          <span> Complemento: {results.complemento} </span>
          <span> DDD: {results.ddd} </span>
          <span> Rua: {results.logradouro} </span>
          <span> Bairro: {results.bairro} </span>
          <span>
            Cidade: {results.localidade} / {results.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
