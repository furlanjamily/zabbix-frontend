import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HistoryChart from './HistoryChart';




function App() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.post('http://localhost:5000/api/zabbix/history', {
                  item_id: "12345", // Substitua pelo ID do item
                  time_from: Math.floor(Date.now() / 1000) - 3600 * 4, // Últimas 4 horas
                  time_till: Math.floor(Date.now() / 1000), // Agora
              });
              setHistory(response.data);
              setLoading(false);
          } catch (error) {
              console.error("Erro ao buscar histórico:", error);
          }
      };

      fetchData();
  }, []);

  return (
      <div>
          <h1>Monitoramento Zabbix</h1>
          {loading ? (
              <p>Carregando...</p>
          ) : (
              <HistoryChart history={history} />
          )}
      </div>
  );
}

export default App;

