<script>
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    export let observationData;
    export let chosenKey;
    let xAxis;
    let yAxis;
    let chartContext;
    let chart;

    onMount(() => {
        xAxis = observationData.map((obs) => obs["Time[UTC+0.0]"]);
        yAxis = observationData.map((obs) => obs[chosenKey]);

        chartContext = document.getElementById("myChart");
        chart = new Chart(chartContext, {
            type: "line",
            data: {
                labels: xAxis,
                datasets: [
                    {
                        label: chosenKey,
                        data: yAxis,
                        fill: false,
                        borderColor: "rgb(153, 63, 253)",
                        tension: 0.1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    });

    $: if (chart !== undefined) {
        yAxis = observationData.map((obs) => obs[chosenKey]);
        chart.data.datasets[0].label = chosenKey;
        chart.data.datasets[0].data = yAxis;
        chart.update();
    }
</script>

<canvas id="myChart" width="400px" height="150px" />
