function TabelaDePalavras($dados){
    var linha, coluna1, coluna2;
    var div = document.getElementById("tabela");
    var tabela = document.createElement("table");
    var $conjunto = $dados.children;
    var tamanho = $conjunto.length;
    $conjunto.sort(function(a,b){
        return a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0;
    });
    console.log($conjunto);
    for (i = 0; i< tamanho; i++){
        linha = document.createElement("tr");
        coluna1 = document.createElement("td");
        coluna2 = document.createElement("td");
        console.log($conjunto[i].Name);
        coluna1.innerText = $conjunto[i].Name;
        coluna2.innerText = $conjunto[i].Count;
        linha.appendChild(coluna1);
        linha.appendChild(coluna2);
        tabela.appendChild(linha);
    }
    div.appendChild(tabela);
}