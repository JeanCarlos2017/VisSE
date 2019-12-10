function ContadorDePalavras() {
    //classe responsável por preparar os dados para o gráfico de barras horizontal
    var $abstracts = [];
    var $regex = /[a-zà-ú0-9\-]+/g;



    this.setAbstract = function ($string) {
        $abstracts = $string;
        $abstracts.match($regex);
        $abstracts.match(/[a-zA-Z\u00C0-\u00FF']+/gi);

        $abstracts = $abstracts.split(" ");
        $abstracts = this.removePalavrasPequenas($abstracts);

    };

    this.contadorDePalavras = function () {
        //tem como objetivo contar quantas vezes cada palavra apareceu

        let palavras = $abstracts;
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
        let children = [];
       this.formarArray(children, mapa);
        return children;

    };

    this.formarArray = function ($children, dicionario) {
        //deixa o conjunto de dados em um array
        for (let chave in dicionario) {
            //console.log(chave +"->"+mapa[chave]); // exemplo ilustrativo
            //fazer o conjunto de dados
            var objeto = this.criaObjeto(chave, dicionario[chave]);
            $children.push(objeto);
        }
    };

    this.criaObjeto = function ($name, $count) {
        return  {
            "Name": $name,
            "Count": $count
        }
    };
    this.removePalavrasPequenas = function ($string) {
        //recebe um array e retorna um array
        var $arr = $string;

        $arr = $arr.filter(function(a){
            return ((a.length > 3) && (!a.includes("Resumo:")));
        });


        return $arr;

    };



}
