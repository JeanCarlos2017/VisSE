/*
    segunda janela{
     criar um word cloud para a resposta clicada
     criar um horizontal chart bar para a pesquisa licada
    }
    terceira janela: não há :/
    quarta janela: mostra um grafo somente da pesquisa clicada
    total: 3 possíveis interações

 */
function ControladorDeEventosBBChartCitation() {

    this.frameRedirect = function($nameIframe, $url) {
        //atualiza as visualizações
        var $iframe = parent.document.getElementById($nameIframe); // Busca o IFRAME por ID
        console.log($iframe);
        $iframe.src = $url; // REDIRECIONA O IFRAME*/
    };

    this.actionBubbleChartCitacao = function ($indexPesquisa) {
        //ações para quando eu clico em uma das bolhas de bubble chart citação
        //recebe o idPesquisa
        //a ideia é mudar o texto de pesquisa atual
        // e a fazer as visualizações caírem sobre a pesquisa que foi clicada


        //setando a nova pesquisa
        var $arrayPesquisa = JSON.parse(sessionStorage.getItem("pesquisaArray"));
        var $text = $arrayPesquisa[$indexPesquisa];
        this.setRespostaAtual($text);

        //criando um novo texto para horizontal chart bar e wordCLoud
        var $novoTextoRefinado = JSON.stringify($text.Resumo);
        sessionStorage.setItem("textoRefinadoBBCitation", $novoTextoRefinado);
        console.log($novoTextoRefinado.Resumo);

        //interações para  o segundo iframe
        var $visAtiva =  JSON.parse(sessionStorage.getItem("second"));
        if ($visAtiva !== null) {
            if ($visAtiva.nameVisual === "WordCloud") this.setNovoWordCloud();
            else if ($visAtiva.nameVisual === "HorizontalBarChart") this.setNovoHorizontalChartBar();
        }
        //interação para o novo grafo
        this.setNovoGrafo($indexPesquisa);

        //sessionStorage.setItem("textoRefinado", $textoRefinadoOriginal);

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

    this.setNovoGrafo = function ($idPesquisa) {
        //cria um novo conjunto de dados e exibe em um grafo
        this.saveSessionStorage("acaoGrafoWordPesquisa", $idPesquisa);
        this.frameRedirect("fourth", 'GrafoII.html');
    };

    this.setNovoWordCloud = function () {
        this.frameRedirect("second", "WordCloud.html");
    };

    this.setNovoHorizontalChartBar = function(){
       this.frameRedirect("second", "HorizontalBarChart.html");
    };

    this.saveSessionStorage = function ($idSession, $variavel){
        //alert("variavel: "+$variavel);
        $variavel = JSON.stringify($variavel);
        sessionStorage.setItem($idSession, $variavel);
    };
}