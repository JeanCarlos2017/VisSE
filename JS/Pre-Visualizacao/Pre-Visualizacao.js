/*
    aqui estão as funções responsáveis por fazer os agrupamentos necessários para implementação, ou seja, formatar o conjunto de dados
    basicamente monta o dicionário, palavras + quantidade de aparições dela
 */
function PreVisualizacao($infColet) {
    var texto = $infColet; // o que foi pego do gg academico que me interessa no momento, sendo autores, resumo, fonte etc
    var dicionario; //contagem das palavras ^^
    var conjuntoDeDadosArray; //dicionário em um array para o bubbleChart
    var conjuntodeDadosString;  //dicionário em uma string

    this.sumirDivInfPaginas = function () {
       document.getElementById("page-container").style.display = "none"; // ou "block"
    };
    this.getConjuntoDeDadosString  = function () {
        return conjuntodeDadosString;
    };

    this.getConjuntoDeDadosArray  = function () {
        return conjuntoDeDadosArray;
    };
    this.contadorDePalavras = function () {
       //tem como objetivo contar quantas vezes cada palavra apareceu
        var fileSelected = document.getElementById('dataset');
        //this.sumirDivInfPaginas();
        let palavras = texto.match(/[a-zA-Z\u00C0-\u00FF']+/gi);
        console.log(palavras);
        let mapa = {};
        let chave;
        for (let i = 0; i < palavras.length; i++) {
            chave = palavras[i];
            if (!mapa[chave]) {
                mapa[chave] = 1;
            } else {
                mapa[chave]++;
            }
        }
        dicionario  = mapa;
    console.log(dicionario);
        var dataset = {"children":  []};
        this.formarArray(dataset.children);
        //console.log(dataset);
        conjuntoDeDadosArray = dataset;
        //console.log(conjuntoDeDadosArray);
        //console.log(conjuntoDeDadosArray.children);

    };
    this.formarArray = function ($children) {
        //deixa o conjunto de dados em um array
        //console.log(mapa);
        for (let chave in dicionario) {
            //console.log(chave +"->"+mapa[chave]); // exemplo ilustrativo
            //fazer o conjunto de dados
            var objeto = this.criaObjeto(chave, dicionario[chave]);
            $children.push(objeto);
        }

    };

    this.criaObjeto = function ($name, $count) {
        return Objeto = {
            "Name": $name,
            "Count": $count
        }
    };

    this.formarString = function () {
        var fileSelected = document.getElementById('dataset');
        var dataset = "\"children\": [";
        for (let chave in dicionario) {
            //obtendo as demais strings
            dataset +="{\"Name:\":\""+chave+ "\", \"Count\":"+dicionario[chave]+ "}," ;

        }
        conjuntodeDadosString  = dataset.substr(0, dataset.length-1);
        conjuntodeDadosString+="]";
        //console.log(dataset);
        //fileSelected.innerText = conjuntodeDadosString;
    };

    //para o bubble chart pesquisa -> qnt citações
    this.pesquisaCitacao = function () {
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
        conjuntoDeDadosArray = $dataset;
    };
    this.recorteOutros = function($texto){
        $txt = String($texto);

        var $ini = $txt.indexOf("por",0)+3;
        var $fim = $txt.indexOf("artigos",0) -1;

        console.log($ini);
        console.log($fim);
        if (($ini < 0) || ($fim < 0)){
            //para a versão em ingles
            $ini = $txt.indexOf("by",0)+2;
            $fim = $txt.indexOf("related",0) -1;
        }
        $txt = $txt.slice($ini, $fim);
        return parseInt($txt);

    }
}

