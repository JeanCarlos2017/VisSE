/*
  contém as funcções responsáveis por coletar as informações do google academico
 */
var textoRefinado ="";
var pesquisasArray = []; //todas as informações devidamente separadas em um array
var abstracts = [];
var abstractsString=""; //para wordCLoud, bubble chart II e Grafico de barras

function coletor () {
    window.onload = function () {
        //Check the support for the File API support
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var fileSelected = document.getElementById('txtfiletoread');
            fileSelected.addEventListener('change', function (e) {
                //Set the extension for the file
                var fileExtension = /html.*/;
                //Get the file object
                for (var $i = 0; $i < fileSelected.files.length; $i++) {
                    var fileTobeRead = fileSelected.files[$i];
                    //Check of the extension match
                    if (fileTobeRead.type.match(fileExtension)) {
                        //Initialize the FileReader object to read the 2file
                        lerArquivo(fileTobeRead);
                    }else {
                        alert("Por favor selecione arquivo html");
                    }
                }

            }, false);

        }
        else {
            alert("Arquivo(s) não suportado(s)");
        }
    }
};
function lerArquivo($file) {
    var fileReader = new FileReader();
    console.log($file.name);
    fileReader.readAsText($file);
    fileReader.onload = function() {
        //console.log(fileReader.result);
        seletorDeInformacoes(fileReader.result);
    };

}



function removeTags($texto) {
    var str = String($texto);
    var fileContents = document.getElementById('filecontents');
   
    str = str.replace(/<b>/g, '');
    str = str.replace(/<\/b>/g, '');
    str = str.replace(/&nbsp;/g, '');
    str = str.replace(/,/g, '');
    str = str.replace(/;/g, '');
    str = str.replace(/\?/g, '');
    str = str.replace(/\./g, '');
    str = str.replace(/<br>/g , '');
    str = str.replace(/<\\br>/g , '');
    str = str.replace(/<span>/g , '');
    str = str.replace(/<\/span>/g , '');

    fileContents.innerText = str;
    return str;
}

function seletorDeInformacoes($texto) {
    //console.log($texto);
    var fileSelected = document.getElementById('textoRefinado');
    var str = removeTags($texto);
    var linha="";
    var $nome, $autor, $resumo, $outras;
    var posIni = 0 , posFim = 0; //limitadores para o recorte
    do{
       //pegando o nome do livro, artigo...
        posIni = str.indexOf("<div class=\"gs_ri\">", posIni);
        posFim = str.indexOf("<div class=\"gs_a\">", posIni);
        linha += "Nome: " + recorteTexto(posIni, posFim, str);
        $nome = recorteTexto(posIni, posFim, str);
       //autores
        posIni = posFim;
        posFim = str.indexOf("<div class=\"gs_rs\">", posIni);
        linha+= "Autores: "+ recorteTexto(posIni, posFim, str);
        $autor = "Autores: "+ recorteTexto(posIni, posFim, str);
       //resumo
        posIni = posFim;
        posFim = str.indexOf("<div class=\"gs_fl\">", posIni);
        linha+= "Resumo: "+ recorteTexto(posIni, posFim, str);
        $resumo = "Resumo: "+ recorteTexto(posIni, posFim, str);
       //outras informações
        posIni = posFim;
        posFim = str.indexOf("<div class=\"gs_ri\">", posIni);

        if (posFim !== -1){
            linha+= recorteTexto(posIni, posFim, str) + "\n\n";
            $outras = recorteTexto(posIni, posFim, str) + "\n\n";
        }
        else {
            posFim = str.indexOf("Criar alerta", posIni);
            linha+= recorteTexto(posIni, posFim, str) + "\n\n";
            $outras = recorteTexto(posIni, posFim, str) + "\n\n";
            posFim= -1;
          }
        salvaPesquisa($nome, $autor, $resumo, $outras);
    }while(posFim !== -1)  ;
    linha = linha.replace("Criar alerta",'');
    fileSelected.innerText = linha;
    textoRefinado += linha;

    var $dadosSessao = JSON.stringify(textoRefinado);
    sessionStorage.setItem("textoRefinado", $dadosSessao);
    console.log($dadosSessao);

    var $pesquisaArrayJSON = JSON.stringify(pesquisasArray);
    sessionStorage.setItem("pesquisaArray", $pesquisaArrayJSON);

    var $resumos = JSON.stringify(abstracts);
    sessionStorage.setItem("abstracts", $resumos);
    console.log(pesquisasArray);

    var $resumos = JSON.stringify(abstractsString);
    sessionStorage.setItem("abstractsString", $resumos);
    console.log(pesquisasArray);

}

function recorteTexto($posIni, $posFim, $str) {
    var posMaior, posMenor;
    var linha="";
    var textoRefinado = "";
    posMaior = $str.indexOf(">", $posIni);
    posMenor = posMaior;
    do {
        posMenor = $str.indexOf("<", posMenor);
        posMaior = $str.indexOf(">", posMaior);
        linha = $str.slice(posMaior+1, posMenor);
        linha = linha.trim();
        if (linha.length > 0){
            textoRefinado += linha + '\n';
        }
        posMaior++;
        posMenor++;

    }while ((posMaior < $posFim) && (posMenor < $posFim));

    return textoRefinado.toLowerCase();
}

function salvaPesquisa($nome, $autor, $resumo, $outros) {
    //removeTags($resumo);
    var $pesquisa = {
        "Nome": $nome,
        "Autor": $autor,
        "Resumo": $resumo,
        "Outros": $outros
    };
    abstractsString+= $resumo;
    pesquisasArray.push($pesquisa);
    abstracts.push($resumo);
    //
}

