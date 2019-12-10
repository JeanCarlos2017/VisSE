 const express = require ("express");
 const app = express();





 app.use('/css',express.static(__dirname +'/assets/CSS')); //setando a pasta css
 app.use('/img',express.static(__dirname +'/assets/img')); //setando a pasta img

 //setando as rotas
    //HTML
         app.get("/", function (req, res) {
             res.sendFile(__dirname+ "/HTML/index.html");
         });

         app.get("/BubbleChart.html", function (req, res) {
             res.sendFile(__dirname+ "/HTML/BubbleChart.html");
         });
         app.get("/BubbleChartII.html", function (req, res) {
             res.sendFile(__dirname+ "/HTML/BubbleChartII.html");
         });
         app.get("/Dashboard.html", function (req, res) {
             res.sendFile(__dirname+ "/HTML/Dashboard.html");
         });
         app.get("/HorizontalBarChart.html", function (req, res) {
             res.sendFile(__dirname+ "/HTML/HorizontalBarChart.html");
         });
         app.get("/WordCloud.html", function (req, res) {
             res.sendFile(__dirname+ "/HTML/WordCloud.html");
         });
         app.get("/GrafoII.html", function (req, res) {
             res.sendFile(__dirname+ "/HTML/GrafoII.html");
         });
         app.get("/GrafoJanelaUnica.html", function (req, res) {
             res.sendFile(__dirname+ "/HTML/GrafoJanelaUnica.html");
         });
         app.get("/LineChart.html", function (req, res) {
             res.sendFile(__dirname+ "/HTML/LineChart.html");
         });
         app.get("/index.html", function (req, res) {
             res.sendFile(__dirname+ "/HTML/index.html");
         });

    //JS
        //Pre-Visualização
         app.get("/JS/Pre-Visualizacao/coletorGoogleAcademico.js", function (req, res) {
             res.sendFile(__dirname+ "/JS/Pre-Visualizacao/coletorGoogleAcademico.js");
         });
         app.get("/JS/Pre-Visualizacao/Pre-Visualizacao.js", function (req, res) {
             res.sendFile(__dirname+ "/JS/Pre-Visualizacao/Pre-Visualizacao.js");
         });
         app.get("/JS/Pre-Visualizacao/ContadorDePalavras.js", function (req, res) {
             res.sendFile(__dirname+ "/JS/Pre-Visualizacao/ContadorDePalavras.js");
         });

        //Visualização
         app.get("/JS/Visualizacao/bubble-chart.js", function (req, res) {
             res.sendFile(__dirname+ "/JS/Visualizacao/bubble-chart.js");
         });
         app.get("/JS/Visualizacao/bubble-chart.js", function (req, res) {
             res.sendFile(__dirname+ "/JS/Visualizacao/bubble-chart.js");
         });
         app.get("/JS/Visualizacao/PreGrafo.js", function (req, res) {
             res.sendFile(__dirname+ "/JS/Visualizacao/PreGrafo.js");
         });
         app.get("/JS/Visualizacao/HorizontalBarChart.js", function (req, res) {
                     res.sendFile(__dirname+ "/JS/Visualizacao/HorizontalBarChart.js");
         });
         app.get("/JS/Visualizacao/LineChart.js", function (req, res) {
                     res.sendFile(__dirname+ "/JS/Visualizacao/LineChart.js");
         });
         app.get("/JS/Visualizacao/d3.layout.cloud.js", function (req, res) {
                             res.sendFile(__dirname+ "/JS/Visualizacao/d3.layout.cloud.js");
         });
         app.get("/JS/Visualizacao/WordCloud.js", function (req, res) {
                             res.sendFile(__dirname+ "/JS/Visualizacao/WordCloud.js");
         });

         //Controlador de eventos
            app.get("/JS/ControladoresDeEventos/ControladorDeEventosBBChartCitation.js", function (req, res) {
                     res.sendFile(__dirname+ "/JS/ControladoresDeEventos/ControladorDeEventosBBChartCitation.js");
             });
            app.get("/JS/ControladoresDeEventos/controladorDeEventos.js", function (req, res) {
                     res.sendFile(__dirname+ "/JS/ControladoresDeEventos/controladorDeEventos.js");
             });
            app.get("/JS/ControladoresDeEventos/ControladorBBChartWords.js", function (req, res) {
                     res.sendFile(__dirname+ "/JS/ControladoresDeEventos/ControladorBBChartWords.js");
             });
            app.get("/JS/ControladoresDeEventos/PreControlador.js", function (req, res) {
                     res.sendFile(__dirname+ "/JS/ControladoresDeEventos/PreControlador.js");
             });
            app.get("/JS/ControladoresDeEventos/ControladorDeEventosGrafo.js", function (req, res) {
                     res.sendFile(__dirname+ "/JS/ControladoresDeEventos/ControladorDeEventosGrafo.js");
             });
            app.get("/JS/ControladoresDeEventos/ControladorDeEventosHorizontalBarChart.js", function (req, res) {
                     res.sendFile(__dirname+ "/JS/ControladoresDeEventos/ControladorDeEventosHorizontalBarChart.js");
             });
            app.get("/JS/ControladoresDeEventos/ControladorDeEventosLineChart.js", function (req, res) {
                     res.sendFile(__dirname+ "/JS/ControladoresDeEventos/ControladorDeEventosLineChart.js");
            });
            app.get("/JS/ControladoresDeEventos/ControladorDeEventosWordCloud.js", function (req, res) {
                      res.sendFile(__dirname+ "/JS/ControladoresDeEventos/ControladorDeEventosWordCloud.js");
            });







         /*
 app.get("/:nome", function (req, res) {
     res.send("<h1> Olá "+ req.params.nome + ", seja bem vindo a aplicação VisSE"); //só pode ser chamada uma única fez dentro de uma função/rota
 });

  */

 app.listen(8081, function () {
     console.log ("Servidor funcionando!");
 });