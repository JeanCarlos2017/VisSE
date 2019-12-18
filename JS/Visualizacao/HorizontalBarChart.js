
function HorizontalBarChart() {

    this.construtor = function () {
        var contador = new ContadorDePalavras();
        var $novoGraficoDeBarras = JSON.parse(sessionStorage.getItem("textoRefinadoBBCitation"));//mudar o nome da variável de sessão
        if ($novoGraficoDeBarras !== null) {
            contador.setAbstract($novoGraficoDeBarras);
            sessionStorage.removeItem("textoRefinadoBBCitation"); //mudar o nome da variável de sessão
        } else {
            var $textoRefinado = JSON.parse(sessionStorage.getItem("abstractsString"));
            //console.log($textoRefinado);
            contador.setAbstract($textoRefinado);
        }


        this.horizontalBarChart(contador.contadorDePalavras());
    };

    this.horizontalBarChart = function ($conjunto) {
        //remover as palavras que contem menos de tres letras
        console.log($conjunto);
        var controladorDeEventosHBarChart = new ControladorDeEventosHBarChart();
        var data = $conjunto;
        //ordenar para pegar as 20 primeiras palavras
        data.sort(function (a, b) {
            return a.Count < b.Count ? 1 : a.Count > b.Count ? -1 : 0;
        });
        data = data.slice(0, 20);

        data = data.sort(function (a, b) {
            return d3.ascending(a.Count, b.Count);
        });


        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 100},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

// set the ranges
        var y = d3.scaleBand()
            .range([height, 0])
            .padding(0.1);

        var x = d3.scaleLinear()
            .range([0, width]);

        var tooltip = d3.select("body").append("div").attr("class", "toolTip");

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // format the data
        data.forEach(function (d) {
            d.Count = +d.Count;
        });

        // Scale the range of the data in the domains
        x.domain([0, d3.max(data, function (d) {
            return d.Count;
        })])
        y.domain(data.map(function (d) {
            return d.Name;
        }));
        //y.domain([0, d3.max(data, function(d) { return d.Count; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            //.attr("x", function(d) { return x(d.Count); })
            .attr("width", function (d) {
                return x(d.Count);
            })
            .attr("y", function (d) {
                return y(d.Name);
            })
            .attr("height", y.bandwidth())
            .on("mousemove", function (d) {
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.Name) + "<br>" + "£" + (d.Count));
            })
            .on("mouseout", function (d) {
                tooltip.style("display", "none");
            })
            .on("click", function (d) {
                controladorDeEventosHBarChart.actionHBarChart(d.Name);
            });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

    };
}

