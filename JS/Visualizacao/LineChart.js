function LineChart() {
    var $abstracts = [];
    var $controladorLineChart = new ControladorDeEventosLineChart();
    var $regex = /[a-zà-ú0-9\-]+/g;
    var $pesquisasFeitas = []; //todas as palavras buscadas no line chart
    var $estudosAceitos=[]; //estudos que tem todas as palavras de pesquisasFeitas em seu resumo
    var stringRespostaComparacao;


    this.setAbstract = function ($arr) {
       $abstracts = $arr;
    };

    this.createObject = function ($index, $value) {
        var object = {
            "x": $index,
            "y": $value
        };
        return object;
    };

    this.gera_cor = function(){
        var hexadecimais = '0123456789ABCDEF';
        var cor = '#';

        // Pega um número aleatório no array acima
        for (var i = 0; i < 6; i++ ) {
            //E concatena à variável cor
            cor += hexadecimais[Math.floor(Math.random() * 16)];
        }
        return cor;
    };

    this.countWords = function ($index, $word) {
      var $cadeia = String ($abstracts[$index]);
        $cadeia.match($regex);
        //console.log($cadeia);
        var $count = 0;
        var  $arr = $cadeia.split(" ");
       for (var $i = 0; $i < $arr.length; $i++){
           if (($arr[$i].includes($word))) $count++;


       }
       return $count;
    };

    this.createData = function($cadeia){
        var $data = [];
        var $qntAbstract = $abstracts.length; //quantidade de resumos
        var $object;
        var $count;
        $object = this.createObject(0, 0);
        $data.push($object);
        for (var $j = 0; $j < $qntAbstract; $j++) {
            $count = this.countWords($j, $cadeia);
            $object = this.createObject($j+1, $count);
            $data.push($object);
        }
        //console.log($data);
        return $data;
    };

    this.maiorValorDeY = function($data){
        var $maiorY = $data[0].y;
        var $tamanhoData = $data.length;
        for ($i = 1; $i < $tamanhoData; $i++){
            if ($maiorY < $data[$i].y){
                $maiorY = $data[$i].y;
            }
        }
        if ($maiorY < 5) return 8;
        else return $maiorY;
    };

    this.setNovaPesquisaFeita = function ($cadeia) {
        $pesquisasFeitas.push($cadeia);
    };


    this.novaComparacao = function () {
        $pesquisasFeitas = [];
        $estudosAceitos = [];
    };

    this.geraResultados = function ($minimo) {

        var $qntAbstract = $abstracts.length; //quantidade de resumos
        var $qntPesquisaFeitas = $pesquisasFeitas.length;
        var $count = 0, $isAccept = true;
        if ($qntPesquisaFeitas > 0) {
            for (var $i = 0; $i < $qntAbstract; $i++) {
                for (var $j = 0; $j < $qntPesquisaFeitas; $j++) {
                    $count = this.countWords($i, $pesquisasFeitas[$j]);
                    if ($count < $minimo) $isAccept = false;
                }
                if ($isAccept) $estudosAceitos.push(parseInt($i + 1));
                $isAccept = true;
            }
        }
    };

    this.montaStringResultados = function () {
        //$minimo é a menor quantidade de vezes que a palavra pode aparecer no resumo de um estudo
        this.geraResultados(1);
        console.log($estudosAceitos);
        var $str = "", $index;
        var $qntEstudosAceitos = $estudosAceitos.length;
        var $arrayPesquisa = JSON.parse(sessionStorage.getItem("pesquisaArray"));
        for (var $i = 0; $i < $qntEstudosAceitos; $i++) {
            $index = $estudosAceitos[$i];
            $str +="Resposta "+$index+": "+$arrayPesquisa[$index-1].Nome+"\n";
        }
        console.log($str);
        return $str;

    };

    this.exibeResultados = function () {
        // Get the modal
        let modal = document.getElementById("myModal");

        //faço aparecer as palavras buscadas e que tem que existir em todos os resumos
        let header = document.getElementById("cacecalho-modal");
        //mostro todos os estudos que contém as palavras em seu resumo
        let corpo = document.getElementById("stringComparacao");
        corpo.innerText = this.montaStringResultados();
        header.innerText = "Palavras pesquisadas: "+ $pesquisasFeitas.toString()+"\n Total de estudos retornados da comparação: "+$estudosAceitos.length;

        modal.style.display = "block";

        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        };
        //seto as variáveis para uma nova comparação
        this.novaComparacao();
    };
    this.startLineChart = function ($id){
        const chart = d3.select("#chart");
        const { clientWidth, clientHeight } = chart.node();
        //const getRandomValue = () => Math.floor(Math.random() * 100);
        let selectedPoint = null;
        var $cadeia = document.getElementById($id).value;
        this.setNovaPesquisaFeita($cadeia);
        const data = this.createData($cadeia);
        var $element = document.getElementById('lineChart');
        //console.log($element);
        var $rangeY = this.maiorValorDeY(data);
        var $larguraPagina = $element.offsetWidth;
        var $altura = $element.offsetHeight;

        var margin = {top: 10, right: 60, bottom: 30, left: 100},
            width = $larguraPagina *0.8,
            height = $altura *0.8;

        // append the svg object to the body of the page
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

            // Add X axis --> it is a date format
            var x = d3.scaleLinear()
                .domain([0, data.length])
                .range([1, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, $rangeY])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // This allows to find the closest X index of the mouse:
            var bisect = d3.bisector(function (d) {
                return d.x;
            }).left;

            // Create the circle that travels along the curve of chart
            var focus = svg
                .append('g')
                .append('circle')
                .style("fill", "none")
                .attr("stroke", "black")
                .attr('r', 8.5)
                .style("opacity", 0)

            // Create the text that travels along the curve of chart
            var focusText = svg
                .append('g')
                .append('text')
                .style("opacity", 0)
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "middle");

            // Create a rect on top of the svg area: this rectangle recovers mouse position
            svg
                .append('rect')
                .style("fill", "none")
                .style("pointer-events", "all")
                .attr('width', width)
                .attr('height', height)
                .on('mouseover', mouseover)
                .on('mousemove', mousemove)
                .on('mouseout', mouseout)
                .on('click', novoEventoLineChart);

            // Add the line
            svg
                .append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                //.append("line")
                .attr("stroke", this.gera_cor())
                .attr("d", d3.line()
                    .x(function (d) {
                       return x(d.x)
                    })
                    .y(function (d) {
                        return y(d.y)
                    })
                );


            // What happens when the mouse move -> show the annotations at the right positions.
            function mouseover() {
                focus.style("opacity", 1)
                focusText.style("opacity", 1)
            }

            function mousemove() {
                // recover coordinate we need
                var x0 = x.invert(d3.mouse(this)[0]);
                var i = bisect(data, x0, 1);
                selectedData = data[i];
                focus
                    .attr("cx", x(selectedData.x))
                    .attr("cy", y(selectedData.y));

                focusText
                    .text("x:" + selectedData.x + "\n" + "y:" + selectedData.y)
                    .attr("x", x(selectedData.x) + 15)
                    .attr("y", y(selectedData.y))
            }

            function mouseout() {
                focus.style("opacity", 0)
                focusText.style("opacity", 0)
            }

            function novoEventoLineChart() {
                var x0 = x.invert(d3.mouse(this)[0]);
                var i = bisect(data, x0, 1);
                selectedData = data[i];
                //console.log(selectedData);
                console.log((parent.document.getElementById('third')));
                if (parent.document.getElementById('third') !== null) {
                    $controladorLineChart.actionLineChart(selectedData.x);
                }else{
                    var $arrayPesquisa = JSON.parse(sessionStorage.getItem("pesquisaArray"));
                    document.getElementById('pesquisaInteressada').style.display = "block";
                    document.getElementById('pesquisaInteressada').innerText = setRespostaAtual($arrayPesquisa[selectedData.x-1]);
                }
            }

            function setRespostaAtual($text) {
                var $string = String($text.Nome)+"\n";
                $string+= String($text.Autor)+"\n";
                $string+= String($text.Resumo)+"\n";
                $string+= String($text.Outros);
                return $string;
            }
        }


}