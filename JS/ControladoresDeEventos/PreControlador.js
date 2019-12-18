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
            if ($nomeVisualizacao === 'HorizontalBarChart') document.getElementById("word-cloud").style.display ="none";
            else document.getElementById("word-cloud").style.display ="block";
            $objeto = {
                'nameVisual': $nomeVisualizacao,
                'idIframe': $idIframe
            };
            $object = JSON.stringify($objeto);
            sessionStorage.setItem("second", $object);
        }

    };

    this.scriptMenuDashBoard = function (){

        const $elementBTNMenuUM = document.getElementsByClassName("btn-menu-um");
        $elementBTNMenuUM[0].addEventListener("click", function () {
            document.getElementsByClassName("menu-um")[0].style.display = "block";
        });

        document.getElementsByClassName("btn-close-um")[0].addEventListener("click", function () {
            document.getElementsByClassName("menu-um")[0].style.display = "none";
        });


        document.getElementsByClassName("btn-menu-dois")[0].addEventListener("click", function () {
            document.getElementsByClassName("menu-dois")[0].style.display = "block";
        });

        document.getElementsByClassName("btn-close-dois")[0].addEventListener("click", function () {
            document.getElementsByClassName("menu-dois")[0].style.display = "none";
        });

        document.getElementsByClassName("pesquisa-atual")[0].addEventListener("mouseover", function () {
            document.getElementsByClassName("pesquisa-atual")[0].style.height = "150px"
        });

        document.getElementsByClassName("pesquisa-atual")[0].addEventListener("mouseout", function () {
            document.getElementsByClassName("pesquisa-atual")[0].style.height = "40px"
        });

        document.getElementById("word-cloud").style.display ="none";

    };

}