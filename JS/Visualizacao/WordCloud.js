function WordCloud() {
    var $text_string;
    this.construtor = function () {
        //var $contador = new ContadorDePalavras();
        var $newCloud = JSON.parse(sessionStorage.getItem("textoRefinadoBBCitation"));
        if ($newCloud !== null){
           //$contador.setAbstract($newCloud);
            $text_string = $newCloud;
            //sessionStorage.removeItem("textoRefinadoBBCitation");
        }else{
            var $textoRefinado = JSON.parse(sessionStorage.getItem("abstractsString"));
            $text_string = $textoRefinado;
            //$contador.setAbstract($textoRefinado);
        }
        this.drawWordCloud();
    };

    this.drawWordCloud = function() {
        //console.log($text_string);
        //$text_string = $text_string.match(/[a-zA-Z\u00C0-\u00FF']+/gi);
        var controladorWordCloud = new ControladorDeEventosWordCloud();
        var word_count = {};
        var words = $text_string.match(/[a-zA-Z\u00C0-\u00FF']+/gi);
        var altura = JSON.parse(sessionStorage.getItem("tamanhoJanela"));
        var largura = JSON.parse(sessionStorage.getItem("larguraJanela"));

        if (words.length == 1) {
            word_count[words[0]] = 1;
        } else {
            words.forEach(function (word) {
                var word = word.toLowerCase();
                if (word != ""  && word.length > 3 && word !== "resumo") {
                    if (word_count[word]) {
                        word_count[word]++;
                    } else {
                        word_count[word] = 1;
                    }
                }
            })
        }
        console.log(word_count);
        var tooltip = d3.select("#chart").append("div").attr("class", "toolTip");
        var svg_location = "#chart";
        var width, height;

        if (largura !== null){
            width = largura*0.8;
        }
        else width = $(document).width();

        if (altura !== null){
            //alert(altura- 56);
            height = (altura) - 80;
        } //por conta do menu
        else height = $(document).height();

        console.log("l: "+width+" | a: "+height);
        var fill = d3.scale.category20();

        //console.log(word_count);
        var word_entries = d3.entries(word_count);
        //console.log(word_entries.length);
        word_entries.sort(function(a,b){
            return a.value < b.value ? 1 : a.value > b.value ? -1 : 0;
        });
        if (word_entries.length > 100) word_entries = word_entries.slice(0,100);
        console.log(word_entries);
        var xScale = d3.scale.linear()
            .domain([0, d3.max(word_entries, function (d) {
                return d.value;
            })
            ])
            .range([10, 100]);

        d3.layout.cloud().size([width, height])
            .timeInterval(20)
            .words(word_entries)
            .fontSize(function (d) {
                console.log("l: "+width+" | a: "+height);
                return xScale(+d.value);

            })
            .text(function (d) {
                return d.key;
            })
            .rotate(function () {
                return ~~(Math.random() * 2) * 90;
            })
            .font("Impact")
            .on("end", draw)
            .start();

        function draw(words) {
            //console.log(words);
            words = word_entries;
            //console.log(words);
            console.log("l: "+width+" | a: "+height);
            d3.select(svg_location).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("width", width)
                .attr("height", height)
                .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function (d) {
                    return xScale(d.value) + "px";
                })
                .style("font-family", "Impact")
                .style("fill", function (d, i) {
                    return fill(i);
                })
                .attr("text-anchor", "middle")
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .on("click", function(d){
                    //console.log("cliquei em uma palavra Word Cloud: "+d);
                    //alert("texto: "+d.text);
                    controladorWordCloud.actionWordCloud(d.text);
                })
                .on("mousemove", function(d){
                    var $wordElement = parent.document.getElementById("word-cloud");
                    if ($wordElement !== null) $wordElement.innerText = d.key;
                })
                .on("mouseout", function(d){ tooltip.style("display", "none");})
                .text(function (d) {
                    return d.key;
                });
        }
        console.log("l: "+width+" | a: "+height);
        d3.layout.cloud().stop();
    }
}