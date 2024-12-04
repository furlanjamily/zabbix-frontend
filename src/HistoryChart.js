import React, { useEffect, useRef } from 'react';

const HistoryChart = ({ history }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const labels = history.map(item =>
            new Date(item.clock * 1000).toLocaleTimeString()
        );
        const data = history.map(item => parseFloat(item.value) / 1000 / 1000); // Convertendo para MB

        const chart = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Histórico de Dados (MB)',
                        data,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                },
                scales: {
                    x: { title: { display: true, text: 'Horário' } },
                    y: { title: { display: true, text: 'MB' } },
                },
            },
        });

        return () => chart.destroy(); // Cleanup ao desmontar o componente
    }, [history]);

    return <canvas ref={chartRef} />;
};

export default HistoryChart;
