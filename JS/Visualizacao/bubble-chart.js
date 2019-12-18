function BBChart () {

    this.construtorWord = function () {
        var $textoRefinado, $tamanhoJanela, $textoRefinadoBBWord;
        var contador = new ContadorDePalavras();
        $textoRefinadoBBWord = JSON.parse(sessionStorage.getItem("textoRefinadoBBWord"));

        $tamanhoJanela = JSON.parse(sessionStorage.getItem("tamanhoJanela"));
        if ($tamanhoJanela === null) $tamanhoJanela = 1000;

        if ($textoRefinadoBBWord !== null){
            contador.setAbstract($textoRefinadoBBWord);
            sessionStorage.removeItem("textoRefinadoBBWord"); //mudar o nome da variável de sessão
        }else{
            $textoRefinado = JSON.parse(sessionStorage.getItem("abstractsString"));
            contador.setAbstract($textoRefinado);
        }
        var dataset = {"children":  []};
        dataset.children = contador.contadorDePalavras();
        this.bubbleChart(dataset, "graph-visualization", false, $tamanhoJanela);
    };

    this.construtorCitacao = function () {
        var $textoRefinado, $tamanhoJanela;
        $tamanhoJanela = JSON.parse(sessionStorage.getItem("tamanhoJanela"));
        if ($tamanhoJanela === null) $tamanhoJanela = 1000;

        this.bubbleChart(this.contadorDeCitacoes(), 'graph-visualization', true, $tamanhoJanela);

    };

    this.contadorDeCitacoes = function () {
        //var $arrayPesquisa = pesquisasArray;
        var $arrayPesquisa = JSON.parse(sessionStorage.getItem("pesquisaArray"));
        var tamanho = $arrayPesquisa.length;
        var $dataset = {"children":  []};
        //this.sumirDivInfPaginas();
        for (i = 0; i < tamanho; i++){
            //var $subName = $arrayPesquisa[i].Nome.substr(1, 8);
            var $object = {
                "Name": $arrayPesquisa[i].Nome,
                "Count": this.recorteOutros($arrayPesquisa[i].Outros)
            };
            $dataset.children.push($object);
        }
        return $dataset;
    };

    this.recorteOutros = function($texto){
        $txt = String($texto);

        var $ini = $txt.indexOf("por",0)+3;
        var $fim = $txt.indexOf("artigos",0) -1;

        if (($ini < 0) || ($fim < 0)){
            //para a versão em ingles
            $ini = $txt.indexOf("by",0)+2;
            $fim = $txt.indexOf("related",0) -1;
        }
        $txt = $txt.slice($ini, $fim);
        return parseInt($txt);

    };
    this.bubbleChart = function ($children, $idElemento, $isLegenda, $tamanho) {
        //pegando somente palavras maiores que tres caracteres
        $children.children = $children.children.filter(function (a) {
            return a.Name.length > 3;
        });
        var dataset = $children;
        var $controladorEventosBBWord;
        var $controladorEventosBBCit;
        if (!$isLegenda) $controladorEventosBBWord = new ControladorDeEventosBBChartWords();
        else $controladorEventosBBCit = new ControladorDeEventosBBChartCitation();
        if ($isLegenda) {
            dataset.children.sort(function (a, b) {
                return a.Count < b.Count ? 1 : a.Count > b.Count ? -1 : 0;
            });

            //colocar indices no lugar de palavras*/
            for (var $i = 0; $i < dataset.children.length; $i++) {
                dataset.children[$i].Name = $i + 1 + "°" + dataset.children[$i].Name;
                console.log(dataset.children[$i].Name);
            }

        }
        console.log($children);
        console.log(dataset);
        var diameter = $tamanho;
        var color = d3.scaleOrdinal(d3.schemeCategory20);
        var bubble = d3.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select('body')
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(dataset)
            .sum(function (d) {
                return d.Count;
            }); //mudar o tamanho do valor passado, para o grafico ser linear e nao exponencial

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function (d) {
                return !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        node.append("title")
            .text(function (d) {
                if ($isLegenda) {
                    //encontraPesquisa(d.data.Name.substring(2,d.data.Name.length));
                    return "Nome: " + d.data.Name.substring(2, d.data.Name.length) + "\nQuantidade de Citações: " + d.data.Count;
                }
                return d.data.Name + ": " + d.data.Count;
            })
            .on("click", function (d) {
                if (!$isLegenda) {
                    $controladorEventosBBWord.setWordCLick(d.data.Name);
                    $controladorEventosBBWord.actionBubbleChartPalavras();
                }
                else {
                    encontraPesquisa(d.data.Name.substring(2, d.data.Name.length));
                    return "Nome: " + d.data.Name.substring(2, d.data.Name.length) + "\nQuantidade de Citações: " + d.data.Count;
                }
            });

        node.append("circle")
            .attr("r", function (d) {
                return d.r;
            })
            .style("fill", function (d, i) {
                return color(i);
            })
            .on("click", function (d) {
                if (!$isLegenda) {
                    $controladorEventosBBWord.setWordCLick(d.data.Name);
                    $controladorEventosBBWord.actionBubbleChartPalavras();
                }
                else {
                    encontraPesquisa(d.data.Name.substring(2, d.data.Name.length));
                    return "Nome: " + d.data.Name.substring(2, d.data.Name.length) + "\nQuantidade de Citações: " + d.data.Count;
                }
            });

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function (d) {
                if ($isLegenda) return d.data.Name.substring(0, 7);
                else return d.data.Name;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function (d) {
                return d.r / 5; //aqui eu altero o tamanho do texto
            })
            .attr("fill", "white")
            .on("click", function (d) {
                if (!$isLegenda) {
                    $controladorEventosBBWord.setWordCLick(d.data.Name);
                    $controladorEventosBBWord.actionBubbleChartPalavras();
                }
                else {
                    encontraPesquisa(d.data.Name.substring(2, d.data.Name.length));
                    return "Nome: " + d.data.Name.substring(2, d.data.Name.length) + "\nQuantidade de Citações: " + d.data.Count;
                }
            });

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.Count;
            })
            .attr("font-family", "Gill Sans", "Gill Sans MT")
            .attr("font-size", function (d) {
                return d.r / 50;
            })
            .attr("fill", "white");

        d3.select(self.frameElement)
            .style("height", diameter + "px");


        function encontraPesquisa($nome) {
            //recebe um nome de uma pesquisa e encontra o seu indice
            console.clear();
            var $data = JSON.parse(sessionStorage.getItem("pesquisaArray"));
            console.log($data);
            var $tamanhoData = $data.length;
            console.log(($data));

            for ($i = 0; $i < $tamanhoData; $i++) {
                //console.log($nome+" !=="+$data[$i].Nome);

                if (($nome.includes($data[$i].Nome)) /*&& ($nome.length === $data[$i].Nome.length)*/) {

                    //alert("match: "+$data[$i].Nome);
                    return $controladorEventosBBCit.actionBubbleChartCitacao($i);
                }
            }

        }

    }
}