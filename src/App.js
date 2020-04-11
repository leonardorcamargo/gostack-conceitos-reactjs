import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then((res) => {
      const repositories = res.data;
      setRepositories(repositories);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      url: 'www.github.com',
      title: `Meu repositório ${Date.now()}`,
      techs: []
    });

    setRepositories([ ...repositories, res.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const tempRepositories = repositories.filter((repository) => repository.id !== id);
    setRepositories(tempRepositories);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => (
          <li>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
