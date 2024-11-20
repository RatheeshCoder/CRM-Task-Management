import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import weeklyTasks from './weeklyTasks.json';

const WeeklyTaskChart = () => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (chartRef.current && dimensions.width > 0 && dimensions.height > 0) {
      d3.select(chartRef.current).selectAll("*").remove();
      createChart();
    }
  }, [dimensions]);

  const createChart = () => {
    const { width, height } = dimensions;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    const x = d3.scaleBand()
      .domain(weeklyTasks.map(d => d.day))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(weeklyTasks, d => d.tasksCompleted)]).nice()
      .range([height - marginBottom, marginTop]);

    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
      .attr("class", "bars")
      .attr("fill", "#4b4b4b")
      .selectAll("rect")
      .data(weeklyTasks)
      .join("rect")
        .attr("x", d => x(d.day))
        .attr("y", d => y(d.tasksCompleted))
        .attr("height", d => y(0) - y(d.tasksCompleted))
        .attr("width", x.bandwidth());

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove());

    // Add zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .extent([[marginLeft, marginTop], [width - marginRight, height - marginTop]])
      .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed(event) {
      x.range([marginLeft, width - marginRight].map(d => event.transform.applyX(d)));
      svg.selectAll(".bars rect")
        .attr("x", d => x(d.day))
        .attr("width", x.bandwidth());
      svg.selectAll(".x-axis").call(d3.axisBottom(x).tickSizeOuter(0));
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default WeeklyTaskChart;