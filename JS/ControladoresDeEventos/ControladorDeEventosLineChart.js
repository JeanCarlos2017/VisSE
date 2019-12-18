/*
    primeira janela:
      faz um bubble chart da pesquisa clicada
    segunda janela{
     criar um word cloud para a resposta clicada
     criar um horizontal chart bar para a pesquisa clicada
    }
    terceira janela: não há :/
    quarta janela: mostra um grafo somente da pesquisa clicada
    pesquisa atual: aparecer a pesquisa clicada
    total: 5 possíveis interações

 */

function ControladorDeEventosLineChart() {

    this.frameRedirect = function($nameIframe, $url) {
        //atualiza as visualizações
        var $iframe = parent.document.getElementById($nameIframe); // Busca o IFRAME por ID
        console.log($iframe);
        $iframe.src = $url; // REDIRECIONA O IFRAME*/
    };

    this.setRespostaAtual = function ($text) {
        //para alterar o texto na pesquisa atual
        console.log($text);
        var $string = String($text.Nome)+"\n";
        $string+= String($text.Autor)+"\n";
        $string+= String($text.Resumo)+"\n";
        $string+= String($text.Outros);
        var $x = parent.document.getElementById("pesquisaInteressada");
        $x.innerText= $string;
        //console.log($x);
        //return $string;
    };

    this.setInteracaoPrimeiraJanela = function($text){
        //interação para a primeira janela
        //criando um novo texto para o bubble chart
        var $novoTextoRefinado = JSON.stringify($text);
        sessionStorage.setItem("textoRefinadoBBWord", $novoTextoRefinado);
        //console.log($novoTextoRefinado);
        var $visAtiva =  JSON.parse(sessionStorage.getItem("first"));
        if ($visAtiva !== null) {
            if ($visAtiva.nameVisual === 'BubbleChartII') this.setNovoBubbleChartWord();
        }
    };

    this.setInteracaoSegundaJanela = function ($text) {
        //interação para a segunda janela
        //criando um novo texto para horizontal chart bar ou wordCLoud
        var $novoTextoRefinado = JSON.stringify($text);
        sessionStorage.setItem("textoRefinadoBBCitation", $novoTextoRefinado);
        console.log($novoTextoRefinado);

        //interações para  o segundo iframe
        var $visAtiva =  JSON.parse(sessionStorage.getItem("second"));
        if ($visAtiva !== null) {
            if ($visAtiva.nameVisual === "WordCloud") this.setNovoWordCloud();
            else if ($visAtiva.nameVisual === "HorizontalBarChart") this.setNovoHorizontalChartBar();
        }
    };

    this.actionLineChart = function ($indexPesquisa) {
        //ação para quando eu clico em um nó de line chart


        //pega as informações da pesquisa clicada
        console.log($indexPesquisa);
        $indexPesquisa--;
        var $arrayPesquisa = JSON.parse(sessionStorage.getItem("pesquisaArray"));
        var $text = $arrayPesquisa[$indexPesquisa];

        //interação com pesquisa atual |"pesquisa atual: aparecer a pesquisa clicada"
        this.setRespostaAtual($text);

        //interação primeira janela
        this.setInteracaoPrimeiraJanela($text.Resumo);

        //interação segunda janela
        this.setInteracaoSegundaJanela($text.Resumo);

        //interação para o novo grafo
        this.setNovoGrafo($indexPesquisa);



    };

    this.setNovoBubbleChartWord = function () {
        this.frameRedirect("first", 'BubbleChartII.html');
    };

    this.setNovoHorizontalChartBar = function(){
        this.frameRedirect("second", "HorizontalBarChart.html");
    };

    this.setNovoWordCloud = function () {
        this.frameRedirect("second", "WordCloud.html");
    };

    this.setNovoGrafo = function ($idPesquisa) {
        //cria um novo conjunto de dados e exibe em um grafo
        this.saveSessionStorage("acaoGrafoWordPesquisa", $idPesquisa);
        this.frameRedirect("fourth", 'GrafoII.html');
    };

    this.saveSessionStorage = function ($idSession, $variavel){
        $variavel = JSON.stringify($variavel);
        sessionStorage.setItem($idSession, $variavel);
    };

}