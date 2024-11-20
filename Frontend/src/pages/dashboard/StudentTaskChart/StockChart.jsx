import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const StudentTaskChart = ({ data }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!data || !data.students || data.students.length === 0) return;

    const { width, height } = dimensions;
    const marginTop = 20;
    const marginRight = 40;
    const marginBottom = 30;
    const marginLeft = 40;

    // Flatten and process the data
    const flattenedData = data.students.flatMap(student => 
      student.tasks.map(task => ({
        name: student.name,
        date: new Date(task.date),
        completed: task.completed
      }))
    );

    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent(flattenedData, d => d.date))
      .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(flattenedData, d => d.completed)])
      .range([height - marginBottom, marginTop]);

    const color = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(data.students.map(s => s.name));

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll("*").remove();

    // Create axes
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

    // Create lines
    const line = d3.line()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.completed));

    data.students.forEach(student => {
      svg.append("path")
        .datum(student.tasks)
        .attr("fill", "none")
        .attr("stroke", color(student.name))
        .attr("stroke-width", 1.5)
        .attr("d", line);
    });

    // Add legend
    const legend = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(data.students)
      .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", d => color(d.name));

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(d => d.name);

  }, [data, dimensions]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '400px' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default StudentTaskChart;