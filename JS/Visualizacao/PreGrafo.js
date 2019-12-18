/*
    funções que monta os nós e links e os coloca em um json
 */
function PreGrafo() {
    var $nodes = [];
    var $links = [];
    var $abstracts = [];
    var $regex = /[a-zà-ú0-9\-]+/g;

    this.setAbstract = function ($arr) {
        $abstracts = $arr;
    };

    this.addAbstract = function ($string) {
        $abstracts.push($string)
    };

    this.removePalavrasRepetidas = function($string){
        //recebe um array e retorna um array sem as palavras repetidas
        var arr = $string;
        var novaArr = arr.filter(function(este, i) {
            return arr.indexOf(este) == i;
        });
        //console.log(novaArr);
        return novaArr;
    };

    this.removePalavrasPequenas = function ($string) {
        //recebe um array e retorna um array
        var arr = $string;
        //var arr = $string.split(" ");
        //console.log(arr);
        arr = arr.filter(function(a){
            return a.length > 3;
        });
        //console.log(arr);
        return arr;

    };

    this.criaNodes = function ($name, $group, $class) {
        var $object = {
            "name": $name,
            "group": $group,
            "class": $class
        };
        return $object;
    };

    this.criaLinks = function ($source,  $target, $value, $type) {
       var $object = {
            "source": $source,
            "target": $target,
            "value": $value,
            "type": $type
        };
        return $object;
    };

    this.criaNodesArr = function ($string, $index) {
        //recebe um array(abstract) que acreditamos estar sem palavras repetidas
        //focado nas pesquisas e nao nas palavras e por isso as palavras se repetem em pesquisas diferentes
        var $array = $string;
        var $tamanho = $array.length;
        var $posicao;
        for (var $i = 0; $i < $tamanho; $i++){
            $posicao = this.verificaIndicePalavra($array[$i]);
            if ($posicao !== -1) $links.push(this.criaLinks($index, $posicao,  $array[$i], "contido" )); //só cria o links
            else{
                //cria o no
                $nodes.push(this.criaNodes($array[$i], 2, "palavras"));
                //cria link
                $links.push(this.criaLinks($index, $nodes.length -1, 5, 'contido'));
            }
        }
    };

    this.criaArrWord = function ($string) {
        //$string: um array de todas as palavras que apareceram nos abstracts
        console.log($string);

        var $qntAbstract = $abstracts.length; //quantidade de resumos
        var $cadeia;
        var $tamanhoString = $string.length;
        for (var $i = 0; $i < $tamanhoString; $i++){
            //crio o nó para a palavra
            $nodes.push(this.criaNodes($string[$i], 2, "palavras"));
            $cadeia = String($string[$i]);
            for (var $j = 0; $j < $qntAbstract; $j++) {
                //console.log($abstracts[$j]);
               if ($abstracts[$j].includes($cadeia)){
                 //tem a palavra $i, então crio o link
                   var $origem = this.verificaIndicePalavra($cadeia);
                   $links.push(this.criaLinks($origem, $j, 5, "contido"));
               }
            }
        }

    };

    this.verificaIndicePalavra = function ($word) {
        var $tamanho = $nodes.length;
        for (var $i = 0; $i < $tamanho; $i++){
            if ($nodes[$i].name === $word) return $i; //já existe essa palavra em nodes
        }
        return -1;// não existe essa palavra em nodes
    };

    this.salvaJson = function () {
        var $dataJson;
        var $dataset = {
            "nodes" : $nodes,
            "links": $links
        };
        //console.log($dataset)
        $dataJson = JSON.stringify($dataset);
        //console.log($dataJson);


        return $dataset;
    };

    this.criaDataset = function () {
        var $dataset = {
            "nodes" : $nodes,
            "links": $links
        };
        return $dataset;
    };

    this.startGraph = function () {
       /* var $tamanho = $abstracts.length;
        var $text;
        //necessita antes criar os nos referentes as pesquisas, eles tem que ter as primeiras posições no nodes
        for (var $i = 1; $i <= $tamanho; $i++){
            $nodes.push(this.criaNodes("Resposta: "+ $i, 1, "resultados"));
        }
        for (var $i = 0; $i < $tamanho; $i++){
            //passo ao cria nodes abstract por abstract
            $text = $abstracts[$i];
            $text = $text.match($regex);
            $text = this.removePalavrasPequenas($text);
            $text = this.removePalavrasRepetidas($text);
            console.log($text);
            this.criaNodesArr($text, $i);
        }
        console.log($nodes);
        return this.criaDataset();*/
    };

    this.startGraphWord = function () {
        //console.log($abstracts);
        var $tamanho = $abstracts.length;
        var $text= "";
        var $indice = 1;
        //necessita antes criar os nos referentes as pesquisas, eles tem que ter as primeiras posições no nodes
        for (var $i = 0; $i < $tamanho; $i++){
            $nodes.push(this.criaNodes("Resposta: "+ $indice, 1, "resultados"));
            $text += " " +$abstracts[$i]; //text são todos os abstracts
            $indice++;
        }
        //console.log($text);
        $text = $text.match($regex);
        $text = this.removePalavrasPequenas($text);
        $text = this.removePalavrasRepetidas($text);
        //console.log($text);
        this.criaArrWord($text);
        //console.log($nodes);
        return this.criaDataset();
};

    this.startPreGrafoEspecifico = function ($id) {
        var $cadeia;
        $cadeia = document.getElementById($id).value;
        $nodes = [];
        $links = [];
        var $indice = 1;
        //console.log($cadeia);
        //verifica todas as relações da palavra que foi passada
        var $tamanho = $abstracts.length;
        //necessita antes criar os nos referentes as pesquisas, eles tem que ter as primeiras posições no nodes
        for (var $i = 0; $i < $tamanho; $i++){
            $nodes.push(this.criaNodes("Resposta: "+ $indice, 1, "resultados"));
            $indice++;
        }
        //cria o nó referente a cadeia
        $nodes.push(this.criaNodes($cadeia, 2, "palavras"));
        for (var $i = 0; $i < $tamanho; $i++){
            if ($abstracts[$i].includes($cadeia)){
                //cria link
                $links.push(this.criaLinks($i, $nodes.length -1, 5, "contido"));
            }
        }

    };

    this.startPreGrafoEspecificoUnicaPesquisa = function ($indice) {
        var $origem;
        var $abstractAtual = $abstracts[$indice];

        //resetando o grafo
        $nodes = [];
        $links = [];

        //mostra o grafo de uma unica pesquisa
        //console.log($abstractAtual);
        //cria o nó
        $indice++; //para nao aparecer um "Resposta: 0";
        $nodes.push(this.criaNodes("Resposta: "+ $indice, 1, "resultados"));

        //tratamento sore o texto
        var $text  = $abstractAtual;
        $text = $text.match($regex);
        $text = this.removePalavrasPequenas($text);
        $text = this.removePalavrasRepetidas($text);

        //console.log($text);
        //agora a string antiga é um array, e eu relaciono cada item do array a  unica pesquisa
        var $tamanho_string = $text.length;
        for (var $i = 0; $i < $tamanho_string; $i++) {
            $nodes.push(this.criaNodes($text[$i], 2, "palavras"));
            $origem = this.verificaIndicePalavra($text[$i]);
            //console.log("origem: "+$origem);
            $links.push(this.criaLinks($origem, 0, 5, "contido"));
        }

        return this.criaDataset();
    };
}