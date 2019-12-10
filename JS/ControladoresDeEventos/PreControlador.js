function PreControlador() {
    var $tamanhoJanela;

    this.setTamanhoJanela = function ($idDiv) {
        $tamanhoJanela = document.getElementById($idDiv);
        $tamanhoJanela = $tamanhoJanela.offsetHeight;
        $tamanhoJanela = JSON.stringify($tamanhoJanela);
        sessionStorage.setItem("tamanhoJanela", $tamanhoJanela);

        //largura
        $tamanhoJanela = document.getElementById($idDiv);
        $tamanhoJanela = $tamanhoJanela.offsetWidth;
        $tamanhoJanela = JSON.stringify($tamanhoJanela);
        sessionStorage.setItem("larguraJanela", $tamanhoJanela);
    };
    this.saveSessionStorage = function ($idSession, $variavel){
        $variavel = JSON.stringify($variavel);
        sessionStorage.setItem($idSession, $variavel);
    };
    this.iniciaVisualizações  = function ($idSession) {
        //5 - quando eu clicar em um word cloud/horizont/bubble ele fazer a analise de acordo com o texto recém clicado
        var $text = document.getElementById("pesquisaInteressada").innerText;

        if ($text !== "Boa interação!"){
            var p1 = $text.indexOf("Resumo:");
            var p2 = $text.indexOf("citado");
            var $text = $text.slice(p1, p2);
            console.log($text);
            this.saveSessionStorage($idSession, $text);
        }
    };
    this.salvaVisualizacoesAtivas = function($nomeVisualizacao, $idIframe) {
        var $objeto, $object;

        if ($idIframe === 'first'){
            if($nomeVisualizacao === 'BubbleChartII') this.iniciaVisualizações("textoRefinadoBBWord");
            $objeto = {
                'nameVisual': $nomeVisualizacao,
                'idIframe': $idIframe
            };
            $object = JSON.stringify($objeto);
            console.log($objeto);
            sessionStorage.setItem("first", $object);
        }
        if ($idIframe === 'second'){
            this.iniciaVisualizações("textoRefinadoBBCitation");
            $objeto = {
                'nameVisual': $nomeVisualizacao,
                'idIframe': $idIframe
            };
            $object = JSON.stringify($objeto);
            sessionStorage.setItem("second", $object);
        }
        if ($idIframe === 'third'){
            $objeto = {
                'nameVisual': $nomeVisualizacao,
                'idIframe': $idIframe
            };
            $object = JSON.stringify($objeto);
            sessionStorage.setItem("third", $object);
        }
        if ($idIframe === 'fourth'){
            $objeto = {
                'nameVisual': $nomeVisualizacao,
                'idIframe': $idIframe
            };
            $object = JSON.stringify($objeto);
            sessionStorage.setItem("fourth", $object);
        }
    }

}