function realTimeLineChart(div_id) {
    var margin = { top: 30, right: 0, bottom: 20, left: 30 };
    var element = d3.select(div_id).node(),
        width = element.getBoundingClientRect().width - margin.left - margin.right, //mida de grafica
        height = element.getBoundingClientRect().height - margin.top - margin.bottom;
    var color = d3.schemeCategory10;

    var textColor = "silver", // color dels textos
        textFontFamily = "Arial", // familia de font
        textFontWeight = 100, //grau de negreta
        textFontSize = 12; //mida de lletres del text

    function chart(selection) {
        selection.each(function (data) {
            data = ["z"].map(function (c) {
                return {
                    label: c,
                    values: data.map(function (d) {
                        return { time: +d.time, value: d[c] };
                    })
                };
            });

            var t = d3.transition().duration(duration).ease(d3.easeLinear),
                x = d3.scaleTime().rangeRound([0, width - margin.left - margin.right]),//escala l'eix x
                y = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]), //escala l'eix y
                z = d3.scaleOrdinal(color); //escala de colors

            var xMin = d3.min(data, function (c) { return d3.min(c.values, function (d) { return d.time; }) });
            var xMax = new Date(new Date(d3.max(data, function (c) {
                return d3.max(c.values, function (d) { return d.time; })
            })).getTime() - (duration * 2));

            x.domain([xMin, xMax]);
            y.domain([
                d3.min(data, function (c) { return d3.min(c.values, function (d) { return d.value; }) }),
                d3.max(data, function (c) { return d3.max(c.values, function (d) { return d.value; }) })
            ]);
            z.domain(data.map(function (c) { return c.label; }));

            var line = d3.line()
                .curve(d3.curveBasis)
                .x(function (d) { return x(d.time); })
                .y(function (d) { return y(d.value); });

            var svg = d3.select(div_id).selectAll("svg").data([data]);
            var gEnter = svg.enter().append("svg").append("g");
            gEnter.append("g").attr("class", "axis x");
            gEnter.append("g").attr("class", "axis y");
            gEnter.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom);
            gEnter.append("g")
                .attr("class", "lines")
                .attr("clip-path", "url(#clip)")
                .selectAll(".data").data(data).enter()
                .append("path")
                .attr("class", "data");


            var svg = selection.select("svg");
            svg.attr('width', "100%").attr('height', "100%");
            var g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            g.select("g.axis.x") //definir l'eix x
                .attr("transform", "translate(0," + (height - margin.bottom - margin.top) + ")")
                .transition(t)
                .call(d3.axisBottom(x).ticks(5))
                .selectAll("text").style("fill", textColor);

            g.select("g.axis.x").selectAll(".tick").selectAll("line").style("stroke", "silver")
            //g.append("line")
            //    .attr("x1", 0)
            //    .attr("y1", height)
            //    .attr("x2", width)
            //    .attr("y2", height)
            //    .style("stroke", "silver")

            g.select("g.axis.y")//definir l'eix y
                .transition(t)
                .attr("class", "axis y")
                .call(d3.axisLeft(y)).selectAll("text").style("fill", textColor);

            g.select("defs clipPath rect")
                .transition(t)
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.right);

            g.selectAll("g path.data")
                .data(data)
                .style("stroke", function (d) { return z(d.label); })
                .style("stroke-width", 2)
                .style("fill", "none")
                .transition(t)
                .on("start", tick);

            function tick() {
                d3.select(this)
                    .attr("d", function (d) { return line(d.values); })
                    .attr("transform", null);

                var xMinLess = new Date(new Date(xMin).getTime() - duration);
                d3.active(this)
                    .attr("transform", "translate(" + x(xMinLess) + ",0)")
                    .transition()
                    .on("start", tick);
            }
        });
    }
    return chart;
}


function tavilLinechart(data, div_id, linecolor, fillArea) {
    var textColor = "silver"; // color dels textos
    var textFontFamily = "poppins", // familia de font
        textFontWeight = 100, //grau de negreta
        textFontSize = 12; //mida de lletres del text

    var margin = { top: 50, right: 0, bottom: 120, left: 50 };
    var element = d3.select(div_id).node();//mida de <div>
    var width = element.getBoundingClientRect().width; //amplada de la grafica         
    var height = element.getBoundingClientRect().height; // alçada de la grafica

    var svg = AfegirSvgLinechart(div_id, width, margin, height);

    var xScale = ObtenirPosicioEixXTavilLinechart(data, width);

    var xScale2 = ObtenirRangEixXTavilLinechart(data, width);

    var yScale = ObtenirRangEixYTavilLinechart(height);

    var dataset = TransformacioDadesTavilLinechart(data);

    var xAxis = d3.axisBottom(xScale).ticks();

    var yAxis = d3.axisRight(yScale).ticks();

    AfegirLiniaEixXLinechart(svg, div_id, height, xAxis, textColor, textFontFamily, textFontWeight, textFontSize);

    AfegirLiniaEixYLinechart(svg, yAxis, textColor, textFontFamily, textFontWeight, textFontSize);

    AfegirQuadriculaTavilLinechart(svg, xScale, yScale, width, height);

    if (fillArea) {
        AfegirAreaOmbretjatTavilLinechart(svg, xScale2, yScale, dataset, linecolor, height);
    }

    AfegirLiniaTavilLinechart(svg, linecolor, dataset, xScale2, yScale);

    AfegirPuntsTavilLinechart(svg, linecolor, dataset, xScale2, yScale, mousemove);

    var focus = CrearTooltipTavilLinechart(svg, linecolor);

    AfegirOverlaysTavilLinechart(svg, width, height, mousemove, focus);

    function mousemove() {
        var x0 = xScale2.invert(d3.mouse(this)[0]);
        //d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + xScale2(Math.round(x0)) + "," + yScale(data.y[Math.round(x0)]) + ")");
        focus.select(".etiqueta").attr("width", "120px").attr("transform", "translate(-60, -40)");
        focus.select(".textEtiqueta").text(data.x[Math.round(x0)] + " - " + data.y[Math.round(x0)] + "M. \u20AC")
    }
}


function TransformacioDadesTavilLinechart(data) {
    return d3.range(data.y.length).map(function (d, i) { return { "y": data.y[i] }; });
}

function ObtenirRangEixYTavilLinechart(height) {
    return d3.scaleLinear()
        .domain([0, 100]) // input 
        .range([height, 0]); // output 
}

function ObtenirPosicioEixXTavilLinechart(data, width) {
    return d3.scalePoint()
        .domain(data.x) // input
        .range([width * 0.05, width * 0.90]); // output
}

function ObtenirRangEixXTavilLinechart(data, width) {
    var n = data.y.length;    // The number of datapoints
    return d3.scaleLinear()
        .domain([0, n - 1]) // input
        .range([width * 0.05, width * 0.90]); // output
}

function AfegirOverlaysTavilLinechart(svg, width, height, mousemove, focus) {
    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width * 0.9)
        .attr("height", height)
        .attr("opacity", 0.0)
        .on("mouseover", function () { focus.style("display", null); })
        .on("mouseout", function () { focus.style("display", "none"); })
        .on("mousemove", mousemove);
}

function AfegirLiniaTavilLinechart(svg, linecolor, dataset, xScale2, yScale) {
    var line = d3.line()
        .x(function (d, i) { return xScale2(i); }) // set the x values for the line generator
        .y(function (d) { return yScale(d.y); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .style("stroke", linecolor)
        .attr("d", line);
}

function AfegirPuntsTavilLinechart(svg, linecolor, dataset, xScale2, yScale, mousemove) {
    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function (d, i) { return xScale2(i) })
        .attr("cy", function (d) { return yScale(d.y) })
        .attr("fill", linecolor)
        .attr("r", 5)
        .on("mousemove", mousemove);
}

function CrearTooltipTavilLinechart(svg, linecolor) {

    var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("rect").attr("class", "etiqueta").attr("fill", "white").attr("stroke", linecolor).attr("stroke-width", 1).attr("rx", 5).attr("ry", 5).attr("height", "30px").attr("transform", "translate(-50, -40)");
    focus.append("text").attr("class", "textEtiqueta").attr("transform", "translate(-0, -20)").attr("text-anchor", "middle").attr("font-size", "12px");

    return focus;
}

function AfegirAreaOmbretjatTavilLinechart(svg, xScale2, yScale, dataset, linecolor, height) {
    var area = d3.area()
        .x(function (d, i) { return xScale2(i); })
        .y0(height)
        .y1(function (d) { return yScale(d.y); });

    svg.append("path")
        .datum(dataset)
        .attr("class", "area")
        .style("fill", linecolor)
        .style("fill-opacity", 0.4)
        .attr("d", area);
}

function AfegirQuadriculaTavilLinechart(svg, xScale, yScale, width, height) {
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + 0 + "," + height + ")") //(width * 0.85/2/(n-1))
        .style("stroke-dasharray", ("3,3"))
        .call(make_x_gridlines(xScale)
            .tickSize(-height)
            .tickFormat("")
        );
    svg.append("g")
        .attr("class", "grid")
        .style("stroke-dasharray", ("3,3"))
        .call(make_y_gridlines(yScale)
            .tickSize(-width)
            .tickFormat("")
        );
}

function make_x_gridlines(x) {
    return d3.axisBottom(x)
        .ticks(8)
}
function make_y_gridlines(y) {
    return d3.axisLeft(y)
        .ticks(5)
}

function semipiechart(titolGrafica, fillColor, percentatge, maxPercentatge, action, div_id) {
    percentatge = parseFloat(percentatge.replace(",", "."), 10); // Convertimos el porcentaje de string a número

    var textColor = "#FFFFFF", // Texto en blanco para mejor contraste
        emptyColor = "#333333"; // Color de la parte no pintada (más oscuro para mejor contraste)

    var element = d3.select(div_id).node(),
        width = element.getBoundingClientRect().width - 30,
        height = element.getBoundingClientRect().height;

    var diameter = Math.min(width - 30, height),
        outerRadius = (diameter / 2) - 10,
        innerRadius = (diameter / 3); // Ajuste del radio interno para una mejor proporción

    drawSemipiechart(
        div_id,
        action,
        width,
        height,
        diameter,
        titolGrafica,
        fillColor,
        textColor,
        emptyColor,
        percentatge,
        maxPercentatge,
        outerRadius,
        innerRadius
    );
}

function drawSemipiechart(
    div_id,
    action,
    width,
    height,
    diameter,
    titolGrafica,
    fillColor,
    textColor,
    emptyColor,
    percentatge,
    maxPercentatge,
    outerRadius,
    innerRadius
) {
    var svg = AfegirSvgSemipiechart(div_id, width, height);

    // Añadir un filtro para la sombra
    var defs = svg.append("defs");
    var filter = defs.append("filter")
        .attr("id", "shadow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");

    filter.append("feDropShadow")
        .attr("dx", 2) // desplazamiento horizontal
        .attr("dy", 2) // desplazamiento vertical
        .attr("stdDeviation", 4) // desenfoque de la sombra
        .attr("flood-color", "rgba(0, 0, 0, 0.3)"); // color de la sombra

    var arc = AfegirArcBaseSemipiechart(innerRadius, outerRadius);
    PintarArcBaseSemipiechart(svg, arc, emptyColor);

    var arcLine = AfegirArcColorSemipiechart(innerRadius, outerRadius);

    // Aseguramos que el porcentaje es mayor a 0 para que la animación ocurra
    var endAngle = (percentatge / maxPercentatge) * Math.PI;
    var pathForeground = svg.append('path')
        .datum({ endAngle: 0 })  // Inicializamos el ángulo del arco en 0 para la animación
        .attr("d", arcLine)
        .attr("transform", 'rotate(-90)') // Rotación para alinear el semicírculo
        .style("fill", `url(#gradient-${div_id})`) // Degradado dinámico
        .attr("filter", "url(#shadow)"); // Filtro de sombra para efecto 3D

    var gradient = defs.append("linearGradient")
        .attr("id", `gradient-${div_id}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    // Configuración inicial del degradado (todo rojo al inicio)
    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#F44336"); // Rojo

    gradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#F44336"); // Rojo intermedio

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#F44336"); // Rojo final

    // Animar los colores según el porcentaje
    gradient.selectAll("stop")
        .transition()
        .duration(2000) // Sincronizado con la animación del arco
        .attr("stop-color", function (d, i) {
            if (i === 0) return percentatge <= 50 ? "#F44336" : percentatge <= 80 ? "#FFC107" : "#4CAF50"; // Inicio
            if (i === 1) return percentatge <= 50 ? "#FFC107" : "#4CAF50"; // Intermedio
            return "#4CAF50"; // Final
        });

    var middleCount = AfegirTextPercentatge(svg, textColor, innerRadius);

    AfegirTitolSemipiechart(svg, titolGrafica, diameter, textColor);
    AfegirMinMaxSemipiechart(svg, maxPercentatge, diameter, textColor);

    var oldValue = action ? 0 : percentatge;

    // Animación: interpolar el ángulo del arco y actualizar el texto del porcentaje
    var arcTween = function (transition, newValue, oldValue) {
        transition.attrTween("d", function (d) {
            var interpolate = d3.interpolate(d.endAngle, Math.PI * (newValue / maxPercentatge));
            var interpolateCount = d3.interpolate(oldValue, newValue);

            return function (t) {
                d.endAngle = interpolate(t); // Interpolación del ángulo del arco
                middleCount.text(Math.floor(interpolateCount(t) * 100) / 100 + '%'); // Actualización del texto de porcentaje

                return arcLine(d);
            };
        });
    };

    // Transición de animación del arco
    pathForeground.transition()
        .duration(2000) // Tiempo de la animación
        .ease(d3.easeCubicOut) // Efecto más suave
        .call(arcTween, percentatge, oldValue); // Aplicar la animación con el valor inicial y final
}


function PintarArcBaseSemipiechart(svg, arc, emptyColor) {
    svg.append('path') // Añadir el arc al SVG
        .attr("d", arc)
        .attr("transform", 'rotate(-90)') // Rotar el semicírculo
        .attr('stroke-width', "3")
        .attr("stroke", emptyColor)
        .style("fill", emptyColor); // Color de la parte vacía
}

// Funciones auxiliares
function AfegirSvgSemipiechart(div_id, width, height) {
    return d3.select(div_id)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style("position", "relative")
        .style("display", "block")
        .style("margin", "0 auto")
        .style("left", "0")
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
}

function AfegirArcBaseSemipiechart(innerRadius, outerRadius) {
    return d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(Math.PI); // Ángulo final (semicírculo)
}

function AfegirArcColorSemipiechart(innerRadius, outerRadius) {
    return d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0);
}

function AfegirTextPercentatge(svg, textColor, innerRadius) {
    return svg.append('text')
        .datum(0)
        .text(function (d) { return d; })
        .attr("class", 'middleText')
        .attr('text-anchor', 'middle')
        .attr("dy", 10)
        .style("fill", textColor)
        .style("font-family", "Arial, sans-serif")
        .style('font-size', '' + (innerRadius / 2.5) + 'px');
}

function AfegirTitolSemipiechart(svg, titolGrafica, diameter, textColor) {
    svg.append("text").text(titolGrafica)
        .attr("dy", -diameter / 9.9)
        .attr('text-anchor', 'middle')
        .style("fill", textColor)
        .style("font-family", "Arial, sans-serif")
        .style("font-size", "15px")
        .style("font-weight", "bold");
}

function AfegirMinMaxSemipiechart(svg, maxPercentatge, diameter, textColor) {
    // Texto del 0 (posición inicial del arco)
    svg.append("text")
        .text("0")
        .attr("dy", diameter / 8.5) // Subir este valor (ajustado desde diameter / 3.5)
        .attr("dx", -diameter / 2.5)
        .attr('text-anchor', 'middle')
        .style("fill", textColor)
        .style("font-family", "Arial, sans-serif")
        .style("font-size", "12px");

    // Texto del valor máximo (posición final del arco)
    svg.append("text")
        .text(maxPercentatge)
        .attr("dy", diameter / 8.5) // Subir este valor (ajustado desde diameter / 3.5)
        .attr("dx", diameter / 2.5)
        .attr('text-anchor', 'middle')
        .style("fill", textColor)
        .style("font-family", "Arial, sans-serif")
        .style("font-size", "12px");
}



function barchart(data, label, div_id, IniciData, FinalData, varTitol, varDescripcio, varColor, machine, view, viewPartial, idDivCheckbox, crearCheckbox, idMaquina) {
    var dataset = data.slice(); //copia de les dates inicials
    var margin = { top: 0, right: 5, bottom: 0, left: 5 }; //marge per posar titols i eixos
    var barWidth = 1.0; //referencia per zoom

    var idleTimeout;

    var textColor = "silver"; // color dels textos
    var textFontFamily = "poppins", // familia de font
        textFontWeight = 100, //grau de negreta
        textFontSize = 11;

    drawBarBarchart(dataset, label, div_id, margin, varTitol, varDescripcio, varColor, barWidth, IniciData, FinalData, idleTimeout, machine, view, viewPartial, idDivCheckbox, crearCheckbox, idMaquina);
}
/**
 * Donada una llista, crea la variable Visible en tots els elements i l'inicialitza a true.
 *
 * @param {Obj} dataset llista d'objectes.
 */
function SetVisible(dataset) {
    dataset.forEach(function (element) {
        element.Visible = true;
    });
}

function barchartAlarmes(data, div_id, IniciData, FinalData, machine, idTaulaAlarmes, view, crearCheckbox, idAlarmesCheckbox = "AlarmesCheckbox") {

    var dataset = data.slice()//copia de dates
    var margin = { top: 0, right: 5, bottom: 70, left: 5 }; //marge per posar titols i eixos

    drawBarBarchartAlarmes(div_id, IniciData, FinalData, machine, margin, dataset, idTaulaAlarmes, view, crearCheckbox, idAlarmesCheckbox);
};

function barchartCanviVariables(data, div_id) {

    var dataset = data.slice()

    var margin = { top: 30, right: 5, bottom: 70, left: 5 }; //marge per posar titols i eixos

    var element = d3.select(div_id).node(),//mida de <div>
        svgWidth = element.getBoundingClientRect().width - 30, //amplada de la grafica         
        svgHeight = element.getBoundingClientRect().height - margin.top - margin.bottom; // alçada de la grafica

    var barWidth = 1.0; //referencia per zoom


    var idleTimeout

    var textColor = "silver"; // color dels textos
    var textFontFamily = "Arial", // familia de font
        textFontSize = 10;

    var domainTime = [iniciData._d, finalData._d];

    var totalTime = (domainTime[1].getTime() - domainTime[0].getTime());

    var xScale = d3.scaleTime()
        .domain(domainTime)
        .range([0, svgWidth]);

    var xScale2 = d3.scaleTime()
        .domain([xScale.invert(svgWidth * 0.06), xScale.invert(svgWidth * 0.96)])
        .range([svgWidth * 0.06, svgWidth * 0.96]);

    var canvas = d3.select(div_id).append("canvas")
        .attr("width", svgWidth)
        .attr("height", svgHeight + margin.top + margin.bottom + 50)
        .attr("id", "idChartContainer3")
        .style("position", "absolute")
        .style("top", margin.top)
        .style("left", margin.left)

    ctx = canvas.node().getContext("2d")

    ctx.translate(margin.left, margin.top)

    var svg = d3.select(div_id) //seleccionar grafica
        .append("svg") //afegir svg
        .attr("width", svgWidth)
        .attr("height", svgHeight + margin.top + margin.bottom)
        .style("position", "absolute")
        .style("display", "block")
        .style("margin", "0 auto")
        .style("top", 0)
        .style("left", 15)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    dataset.forEach(function (d) { //dibuixar barres
        ctx.beginPath();
        ctx.rect(xScale(d.x), 0, (Math.max(svgWidth * (d.v.getTime() - d.x.getTime()) / totalTime * barWidth, 0.5)), 100); //mida de cada barra
        ctx.fillStyle = "#ee2524" //color barres
        ctx.fill()
        ctx.closePath();
    })

    //dibuixa xAxis
    var ticks = xScale2.ticks(10);
    var rotationAngle = -Math.PI / 6;
    var textInclinat = (ticks.length > 7) || (svgWidth < 700);
    ctx.beginPath();
    ticks.forEach(function (d) {//xAxis ticks
        ctx.moveTo(xScale(d), svgHeight);
        ctx.lineTo(xScale(d), svgHeight + 5);
    });
    ctx.strokeStyle = textColor;
    ctx.stroke();

    ticks.forEach(function (d) {
        //xAxis text
        ctx.save();
        ctx.font = "" + textFontSize + "px " + textFontFamily;
        ctx.textAlign = textInclinat ? "right" : "center";
        ctx.translate(xScale(d), svgHeight)
        ctx.rotate((textInclinat ? rotationAngle : 0));
        ctx.translate(-xScale(d), -svgHeight)
        ctx.fillStyle = textColor;
        ctx.fillText(d3.timeFormat("%d %b %X")(d), xScale(d), svgHeight + 62);
        ctx.restore();

    });

    var brush = d3.brushX().extent([[0, 0], [svgWidth, svgHeight]]).on("end", updateChart);

    AfegirZoom(svg, brush);

    var g = svg.append("g");//afegir tooltip

    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("rect").attr("class", "rec").attr("height", svgHeight).attr("fill", "white").attr("opacity", 0.6);
    focus.append("rect").attr("class", "rec2").attr("height", "30px").attr("fill", "white").attr("transform", "translate(-350,-40)").attr("stroke", "blue").attr("stroke-width", 1).attr("rx", 5).attr("ry", 5);
    focus.append("text").attr("class", "t1").attr("x", 15).attr("transform", "translate(-215,-20)").attr("text-anchor", "end").style("fill", "blue").style("font", "14px sans-serif");
    focus.append("text").attr("class", "t2").attr("x", 15).attr("transform", "translate(-210,-20)").attr("text-anchor", "start");

    var bisectDate = d3.bisector(function (d) { return d.x; }).left;

    svg.append("rect") //capa on es mostrara tooltip
        .attr("class", "overlays")
        .attr("height", svgHeight) // alçada de la grafica
        .attr("width", svgWidth) //amplada de la grafica
        .attr("opacity", 0.0)
        .on("mouseover", function () { focus.style("display", null); })
        .on("mouseout", function () { focus.style("display", "none"); })
        .on("mousemove", mousemove)
        .on('mousedown', function (e) {
            const brush_elm = svg.select('.brush > .overlay').node();
            const new_click_event = new MouseEvent('mousedown', {
                pageX: d3.event.pageX,
                pageY: d3.event.pageY,
                clientX: d3.event.clientX,
                clientY: d3.event.clientY,
                layerX: d3.event.layerX,
                layerY: d3.event.layerY,
                bubbles: true,
                cancelable: true,
                view: window
            });
            brush_elm.dispatchEvent(new_click_event);
        });

    svg.on("click", function (data, index) {
        showVariables();
        var x0 = xScale.invert(d3.mouse(this)[0]),
            i = bisectDate(dataset, x0, 1),
            d = dataset[i - 1];
        //Borrem tots els colors de les alarmes anteriors
        var rows = $('#tableVariableInfo').children('tbody').children('tr');
        rows.removeAttr('style');
        var elementToFind = "tr:nth-child(" + (dataset.length - d.contador) + ")";
        $('#tableVariableInfo').find(elementToFind).animate({
            backgroundColor: "#FFFF00"
        }, 1500);
        $('#tableVariableInfo').find(elementToFind).get(0).scrollIntoView();
    })

    function mousemove() {
        //funcio per indicar el context de tooltip
        var x0 = xScale.invert(d3.mouse(this)[0]),
            i = bisectDate(dataset, x0, 1),
            d = dataset[i - 1];
        var pos = (d3.mouse(this)[0] < (svgWidth - 300)) ? 350 : 0
        var timeFormat = d3.timeFormat("%d %b %X")
        var textLength = (d.y).length * 10 + 180
        focus.attr("transform", "translate(" + (xScale(d.x) + pos) + "," + 50 + ")");
        focus.select(".t1").text(function () { return timeFormat(d.x) + " :   " });
        focus.select(".t2").text(function () { return "" + d.y; });
        focus.select(".rec").attr("width", function () { return Math.max(svgWidth * (d.v.getTime() - d.x.getTime()) / totalTime * barWidth, 1) }).attr("transform", "translate(" + (-pos) + "," + (-50) + ")")
        focus.select(".rec2").attr("width", "" + textLength + "px")
    };
    function updateChart() {
        // What are the selected boundaries?
        extent = d3.event.selection

        if (!extent) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit

            $("#divLoading").show();
            document.getElementById("dataInicial").value = iniciDataAnterior._i;
            document.getElementById("dataFinal").value = finalDataAnterior._i;
            var list = document.getElementById('shiftDropDownList');
            var selectedShift = list.options[list.selectedIndex].value;
            $("#partial").load("/Paletitzador/PaletitzadorPartial", { dataInici: iniciDataAnterior._i, dataFinal: finalDataAnterior._i, selectedShift: selectedShift, dataIniciAnterior: minimumDate._i, dataFinalAnterior: maximumDate._i });

        }
        else {
            var initialDate = "";
            var endDate = "";
            var options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'

            };
            var antInitDate = document.getElementById("dataInicial").value;
            var antFinalDate = document.getElementById("dataFinal").value;
            initialDate = initialDate.concat(xScale.invert(extent[0]).toLocaleDateString(options), " ", xScale.invert(extent[0]).toLocaleTimeString(options));
            endDate = endDate.concat(xScale.invert(extent[1]).toLocaleDateString(options), " ", xScale.invert(extent[1]).toLocaleTimeString(options));

            $("#divLoading").show();
            document.getElementById("dataInicial").value = initialDate;
            document.getElementById("dataFinal").value = endDate;
            var list = document.getElementById('shiftDropDownList');
            var selectedShift = list.options[list.selectedIndex].value;
            $("#partial").load("/Paletitzador/PaletitzadorPartial", { dataInici: initialDate, dataFinal: endDate, selectedShift: selectedShift, dataIniciAnterior: antInitDate, dataFinalAnterior: antFinalDate });
        };
    };

};

function barchartWarnings(data, label, div_id, IniciData, FinalData, varTitol, varDescripcio, varColor, machine, view, viewPartial, idDivCheckbox, crearCheckbox, idMaquina) {
    var dataset = data.slice(); //copia de les dates inicials
    var margin = { top: 0, right: 5, bottom: 0, left: 5 }; //marge per posar titols i eixos
    var barWidth = 1.0; //referencia per zoom

    var idleTimeout;

    var textColor = "silver"; // color dels textos
    var textFontFamily = "poppins", // familia de font
        textFontWeight = 100, //grau de negreta
        textFontSize = 11;

    drawBarBarchartWarnings(dataset, label, div_id, margin, varTitol, varDescripcio, varColor, barWidth, IniciData, FinalData, idleTimeout, machine, view, viewPartial, idDivCheckbox, crearCheckbox, idMaquina);
}
/**
 * Donada una llista, crea la variable Visible en tots els elements i l'inicialitza a true.
 *
 * @param {Obj} dataset llista d'objectes.
 */
function SetVisible(dataset) {
    dataset.forEach(function (element) {
        element.Visible = true;
    });
}


function donutchart(div_id, llistaEstats, gruixDonut, variable) { 
    // Gràfic acumulat per percentatge
    if (llistaEstats.length > 0) {
        var element = d3.select(div_id).node(); //mida de <div>
        var width = element.getBoundingClientRect().width; //amplada de la grafica         
        var height = element.getBoundingClientRect().height; // alçada de la grafica
        drawDonutchart(div_id, width, height, llistaEstats, gruixDonut, variable);
    }
}

function drawDonutchart(div_id, width, height, llistaEstats, gruixDonut, variable) {

    var canvas = AfegirCanvasPiechart(div_id, width, height);
    var context = canvas.node().getContext("2d");

    // Aplicar sombra sutil en el canvas
    context.shadowBlur = 15; // Desenfoque de la sombra
    context.shadowOffsetX = 5; // Desplazamiento en X
    context.shadowOffsetY = 5; // Desplazamiento en Y
    context.shadowColor = "rgba(0, 0, 0, 0.3)"; // Color de la sombra

    var pie = CalcularAnglesPiechart();
    var arcs = pie(llistaEstats);

    var widthOffset2 = width / 2;
    var svg = AfegirSvgPiechart(div_id, width, height, widthOffset2);

    if (width > 400) width = 400;

    var radius = Math.min(width / 2.1, height / 2.1);
    var arc = CalcularRadiDonutchart(radius, context, gruixDonut);

    context.translate(widthOffset2, height / 2);
    DibuixarLiniesPiechart(arcs, context, arc);

    var arc2 = CalcularArcSvgDonutChart(radius, arc, gruixDonut);
    var g = AfegirValorsSvgPiechart(svg, arcs);

    // Sombra sutil para el SVG usando un filtro
    svg.selectAll("path")
       .style("filter", "url(#f1)"); // Aplicar el filtro de sombra

    var path = DibuixarSelectorPiechart(arc2, g);
    var focus = AfegirOverlaysPiechart(svg, path, variable);
    
    // Definir el filtro de sombra para los elementos SVG
    svg.append("defs")
       .append("filter")
       .attr("id", "f1")
       .append("feDropShadow")
       .attr("dx", "5")
       .attr("dy", "5")
       .attr("stdDeviation", "3")
       .attr("flood-color", "rgba(0, 0, 0, 0.3)");
}


function CalcularRadiDonutchart(radius, context, gruixDonut) {
    return d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 10 - gruixDonut)
        .context(context);
}

function CalcularArcSvgDonutChart(radius, arc, gruixDonut) {
    return d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 10 - gruixDonut)
}

function piechart(div_id, llistaEstats, variable) { //Gràfic acumulat per percentatge

    if (llistaEstats.length > 0) {
        var element = d3.select(div_id).node();//mida de <div>
        var width = element.getBoundingClientRect().width; //amplada de la grafica         
        var height = element.getBoundingClientRect().height; // alçada de la grafica

        drawPiechart(div_id, width, height, llistaEstats, variable);
    }

};

function CalcularAnglesPiechart() {
    return d3.pie()
        .startAngle(0.5 * Math.PI)
        .endAngle(2.5 * Math.PI)
        .value(function (d) { return d.Percentatge; });//d[variable];
}

function CalcularRadiPiechart(radius, context) {
    return d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0)
        .context(context);
}

function DibuixarLiniesPiechart(arcs, context, arc) {
    arcs.forEach(function (d) {
        context.beginPath();
        arc(d);
        context.fillStyle = d.data.Color;
        context.fill();
        context.strokeStyle = "rgba(0, 0, 0, 0)"; 
        context.lineWidth = 0;
        if (d.value) context.stroke();
    });
}

function CalcularArcSvg(radius, arc) {
    return d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0)
}

function AfegirSvgPiechart(div_id, width, height, widthOffset2) {
    return d3.select(div_id) //creacio de svg
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr("id", "idViewBox" + div_id.replace('#', ''))
        .style("position", "absolute")
        .style("display", "block")
        //.style("margin", "0 auto")
        .style("top", 0)
        .style("left", 15)
        .append('g')
        .attr('transform', 'translate(' + widthOffset2 + ',' + (height / 2) + ')');
}

function AfegirValorsSvgPiechart(svg, arcs) {
    return svg.selectAll("arc") //afegir valors
        .data(arcs)
        .enter().append("g")
        .attr("class", "arc")
}

function DibuixarSelectorPiechart(arc2, g) {
    return g.append("path") // dibuixar selector
        .attr("d", arc2)
        .style("fill", "white")
        .attr("opacity", 0)
        .on("mouseenter", function (d) {
            d3.select(this)
                .attr('opacity', 0.6)
        })
        .on("mouseleave", function (d) {
            d3.select(this).transition()
                .attr("stroke", "none")
                .attr('opacity', 0);
        });
}

function AfegirOverlaysPiechart(svg, path, variable) {
    var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");
    focus.append("rect").attr("class", "rec").attr("height", "50px").attr("fill", "white").attr("stroke-width", 1).attr("rx", 5).attr("ry", 5);
    focus.append("text").attr("class", "t1").attr("x", "5px").attr("dy", "20px").attr("text-anchor", "left").style("font", "16px poppins");
    focus.append("text").attr("class", "t2").attr("x", "5px").attr("dy", "40px").attr("text-anchor", "left").style("font", "16px poppins");
    path
        .on("mouseover", function (d) {
            focus.style("display", null)
        })
        .on("mousemove", function (d) {
            var labelWidth = 80;//d.data[variable].length * 10 + 10
            var labelVariable = 80;
            var labelPercentatge = 80;

            if (d.data[variable]) labelVariable = d.data[variable].toString().length * 10 + 10;
            if (d.data.Percentatge) labelPercentatge = (Math.round(d.data.Percentatge * 100) / 100).toString().length * 10 + 50;

            labelWidth = Math.max(labelPercentatge, labelVariable);

            dretaEsquerra = d3.mouse(this)[0] < 0 ? 5 : (-labelWidth - 5);
            focus.style("display", null);
            focus.select(".rec").attr("transform", "translate(" + (d3.mouse(this)[0] + dretaEsquerra) + "," + (d3.mouse(this)[1] - 25) + " )  ").attr("stroke", d.data.Color).attr("width", labelWidth);
            focus.select(".t1").attr("transform", "translate(" + (d3.mouse(this)[0] + dretaEsquerra) + "," + (d3.mouse(this)[1] - 25) + " )  ").text(function () { return d3.format(".2%")(d.data.Percentatge / 100) }).style("fill", "#000000");//Text de color negre
            focus.select(".t2").attr("transform", "translate(" + (d3.mouse(this)[0] + dretaEsquerra) + "," + (d3.mouse(this)[1] - 25) + " )  ").text(function () { return d.data[variable] }).style("fill", "#000000");//Text de color negre
        })
        .on("mouseout", function (d) {
            focus.style("display", "none")
        });
}

function drawPiechart(div_id, width, height, llistaEstats, variable) {
    var canvas = AfegirCanvasPiechart(div_id, width, height);

    var context = canvas.node().getContext("2d");

    var pie = CalcularAnglesPiechart();

    var arcs = pie(llistaEstats);

    var widthOffset2 = width / 2;

    var radius;

    radius = Math.min(width / 2.1, height / 2.1);

    var arc = CalcularRadiPiechart(radius, context);

    context.translate(widthOffset2, height / 2);

    // Configurar las propiedades de la sombra para darle una apariencia de 3D
    context.shadowColor = "rgba(0, 0, 0, 0.5)"; // Color de la sombra (negro con algo de transparencia)
    context.shadowBlur = 10;                    // Cuánta difuminación tendrá la sombra
    context.shadowOffsetX = 5;                  // Desplazamiento de la sombra en el eje X
    context.shadowOffsetY = 5;                  // Desplazamiento de la sombra en el eje Y

    // Dibujar los arcos del gráfico de pastel
    DibuixarLiniesPiechart(arcs, context, arc);

    var arc2 = CalcularArcSvg(radius, arc);

    var svg = AfegirSvgPiechart(div_id, width, height, widthOffset2);

    var g = AfegirValorsSvgPiechart(svg, arcs);

    var path = DibuixarSelectorPiechart(arc2, g);

    var focus = AfegirOverlaysPiechart(svg, path, variable);
}


function AfegirCanvasPiechart(div_id, width, height) {

    return d3.select(div_id).append("canvas")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "idCanvas" + div_id.replace('#', ''));
}


function linechart(titol, data, action, labelLlarg, mitjanaPartial, mitjanaTotal, div_id, variable, IniciData, FinalData, barData, barColor) {

    var dataset = data.slice();

    if (data.length == 0) return;

    var maxValue = Math.max.apply(Math, dataset.map(function (o) { return o[variable]; })); //el valor maxim del variable de l'eix Y

    var domainTime = ObtenirDominiTotal(IniciData, FinalData);

    var dataset2 = mitjanaDates(dataset, variable, domainTime);

    var dataset3 = mitjanaTotesDates(dataset, variable);

    var margin = { top: 10, right: 10, bottom: 120, left: 8 + 8 * Math.max(Number(maxValue.toPrecision(2)), 10).toString().length };

    var element = d3.select(div_id).node();

    var textColor = "silver"; // color dels textos
    var textFontFamily = "poppins", // familia de font
        textFontWeight = 100, //grau de negreta
        textFontSize = 12; //mida de lletres del text

    var lineColor = "#F08080",
        meanLineColor = "#F0F080",
        totalMeanLineColor = "blue";

    drawLineLinechart(dataset, dataset2, dataset3, action, div_id, element, margin, variable, lineColor, meanLineColor, totalMeanLineColor, mitjanaPartial, mitjanaTotal, dataset3, textColor, textFontFamily, textFontWeight, textFontSize, labelLlarg, domainTime, barData, barColor)

};

function drawLineLinechart(dataset, dataset2, dataset3, action, div_id, element, margin, variable, lineColor, meanLineColor, totalMeanLineColor, mitjanaPartial, mitjanaTotal, dataset3, textColor, textFontFamily, textFontWeight, textFontSize, labelLlarg, domainTime, barData, barColor) {

    var svgWidth = element.getBoundingClientRect().width - margin.left - margin.right - 60; //mida de grafica

    //var svgHeight = element.getBoundingClientRect().height - margin.top - margin.bottom;
    var svgHeight = svgWidth / 3;
    var tempsAnimacio = action ? 3500 : 0;
    //var brush = d3.brushX().extent([[0, 0], [svgWidth, svgHeight]]).on("end", updateChart); desactivar zoom

    const svg = AfegirSvgLinechart(div_id, svgWidth, margin, svgHeight);

    //svg.append("g").attr("class", "brush").call(brush) comentat per desactivar zoom

    var xScale = ObtenirRangEixXLinechart(svgWidth, domainTime);

    var xScale2 = ObtenirRangEixX2Linechart(xScale, svgWidth);

    var xAxis = d3.axisBottom(xScale2).ticks(svgWidth / 100).tickFormat(d3.timeFormat("%d/%m/%y %H:%M"));

    var yScale = ObtenirRangEixYLinechart(dataset, svgHeight, variable);

    var yAxis = d3.axisRight(yScale).ticks().tickSize(svgWidth);

    var line = EstablirEixXY(variable, xScale, yScale);

    var totalTime = ObtenirTempsTotal(domainTime);

    svg.selectAll(".bar") //afegir linia
        .data(barData) // 10. Binds data to the line 
        .enter().append("rect")
        .attr("class", "bar")
        .attr("id", "d4" + div_id.replace('#', ''))
        .style("opacity", 0)
        .attr("x", function (d) { return xScale(d.Inici); })
        .attr("width", function (d) { return svgWidth * durationToMilli(d.Duracio) / totalTime })
        .attr("y", 0)
        .attr("height", svgHeight)
        //.attr("opacity", 0.1)
        .style("stroke", function (d) { return d[barColor]; })
        .style("fill", function (d) { return d[barColor]; });

    document.getElementById(div_id.replace('#', '') + "Checkbox4").checked = false;
    AfegirLiniaLinechart(svg, dataset, line, lineColor, div_id, tempsAnimacio);

    if (mitjanaPartial) { //dibuixa linia mitjana per cada 10min
        AfegirMitjanaParcial(dataset2, meanLineColor, div_id, line, svg);
        document.getElementById(div_id.replace('#', '') + "Checkbox2").checked = false;
    }
    else {
        document.getElementById(div_id.replace('#', '') + "Checkbox2").checked = false;
        document.getElementById(div_id.replace('#', '') + "Checkbox2").disabled = true;
    }
    if (mitjanaTotal) { //dibuixa linia mitjana de total de punts
        AfegirMitjanaTotal(svg, dataset3, line, div_id, totalMeanLineColor);
        document.getElementById(div_id.replace('#', '') + "Checkbox3").checked = false;
    }
    else {
        document.getElementById(div_id.replace('#', '') + "Checkbox3").checked = false;
        document.getElementById(div_id.replace('#', '') + "Checkbox3").disabled = true;
    }

    AfegirLiniaEixXLinechart(svg, div_id, svgHeight, xAxis, textColor, textFontFamily, textFontWeight, textFontSize);

    AfegirLiniaEixYLinechart(svg, yAxis, textColor, textFontFamily, textFontWeight, textFontSize);

    //AfegirTitolLinechart(svg, textColor, titol, svgWidth, margin, textFontFamily, textFontWeight, textFontSize);

    var g = svg.append("g");

    var focus = CrearTooltipLinechart(g, lineColor, meanLineColor, totalMeanLineColor);

    var bisectDate = d3.bisector(function (d) { return d.Final; }).left;

    AfegirOverlayLinechart(div_id, svg, svgHeight, svgWidth, labelLlarg, lineColor, variable, meanLineColor, totalMeanLineColor, focus, bisectDate, xScale, dataset, yScale, mitjanaPartial, mitjanaTotal, dataset2, dataset3);

    function updateChart() {
        // What are the selected boundaries?
        extent = d3.event.selection

        if (!extent) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
            $("#divLoading").show();
            document.getElementById("dataInicial").value = iniciDataAnterior._i;
            document.getElementById("dataFinal").value = finalDataAnterior._i;
            var list = document.getElementById('shiftDropDownList');
            var selectedShift = list.options[list.selectedIndex].value;
            $("#partial").load("/Paletitzador/PaletitzadorPartial", { dataInici: iniciDataAnterior._i, dataFinal: finalDataAnterior._i, selectedShift: selectedShift, dataIniciAnterior: minimumDate._i, dataFinalAnterior: maximumDate._i, machine: machine });
        }
        else {
            var initialDate = "";
            var endDate = "";
            var options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            var antInitDate = document.getElementById("dataInicial").value;
            var antFinalDate = document.getElementById("dataFinal").value;
            initialDate = initialDate.concat(xScale.invert(extent[0]).toLocaleDateString(options), " ", xScale.invert(extent[0]).toLocaleTimeString(options));
            endDate = endDate.concat(xScale.invert(extent[1]).toLocaleDateString(options), " ", xScale.invert(extent[1]).toLocaleTimeString(options));
            $("#divLoading").show();
            document.getElementById("dataInicial").value = initialDate;
            document.getElementById("dataFinal").value = endDate;
            var list = document.getElementById('shiftDropDownList');
            var selectedShift = list.options[list.selectedIndex].value;
            $("#partial").load("/Paletitzador/PaletitzadorPartial", { dataInici: initialDate, dataFinal: endDate, selectedShift: selectedShift, dataIniciAnterior: antInitDate, dataFinalAnterior: antFinalDate, machine: machine });
        };
    }
    function resizeBarchart() {
        newWidth = $(div_id).width();
        newHeight = $(div_id).height();

        svg.select(".xaxis").selectAll(".tick").selectAll("text").attr("font-size", 12 * (svgWidth / newWidth) * 0.9);
        svg.select(".yaxis").selectAll(".tick").selectAll("text").attr("font-size", 12 * (svgWidth / newWidth) * 0.9);
        svg.select(".titol").attr("font-size", 24 * (svgWidth / newWidth) * 0.9);
    }

    $(window).resize(resizeBarchart);
}


function linechartBarras(titol, data, action, labelLlarg, mitjanaPartial, mitjanaTotal, div_id, variable, IniciData, FinalData, barData, barColor) {

    var dataset = data.slice();

    if (data.length == 0) return;

    var maxValue = Math.max.apply(Math, dataset.map(function (o) { return o[variable]; })); // el valor máximo del variable de l'eix Y

    var domainTime = ObtenirDominiTotal(IniciData, FinalData);

    var dataset2 = mitjanaDates(dataset, variable, domainTime);

    var dataset3 = mitjanaTotesDates(dataset, variable);

    var margin = { top: 10, right: 10, bottom: 120, left: 10 + 8 * Math.max(Number(maxValue.toPrecision(2)), 10).toString().length }; // Por defecto en 10

    var element = d3.select(div_id).node();

    var textColor = "silver"; // color dels textos
    var textFontFamily = "poppins", // familia de font
        textFontWeight = 100, // grau de negreta
        textFontSize = 12; // mida de lletres del text

    var barColor = "#2471a3";

    drawBarChartBarras(dataset, action, div_id, element, margin, variable, barColor, textColor, textFontFamily, textFontWeight, textFontSize, labelLlarg, domainTime);
}

/*
function drawBarChartBarras(dataset, action, div_id, element, margin, variable, barColor, textColor, textFontFamily, textFontWeight, textFontSize, labelLlarg, domainTime) {
    var svgWidth = element.getBoundingClientRect().width - margin.left - margin.right - 40; // mida de grafica
    var svgHeight = svgWidth / 3;
    var tempsAnimacio = action ? 3500 : 0;

    const svg = AfegirSvgLinechart(div_id, svgWidth, margin, svgHeight);

    var xScale = ObtenirRangEixXLinechart(svgWidth, domainTime);
    var xScale2 = ObtenirRangEixX2Linechart(xScale, svgWidth);

    var xAxis = d3.axisBottom(xScale2).ticks(svgWidth / 100).tickFormat(d3.timeFormat("%d/%m/%y %H:%M"));

    var yScale = ObtenirRangEixYLinechart(dataset, svgHeight, variable);
    var yAxis = d3.axisRight(yScale).ticks().tickSize(svgWidth);

    // Generar las barras del gráfico
    svg.selectAll(".bar")
        .data(dataset)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.Final); })
        .attr("width", Math.max(svgWidth / dataset.length - 2, 1)) // Asegurar que el ancho de cada barra sea positivo
        .attr("y", function (d) { 
            // Si el valor es 0, poner la barra en la base del eje Y (altura completa)
            return d[variable] === 0 ? svgHeight : yScale(d[variable]); 
        })
        .attr("height", function (d) { 
            // Si el valor es 0, la altura debe ser cero, de lo contrario calcular normalmente
            return d[variable] === 0 ? 0 : svgHeight - yScale(d[variable]); 
        })
        .attr("fill", barColor)
        .call(transition);

    AfegirLiniaEixXLinechart(svg, div_id, svgHeight, xAxis, textColor, textFontFamily, textFontWeight, textFontSize);
    AfegirLiniaEixYLinechart(svg, yAxis, textColor, textFontFamily, textFontWeight, textFontSize);

    var g = svg.append("g");
    var focus = CrearTooltipLinechart(g, barColor);
    var bisectDate = d3.bisector(function (d) { return d.Final; }).left;

    AfegirOverlayLinechart(div_id, svg, svgHeight, svgWidth, labelLlarg, barColor, variable, "", "", focus, bisectDate, xScale, dataset, yScale, false, false, [], []);
}
*/

function calcularValorMedioPorHora(dataset, variable) {
    // Crear un mapa manualmente para agrupar datos por hora
    const datosAgrupados = {};

    dataset.forEach(d => {
        // Redondear la fecha al inicio de la hora
        const hora = new Date(d.Final);
        hora.setMinutes(0, 0, 0); // Ajustar al inicio de la hora

        const clave = hora.getTime(); // Usar tiempo en milisegundos como clave

        if (!datosAgrupados[clave]) {
            datosAgrupados[clave] = [];
        }
        datosAgrupados[clave].push(d[variable]);
    });

    // Calcular el promedio para cada grupo
    const datosPromedio = Object.entries(datosAgrupados).map(([hora, valores]) => {
        const promedio = valores.reduce((sum, val) => sum + val, 0) / valores.length;
        return { Final: new Date(parseInt(hora)), [variable]: promedio };
    });

    return datosPromedio;
}
function drawBarChartBarras(dataset, action, div_id, element, margin, variable, barColor, textColor, textFontFamily, textFontWeight, textFontSize, labelLlarg, domainTime) {
    // Procesar el dataset para obtener valor medio por hora
    const datasetPorHora = calcularValorMedioPorHora(dataset, variable);

    var svgWidth = element.getBoundingClientRect().width - margin.left - margin.right - 40; // Anchura del gráfico
    var svgHeight = svgWidth / 3;
    var tempsAnimacio = action ? 3500 : 0;

    // Escala X con margen adicional
    var xScale = d3.scaleTime()
        .domain(domainTime)
        .range([margin.left + 10, svgWidth - margin.right]);

    // Crear SVG
    const svg = AfegirSvgLinechart(div_id, svgWidth, margin, svgHeight);

    // Configurar ejes
    var xAxis = d3.axisBottom(xScale).ticks(svgWidth / 100).tickFormat(d3.timeFormat("%d/%m/%y %H:%M"));
    var yScale = ObtenirRangEixYLinechart(datasetPorHora, svgHeight, variable);
    var yAxis = d3.axisRight(yScale).ticks().tickSize(svgWidth);

    // Escala de colores (azul oscuro degradado)
    const colorScale = d3.scaleLinear()
        .domain([0, datasetPorHora.length - 1]) // Índices de las barras
        .range(["#0075ab", "#3d88ab"]); // Rango de colores de azul oscuro

    // Dibujar ejes primero
    AfegirLiniaEixXLinechart(svg, div_id, svgHeight, xAxis, textColor, textFontFamily, textFontWeight, textFontSize);
    AfegirLiniaEixYLinechart(svg, yAxis, textColor, textFontFamily, textFontWeight, textFontSize);

    // Generar barras con colores únicos
    const barsGroup = svg.append("g").attr("class", "bars-group");
    barsGroup.selectAll(".bar")
        .data(datasetPorHora)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Final) - calcularAnchoBarra(datasetPorHora, svgWidth, margin) / 2)
        .attr("width", calcularAnchoBarra(datasetPorHora, svgWidth, margin))
        .attr("y", d => d[variable] === 0 ? svgHeight : yScale(d[variable]))
        .attr("height", d => d[variable] === 0 ? 0 : svgHeight - yScale(d[variable]))
        .attr("fill", (d, i) => colorScale(i)); // Color único para cada barra

    // Crear Tooltip y overlay
    var g = svg.append("g");
    var focus = CrearTooltipLinechart(g, barColor);
    var bisectDate = d3.bisector(function (d) { return d.Final; }).left;

    AfegirOverlayLinechart(div_id, svg, svgHeight, svgWidth, labelLlarg, barColor, variable, "", "", focus, bisectDate, xScale, datasetPorHora, yScale, false, false, [], []);

    // Reordenar las barras al frente (opcional, en caso de que ya existan elementos adicionales)
    svg.selectAll(".bar").raise();
}


// Función para calcular el ancho de las barras
function calcularAnchoBarra(dataset, svgWidth, margin) {
    const totalBarras = dataset.length;
    const espacioDisponible = svgWidth - margin.left - margin.right;
    const separacionMinima = 15; // Espacio mínimo entre barras

    return Math.max(
        Math.min((espacioDisponible - separacionMinima * (totalBarras - 1)) / totalBarras, 50), // Máximo 50px
        5 // Mínimo 5px
    );
}
/*
function drawBarChartBarrasDif(dataset, action, div_id, element, margin, variable, barColor, textColor, textFontFamily, textFontWeight, textFontSize, labelLlarg, domainTime) {
    var svgWidth = element.getBoundingClientRect().width - margin.left - margin.right - 40; // mida de grafica
    var svgHeight = svgWidth / 3;
    var tempsAnimacio = action ? 1000 : 0; // Reducido el tiempo para cada barra, ya que cada barra tendrá su propio retardo

    const svg = AfegirSvgLinechart(div_id, svgWidth, margin, svgHeight);

    var xScale = d3.scaleBand()
        .domain(dataset.map(function(d) { return d.date; }))
        .range([0, svgWidth])
        .padding(0.1);

    var xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d/%m/%y"));

    // Ajustar el yScale para empezar siempre desde cero y cubrir tanto valores positivos como negativos
    var yScale = d3.scaleLinear()
        .domain([Math.min(0, d3.min(dataset, d => d[variable])), d3.max(dataset, d => d[variable])])
        .range([svgHeight, 0]);

    var yAxis = d3.axisRight(yScale)
        .ticks()
        .tickFormat(d3.format("d")) // Mostrar solo números enteros
        .tickSize(svgWidth);

    // Añadir primero las líneas de los ejes para que queden "detrás" de las barras
    AfegirLiniaEixXLinechart(svg, div_id, svgHeight, xAxis, textColor, textFontFamily, textFontWeight, textFontSize);
    AfegirLiniaEixYLinechart(svg, yAxis, textColor, textFontFamily, textFontWeight, textFontSize);

    // Crear una escala de colores para generar un degradado de colores más oscuros
    var colorScale = d3.scaleLinear()
        .domain([0, dataset.length - 1])
        .range([barColor, d3.color(barColor).darker(2)]); // Generar un degradado hasta un tono más oscuro

    // Generar las barras del gráfico después de añadir los ejes
    svg.selectAll(".bar")
        .data(dataset)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.date); })
        .attr("width", xScale.bandwidth())
        .attr("y", yScale(0)) // Comenzar desde el valor 0 en Y
        .attr("height", 0) // Comenzar con altura 0
        .attr("fill", function(d, i) { return colorScale(i); }); // Aplicar el color de la escala

    // Añadir Intersection Observer para activar la animación cuando el elemento sea visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                svg.selectAll(".bar")
                    .transition() // Añadir transición para la animación
                    .duration(tempsAnimacio) // Duración de la animación para cada barra
                    .delay(function(d, i) { return i * 500; }) // Retardo secuencial para cada barra (500ms entre cada una)
                    .ease(d3.easeCubicOut) // Efecto de la animación
                    .attr("y", function (d) { return d[variable] >= 0 ? yScale(d[variable]) : yScale(0); })
                    .attr("height", function (d) { return Math.abs(yScale(d[variable]) - yScale(0)); });

                // Agregar etiquetas de texto con los valores sobre cada barra
                svg.selectAll(".label")
                    .data(dataset)
                    .enter().append("text")
                    .attr("class", "label")
                    .attr("x", function(d) { return xScale(d.date) + xScale.bandwidth() / 2; }) // Colocar en el centro de la barra
                    .attr("y", function(d) { return yScale(0) - 10; }) // Comenzar con las etiquetas en la posición 0
                    .attr("text-anchor", "middle")
                    .attr("fill", textColor)
                    .attr("font-family", "Arial") // Cambiar la familia de la fuente a Arial Black
                    .attr("font-weight", "bold") // Asegurar el grosor del texto
                    .attr("font-size", textFontSize + 2) // Aumentar el tamaño del texto para mayor visibilidad
                    .text(function(d) { return Math.round(d[variable]); }) // Mostrar como número entero
                    .transition() // Añadir transición para las etiquetas
                    .duration(tempsAnimacio) // Duración de la animación
                    .delay(function(d, i) { return i * 500; }) // Retardo secuencial para cada etiqueta
                    .ease(d3.easeCubicOut) // Efecto de la animación
                    .attr("y", function(d) { return Math.min(yScale(d[variable]) - 10, svgHeight - 20); }); // Ajustar la posición final de la etiqueta

                // Dejar de observar después de que la animación se haya activado
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(element); // Observar el elemento SVG del gráfico

    var g = svg.append("g");
    var focus = CrearTooltipLinechart(g, barColor);
    var bisectDate = d3.bisector(function (d) { return d.date; }).left;

    AfegirOverlayLinechartDif(div_id, svg, svgHeight, svgWidth, labelLlarg, barColor, variable, "", "", focus, bisectDate, xScale, dataset, yScale, false, false, [], []);
}
*/

function drawBarChartBarrasDif(dataset, action, div_id, element, margin, variable, barColor, textColor, textFontFamily, textFontWeight, textFontSize, labelLlarg, domainTime) {
    var svgWidth = element.getBoundingClientRect().width - margin.left - margin.right - 40;
    var svgHeight = svgWidth / 3;
    var tempsAnimacio = action ? 1000 : 0;

    const svg = AfegirSvgLinechart(div_id, svgWidth, margin, svgHeight);

    var xScale = d3.scaleBand()
        .domain(dataset.map(function (d) { return d.date; }))
        .range([0, svgWidth])
        .padding(0.1);

    var xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d/%m/%y"));

    var yScale = d3.scaleLinear()
        .domain([Math.min(0, d3.min(dataset, d => d[variable])), d3.max(dataset, d => d[variable])])
        .range([svgHeight, 0]);

    var yAxis = d3.axisRight(yScale).ticks().tickFormat(d3.format("d")).tickSize(svgWidth);

    AfegirLiniaEixXLinechart(svg, div_id, svgHeight, xAxis, textColor, textFontFamily, textFontWeight, textFontSize);
    AfegirLiniaEixYLinechart(svg, yAxis, textColor, textFontFamily, textFontWeight, textFontSize);

    // Escala de colores degradado
    var colorScale = d3.scaleLinear()
        .domain([0, dataset.length - 1])
        .range([barColor, d3.color(barColor).darker(2)]);

    // Dibujar barras
    svg.selectAll(".bar")
        .data(dataset)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.date))
        .attr("width", xScale.bandwidth())
        .attr("y", yScale(0))
        .attr("height", 0)
        .attr("fill", (d, i) => colorScale(i));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                svg.selectAll(".bar")
                    .transition()
                    .duration(tempsAnimacio)
                    .delay((d, i) => i * 500)
                    .ease(d3.easeCubicOut)
                    .attr("y", d => d[variable] >= 0 ? yScale(d[variable]) : yScale(0))
                    .attr("height", d => Math.abs(yScale(d[variable]) - yScale(0)));

                svg.selectAll(".label")
                    .data(dataset)
                    .enter().append("text")
                    .attr("class", "label")
                    .attr("x", d => xScale(d.date) + xScale.bandwidth() / 2)
                    .attr("y", yScale(0) - 10)
                    .attr("text-anchor", "middle")
                    .attr("fill", textColor)
                    .attr("font-family", textFontFamily)
                    .attr("font-weight", "bold")
                    .attr("font-size", textFontSize + 2)
                    .text(d => Math.round(d[variable]))
                    .transition()
                    .duration(tempsAnimacio)
                    .delay((d, i) => i * 500)
                    .ease(d3.easeCubicOut)
                    .attr("y", d => Math.min(yScale(d[variable]) - 10, svgHeight - 20));

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    observer.observe(element);

    // Calcular la media total
    var meanValue = d3.mean(dataset, d => d[variable]);

    // Dibujar línea horizontal de la media global (ya existente)
    svg.append("line")
        .attr("class", "mean-line")
        .attr("x1", 0)
        .attr("x2", svgWidth)
        .attr("y1", yScale(meanValue))
        .attr("y2", yScale(meanValue))
        .attr("stroke", "gray")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5");

    svg.append("text")
        .attr("x", svgWidth - 10)
        .attr("y", yScale(meanValue) - 5)
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("fill", "white")
        .text(`${meanValue.toFixed(2)}`);

    // ---------------------------------------------------------------------------------
    // Calcular la media acumulada a lo largo del dataset
    var cumulativeSum = 0;
    var cumulativeMeans = dataset.map((d, i) => {
        cumulativeSum += d[variable];
        return {
            date: d.date,
            meanValue: cumulativeSum / (i + 1)
        };
    });

    // Línea para la media acumulada
    var lineCumulative = d3.line()
        .x(d => xScale(d.date) + xScale.bandwidth() / 2)
        .y(d => yScale(d.meanValue));

    // Dibujar la línea de la media acumulada
    svg.append("path")
        .datum(cumulativeMeans)
        .attr("fill", "none")
        .attr("stroke", "#e74c3c")
        .attr("stroke-width", 2)
        .attr("d", lineCumulative)
        .attr("stroke-dasharray", function () {
            const length = this.getTotalLength();
            return length + " " + length;
        })
        .attr("stroke-dashoffset", function () { return this.getTotalLength(); })
        .transition()
        .duration(tempsAnimacio * dataset.length)
        .ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);

    // Dibujar puntos sobre la línea de la media acumulada
    svg.selectAll(".dot-cumulative")
        .data(cumulativeMeans)
        .enter().append("circle")
        .attr("class", "dot-cumulative")
        .attr("cx", d => xScale(d.date) + xScale.bandwidth() / 2)
        .attr("cy", yScale(meanValue)) // empezar desde la línea de media global, por ejemplo
        .attr("r", 0) // radio inicial
        .transition()
        .duration(tempsAnimacio)
        .delay((d, i) => i * 500)
        .attr("cy", d => yScale(d.meanValue))
        .attr("r", 4)
        .attr("fill", "#e74c3c");

}


function linechartBarrasDif(titol, data, action, labelLlarg, mitjanaPartial, mitjanaTotal, div_id, variable, IniciData, FinalData, barData, barColor) {

    if (data.length == 0) return;

    // Agrupar datos por día y calcular el valor diario desde cero
    var dataset = agruparDatosPorDia(data, variable);

    // Calcular diferencias diarias
    var diffDataset = calcularDiferenciasDiarias(dataset, variable);

    // Añadir la primera barra como valor original
    diffDataset.unshift(dataset[0]);

    var maxValue = Math.max.apply(Math, diffDataset.map(function (o) { return Math.abs(o[variable]); })); // el valor máximo de la diferencia del variable de l'eix Y

    var domainTime = ObtenirDominiTotal(IniciData, FinalData);

    var margin = { top: 30, right: 10, bottom: 120, left: 8 + 8 * Math.max(Number(maxValue.toPrecision(2)), 10).toString().length }; // Aumentar margen superior

    var element = d3.select(div_id).node();

    var textColor = "white"; // color dels textos
    var textFontFamily = "poppins", // familia de font
        textFontWeight = 100, // grau de negreta
        textFontSize = 12; // mida de lletres del text

    var barColor = "#73b1e3";

    drawBarChartBarrasDif(diffDataset, action, div_id, element, margin, variable, barColor, textColor, textFontFamily, textFontWeight, textFontSize, labelLlarg, domainTime);
}

function calcularDiferenciasDiarias(dataset, variable) {
    let diffDataset = [];
    for (let i = 1; i < dataset.length; i++) {
        let diferencia = dataset[i][variable] - dataset[i - 1][variable];
        diffDataset.push({
            date: dataset[i].date,
            [variable]: diferencia
        });
    }
    return diffDataset;
}





function agruparDatosPorDia(data, variable) {
    var groupedData = d3.nest()
        .key(function (d) {
            return d3.timeFormat("%Y-%m-%d")(d.Final); // Agrupar por fecha (a nivel de día)
        })
        .rollup(function (leaves) {
            return {
                date: new Date(leaves[0].Final),
                [variable]: d3.max(leaves, function (d) { return d[variable]; })
            };
        })
        .entries(data)
        .map(function (d) { return d.value; });

    return groupedData;
}

// Nota: Asegúrate de tener las funciones AfegirSvgLinechart, AfegirLiniaEixXLinechart, AfegirLiniaEixYLinechart, CrearTooltipLinechart y transition definidas adecuadamente.


function AfegirOverlayLinechartDif(div_id, svg, svgHeight, svgWidth, labelLlarg, barColor, variable, ...rest) {
    var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("opacity", 0)
        .on("mousemove", mousemove);

    function mousemove(event) {
        // Obtener la posición del mouse en relación con el SVG
        var mouseX = d3.pointer(event)[0];

        // Encontrar el índice más cercano al mouse usando el dominio de xScale
        var domain = xScale.domain();
        var bandwidth = xScale.bandwidth();

        // Encontrar la fecha más cercana utilizando la posición del mouse y el ancho de banda de la escala
        var index = Math.floor(mouseX / (svgWidth / domain.length));
        index = Math.max(0, Math.min(index, domain.length - 1));

        var d = dataset[index];

        // Actualizar el tooltip o foco con la información correspondiente
        // Por ejemplo:
        focus.attr("transform", "translate(" + xScale(d.date) + "," + yScale(d[variable]) + ")");
        // Aquí puedes actualizar el tooltip o los elementos visuales según la información de d.
    }
}

function transition(path) { // función para realizar la animación
    path.transition()
        .duration(3500)
        .attrTween("stroke-dasharray", tweenDash);
}

function tweenDash() { // función para realizar la animación
    var l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) { return i(t); };
}


function CrearTooltipLinechart(g, lineColor, meanLineColor, totalMeanLineColor) {

    var focus = g.append("g")//crear tooltip
        .attr("class", "focus")
        .style("display", "none");

    focus.append("circle").attr("fill", lineColor).attr("id", "circlePointer");
    focus.append("rect").attr("class", "rec1").attr("fill", "white").attr("stroke", lineColor).attr("stroke-width", 1).attr("rx", 5).attr("ry", 5);
    focus.append("text").attr("class", "t1");//.style("font", "14px poppins")
    focus.append("text").attr("class", "t2").attr("text-anchor", "start");
    focus.append("text").attr("class", "t_mitjana").attr("text-anchor", "start");
    focus.append("text").attr("class", "t_mitjanaTotal").attr("text-anchor", "start");
    focus.append("circle").attr("r", 5).attr("fill", lineColor).attr("id", "circle1");
    focus.append("circle").attr("r", 5).attr("fill", meanLineColor).attr("id", "circle2");
    focus.append("circle").attr("r", 5).attr("fill", totalMeanLineColor).attr("id", "circle3");

    return focus;
}

function AfegirTitolLinechart(svg, textColor, titol, svgWidth, margin, textFontFamily, textFontWeight, textFontSize) {

    svg.append("text") //titol
        .attr("class", "titol")
        //.style("fill", textColor)
        //.style("font-size", "24px")
        .attr("transform", "translate(" + svgWidth / 2 + "," + -margin.top / 2 + ")")
        .text(titol).attr("text-anchor", "middle").attr("fill", textColor).attr("font-family", textFontFamily).attr("font-weight", textFontWeight).attr("font-size", textFontSize * 2);
}

function AfegirLiniaEixXLinechart(svg, div_id, svgHeight, xAxis, textColor, textFontFamily, textFontWeight, textFontSize) {
    svg.append("g") //linia de eix  X
        .attr("class", "xaxis")
        .attr("id", "xAxis" + div_id.replace('#', ''))
        .attr("transform", "translate(0," + svgHeight + ")")
        .call(customXAxis).selectAll("text");

    function customXAxis(g) {
        g.call(xAxis).selectAll("text")
            .attr("transform", "rotate(-30)").attr("text-anchor", "end").attr("fill", textColor).attr("font-family", textFontFamily).attr("font-weight", textFontWeight).attr("font-size", textFontSize);
        g.select(".domain").remove();
        g.selectAll(".tick:not(:first-of-type) line");
    }
}

function AfegirLiniaEixYLinechart(svg, yAxis, textColor, textFontFamily, textFontWeight, textFontSize) {

    svg.append("g") //linia de eix  Y
        .attr("class", "yaxis")
        .call(customYAxis);

    function customYAxis(g) {
        g.call(yAxis);
        g.select(".domain").remove();
        g.selectAll(".tick line").attr("stroke", "gray").attr("opacity", 0.9);
        g.selectAll(".tick text").attr("x", -5).attr("dy", 4).attr("text-anchor", "end")
            .attr("fill", textColor).attr("font-family", textFontFamily).attr("font-weight", textFontWeight).attr("font-size", textFontSize);
    }
}

function AfegirMitjanaTotal(svg, dataset3, line, div_id, totalMeanLineColor) {

    svg.append("path") //afegir linia
        .datum(dataset3) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line)
        .attr("id", "d3" + div_id.replace('#', ''))
        .style("opacity", 0)
        .style("stroke", totalMeanLineColor)
        .style("stroke-width", 4)
        .style("fill", "none").call(transition)
}

function AfegirMitjanaParcial(dataset2, meanLineColor, div_id, line, svg) {

    svg.append("path") //afegir linia
        .datum(dataset2) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line)
        .attr("id", "d2" + div_id.replace('#', ''))
        .style("opacity", 0)
        .style("stroke", meanLineColor)
        .style("stroke-width", 3)
        .style("fill", "none").call(transition)
}

function AfegirLiniaLinechart(svg, dataset, line, lineColor, div_id, tempsAnimacio) {

    svg.append("path") //afegir linia
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line)
        .attr("id", "d1" + div_id.replace('#', ''))
        .style("opacity", 1)
        .style("stroke", lineColor)
        .style("stroke-width", 2)
        .style("fill", "none").call(transition)
}

function transition(path, tempsAnimacio) { //funcio per fer animacio
    path.transition()
        .duration(tempsAnimacio)
        .attrTween("stroke-dasharray", tweenDash);
}

function tweenDash() { //funcio per fer animacio
    var l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) { return i(t); };
}

function EstablirEixXY(variable, xScale, yScale) {
    return d3.line()
        .x(function (d) { return xScale(d.Final); }) // set the x values for the line generator
        .y(function (d) { return yScale(d[variable]); })
        .curve(d3.curveMonotoneX);
}

function ObtenirRangEixXLinechart(svgWidth, domainTime) {

    return d3.scaleTime()
        .domain(domainTime)
        .range([svgWidth * 0, svgWidth]);
}

function ObtenirRangEixX2Linechart(xScale, svgWidth) {
    return d3.scaleTime()
        .domain([xScale.invert(svgWidth * 0.05), xScale.invert(svgWidth * 0.99)])
        .range([svgWidth * 0.05, svgWidth * 0.99]);
}

function ObtenirRangEixYLinechart(dataset, svgHeight, variable) {

    var max = Math.max.apply(Math, dataset.map(function (o) { return o[variable]; }));
    var min = Math.min.apply(Math, dataset.map(function (o) { return o[variable]; }));

    //Afegim uns marges perque no sobresurti de la gràfica.
    if (max > 0) max = max * 1.1;
    if (min > 0) min = min * 0.9;

    return d3.scaleLinear()
        .domain([min, max])
        .range([svgHeight, 0]);
}

function AfegirSvgLinechart(div_id, svgWidth, margin, svgHeight) {

    return d3.select(div_id) //seleccionar grafica
        .append("svg") //afegir svg
        .attr("id", "idViewBox" + div_id.replace('#', ''))
        .attr("viewBox", "0 0 " + (svgWidth + margin.left + margin.right) + " " + (svgHeight + margin.top + margin.bottom))
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("width", "100%")
        //.attr("height", "100%")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function mitjanaTotesDates(dataset, variable) {
    //funcio mitjana de punts
    //dataset: array de dates amb d.x el variable temps y d.y el variable que volem fer mitjana
    //intervalDates: [iniciData, finalData]
    var total = 0
    var dataOut = []
    for (i = 0; i < dataset.length; i++) {  //calcular suma de tots els valors
        total = total + dataset[i][variable] / dataset.length
    }
    dataOut.push({ Final: dataset[0].Inici, [variable]: total, z: 0 })
    dataOut.push({ Final: dataset[dataset.length - 1].Final, [variable]: total, z: 0 })
    return dataOut;
}

function mitjanaDates(dataset, variable, intervalDates) {
    //funcio mitjana de punts
    //dataset: array de dates amb d.x el variable temps y d.y el variable que volem fer mitjana
    //intervalDates: [iniciData, finalData]
    var hora = 60 * 60 * 1000
    var dataOut = []
    var dataset3;

    var dataInterval = intervalDates[0].getTime()
    dataOut.push({ Final: dataset[0].Inici, [variable]: dataset[0][variable], z: 0 })
    while (dataInterval < intervalDates[1].getTime()) { //fer mitjana per intervals de cada hora
        var total = 0;
        dataset3 = dataset.filter(function (d) { //seleccionar dates dins de hora
            return d.Inici.getTime() > dataInterval &&
                d.Inici.getTime() < dataInterval + hora / 6
        })
        for (i = 0; i < dataset3.length; i++) {  //calcular suma de tots els valors
            total = total + dataset3[i][variable]
        }
        dataInterval = dataInterval + hora / 6
        if (dataset3.length > 0) {
            dataOut.push({ Final: dataset3[Math.floor(dataset3.length / 2)].Inici, [variable]: total / dataset3.length, z: 0 })//calcular mitjana
        }

    }
    dataOut.push({ Final: dataset[dataset.length - 1].Final, [variable]: dataset[dataset.length - 1][variable], z: 0 })
    return dataOut;
}

function drawBarBarchartWarnings(dataset, label, div_id, margin, varTitol, varDescripcio, varColor, barWidth, IniciData, FinalData, idleTimeout, machine, view, viewPartial, idDivCheckbox, crearCheckbox, idMaquina) {
    var element = d3.select(div_id).node();//mida de <div>
    svgWidth = element.getBoundingClientRect().width - 30; //amplada de la grafica  

    var svgHeight = 170; //element.getBoundingClientRect().height - 30; // alçada de la grafica
    svgWidth = $('#navSuperior').width() - 30;
    var domainTime = ObtenirDominiTotal(IniciData, FinalData);

    var totalTime = ObtenirTempsTotal(domainTime);

    var xScale = ObtenirRangEixX(domainTime, svgWidth);

    var canvas = AfegirCanvasBarchartWarnings(div_id, svgWidth, svgHeight, margin);

    ctx = canvas.node().getContext("2d");

    ctx.translate(margin.left, margin.top);


    if (label) {
        var xScale2 = d3.scaleTime()
            .domain([xScale.invert(svgWidth * 0.06), xScale.invert(svgWidth * 0.96)])
            .range([svgWidth * 0.06, svgWidth * 0.96]);

        var textColor = "silver",
            textFontSize = 10,
            textFontFamily = "poppins";

        //dibuixa xAxis
        var ticks = xScale2.ticks(10);
        var rotationAngle = -Math.PI / 6; //angle de rotacio dels textos 
        var textInclinat = (ticks.length > 7) || (svgWidth < 700);//si els ticks són més de set, el text es dibuixa inclinat
        DibuixarTicks(ctx, ticks, svgHeight - 65, textColor, textFontSize, textFontFamily, textInclinat, rotationAngle, xScale);
    }


    var svg = AfegirSvgBarchart(div_id, svgWidth, svgHeight, margin);

    DibuixarBarresBarchartWarnings(dataset, xScale, svgWidth, totalTime, varColor);

    if (crearCheckbox)
        CreateCheckboxStates(varTitol, idDivCheckbox, dataset, varColor);

    var brush = d3.brushX().extent([[0, 0], [2000, svgHeight]]).on("end", updateChart);

    AfegirZoom(svg, brush);

    var g = svg.append("g");//afegir tooltip

    var focus = AfegirFocusBarchart(svg, div_id);

    var bisectDate = d3.bisector(function (d) { return d.Inici; }).left;

    AfegirOverlayBarchartWarnings(div_id, svg, svgHeight, svgWidth, domainTime, bisectDate, focus, dataset, totalTime, barWidth, varTitol, varDescripcio, varColor);



    function updateChart() {
        // What are the selected boundaries?
        extent = d3.event.selection

        if (!extent) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
            $("#divLoading").show();
            document.getElementById("dataInicial").value = iniciDataAnterior._i;
            document.getElementById("dataFinal").value = finalDataAnterior._i;
            var list = document.getElementById('shiftDropDownList');
            var selectedShift = list.options[list.selectedIndex].value;
            $("#partial").load("/" + view + "/" + viewPartial + "Partial", { inici: iniciDataAnterior._i, final: finalDataAnterior._i, torn: selectedShift, iniciAnt: minimumDate._i, finalAnt: maximumDate._i, nomMaquina: machine, idMaquina: idMaquina });
        }
        else {
            extent[1] = Math.min(svgWidth, extent[1])
            var initialDate = "";
            var endDate = "";
            var options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            var x0 = xScale.invert(d3.mouse(this)[0]),
                i = bisectDate(dataset, x0, 1),
                d = dataset[i - 1];
            var antInitDate = document.getElementById("dataInicial").value;
            var antFinalDate = document.getElementById("dataFinal").value;

            initialDate = initialDate.concat(xScale.invert(extent[0]).toLocaleDateString("es-ES"), " ", xScale.invert(extent[0]).toLocaleTimeString("es-ES"));
            endDate = endDate.concat(xScale.invert(extent[1]).toLocaleDateString("es-ES"), " ", xScale.invert(extent[1]).toLocaleTimeString("es-ES"));

            $("#divLoading").show();
            document.getElementById("dataInicial").value = initialDate;
            document.getElementById("dataFinal").value = endDate;
            var list = document.getElementById('shiftDropDownList');
            var selectedShift = list.options[list.selectedIndex].value;

            $("#partial").load("/" + view + "/" + viewPartial + "Partial", { inici: initialDate, final: endDate, torn: selectedShift, iniciAnt: antInitDate, finalAnt: antFinalDate, nomMaquina: machine, idMaquina: idMaquina });
        };
    };

    function resizeBarchart() {
        var selectDiv = document.getElementById(div_id.replace('#', '')),
            parent = selectDiv.parentNode.parentElement,
            grandparent = parent.parentNode;
        if (grandparent.style.display == "none") {
            newWidth = $('#navSuperior').width() - 30;
            newHeight = 170;
        }
        else if (parent.className == "collapse") {
            newWidth = $('#navSuperior').width() - 30;
            newHeight = 170;
        }
        else {
            newWidth = $(div_id).width();
            newHeight = 170;//$(div_id).height();
        }

        $('#idViewBox' + div_id.replace('#', '')).css({ 'width': newWidth, 'height': (newHeight + 100) });//svg 
        $('#idOverlay' + div_id.replace('#', '')).css({ 'width': newWidth });
        $('#idViewBox' + div_id.replace('#', '')).removeAttr('viewBox');
        $('#idViewBox' + div_id.replace('#', '')).attr('viewBox', '0 0 ' + newWidth + " " + (newHeight + 100));
        $('#idCanvas' + div_id.replace('#', '')).css({ 'width': newWidth, 'height': newHeight });//canvas

    }

    if (crearCheckbox) {//Evitem crear-ne més d'un cop amb el bool de crearCheckbox
        $("#" + idDivCheckbox + " :input").on('click', function () {

            var idEstatFiltre = $('label[for="' + this.id + '"]').html();//Agafem el text del label que conté la id per filtrar els estats.

            ShowHideState(idEstatFiltre, this.id, dataset, varTitol);
            RemoveGraphics(div_id);
            drawBarBarchart(dataset, label, div_id, margin, varTitol, varDescripcio, varColor, barWidth, IniciData, FinalData, idleTimeout, machine, view, viewPartial, idDivCheckbox, false, idMaquina);
        });
    }

    $(window).resize(resizeBarchart);
    $('#sidebarCollapse').on('click', function () {

        setTimeout(function () {
            resizeBarchart();
        }, 1000)
    });

};


function drawBarBarchart(dataset, label, div_id, margin, varTitol, varDescripcio, varColor, barWidth, IniciData, FinalData, idleTimeout, machine, view, viewPartial, idDivCheckbox, crearCheckbox, idMaquina) {
    var element = d3.select(div_id).node();//mida de <div>
    svgWidth = element.getBoundingClientRect().width - 30; //amplada de la grafica  

    var svgHeight = 170; //element.getBoundingClientRect().height - 30; // alçada de la grafica
    svgWidth = $('#navSuperior').width() - 30;
    var domainTime = ObtenirDominiTotal(IniciData, FinalData);

    var totalTime = ObtenirTempsTotal(domainTime);

    var xScale = ObtenirRangEixX(domainTime, svgWidth);

    var canvas = AfegirCanvasBarchart(div_id, svgWidth, svgHeight, margin);

    ctx = canvas.node().getContext("2d");

    ctx.translate(margin.left, margin.top);


    if (label) {
        var xScale2 = d3.scaleTime()
            .domain([xScale.invert(svgWidth * 0.06), xScale.invert(svgWidth * 0.96)])
            .range([svgWidth * 0.06, svgWidth * 0.96]);

        var textColor = "silver",
            textFontSize = 10,
            textFontFamily = "poppins";

        //dibuixa xAxis
        var ticks = xScale2.ticks(10);
        var rotationAngle = -Math.PI / 6; //angle de rotacio dels textos 
        var textInclinat = (ticks.length > 7) || (svgWidth < 700);//si els ticks són més de set, el text es dibuixa inclinat
        DibuixarTicks(ctx, ticks, svgHeight - 65, textColor, textFontSize, textFontFamily, textInclinat, rotationAngle, xScale);
    }


    var svg = AfegirSvgBarchart(div_id, svgWidth, svgHeight, margin);

    DibuixarBarresBarchart(dataset, xScale, svgWidth, totalTime, varColor);

    if (crearCheckbox)
        CreateCheckboxStates(varTitol, idDivCheckbox, dataset, varColor);

    var brush = d3.brushX().extent([[0, 0], [2000, svgHeight]]).on("end", updateChart);

    AfegirZoom(svg, brush);

    var g = svg.append("g");//afegir tooltip

    var focus = AfegirFocusBarchart(svg, div_id);

    var bisectDate = d3.bisector(function (d) { return d.Inici; }).left;

    AfegirOverlayBarchart(div_id, svg, svgHeight, svgWidth, domainTime, bisectDate, focus, dataset, totalTime, barWidth, varTitol, varDescripcio, varColor);



    function updateChart() {
        // What are the selected boundaries?
        extent = d3.event.selection

        if (!extent) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
            $("#divLoading").show();
            document.getElementById("dataInicial").value = iniciDataAnterior._i;
            document.getElementById("dataFinal").value = finalDataAnterior._i;
            var list = document.getElementById('shiftDropDownList');
            var selectedShift = list.options[list.selectedIndex].value;
            $("#partial").load("/" + view + "/" + viewPartial + "Partial", { inici: iniciDataAnterior._i, final: finalDataAnterior._i, torn: selectedShift, iniciAnt: minimumDate._i, finalAnt: maximumDate._i, nomMaquina: machine, idMaquina: idMaquina });
        }
        else {
            extent[1] = Math.min(svgWidth, extent[1])
            var initialDate = "";
            var endDate = "";
            var options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            var x0 = xScale.invert(d3.mouse(this)[0]),
                i = bisectDate(dataset, x0, 1),
                d = dataset[i - 1];
            var antInitDate = document.getElementById("dataInicial").value;
            var antFinalDate = document.getElementById("dataFinal").value;

            initialDate = initialDate.concat(xScale.invert(extent[0]).toLocaleDateString("es-ES"), " ", xScale.invert(extent[0]).toLocaleTimeString("es-ES"));
            endDate = endDate.concat(xScale.invert(extent[1]).toLocaleDateString("es-ES"), " ", xScale.invert(extent[1]).toLocaleTimeString("es-ES"));

            $("#divLoading").show();
            document.getElementById("dataInicial").value = initialDate;
            document.getElementById("dataFinal").value = endDate;
            var list = document.getElementById('shiftDropDownList');
            var selectedShift = list.options[list.selectedIndex].value;

            $("#partial").load("/" + view + "/" + viewPartial + "Partial", { inici: initialDate, final: endDate, torn: selectedShift, iniciAnt: antInitDate, finalAnt: antFinalDate, nomMaquina: machine, idMaquina: idMaquina });
        };
    };

    function resizeBarchart() {
        var selectDiv = document.getElementById(div_id.replace('#', '')),
            parent = selectDiv.parentNode.parentElement,
            grandparent = parent.parentNode;
        if (grandparent.style.display == "none") {
            newWidth = $('#navSuperior').width() - 30;
            newHeight = 170;
        }
        else if (parent.className == "collapse") {
            newWidth = $('#navSuperior').width() - 30;
            newHeight = 170;
        }
        else {
            newWidth = $(div_id).width();
            newHeight = 170;//$(div_id).height();
        }

        $('#idViewBox' + div_id.replace('#', '')).css({ 'width': newWidth, 'height': (newHeight + 100) });//svg 
        $('#idOverlay' + div_id.replace('#', '')).css({ 'width': newWidth });
        $('#idViewBox' + div_id.replace('#', '')).removeAttr('viewBox');
        $('#idViewBox' + div_id.replace('#', '')).attr('viewBox', '0 0 ' + newWidth + " " + (newHeight + 100));
        $('#idCanvas' + div_id.replace('#', '')).css({ 'width': newWidth, 'height': newHeight });//canvas

    }

    if (crearCheckbox) {//Evitem crear-ne més d'un cop amb el bool de crearCheckbox
        $("#" + idDivCheckbox + " :input").on('click', function () {

            var idEstatFiltre = $('label[for="' + this.id + '"]').html();//Agafem el text del label que conté la id per filtrar els estats.

            ShowHideState(idEstatFiltre, this.id, dataset, varTitol);
            RemoveGraphics(div_id);
            drawBarBarchart(dataset, label, div_id, margin, varTitol, varDescripcio, varColor, barWidth, IniciData, FinalData, idleTimeout, machine, view, viewPartial, idDivCheckbox, false, idMaquina);
        });
    }

    $(window).resize(resizeBarchart);
    $('#sidebarCollapse').on('click', function () {

        setTimeout(function () {
            resizeBarchart();
        }, 1000)
    });

};

/**
 * Retorna llista ordenada i amb un unic identificador per cada variable diferent.
 *
 * @param {Obj} dataset llista d'objectes a filtrar.
 * @param {String} variable Identificador pel qual es filtrara.
 * @return {Obj} llista d'objectes filtrada amb variable única.
 */
function FilterUniqueSort(dataset, variable) {
    var unique = [...new Set(dataset.map(item => item[variable]))];
    return unique.sort();
}

/**
 * Crea un input que s'afegeix al DOM de la vista parcial d'una maquina.
 *
 * @param {String} id identificador de l'estat.
 * @param {String} variableFiltre variable que ens permet crear un identificador de input juntament amb la id de l'estat.
 * @param {String} idDiv id del DIV on inserim input.
 * @param {String} idGrafica id de la grafica.
 */
function CreateInputStatesMachines(id, variableFiltre, idDiv, idDivPare = null, fromAlarmes = false, dataset = null) {

    var input = document.createElement("input");

    input.type = "checkbox";
    input.className = "form-check-input"; // set the CSS class
    input.id = variableFiltre + id;
    if (fromAlarmes === true) input.id += ("_" + idDivPare);
    input.checked = true;

    document.getElementById(idDiv).appendChild(input); // put it into the DOM
}

/**
 * Crea un label que s'afegeix al DOM de la vista parcial d'una maquina.
 *
 * @param {String} id identificador de l'estat.
 * @param {String} variableFiltre variable que ens permet crear un identificador de label juntament amb la id de l'estat.
 * @param {String} idDiv id del DIV on inserim label.
 * @param {String} color color que pintarem el text del label.
 */
function CreateLabelStatesMachines(id, variableFiltre, idDiv, color, idDivPare = null, fromAlarmes = false) {

    var label = document.createElement("label");

    label.className = "form-check-label"; // set the CSS class
    label.htmlFor = variableFiltre + id;
    if (fromAlarmes === true) label.htmlFor += ("_" + idDivPare);
    label.textContent = id;//Com a text del label, tenim la id de l'alarma.
    label.style.color = color;

    document.getElementById(idDiv).appendChild(label); // put it into the DOM
}

/**
 * Crea un div que s'afegeix al DOM de la vista parcial d'una maquina i es retorna la id del div afegit.
 *
 * @param {String} id identificador del div.
 * @param {String} idDiv id del DIV general on inserim el subDiv.
 */
function CreateDivStatesMachines(id, idDiv) {

    var novaId = id + idDiv;
    var div = document.createElement('div');
    div.id = novaId;
    div.className = "form-check form-check-inline";

    document.getElementById(idDiv).appendChild(div);

    return novaId;
}

/**
 * Funcio que obté la llista filtrada i crida la creacio dels input i label segons els elements de la llista.
 *
 * @param {String} variableFiltre variable que ens permet crear un identificador de input juntament amb la id de l'estat.
 * @param {String} idDiv variable que ens permet crear un identificador amb la id de l'estat.
 * @param {Obj} dataset llista d'estats per filtrar.
 * @param {String} varColor variable que conte el color.
 */
function CreateCheckboxStates(variableFiltre, idDiv, dataset, varColor) {

    var setIdsStates = FilterUniqueSort(dataset, variableFiltre);

    setIdsStates.forEach((value) => {
        var estat = dataset.find(element => element[variableFiltre] == value);//Busquem qualsevol estat per obtenir el Color del barchart

        var idNouDiv = CreateDivStatesMachines(value,idDiv);
        CreateInputStatesMachines(value, variableFiltre, idNouDiv);
        CreateLabelStatesMachines(value, variableFiltre, idNouDiv, estat[varColor]);
    });
}

/**
 * Funcio que obté la llista filtrada i crida la creacio dels input i label segons els elements de la llista.
 *
 * @param {String} variableFiltre variable que ens permet crear un identificador de input juntament amb la id de l'estat.
 * @param {String} idDiv variable que ens permet crear un identificador amb la id de l'estat.
 * @param {Obj} dataset llista d'estats per filtrar.
 */
function CreateCheckboxAlarmes(variableFiltre, idDiv, dataset) {

    var setIdsStates = FilterUniqueSort(dataset, variableFiltre);

    setIdsStates.forEach((value) => {
        var idNouDiv = CreateDivStatesMachines(value, idDiv);
        CreateInputStatesMachines(value, variableFiltre, idNouDiv, idDiv, true);
        CreateLabelStatesMachines(value, variableFiltre, idNouDiv, "red", idDiv, true);
    });
}

/**
* Funcio que mostra o amaga els estats, segons l'identificador.
*
* @param {String} idState id de l'estat.
* @param {String} idCheckbox id del checkbox.
* @param {Obj} dataset llista d'estats a recorrer.
*/
function ShowHideState(idState, idCheckbox, dataset, identificador) {
    //Al ser un checkbox, quan arribem a la funcio els estats check/uncheck estan al revés, ja que al fer click ja s'han canviat i despres s'executa la funcio.
    if (document.getElementById(idCheckbox).checked) {//Esta inactiu, activem els estats
        dataset.forEach(function (element) {
            if (element[identificador] == idState)
                element.Visible = true;
        });
    }
    else {//Estan actius, desactivem els estats

        dataset.forEach(function (element) {
            if (element[identificador] == idState)
                element.Visible = false;
        });
    }
}

/**
* Funcio que mostra o amaga els estats, segons l'identificador.
*
* @param {String} idState id de l'estat.
* @param {String} idCheckbox id del checkbox.
* @param {Obj} dataset llista d'estats a recorrer.
*/
function ShowHideAlarms(idState, idCheckbox, dataset) {
    //Al ser un checkbox, quan arribem a la funcio els estats check/uncheck estan al revés, ja que al fer click ja s'han canviat i despres s'executa la funcio.

    if (document.getElementById(idCheckbox).checked) {//Esta inactiu, activem els estats
        dataset.forEach(function (element) {
            if (element.AlarmaId == idState)
                element.Visible = true;
        });
    }
    else {//Estan actius, desactivem els estats

        dataset.forEach(function (element) {
            if (element.AlarmaId == idState)
                element.Visible = false;
        });
    }
}

/**
* Funcio per esborrar la grafica
*
* @param {String} div_id id de la grafica.
*/
function RemoveGraphics(div_id) {
    d3.select(div_id).selectAll("canvas").remove();
    d3.select(div_id).selectAll("svg").remove();
}

function drawBarBarchartAlarmes(div_id, IniciData, FinalData, machine, margin, dataset, idTaulaAlarmes, view, crearCheckbox, idAlarmesCheckbox = "AlarmesCheckbox") {
    // Obtener dimensiones del elemento contenedor
    const element = d3.select(div_id).node();
    let svgWidth = element.getBoundingClientRect().width - 30;
    let svgHeight = element.getBoundingClientRect().height - margin.top - margin.bottom;
    svgWidth = $('#navSuperior').width() - 30;

    const barWidth = 1.0; // Referencia para zoom
    let idleTimeout; // Tiempo de espera para doble clic

    // Estilos de texto
    const textColor = "silver";
    const textFontFamily = "Arial";
    const textFontSize = 10;

    // Preparar dominio y escalas
    const domainTime = ObtenirDominiTotal(IniciData, FinalData);
    const totalTime = ObtenirTempsTotal(domainTime);
    const xScale = ObtenirRangEixX(domainTime, svgWidth);
    const xScale2 = ObtenirRangEixX2(xScale, svgWidth);

    // Crear canvas y contexto
    const canvas = AfegirCanvasBarchartAlarmes(div_id, svgWidth, svgHeight, margin);
    const ctx = canvas.node().getContext("2d");
    ctx.translate(margin.left, margin.top);

    // Crear SVG
    const svg = AfegirSvgBarchartAlarmes(div_id, svgWidth, svgHeight, margin);

    // Dibujar barras
    DibuixarBarresBarchartAlarmes(dataset, ctx, xScale, IniciData, FinalData, svgWidth, barWidth, totalTime);

    // Crear checkbox si es necesario
    if (crearCheckbox) {
        CreateCheckboxAlarmes("AlarmaId", idAlarmesCheckbox, dataset);
    }

    // Dibujar eje X y ticks
    const ticks = xScale2.ticks(10);
    const rotationAngle = -Math.PI / 6;
    const textInclinat = ticks.length > 7 || svgWidth < 700;
    DibuixarTicks(ctx, ticks, svgHeight, textColor, textFontSize, textFontFamily, textInclinat, rotationAngle, xScale);

    // Añadir overlay y tooltip
    const g = svg.append("g");
    const focus = AfegirFocusBarchartAlarmes(g, svgHeight);
    const bisectDate = d3.bisector(d => new Date(d.Inici)).left;
    AfegirOverlayBarchartAlarmes(div_id, svg, svgHeight, svgWidth, focus, xScale, domainTime, dataset, bisectDate, totalTime, barWidth);

    // Actualizar gráfico al redimensionar
    function resizeBarchart() {
        const newWidth = $(div_id).width();
        const newHeight = $(div_id).height();

        $('#idViewBox' + div_id.replace('#', '')).css({ width: newWidth, height: newHeight + 100 });
        $('#idOverlay' + div_id.replace('#', '')).css({ width: newWidth });
        $('#idViewBox' + div_id.replace('#', '')).attr('viewBox', `0 0 ${newWidth} ${newHeight + 100}`);
        $('#idCanvas' + div_id.replace('#', '')).css({ width: newWidth, height: newHeight });
    }

    $(window).resize(resizeBarchart);
    $('#sidebarCollapse').on('click', () => {
        setTimeout(resizeBarchart, 1000);
    });

    // Checkbox interacciones
    if (crearCheckbox) {
        $(`#${idAlarmesCheckbox} :input`).on('click', function () {
            const idEstatFiltre = $(`label[for="${this.id}"]`).html();
            ShowHideAlarms(idEstatFiltre, this.id, dataset, "AlarmaId");
            RemoveGraphics(div_id);
            drawBarBarchartAlarmes(div_id, IniciData, FinalData, machine, margin, dataset, idTaulaAlarmes, view, false, idAlarmesCheckbox);
        });
    }

    // Manejar zoom o selección de rango
    function updateChartAlarmes() {
        const extent = d3.event.selection;
        if (extent) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

            const initialDate = `${xScale.invert(extent[0]).toLocaleDateString("es-ES", options)} ${xScale.invert(extent[0]).toLocaleTimeString("es-ES", options)}`;
            const endDate = `${xScale.invert(extent[1]).toLocaleDateString("es-ES", options)} ${xScale.invert(extent[1]).toLocaleTimeString("es-ES", options)}`;

            const antInitDate = document.getElementById("dataInicial").value;
            const antFinalDate = document.getElementById("dataFinal").value;

            $("#divLoading").show();
            clearInterval(interval);
            document.getElementById("dataInicial").value = initialDate;
            document.getElementById("dataFinal").value = endDate;

            const selectedShift = $('#shiftDropDownList option:selected').val();
            $("#partial").load(`/${view}/${view}Partial`, {
                inici: initialDate,
                final: endDate,
                torn: selectedShift,
                iniciAnt: antInitDate,
                finalAnt: antFinalDate,
                nomMaquina: machine
            });
        }
    }
}

function AfegirOverlayLinechart(div_id, svg, svgHeight, svgWidth, labelLlarg, lineColor, variable, meanLineColor, totalMeanLineColor, focus, bisectDate, xScale, dataset, yScale, mitjanaPartial, mitjanaTotal, dataset2, dataset3) {

    svg.append("rect")
        .attr("class", "overlays")
        .attr("height", svgHeight) // alçada de la grafica
        .attr("width", svgWidth) //amplada de la grafica
        .attr("opacity", 0.0)
        .on("mouseover", function () { focus.style("display", null); })
        .on("mouseout", function () { focus.style("display", "none"); })
        .on("mousemove", mousemove)
        .on('mousedown', function (e) {
            const brush_elm = svg.select('.brush > .overlay').node();
            const new_click_event = new MouseEvent('mousedown', {
                pageX: d3.event.pageX,
                pageY: d3.event.pageY,
                clientX: d3.event.clientX,
                clientY: d3.event.clientY,
                layerX: d3.event.layerX,
                layerY: d3.event.layerY,
                bubbles: true,
                cancelable: true,
                view: window
            });
            brush_elm.dispatchEvent(new_click_event);
        });

    function mousemove() {
        newWidth = $(div_id).width();
        var x0 = xScale.invert(d3.mouse(this)[0]),
            i = bisectDate(dataset, x0, 1),
            i2 = bisectDate(dataset2, x0, 1),
            d = dataset[i - 1],
            d_mitjana = dataset2[i2 - 1];
        var referenceHeight = 10 * svgWidth / newWidth;
        var recHeight = 3 * referenceHeight;

        if (labelLlarg && document.getElementById(div_id.replace('#', '') + "Checkbox1").checked) {
            if (d.v) {
                var textLength = (d.v).length * 8 + 160;
            }
            else {
                var textLength = 200;
            }
        }
        else {
            var textLength = 115 * svgWidth / newWidth;  //8 * d.y.toString().length
        }
        var pos = (d3.mouse(this)[0] < svgWidth / 2) ? textLength * 1.0 : - textLength * 0.1;
        focus.attr("transform", "translate(" + (xScale(d.Final) + pos) + "," + yScale(d[variable]) + ")");

        if (document.getElementById(div_id.replace('#', '') + "Checkbox1").checked) {

            if (labelLlarg) {
                focus.select(".t1").attr("text-anchor", "end").style("fill", lineColor).attr("transform", "translate(" + (- 0.87 * textLength) + "," + (-referenceHeight * 2) + ")").text(function () { return d3.timeFormat("%d %b %H:%M:%S")(d.Final) + " :   " });
                focus.select(".t2").attr("transform", "translate(" + (120 - textLength) + "," + (-referenceHeight * 2) + ")").text(function () { return d[variable].toFixed(2); + " " + (d.v); }); //d3.format('.2f')
                focus.select("#circle1").attr("opacity", 0);
            }
            else {
                focus.select("#circle1").attr("opacity", 1);
                focus.select(".rec1").attr("stroke", lineColor);
                focus.select(".t1").attr("text-anchor", "start").attr("font-size", 15 * (svgWidth / newWidth)).attr("transform", "translate(" + (- 0.9 * textLength) + "," + (-referenceHeight * 2) + ")").text(function () { return d3.timeFormat("%d %b %H:%M:%S")(d.Final) });
                focus.select(".t2").attr("opacity", 1).attr("font-size", 14 * (svgWidth / newWidth));
                focus.select("#circlePointer").attr("fill", lineColor);
                recHeight += 2 * referenceHeight;
                focus.select("#circle1").attr("r", 5 * (svgWidth / newWidth)).attr("fill", lineColor).attr("transform", "translate(" + (-0.87 * textLength) + "," + (recHeight - referenceHeight * 5.5) + ")");

                focus.select(".t2").attr("transform", "translate(" + (- 0.78 * textLength) + "," + (recHeight - 5 * referenceHeight) + ")").style("fill", lineColor).text(function () { return d[variable].toFixed(2); });
            }
        }
        else {
            focus.select("#circle1").attr("opacity", 0);
            focus.select(".t2").attr("opacity", 0);
        }


        if (mitjanaPartial && document.getElementById(div_id.replace('#', '') + "Checkbox2").checked) {
            if (!document.getElementById(div_id.replace('#', '') + "Checkbox1").checked) {
                focus.attr("transform", "translate(" + (xScale(d_mitjana.Final) + pos) + "," + yScale(d_mitjana[variable]) + ")");
                focus.select(".rec1").attr("stroke", meanLineColor);
                focus.select("#circlePointer").attr("fill", meanLineColor);
            }
            recHeight += 2 * referenceHeight;
            focus.select("#circle2").attr("r", 5 * (svgWidth / newWidth)).attr("fill", meanLineColor).attr("transform", "translate(" + (- 0.87 * textLength) + "," + (recHeight - referenceHeight * 5.5) + ")").attr("opacity", 1);
            focus.select(".t_mitjana").attr("opacity", 1).attr("font-size", 14 * (svgWidth / newWidth));
            focus.select(".t_mitjana").style("fill", meanLineColor).attr("transform", "translate(" + (-0.78 * textLength) + "," + (recHeight - 5 * referenceHeight) + ")").text(function () {
                return d3.format('.1f')(d_mitjana[variable]);
            });
        }
        else {
            focus.select(".t_mitjana").attr("opacity", 0);
            focus.select("#circle2").attr("opacity", 0);
        }
        if (mitjanaTotal && document.getElementById(div_id.replace('#', '') + "Checkbox3").checked) {
            if (!document.getElementById(div_id.replace('#', '') + "Checkbox1").checked && !document.getElementById(div_id.replace('#', '') + "Checkbox2").checked) {
                focus.attr("transform", "translate(" + (xScale(x0) + pos) + "," + yScale(dataset3[0][variable]) + ")");
                focus.select("#circlePointer").attr("fill", totalMeanLineColor);
                focus.select(".rec1").attr("stroke", totalMeanLineColor);
            }
            recHeight += 2 * referenceHeight;
            focus.select("#circle3").attr("r", 5 * (svgWidth / newWidth)).attr("transform", "translate(" + (- 0.87 * textLength) + "," + (recHeight - referenceHeight * 5.5) + ")").attr("opacity", 1);
            focus.select(".t_mitjanaTotal").attr("opacity", 1).attr("font-size", 14 * (svgWidth / newWidth));
            focus.select(".t_mitjanaTotal").style("fill", totalMeanLineColor).attr("transform", "translate(" + (- 0.78 * textLength) + "," + (recHeight - 5 * referenceHeight) + ")").text(function () {
                return d3.format('.1f')(dataset3[0][variable]);
            });
        }
        else {
            focus.select(".t_mitjanaTotal").attr("opacity", 0);
            focus.select("#circle3").attr("opacity", 0);

        }

        focus.select(".rec1").attr("height", (recHeight) + "px").attr("width", (textLength * 1.1) + "px").attr("transform", "translate(" + (-textLength) + "," + (-4 * referenceHeight) + ")");
        focus.select("circle").attr("r", 7 * (svgWidth / newWidth)).attr("transform", "translate(" + (- pos) + ", 0 )");

    };
}

function AfegirFocusBarchartAlarmes(g, svgHeight) {
    const focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    // Barra de selección
    focus.append("rect")
        .attr("class", "recBarraSeleccio")
        .attr("height", 128)
        .attr("fill", "rgba(255, 99, 71, 0.8)") // Color rojo translúcido
        .attr("opacity", 1)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))"); // Sombra 3D sutil

    // Comentarios
    focus.append("rect")
        .attr("class", "recComentaris")
        .attr("height", "100px")
        .attr("fill", "#e25252") // Color rojo suave
        .attr("stroke", "#e25252") // Borde atractivo
        .attr("stroke-width", 1.5)
        .attr("rx", 8)
        .attr("ry", 8)
        .style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))"); // Sombra 3D sutil

    // Estado
    focus.append("rect")
        .attr("class", "recEstat")
        .attr("height", "30px")
        .attr("fill", "#ffcccc") // Color pastel
        .attr("stroke", "#ff6666") // Borde destacado
        .attr("stroke-width", 1.5)
        .attr("rx", 8)
        .attr("ry", 8)
        //.style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))"); // Sombra 3D sutil

    // Timestamps
    focus.append("text")
        .attr("class", "t_timestamp")
        .attr("text-anchor", "start")
        .style("font", "14px 'Poppins', sans-serif")
        .style("fill", "white"); // Texto oscuro

    // Duración
    focus.append("text")
        .attr("class", "t_duration")
        .attr("text-anchor", "start")
        .style("font", "14px 'Poppins', sans-serif")
        .style("fill", "white");

    // Incidencia
    focus.append("text")
        .attr("class", "t_incidencia")
        .attr("text-anchor", "start")
        .style("font", "14px 'Poppins', sans-serif")
        .style("fill", "white");

    // Título centrado
    focus.append("text")
        .attr("class", "t3")
        .attr("text-anchor", "middle")
        .style("font", "18px 'Poppins', sans-serif")
        .style("font-weight", "bold") // Destacar
        .style("fill", "white");

    return focus;
}


function DibuixarTicks(ctx, ticks, svgHeight, textColor, textFontSize, textFontFamily, textInclinat, rotationAngle, xScale) {

    ctx.beginPath();
    ticks.forEach(function (d) {//dibuixa un tick a cada xScale(d)
        ctx.moveTo(xScale(d), svgHeight);
        ctx.lineTo(xScale(d), svgHeight + 5);
    });
    ctx.strokeStyle = textColor;
    ctx.stroke();

    ticks.forEach(function (d) {
        //xAxis text
        ctx.save();
        ctx.font = "" + textFontSize + "px " + textFontFamily;
        ctx.textAlign = textInclinat ? "right" : "center";
        ctx.translate(xScale(d), svgHeight)
        ctx.rotate((textInclinat ? rotationAngle : 0));
        ctx.translate(-xScale(d), -svgHeight)
        ctx.fillStyle = textColor;
        ctx.fillText(d3.timeFormat("%d/%m/%y %H:%M")(d), xScale(d), svgHeight + 12);
        ctx.restore();

    });
}

function AfegirSvgBarchartAlarmes(div_id, svgWidth, svgHeight, margin) {
    return d3.select(div_id) //seleccionar grafica
        .append("svg") //afegir svg
        .attr("width", svgWidth)
        .attr("height", svgHeight + margin.top + margin.bottom)
        .attr("id", "idViewBox" + div_id.replace('#', ''))
        .style("position", "absolute")
        .style("display", "block")
        .style("margin", "0 auto")
        .style("top", 0)
        .style("left", 15)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function AfegirCanvasBarchartAlarmes(div_id, svgWidth, svgHeight, margin) {
    return d3.select(div_id).append("canvas") //canvas on es dibuixa les grafiques
        .attr("width", svgWidth)
        .attr("height", svgHeight + margin.top + margin.bottom)
        .attr("id", "idCanvas" + div_id.replace('#', ''))
        .style("position", "absolute")
        .style("top", margin.top)
        .style("left", margin.left)
}

function AfegirOverlayBarchartAlarmes(div_id, svg, svgHeight, svgWidth, focus, xScale, domainTime, dataset, bisectDate, totalTime, barWidth) {
    // Crear capa de superposición para mostrar el tooltip
    const overlay = svg.append("rect")
        .attr("class", "overlays")
        .attr("id", `idOverlay${div_id.replace('#', '')}`)
        .attr("height", svgHeight)
        .attr("width", svgWidth)
        .attr("opacity", 0.0)
        .style("fill", "transparent") // Mejor apariencia visual
        .style("stroke", "#ffffff") // Borde blanco
        .style("stroke-width", "2px") // Grosor del borde
        .style("box-shadow", "0px 4px 20px rgba(255, 255, 255, 0.5)") // Efecto de sombra para el borde
        .on("mouseover", () => {
            focus.style("display", null);
            d3.select(overlay.node()).style("cursor", "pointer");
        })
        .on("mouseout", () => {
            focus.style("display", "none");
        })
        .on("mousemove", mousemove)
        .on('mousedown', function (e) {
            const brushElement = svg.select('.brush > .overlay').node();
            const newClickEvent = new MouseEvent('mousedown', {
                pageX: d3.event.pageX,
                pageY: d3.event.pageY,
                clientX: d3.event.clientX,
                clientY: d3.event.clientY,
                layerX: d3.event.layerX,
                layerY: d3.event.layerY,
                bubbles: true,
                cancelable: true,
                view: window
            });
            if (brushElement) brushElement.dispatchEvent(newClickEvent);
        });

    // Función para manejar el movimiento del ratón
    function mousemove() {
        svgWidth = $(`#idViewBox${div_id.replace('#', '')}`).width();
        xScale = ObtenirRangEixX(domainTime, svgWidth);

        const mouseX = d3.mouse(d3.event.target)[0];
        const x0 = xScale.invert(mouseX);
        const i = bisectDate(dataset, x0, 1);
        const d = dataset[i - 1];

        if (d && d.Visible) {
            const textLength = 250;
            let pos = textLength / 2 + xScale(new Date(d.Inici));
            const timeFormat = d3.timeFormat("%d %b %H:%M:%S");

            pos = Math.max(textLength, Math.min(pos, svgWidth - 5));

            // Actualizar gráficos del tooltip con diseño mejorado
            focus.select(".recBarraSeleccio")
                .attr("width", Math.max(svgWidth * (new Date(d.Final).getTime() - new Date(d.Inici).getTime()) / totalTime * barWidth + 4, 5))
                .attr("transform", `translate(${xScale(new Date(d.Inici)) - pos - 2}, -128)`)
                .style("fill", "rgba(255, 99, 71, 0.8)"); // Color semitransparente

            focus.select(".recEstat")
                .attr("fill", "#e25252") // Rojo atractivo
                .attr("width", `${textLength}px`)
                .attr("transform", `translate(-${textLength}, -40)`)
                .style("stroke", "#e25252")
                .style("stroke-width", "1px");

            focus.select(".recComentaris")
                .attr("stroke", "#e25252")
                .attr("width", `${textLength}px`)
                .attr("transform", `translate(-${textLength}, -40)`);

            focus.attr("transform", `translate(${pos}, 100)`);

            focus.select(".t_timestamp")
                .attr("transform", `translate(-${textLength - 5}, 30)`)
                .style("font-weight", "bold") // Texto más llamativo
                .text(() => timeFormat(new Date(d.Inici)));

            focus.select(".t_duration")
                .attr("transform", `translate(-${textLength - 5}, 50)`)
                .style("font-size", "12px") // Tamaño de fuente ajustado
                .text(() => msToTime(new Date(d.Final).getTime() - new Date(d.Inici).getTime()));

            focus.select(".t_incidencia")
                .attr("transform", `translate(-${textLength - 5}, 10)`)
                .style("font-style", "italic") // Estilo profesional
                .text(() => {
                    const incidencia = d.Descripcio || "";
                    return incidencia.length > 25 ? `${incidencia.slice(0, 25)}...` : incidencia;
                });

            focus.select(".t3")
                .attr("transform", `translate(-${textLength / 2}, -20)`)
                .style("font-weight", "bold") // Negrita
                .text(() => `Alarma: ${d.AlarmaId}`);

            overlay.on('click', () => {
                if (d.EnllacVideo) {
                    window.open(d.EnllacVideo, '_blank');
                }
            });
        }
    }
}


function AfegirOverlayBarchart(div_id, svg, svgHeight, svgWidth, domainTime, bisectDate, focus, dataset, totalTime, barWidth, varTitol, varDescripcio, varColor) {
    var overlay = svg.append("rect") // capa donde se mostrará el tooltip
        .attr("class", "overlays")
        .attr("id", "idOverlay" + div_id.replace('#', ''))
        .attr("height", svgHeight) // altura de la gráfica
        .attr("width", svgWidth) // ancho de la gráfica
        .attr("opacity", 0.0)
        .style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))") // Sombra 3D sutil
        .on("mouseover", function () {
            focus.style("display", null);
            $(div_id).css("z-index", '2000');
            d3.select(this).style("cursor", "pointer");
        })
        .on("mouseout", function () {
            focus.style("display", "none");
            $(div_id).css("z-index", '');
        }) // Eliminamos el atributo para mostrar información del canvas de otras gráficas
        .on("mousemove", mousemoveBarchart)
        .on('mousedown', function (e) {
            const brush_elm = svg.select('.brush > .overlay').node();
            const new_click_event = new MouseEvent('mousedown', {
                pageX: d3.event.pageX,
                pageY: d3.event.pageY,
                clientX: d3.event.clientX,
                clientY: d3.event.clientY,
                layerX: d3.event.layerX,
                layerY: d3.event.layerY,
                bubbles: true,
                cancelable: true,
                view: window
            });
            brush_elm.dispatchEvent(new_click_event);
        });

    function mousemoveBarchart() {
        $(div_id).css("z-index", '1'); // Configuramos z-index para mostrar el canvas de información del estado sobre otras gráficas

        svgWidth = $("#idViewBox" + div_id.replace('#', '')).width();
        xScale = ObtenirRangEixX(domainTime, svgWidth);

        var x0 = xScale.invert(d3.mouse(d3.event.target)[0]),
            i = bisectDate(dataset, x0, 1),
            d = dataset[i - 1];

        if (d.Visible) {
            var timeFormat = d3.timeFormat("%d %b %H:%M:%S");

            var posicioData = 30;
            var posicioDuracio = 50;
            var posicioInfo = 10;

            var titolLength = d[varTitol] ? Math.max((d[varTitol]).length * 12.5, 180) : 100;
            var descripcioLength = d[varDescripcio] ? Math.max((d[varDescripcio]).length * 8, 180) : 200;

            if (!d[varDescripcio]) {
                document.getElementById("rec3" + div_id.replace('#', '')).style.height = "80px";
                posicioData = 10;
                posicioDuracio = 30;
            }

            var textLength = Math.max(titolLength, descripcioLength);

            var pos = svgWidth * durationToMilli(d.Duracio) / totalTime * barWidth / 2 + textLength / 2 + xScale(d.Inici);
            pos = Math.max(textLength, Math.min(pos, svgWidth - 5));

            focus.attr("transform", "translate(" + pos + ",140)");
            focus.select(".t_timestamp").attr("transform", "translate(-" + (textLength - 5) + "," + posicioData + ")").text(() => timeFormat(d.Inici)).style("fill", "white").style("font-weight", "bold");
            focus.select(".t_duration").attr("transform", "translate(-" + (textLength - 5) + "," + posicioDuracio + ")").text(() => msToTime(durationToMilli(d.Duracio))).style("fill", "white");
            focus.select(".t_incidencia").attr("transform", "translate(-" + (textLength - 5) + "," + posicioInfo + ")").text(() => d[varDescripcio]).style("fill", "white").style("font-style", "italic");

            focus.select(".t3").attr("transform", "translate(-" + (textLength / 2) + ",-20)").text(() => d[varTitol]).style("fill", "white");
            focus.select(".rec2").attr("fill", () => d[varColor]).attr("width", textLength + "px").attr("transform", "translate(-" + textLength + ",-40)");
            focus.select(".rec3").attr("stroke", () => d[varColor]).attr("width", textLength + "px").attr("transform", "translate(-" + textLength + ",-40)");

            focus.select(".rec").attr("width", () => durationToMilli(d.Duracio) * svgWidth / totalTime).attr("transform", "translate(" + (-pos + xScale(d.Inici)) + ", -140)");

            overlay.on('click', () => {
                window.open(d.EnllacVideo, '_blank');
            });
        }
    }
}

function AfegirOverlayBarchartWarnings(div_id, svg, svgHeight, svgWidth, domainTime, bisectDate, focus, dataset, totalTime, barWidth, varTitol, varDescripcio, varColor) {
    var overlay = svg.append("rect") //capa on es mostrara tooltip
        .attr("class", "overlays")
        .attr("id", "idOverlay" + div_id.replace('#', ''))
        .attr("height", svgHeight) // alçada de la grafica
        .attr("width", svgWidth) //amplada de la grafica
        .attr("opacity", 0.0)
        .on("mouseover", function () { focus.style("display", null); $(div_id).css("z-index", '2000'); d3.select(this).style("cursor", "pointer"); })
        .on("mouseout", function () { focus.style("display", "none"); $(div_id).css("z-index", ''); })//Treiem l'atribut perquè ens permeti mostrar la informació del canvas de les altres gràfiques.
        .on("mousemove", mousemoveBarchart)
        .on('mousedown', function (e) {
            const brush_elm = svg.select('.brush > .overlay').node();
            const new_click_event = new MouseEvent('mousedown', {
                pageX: d3.event.pageX,
                pageY: d3.event.pageY,
                clientX: d3.event.clientX,
                clientY: d3.event.clientY,
                layerX: d3.event.layerX,
                layerY: d3.event.layerY,
                bubbles: true,
                cancelable: true,
                view: window
            });
            brush_elm.dispatchEvent(new_click_event);
        });

    function mousemoveBarchart() {
        $(div_id).css("z-index", '1');//Posem l'atribut z-index perquè ens permeti mostrar el canvas d'informació de l'estat per sobre de les altres gràfiques.
        //funcio per indicar el context de tooltip

        svgWidth = $("#idViewBox" + div_id.replace('#', '')).width();

        xScale = ObtenirRangEixX(domainTime, svgWidth);

        var x0 = xScale.invert(d3.mouse(d3.event.target)[0]),
            i = bisectDate(dataset, x0, 1),
            d = dataset[i - 1];

        if (d.Visible) {
            var timeFormat = d3.timeFormat("%d %b %H:%M:%S");

            var posicioData = 30;
            var posicioDuracio = 50;
            var posicioInfo = 10;


            if (d[varTitol]) {
                var titolLength = Math.max((d[varTitol]).length * 12.5, 180);
            }
            else titolLength = 100;
            if (d[varDescripcio]) {
                var descripcioLength = Math.max((d[varDescripcio]).length * 8, 180);
            }
            else {
                document.getElementById("rec3" + div_id.replace('#', '')).style.height = "80px";
                var descripcioLength = 200;
                posicioData = 10;
                posicioDuracio = 30;
            }

            var textLength = Math.max(titolLength, descripcioLength);

            var pos = svgWidth * durationToMilli(d.Duracio) / totalTime * barWidth / 2 + textLength / 2 + xScale(d.Inici)

            if (pos < textLength) {
                pos = textLength
            };

            if (pos > (svgWidth - 5)) {
                pos = svgWidth - 5
            };

            focus.attr("transform", "translate(" + (pos) + "," + 140 + ")");
            focus.select(".t_timestamp").attr("transform", "translate(-" + (textLength - 5) + ", " + posicioData + ")").text(function () { return timeFormat(d.Inici) });
            focus.select(".t_duration").attr("transform", "translate(-" + (textLength - 5) + ", " + posicioDuracio + ")").text(function () { return msToTime(durationToMilli(d.Duracio)) });
            focus.select(".t_incidencia").attr("transform", "translate(-" + (textLength - 5) + ", " + posicioInfo + ")").text(function () { return d[varDescripcio] }); //return d.v

            focus.select(".t3").attr("transform", "translate(-" + (textLength / 2) + ",-20)").text(function () { return d[varTitol]; });
            focus.select(".rec2").attr("fill", function () { return d[varColor] }).attr("width", textLength + "px").attr("transform", "translate(-" + textLength + ",-40)");
            focus.select(".rec3").attr("stroke", function () { return d[varColor] }).attr("width", textLength + "px").attr("transform", "translate(-" + textLength + ",-40)");


            focus.select(".rec").attr("width", function () { return durationToMilli(d.Duracio) * svgWidth / totalTime }).attr("transform", "translate(" + (-pos + xScale(d.Inici)) + "," + (-140) + ")");

            overlay.on('click', function (i) {
                window.open(
                    "" + d.EnllacVideoWarning,
                    '_blank'
                );
            });
        }

    };
}


function AfegirZoom(svg, brush) {
    svg.append("g").attr("class", "brush").call(brush); //afegir zoom
}

function AfegirSvgBarchart(div_id, svgWidth, svgHeight, margin) {

    return d3.select(div_id) //seleccionar grafica
        .append("svg") //afegir svg
        .attr("width", svgWidth)//amplada de la grafica    
        .attr("height", svgHeight + margin.top + margin.bottom + 100)
        .attr("viewBox", "0 0 " + svgWidth + " " + (svgHeight + margin.top + margin.bottom + 100))
        .attr("id", "idViewBox" + div_id.replace('#', ''))
        .attr("preserveAspectRatio", "xMaxYMax meet")
        .style("position", "absolute")
        .style("display", "block")
        .style("margin", "0 auto")
        .style("top", 0)
        .style("left", 15)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function AfegirSvgBarchartWarnings(div_id, svgWidth, svgHeight, margin) {

    return d3.select(div_id) //seleccionar grafica
        .append("svg") //afegir svg
        .attr("width", svgWidth)//amplada de la grafica    
        .attr("height", svgHeight + margin.top + margin.bottom + 100)
        .attr("viewBox", "0 0 " + svgWidth + " " + (svgHeight + margin.top + margin.bottom + 100))
        .attr("id", "idViewBox" + div_id.replace('#', ''))
        .attr("preserveAspectRatio", "xMaxYMax meet")
        .style("position", "absolute")
        .style("display", "block")
        .style("margin", "0 auto")
        .style("top", 0)
        .style("left", 15)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function AfegirFocusBarchart(svg, div_id) {
    const focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    // Fondo translúcido
    focus.append("rect")
        .attr("class", "rec")
        .attr("height", 100)
        .attr("fill", "white")
        .attr("opacity", 0.6)
        .style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))"); // Sombra 3D sutil

    // Marco principal
    focus.append("rect")
        .attr("class", "rec3")
        .attr("id", `rec3${div_id.replace('#', '')}`)
        .attr("height", "100px")
        .attr("fill", "white")
        .attr("stroke", "#ccc") // Borde gris suave
        .attr("stroke-width", 1.5)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))");

    // Barra secundaria
    focus.append("rect")
        .attr("class", "rec2")
		.attr("id", `rec2${div_id.replace('#', '')}`)
        .attr("height", "100px")
        .attr("fill", "white")
        //.attr("stroke", "#ccc") // Borde gris suave
        .attr("stroke-width", 1.5)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))");

    // Timestamps
    focus.append("text")
        .attr("class", "t_timestamp")
        .attr("text-anchor", "start")
        .style("font", "14px 'Poppins', sans-serif")
        .style("fill", "#333");

    // Duración
    focus.append("text")
        .attr("class", "t_duration")
        .attr("text-anchor", "start")
        .style("font", "14px 'Poppins', sans-serif")
        .style("fill", "#333");

    // Incidencia
    focus.append("text")
        .attr("class", "t_incidencia")
        .attr("text-anchor", "start")
        .style("font", "14px 'Poppins', sans-serif")
        .style("fill", "#333");

    // Título centrado
    focus.append("text")
        .attr("class", "t3")
        .attr("text-anchor", "middle")
        .style("font", "18px 'Poppins', sans-serif")
        .style("font-weight", "bold")
        .style("fill", "#111");

    return focus;
}


function AfegirCanvasBarchart(div_id, svgWidth, svgHeight, margin) {
    return d3.select(div_id).append("canvas")
        .attr("width", svgWidth)
        .attr("height", svgHeight + margin.top + margin.bottom)
        .attr("id", "idCanvas" + div_id.replace('#', ''))
        .style("position", "absolute")
        .style("top", margin.top)
        .style("left", margin.left);
}

function AfegirCanvasBarchartWarnings(div_id, svgWidth, svgHeight, margin) {
    return d3.select(div_id).append("canvas")
        .attr("width", svgWidth)
        .attr("height", svgHeight + margin.top + margin.bottom)
        .attr("id", "idCanvas" + div_id.replace('#', ''))
        .style("position", "absolute")
        .style("top", margin.top)
        .style("left", margin.left);
}


function DibuixarBarresBarchart(dataset, xScale, svgWidth, totalTime, varColor) {

    dataset.forEach(function (d) { //dibuixa barres
        if (d.Visible) {
            ctx.beginPath();
            ctx.rect(xScale(d.Inici), 0, svgWidth * durationToMilli(d.Duracio) / totalTime, 100);
            ctx.fillStyle = d[varColor];
            ctx.fill();
            ctx.strokeStyle = d[varColor];
            ctx.stroke();
            ctx.closePath();
        }
    })
}

function DibuixarBarresBarchartAlarmes(dataset, ctx, xScale, HoraInici, HoraFinal, svgWidth, barWidth, totalTime) {
    dataset.forEach(function (d) { //dibuixar barres
        if (d.Visible) { //Parametre per saber si s'han de mostrar els estats segons els checkbox
            ctx.beginPath();
            ctx.rect(xScale(new Date(d.Inici)), 0, (Math.max(svgWidth * (new Date(d.Final).getTime() - new Date(d.Inici).getTime()) / totalTime * barWidth, 1)), 100); //mida de cada barra
            ctx.fillStyle = "red" //color barres
            ctx.fill()
            ctx.closePath();
        }       
    })
}

function DibuixarBarresBarchartWarnings(dataset, xScale, svgWidth, totalTime, varColor) {

    dataset.forEach(function (d) { //dibuixa barres
        if (d.Visible) {
            ctx.beginPath();
            ctx.rect(xScale(d.Inici), 0, svgWidth * durationToMilli(d.Duracio) / totalTime, 100);
            ctx.fillStyle = d[varColor];
            ctx.fill();
            ctx.strokeStyle = d[varColor];
            ctx.stroke();
            ctx.closePath();
        }
    })
}


function ObtenirRangEixX(domainTime, svgWidth) {
    return d3.scaleTime()
        .domain(domainTime)
        .range([0, svgWidth]);
}

function ObtenirRangEixX2(xScale, svgWidth) {
    return d3.scaleTime() // escala de extrems reduits per evitar que el text surti de la grafica
        .domain([xScale.invert(svgWidth * 0.06), xScale.invert(svgWidth * 0.96)])
        .range([svgWidth * 0.06, svgWidth * 0.96]);
}

function ObtenirDominiTotal(IniciData, FinalData) {
    return [new Date(IniciData), new Date(FinalData)];
}

function ObtenirTempsTotal(domainTime) {
    return (domainTime[1].getTime() - domainTime[0].getTime());
}

function idled() {
    idleTimeout = null;
};

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    s = (s - mins) / 60;
    var hrs = s % 24;
    var days = (s - hrs) / 24;

    return days + "d " + hrs + 'h ' + mins + 'min ' + secs + '.' + ms + 's';
}

function durationToMilli(duration) {
    if (duration) {
        var milisecs;
        var hms = duration.split(':');
        if (hms[0].includes('.')) {
            aux = hms[0].split('.');
            milisecs = Math.round(aux[0] * 86400000 + hms[0] * 3600000 + hms[1] * 60000 + hms[2] * 1000);
        }
        else {
            milisecs = Math.round(hms[0] * 3600000 + hms[1] * 60000 + hms[2] * 1000);
        }
        return milisecs;
    }
    else return 0;
}

function returnPercentatgeAlarmes(llistaAlarmesPercentatge) {
    var dpt = [];


    for (var i in llistaAlarmesPercentatge) {
        dpt.push({ y5: (llistaAlarmesPercentatge[i].Percentatge) / 100, x: llistaAlarmesPercentatge[i].Id });
    }

    return dpt
}

function SeleccionarMenu(machine, idMaquina) {
    $("li").removeAttr("style");

    $("a[href*='nomMaquina=" + machine + "&idMaquina=" + idMaquina + "']").attr("style", "background-color:#525252");

    if ($("a[href$='" + machine + "&idMaquina=" + idMaquina + "']").parent().get(0).tagName == "LI") {
        $("a[href$='" + machine + "&idMaquina=" + idMaquina + "']").parents(':eq(1)').toggleClass("show");
    }
}