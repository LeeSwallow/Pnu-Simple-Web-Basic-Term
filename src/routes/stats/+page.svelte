<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let chartEl: HTMLCanvasElement;
    let chartInstance: Chart | null = null;

    // 예시 데이터: 일주일간 날짜별 포모도로(분) 합계
    const weekData = [
        { date: '2024-06-10', minutes: 50 },
        { date: '2024-06-11', minutes: 75 },
        { date: '2024-06-12', minutes: 25 },
        { date: '2024-06-13', minutes: 100 },
        { date: '2024-06-14', minutes: 0 },
        { date: '2024-06-15', minutes: 60 },
        { date: '2024-06-16', minutes: 30 },
    ];

    onMount(() => {
        if (chartInstance) chartInstance.destroy();
        chartInstance = new Chart(chartEl, {
            type: 'bar',
            data: {
                labels: weekData.map(d => d.date),
                datasets: [{
                    label: '포모도로(분)',
                    data: weekData.map(d => d.minutes),
                    backgroundColor: '#6366f1'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: '일주일 포모도로 통계'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: '분' }
                    },
                    x: {
                        title: { display: true, text: '날짜' }
                    }
                }
            }
        });
        return () => {
            if (chartInstance) chartInstance.destroy();
        };
    });
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">일주일 포모도로 통계</h1>
    <div class="bg-base-100 p-4 rounded-lg shadow">
        <canvas bind:this={chartEl}></canvas>
    </div>
</div> 