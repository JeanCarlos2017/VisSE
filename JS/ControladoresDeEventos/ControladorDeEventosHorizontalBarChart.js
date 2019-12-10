/*
    possíveis interações:
      primeira janela:
        bubble chart palavras: não há
        buuble chart citação: não há;
      segunda janela: não tem (ele pertence a segunda janela kkk)
      terceira janela:
        line chart: gráfico baseando nessa palavra;
      quarta janela:
        graph baseado na palavra clicada;

      pesquisa atual: não há
 */
function ControladorDeEventosHBarChart() {

    this.frameRedirect = function($nameIframe, $url) {
        //atualiza as visualizações
        console.clear();
        var $iframe = parent.document.getElementById($nameIframe); // Busca o IFRAME por ID
        console.log($iframe);
        $iframe.src = $url; // REDIRECIONA O IFRAME*/

    };

    this.actionHBarChart= function ($wordClick) {
        //tratando o lineChart
        this.setNovoLineChart($wordClick);

        //tratando a interação com o grafo dependencia
        this.setNovoGrafo($wordClick);

    };

    this.setNovoLineChart = function ($wordClick) {
        //faz uma pesquisa de palaras no line chhart de forma indireta (sem o usuário escrever a palavra desejada e clicar no botão
        this.saveSessionStorage("acaoLineChart", $wordClick);
        this.frameRedirect( "third", 'LineChart.html');
    };

    this.setNovoGrafo = function ($wordClick) {
        //cria um novo conjunto de dados e exibe em um grafo
        this.saveSessionStorage("acaoGrafoWord", $wordClick);
        this.frameRedirect("fourth", 'GrafoII.html');
    };

    this.saveSessionStorage = function ($idSession, $variavel){
        $variavel = JSON.stringify($variavel);
        sessionStorage.setItem($idSession, $variavel);
    };

}