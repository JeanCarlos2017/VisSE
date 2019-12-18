/*
        buuble chart citação: não há;
        graph baseado na palavra clicada;
        horizontal chart bar: não há;
        line chart: gráfico baseando nessa palavra;
        word cloud: não há
        pesquisa atual: não há
 */

function ControladorDeEventosBBChartWords() {
    var $wordClick;

    this.setWordCLick = function ($word) {
        $wordClick = $word;
    };
    this.frameRedirect = function($nameIframe, $url) {
        //atualiza as visualizações
        console.clear();
        console.log("frameRedirect: "+$nameIframe + " |url: "+$url);
        var $iframe = parent.document.getElementById($nameIframe); // Busca o IFRAME por ID
        console.log($iframe);
        $iframe.src = $url; // REDIRECIONA O IFRAME*/

    };

    this.actionBubbleChartPalavras = function () {
        //tratando o lineChart
        this.setNovoLineChart();

        //tratando a interação com o grafo dependencia
        this.setNovoGrafo();

    };

    this.setNovoLineChart = function () {
        //faz uma pesquisa de palaras no line chhart de forma indireta (sem o usuário escrever a palavra desejada e clicar no botão
        this.saveSessionStorage("acaoLineChart", $wordClick);
        this.frameRedirect( "third", 'LineChart.html');
    };

    this.setNovoGrafo = function () {
        //cria um novo conjunto de dados e exibe em um grafo
        this.saveSessionStorage("acaoGrafoWord", $wordClick);
        this.frameRedirect("fourth", 'GrafoII.html');
    };

    this.saveSessionStorage = function ($idSession, $variavel){
        $variavel = JSON.stringify($variavel);
        sessionStorage.setItem($idSession, $variavel);
    };

}