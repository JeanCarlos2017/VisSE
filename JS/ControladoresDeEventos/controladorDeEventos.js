function controladorDeEventos() {
    var $conjuntoDedosOriginal;
    var $conjuntoDeDadosAtual;

    this.setQuantidadeDeResposta = function () {
        //informa a quantidade de pesquisas
        $data = JSON.parse(sessionStorage.getItem("pesquisaArray"));
        console.log(($data));
        var $element = document.getElementById("quantidade-respostas-paragrafo");
        $element.innerHTML = $data.length;
    };


    this.frameRedirect = function($nameIframe, $url) {
        console.clear();
       console.log("frameRedirect: "+$nameIframe + " |url: "+$url);
       console.log(JSON.parse(sessionStorage.getItem("acaoLineChart")));
        var $iframe = parent.document.getElementById($nameIframe); // Busca o IFRAME por ID
        console.log($iframe);
        $iframe.src = $url; // REDIRECIONA O IFRAME*/

    };

    this.verificaVisualizaco = function($nameVisualizacao){
        //verifica se uma visualização está ativa (se foi selecionada pelo usuário)
          var $teste = JSON.parse(sessionStorage.getItem("first"));
          console.log($teste);
          if (($teste!== null) && ($teste.nameVisual === $nameVisualizacao)) return $teste;

          $teste = JSON.parse(sessionStorage.getItem("second"));
          if (($teste!== null) && ($teste.nameVisual === $nameVisualizacao)) return $teste;

          $teste = JSON.parse(sessionStorage.getItem("third"));
          if (($teste!== null) && ($teste.nameVisual === $nameVisualizacao)) return $teste;

          $teste = JSON.parse(sessionStorage.getItem("fourth"));
          if (($teste!== null) && ($teste.nameVisual === $nameVisualizacao)) return $teste;
          return null;
    };

    this.actionGraph = function($textNo){
        //ações para quando clico em um nó de grafo
        //$textNo é o texto do nó que eu cliquei no grafo
        if($textNo.startsWith("Resposta:")){
            //aqui eu apenas mudo o texto de pesquisa atual
            var $indexPesquisa = $textNo.replace(/[^0-9]/g,'') -1; //obetendo o indice da pesquisa
            console.log($indexPesquisa);
            var $arrayPesquisa = JSON.parse(sessionStorage.getItem("pesquisaArray"));
            var $text = $arrayPesquisa[$indexPesquisa];
            console.log($text);
            //parent.document.getElementsByClassName("pesquisa-atual").innerText = ($text);
            this.setRespostaAtual($text);
        }

    };




    this.actionLineChart = function ($indexPesquisa) {
        //ação para quando eu clico em um nó de line chart
        console.log($indexPesquisa);
        var $arrayPesquisa = JSON.parse(sessionStorage.getItem("pesquisaArray"));
        var $text = $arrayPesquisa[$indexPesquisa];
        this.setRespostaAtual($text);
    };
    this.saveSessionStorage = function ($idSession, $variavel){
        $variavel = JSON.stringify($variavel);
        sessionStorage.setItem($idSession, $variavel);
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
        console.log($x);
    }
}