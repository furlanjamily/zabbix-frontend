import React, { useState, useEffect } from 'react';

const App = () => {
  const [hostGroups, setHostGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para carregar os dados da API do Flask
  useEffect(() => {
    fetch('http://localhost:5000/api/hostgroups', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHostGroups(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados:', error);
        setLoading(false);
      });
  }, []);

  // Exibir a tela de carregamento
  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center mb-8">Zabbix Dashboard</h1>

      {hostGroups.map((group, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold">{group.name}</h2>

          <div className="carousel mt-4 flex overflow-x-scroll space-x-4">
            {group.hosts.map((host, index) => (
              <div
                key={index}
                className="flex-none w-64 p-4 border rounded-lg shadow-md"
              >
                <div className="text-lg font-medium">{host.name}</div>
                <div className="text-sm text-gray-500">{host.host}</div>
                <div
                  className={`mt-2 p-2 text-center rounded ${
                    host.status === 'up'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {host.status === 'up' ? 'Up' : 'Down'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
