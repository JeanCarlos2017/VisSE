/*
    primeira janela:
      faz um bubble chart da pesquisa clicada
    segunda janela{
     criar um word cloud para a resposta clicada
     criar um horizontal chart bar para a pesquisa clicada
    }
    terceira janela: existe sim, ao clicar em uma palavra eu exibo o grafco dela
    quarta janela: não há
    pesquisa atual: aparecer a pesquisa clicada
    total: 4 possíveis interações

 */
function ControladorDeEventosGrafo() {
    this.frameRedirect = function($nameIframe, $url) {
        //atualiza as visualizações
        var $iframe = parent.document.getElementById($nameIframe); // Busca o IFRAME por ID
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
        this.saveSessionStorage("textoRefinadoBBWord", $text);
        //console.log($novoTextoRefinado);
        var $visAtiva =  JSON.parse(sessionStorage.getItem("first"));
        if ($visAtiva !== null) {
            console.log($visAtiva);
            if ($visAtiva.nameVisual === 'BubbleChartII') this.setNovoBubbleChartWord();
        }
    };

    this.setInteracaoSegundaJanela = function ($text) {
        //interação para a segunda janela
        //criando um novo texto para horizontal chart bar ou wordCLoud
        this.saveSessionStorage("textoRefinadoBBCitation", $text);
        //console.log($novoTextoRefinado);

        //interações para  o segundo iframe
        var $visAtiva =  JSON.parse(sessionStorage.getItem("second"));
        if ($visAtiva !== null) {
            if ($visAtiva.nameVisual === "WordCloud") this.setNovoWordCloud();
            else if ($visAtiva.nameVisual === "HorizontalBarChart") this.setNovoHorizontalChartBar();
        }
    };

    this.actionGraph = function ($textNo) {
        //ação para quando eu clico em um nó pesquisa de grafo

        //pega as informações da pesquisa clicada
        if($textNo.startsWith("Resposta:")) {
            //aqui eu apenas mudo o texto de pesquisa atual
            var $indexPesquisa = $textNo.replace(/[^0-9]/g, '') - 1; //obetendo o indice da pesquisa
            console.log($indexPesquisa);
            var $arrayPesquisa = JSON.parse(sessionStorage.getItem("pesquisaArray"));
            var $text = $arrayPesquisa[$indexPesquisa];
            console.log($text);

            //interação com pesquisa atual |"pesquisa atual: aparecer a pesquisa clicada"
            this.setRespostaAtual($text);
            console.log($text.Resumo);

            //interação primeira janela
            this.setInteracaoPrimeiraJanela($text.Resumo);

            //interação segunda janela
            this.setInteracaoSegundaJanela($text.Resumo);


        }else{
            //eu cliquei em uma palavra então eu tenho uma interação com o line chart
            this.setNovoLineChart($textNo);
        }

    };

    this.setNovoBubbleChartWord = function () {
        this.frameRedirect("first", "BubbleChartII.html");
    };

    this.setNovoHorizontalChartBar = function(){
        this.frameRedirect("second", "HorizontalBarChart.html");
    };

    this.setNovoWordCloud = function () {
        this.frameRedirect("second", "WordCloud.html");
    };

    this.setNovoLineChart = function ($wordClick) {
        //faz uma pesquisa de palaras no line chhart de forma indireta (sem o usuário escrever a palavra desejada e clicar no botão
        this.saveSessionStorage("acaoLineChart", $wordClick);
        this.frameRedirect( "third", 'LineChart.html');
    };

    this.saveSessionStorage = function ($idSession, $variavel){
        $variavel = JSON.stringify($variavel);
        sessionStorage.setItem($idSession, $variavel);
    };
}