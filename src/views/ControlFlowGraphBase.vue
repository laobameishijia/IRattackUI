<template>
    <div ref="chart" class="chart"></div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';

const props = defineProps({
    data: {
        type: String,
        required: true
    }
});

const chartRef = ref(null);

const parseLLVMIR = (data) => {
    // 这是一个简单的示例，解析LLVM IR代码为控制流图的数据结构
    // 实际的解析可能需要更复杂的逻辑
    const nodes = [
        { id: '6' }, { id: '13' }, { id: '14' }, { id: '23' }, { id: '26' },
        { id: '29' }, { id: '32' }, { id: '38' }, { id: '44' }, { id: '50' },
        { id: '61' }, { id: '62' }, { id: '64' }, { id: '65' }, { id: '67' }, { id: '68' }
    ];
    const links = [
        { source: '6', target: '13' }, { source: '6', target: '14' },
        { source: '14', target: '23' }, { source: '23', target: '6' },
        { source: '13', target: '26' }, { source: '26', target: '29' },
        { source: '29', target: '32' }, { source: '32', target: '38' },
        { source: '38', target: '44' }, { source: '44', target: '50' },
        { source: '50', target: '61' }, { source: '50', target: '62' },
        { source: '62', target: '64' }, { source: '64', target: '67' },
        { source: '65', target: '67' }, { source: '67', target: '68' },
    ];
    return { nodes, links };
};

const createChart = ({ nodes, links }) => {
    const svg = d3.select(chartRef.value)
        .append('svg')
        .attr('width', 800)
        .attr('height', 600);

    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke', 'black');

    const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('fill', 'blue');

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(400, 300));

    simulation.on('tick', () => {
        link.attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node.attr('cx', d => d.x)
            .attr('cy', d => d.y);
    });
};

onMounted(() => {
    const chartData = parseLLVMIR(props.data);
    createChart(chartData);
});
</script>
  
<style scoped>
.chart {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
  