import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';

const AreaChart = ({ data = [] }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const margin = useMemo(() => ({
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  }), []);

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
    if (!Array.isArray(data) || data.length === 0 || !svgRef.current || dimensions.width === 0 || dimensions.height === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const formattedData = data.map(d => ({
      date: d.date instanceof Date ? d.date : new Date(d.date),
      close: +d.close
    }));

    const { width, height } = dimensions;

    svg.attr("width", width)
       .attr("height", height)
       .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleUtc()
      .domain(d3.extent(formattedData, d => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(formattedData, d => d.close)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const area = d3.area()
      .x(d => x(d.date))
      .y0(y(0))
      .y1(d => y(d.close));

    svg.append("path")
      .datum(formattedData)
      .attr("fill", "#7d7d7d")
      .attr("d", area);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - margin.left - margin.right)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          );
  }, [data, dimensions, margin]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '100px' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default AreaChart;