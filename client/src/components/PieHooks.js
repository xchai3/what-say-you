import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Pie = props => {
    console.log("props",props);
    const ref = useRef(null);
    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius);
    const colors = d3.scaleOrdinal(d3.schemeSet1 );
    const format = d3.format("2");


    const Tooltip = d3.select("#path")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
    var mouseover = function(d) {
        console.log("moved",d.data);
        // Tooltip
        //     .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    const mousemove = function(d) {
        // Tooltip
        //     .html("The exact value of<br>this cell is: " + d.value)
        //     .style("left", (d3.mouse(this)[0]+70) + "px")
        //     .style("top", (d3.mouse(this)[1]) + "px")
    }
    const mouseleave = function(d) {
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)

    }
    useEffect(
        () => {
            const data = createPie(props.data);
            const group = d3.select(ref.current);
            const groupWithData = group.selectAll("g.arc").data(data);

            groupWithData.exit().remove();

            const groupWithUpdate = groupWithData
                .enter()
                .append("g")
                .attr("class", "arc");

            const path = groupWithUpdate
                .append("path")
                .merge(groupWithData.select("path.arc"));

            path
                .attr("class", "arc")
                .attr("d", createArc)
                .attr("fill", (d, i) => colors(i))
                .on("mouseover",mouseover)
                .on("mousemove",mousemove)
                .on("mouseleave",mouseleave)
            ;

            const text = groupWithUpdate
                .append("text")
                .merge(groupWithData.select("text"));

            text
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("transform", d => `translate(${createArc.centroid(d)})`)
                .style("fill", "white")
                .style("font-size", 10)
                .text(d => format(d.value));

            //create a legend
            groupWithData.enter().append("circle").attr("cx",200).attr("cy", function(d,i){ return 10 + i*25}).attr("r", 10).style("fill", function(d,i){ return colors(i)})
            groupWithData.enter().append("text").attr("x", 220).attr("y", function(d,i){ return 10 + i*25}) .text(function(d){return d.data.content;}).style("font-size", "15px").attr("alignment-baseline","middle");


        },
        [props.data]
    );

    return (
        <svg width={props.width} height={props.height}>
            <g
                ref={ref}
                transform={`translate(${props.outerRadius} ${props.outerRadius})`}
            />
        </svg>
    );
};

export default Pie;
