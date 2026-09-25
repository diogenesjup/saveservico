class App {

    constructor(appId, appName, appVersion, appOs, ambiente, token, tokenSms, appEmailSuporte) {

        this.appId      = appId;
        this.appName    = appName;
        this.appVersion = appVersion;        
        this.appOs      = appOs;
        this.emailSuporte = appEmailSuporte;

        this.views   = new Views();
        this.sessao  = new Sessao();
        this.models  = new Models();
        this.helpers = new Helpers();

        this.nomeApp         = "SAVE SERVIÇO";
        this.linkApp         = "https://saveservico.com.br/";
        this.nomeMoeda       = "MOEDA";
        this.nomeMoedaPlural = "MOEDAS";

        if(ambiente=="HOMOLOGACAO"){
             
            this.urlDom = "https://saveservico.com.br/app/www/";
            this.urlApi = "https://saveservico.com.br/apiservicekeys/";
            this.urlCdn = "https://saveservico.com.br/cdn/";

        }
        if(ambiente=="PRODUCAO"){

            this.urlDom = "https://saveservico.com.br/app/www/";
            this.urlApi = "https://saveservico.com.br/apiservicekeys/";
            this.urlCdn = "https://saveservico.com.br/cdn/";

        }

        this.urlApiPagto = "https://saveservico.com.br/pay/";

        this.token = token;
        this.tokenSms = tokenSms;
        
    }
    
    getVersion() {

        return this.appVersion;
    }

    getOs(){

        return this.appOs;
    }
    
    initApp(elemento){

        this.views.viewPrincipal();

        // VERIFICAR SE A API ESTÁ OK
        this.models.testeApi();
        
        // VERIFICAR SE O USUÁRIO ESTÄ LOGADO
        this.sessao.verificarLogado();

    }

    inicio(){

        this.views.viewPrincipal();
        this.views.ativarMenuUm();

    }

    login(idUsuario,emailUusario,dadosUsuario){
   
        this.sessao.logarUsuario(idUsuario,emailUusario,dadosUsuario);
   
    }

    verificarCodigoSms(loginUsuario){

        this.views.viewCodigoSms(loginUsuario);

    }

    procVerificarSms(){
        
       this.models.verificarCodigoSms(); 

    }
    
    procLoginSms(){

        this.models.procLoginSms();
   
    }

    procLogin(){

        if(localStorage.getItem("tempEx")=="loc-5"){
            aviso("Oops! Algo deu errado","Sua conta foi excluída da plataforma, e não poderá mais ser usada");
            localStorage.setItem("tempEx","loc-free");
            return;
        }

        if(localStorage.getItem("tempEx")=="loc-4"){
            aviso("Oops! Algo deu errado","Sua conta foi excluída da plataforma, e não poderá mais ser usada");
            localStorage.setItem("tempEx","loc-5");
            return;
        }

        if(localStorage.getItem("tempEx")=="loc-3"){
            aviso("Oops! Algo deu errado","Sua conta foi excluída da plataforma, e não poderá mais ser usada");
            localStorage.setItem("tempEx","loc-4");
            return;
        }

        if(localStorage.getItem("tempEx")=="loc-2"){
            aviso("Oops! Algo deu errado","Sua conta foi excluída da plataforma, e não poderá mais ser usada");
            localStorage.setItem("tempEx","loc-3");
            return;
        }

        if(localStorage.getItem("tempEx")=="loc-1"){
            aviso("Oops! Algo deu errado","Sua conta foi excluída da plataforma, e não poderá mais ser usada");
            localStorage.setItem("tempEx","loc-2");
            return;
        }

        this.models.procLogin();
   
    }
    
    procLogoff(){

        confirmacao("Tem certeza que deseja sair?","Você será desconectado...","app.logoff();","Sim, sair");
        
        
    }

    excluirConta(){
        confirmacao("Tem certeza que deseja excluir sua conta?","Sua conta será totalmente excluída e suas informações serão apagadas. Se concorda com isso, é só clicar em 'Sim, excluir'.","app.poc()","Sim, excluir");
        
        /*
        setTimeout(function(){ 
            aviso("Deu certo!","Sua conta foi desativada. Para reativa-la é só realizar o login novamente.");
        }, 2000);
        */
   
    }

    poc(){

        app.logoff();

        setTimeout(function(){ 
            aviso("Deu certo!","Sua conta foi apagada com sucesso.");
            localStorage.setItem("tempEx","loc-1");
        }, 2000);

    }

    logoff(){
       
        localStorage.clear();
        
        // RECARREGAR AS CATEGORIAS E DADOS PADRÕES
        app.models.testeApi();
        app.viewLogin();

    }

    cadastro(){
        this.views.viewCadastro();
        this.views.desativarTodosMenus();
    }

    viewLoginEmailSenha(){
        this.views.viewLoginEmailSenha();
    }

    procCadastro(){
        this.models.procCadastro();
    }


    esqueciMinhaSenha(){
        this.views.viewEsqueciMinhaSenha();
        this.views.desativarTodosMenus();
    }

    procResetSenha(){
        this.models.procResetSenha();
    }

    

    selecaoPerfil(){

        event.preventDefault();

        var tipoPerfil = $('input[name=tipoPerfil]:checked').val();

        if(tipoPerfil=="cliente"){

            app.opcoesCarretamentoPerfilCliente();
            localStorage.setItem("selecaoPerfil","cliente");

        }else{

            var dadosCompletosUsuario = JSON.parse(localStorage.getItem("dadosCompletosUsuario"));

            if(dadosCompletosUsuario.categoria!=null || localStorage.getItem("categoria1")!=null){

                    this.views.viewPrincipalProfissional();
                    this.models.orcamentosDisponiveis();
                    localStorage.setItem("selecaoPerfil","profissional");

            }else{

                aviso("Qual categoria de serviço você atua?","Para visualizar os orçamentos disponíveis na nossa plataforma, você precisa informar qual categoria você atua. No próximo passo, você terá que informar esse dado.");
                this.views.selecionarMinhasCategorias();

            }

        }

    }

    induzirReInicio(){

        this.views.viewPrincipalProfissional();
                    this.models.orcamentosDisponiveis();

    }


    listagemNovaBlocada(){

          this.views.listagemNovaBlocada();

    }


    salvarMinhasCategorias(){

            var categoria1 = $("#categoria_1").val();
            var categoria2 = $("#categoria_2").val();

            console.log("ESSAS SÃO AS MINHAS CATEGORIAS:");
            console.log(categoria1);
            console.log(categoria2);

            localStorage.setItem("categoria1",categoria1);
            localStorage.setItem("categoria2",categoria2);

            this.models.salvarMinhasCategorias();

            this.views.viewPrincipalProfissional();
            this.models.orcamentosDisponiveis();

            localStorage.setItem("selecaoPerfil","profissional");

    }    
    opcoesCarretamentoPerfilCliente(){

        this.views.viewPrincipalCliente();
        this.models.categoriasAtendimento();

    }

    // PASSO 2 DO ATENDIMENTO
    novoAtendimentoPasso2(idCategoria,nomeCategoria){

        var dadosStorage = localStorage.getItem("categoiasAtendimento");
        var lista = [];
        if (dadosStorage) {
            try {
                var parsed = JSON.parse(dadosStorage);
                lista = Array.isArray(parsed) ? parsed : (parsed.categorias || []);
            } catch(e) {}
        }

        // Localiza a categoria selecionada
        var catSelecionada = null;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].id == idCategoria) {
                catSelecionada = lista[i];
                break;
            }
        }

        // Obtém as categorias filhas vinculadas a este pai
        var filhas = [];
        if (catSelecionada && Array.isArray(catSelecionada.filhas) && catSelecionada.filhas.length > 0) {
            filhas = catSelecionada.filhas;
        } else {
            // No banco de dados ACF, as categorias filhas apontam para o ID do pai no campo 'relacao'
            for (var k = 0; k < lista.length; k++) {
                var c = lista[k];
                if (c && c.id != idCategoria) {
                    var rel = Array.isArray(c.relacao) ? c.relacao : (c.relacao ? [c.relacao] : []);
                    if (rel.map(Number).indexOf(parseInt(idCategoria)) !== -1) {
                        filhas.push(c);
                    }
                }
            }
        }

        // Deduplica filhas por ID caso haja inconsistência
        var filhasUnicas = [];
        var filhasVistas = {};
        for (var f = 0; f < filhas.length; f++) {
            if (filhas[f] && !filhasVistas[filhas[f].id]) {
                filhasVistas[filhas[f].id] = true;
                filhasUnicas.push(filhas[f]);
            }
        }

        // Se não tiver categorias filhas, direciona diretamente para o formulário (passo 3)
        if (filhasUnicas.length === 0) {
            localStorage.setItem("tipoHistoricoCategoria","pai");
            this.novoAtendimentoPasso3(idCategoria,nomeCategoria);
            return;
        }

        // Se tiver categorias filhas, renderiza a lista de filhas
        $("#fraseDeAbertura").fadeOut(1);
        $("#filtroTabela").val("");

        var catPai = catSelecionada || { id: idCategoria, titulo: nomeCategoria };
        if (this.views && typeof this.views.renderCategoriasFilhas === "function") {
            this.views.renderCategoriasFilhas(catPai, filhasUnicas);
        } else {
            var tituloPaiEscaped = String(catPai.titulo).replace(/'/g, "\\'");
            $("#listaDeCategorias").html(`
                <li class="item-voltar-categorias" style="border-bottom:1px solid #e2e8f0;margin-bottom:8px;padding-bottom:6px;">
                    <a href="javascript:void(0)" onclick="app.opcoesCarretamentoPerfilCliente();" style="color:#007bff;font-size:13px;font-weight:600;">
                        <img src="assets/images/voltar-views.svg" alt="Voltar" style="width:13px;margin-right:6px;vertical-align:middle;" /> Voltar para todas as categorias
                    </a>
                </li>
                <li style="background:#f1f5f9;border-radius:6px;margin-bottom:8px;">
                    <a href="javascript:void(0)" onclick="app.novoAtendimentoPasso3(${catPai.id},'${tituloPaiEscaped}')" title="${catPai.titulo}">
                        <b>${catPai.titulo} (Geral)</b> <img src="assets/images/right.svg" alt="Ver mais">
                    </a>
                </li>
                ${filhasUnicas.map((n) => {
                    var tituloEscaped = String(n.titulo).replace(/'/g, "\\'");
                    return `
                        <li>
                            <a href="javascript:void(0)" onclick="app.novoAtendimentoPasso3(${n.id},'${tituloEscaped}')" title="${n.titulo}">
                                ${n.titulo} <img src="assets/images/right.svg" alt="Ver mais">
                            </a>
                        </li>
                    `;
                }).join('')}
                <li style="text-align:center;padding-top:16px;border:none;">
                    <a href="javascript:void(0)" onclick="app.opcoesCarretamentoPerfilCliente();" title="VOLTAR AO INÍCIO" style="color:#747474;font-size:12px;text-decoration:none;">
                        VOLTAR AO INÍCIO
                    </a>
                </li>
            `);
        }

    }
    


    novoAtendimentoPasso3(idCategoria,nomeCategoria){

        localStorage.setItem("idCategoriaHistorico",idCategoria);
        localStorage.setItem("nomeCategoria",nomeCategoria);

        this.views.novoAtendimento(idCategoria,nomeCategoria);

    }

    enviarAtendimento(){

        $("#btnEnviarSolicitacao").html("enviando... aguarde");

        this.models.enviarAtendimento();

    }


/**
*  ------------------------------------------------------------------------------------------------
*
*
*   SOLICITAÇÕES DO CLIENTE
*
*
*  ------------------------------------------------------------------------------------------------
*/
minhasSolicitacoes(){

    this.views.minhasSolicitacoes();
    this.models.minhasSolicitacoes();

}
cancelarAnuncio(idAnuncio){
    
    confirmacao("Tem certeza que deseja cancelar essa solicitação?","Sua solicitação de orçamento será apagada e não receberá mais propostas dos profissionais.",`app.confirmarCancelamento(${idAnuncio})`,"Sim, remover");

}
confirmarCancelamento(idAnuncio){
   
    aviso("Processando...","Aguarde, estamos removendo a sua solicitação de orçamento.");
    console.log("REMOVER SOLICITAÇÃO: "+idAnuncio);

    this.models.removerSolicitacaoOrcamento(idAnuncio);

}

fecharAnuncio(idAnuncio){

    confirmacao("Tem certeza que deseja encerrar essa solicitação?","Sua solicitação de orçamento será encerrada e não receberá mais orçamentos.",`app.confirmarFechamento(${idAnuncio})`,"Sim, fechar");

}
confirmarFechamento(idAnuncio){

    aviso("Processando...","Aguarde, estamos fechando a sua solicitação de orçamento.");
    console.log("FECHANDO SOLICITAÇÃO: "+idAnuncio);

    this.models.fecharSolicitacaoOrcamento(idAnuncio);

}

    
/**
*  ------------------------------------------------------------------------------------------------
*
*
*   FILTRO TABELA GERAIS
*
*
*  ------------------------------------------------------------------------------------------------
*/
filtrotabela(){

    var input = document.getElementById('filtroTabela');
    if (!input) return;
    var filter = input.value.trim().toUpperCase();

    if (filter === "") {
        $("#fraseDeAbertura").fadeIn(1);
        var dadosStorage = localStorage.getItem("categoiasAtendimento");
        if (dadosStorage) {
            try {
                var dados = JSON.parse(dadosStorage);
                var pais = dados.categorias_pais;
                if (!pais || !Array.isArray(pais) || pais.length === 0 || pais.length > 10) {
                    var todas = Array.isArray(dados) ? dados : (dados.categorias || []);
                    if (app.models && typeof app.models.processarEstruturaCategorias === "function") {
                        var estruturado = app.models.processarEstruturaCategorias(todas);
                        pais = estruturado.categorias_pais;
                    }
                }
                if (pais && this.views && typeof this.views.renderCategoriasPais === "function") {
                    this.views.renderCategoriasPais(pais);
                    return;
                }
            } catch(e) {}
        }
    } else {
        $("#fraseDeAbertura").fadeOut(1);
    }

    var ul = document.getElementById("listaDeCategorias");
    if (!ul) return;
    var li = ul.getElementsByTagName('li');
    var entrei = 0;

    for (var i = 0; i < li.length; i++) {
        var a = li[i];
        if (a.classList.contains("semResultados") || a.classList.contains("item-voltar-categorias")) {
            continue;
        }
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            entrei = 1;
        } else {
            li[i].style.display = "none";
        }
    }

    // Se não encontrou entre os que estavam na tela, busca em todas as categorias (incluindo filhas)
    if (entrei === 0 && filter !== "") {
        var dadosStorage = localStorage.getItem("categoiasAtendimento");
        if (dadosStorage) {
            try {
                var dadosObj = JSON.parse(dadosStorage);
                var todas = Array.isArray(dadosObj) ? dadosObj : (dadosObj.categorias || []);
                var resultados = [];
                for (var m = 0; m < todas.length; m++) {
                    if (todas[m] && todas[m].titulo && todas[m].titulo.toUpperCase().indexOf(filter) > -1) {
                        resultados.push(todas[m]);
                    }
                }
                if (resultados.length > 0) {
                    entrei = 1;
                    $("#listaDeCategorias").html(`
                        ${resultados.map(function(n){
                            var tituloEscaped = String(n.titulo).replace(/'/g, "\\'");
                            return `
                                <li>
                                    <a href="javascript:void(0)" onclick="app.novoAtendimentoPasso2(${n.id},'${tituloEscaped}')" title="${n.titulo}">
                                        ${n.titulo} <img src="assets/images/right.svg" alt="Ver mais">
                                    </a>
                                </li>
                            `;
                        }).join('')}
                    `);
                }
            } catch(e) {}
        }
    }

    if (entrei === 0) {
        $(".semResultados").remove();
        $("#listaDeCategorias").append(`
            <li class="semResultados" style="text-align:left;font-size:13px;">
                Nenhum resultado encontrado
            </li>
        `);
    } else {
        $(".semResultados").remove();
    }

}



    viewPrincipalProfissional(){
      
      this.views.viewPrincipalProfissional();
      this.models.orcamentosDisponiveis();

    }



    servicosDesbloqueadosProfissional(){

        this.views.servicosDesbloqueadosProfissional();
        this.models.orcamentosDisponiveisDesbloqueados();

    }


    // ALERTAS E MENSAGENS DE AVISO DO USUÁRIO
    alertasProfissionais(){

        this.views.alertasProfissionais();

    }



    desbloqAnuncio(anuncio,valorAnuncio,categoria){

        var categoria1 = localStorage.getItem("categoria1");
        var categoria2 = localStorage.getItem("categoria2");
        console.log("ESSA É A CATEGORIA: "+categoria);

        if(categoria1==categoria  || categoria2==categoria){

        var saldoUsuario = localStorage.getItem("saldoPrestadorServico");
        
        // SALVAR DETALHE DO ANÚNCIO
        localStorage.setItem("anuncioHeranca",anuncio);

        if(saldoUsuario<valorAnuncio){
        
            confirmacao("Oops! Você não tem MOEDAS suficiêntes","Quer enviar um orçamento para esse cliente? Compre agora um pacote de MOEDAS para desbloquear essa e muitos outros anúncios!","app.comprarChaves()","Comprar");
        
        }else{

            confirmacao("Tem certeza que deseja desbloquear esse anúncio?",`Será debitado um valor de ${valorAnuncio} MOEDAS do seu saldo <b>${app.nomeApp}</b>`,`app.views.viewDetalheAnuncio(${anuncio},5)`,"Desbloquear");

        }

    }else{

          aviso("Oops! Você não pode atender a esse orçamento","Suas categorias de atendimento não permitem atender a esse tipo de orçamento. Para alterar as suas categorias de atendimento, envie um e-mail para <b>"+app.emailSuporte+"</b>");  

    }
        

    }

    resumoSaldoProfissional(){

        this.views.resumoSaldoProfissional();

    }


    comprarChaves(){
       
        this.views.viewComprarChaves();
        this.models.pacoteChaves();

    }

    selecaoPacoteCompra(){

        // SELECIONAR A OPÇÃO ESCOLHIDA
        var pacoteEscolhido = $('input[name=pacote]:checked', '#formPacoteSelecao').val();

        console.log("PACOTE ESCOLHIDO PELO USUÁRIO: "+pacoteEscolhido);

        $("#btnComprarSelecionado").html("Carregando....");

        // SELECIONAR O VALOR DE ACORDO COM A ESCOLHA
        this.models.selecaoPacoteDeChaves(pacoteEscolhido);

        // DIRECIONAR PARA A TELA DE COMPRA DO PACOTE
        //this.views.paginaDeCmopra();

        // CARREGAR O PRECO DO PACOTE ESCOLHIDO
        //this.models.paginaDeCompra();
        
        // DIRECIONAR PARA O DETALHE DO ORÇAMENTO (PROVISORIO)
        //this.views.viewDetalheAnuncio();

    }

    payBoleto(evemt){
         
         
         $("#btnPayBoleto").html("PROCESSANDO...");
         this.views.processandoPagamento();

         this.models.payBoleto();


  

    }

    payCartaoDeCredito(){
        
        $("#btnPayCartao").html("PROCESSANDO...");
        this.views.processandoPagamentoCartao();
        this.models.payCartaoDeCredito();

    }

    dadosBoleto(dados){
        
        this.views.dadosBoleto(dados);

    }


    /* CURSOS */
    cursos(){
       
       this.views.cursos();
       this.models.cursos();

    }

    filtrotabelaCursos(){

        var input, filter, ul, li, a, i;
                  
                  input = document.getElementById('buscaCursos');
                  filter = input.value.toUpperCase();
                  ul = document.getElementById("loopCursosLista");

                  li = ul.getElementsByTagName('li');

                  // Loop through all list items, and hide those who don't match the search query
                  for (i = 0; i < li.length; i++) {
                      a = li[i];
                      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                          li[i].style.display = "";
                      } else {
                          li[i].style.display = "none";
                      }
                  }

    }

    
    detalheCurso(idCurso){

      this.views.detalheCurso(idCurso);
      this.models.detalheCurso(idCurso);


    }

    iniciarCurso(){
       
       this.views.iniciarCurso();
       this.models.iniciarCurso();

    }

    nextAula(){

        this.views.nextAula();
        this.models.atualizarHistoricoAluno();

    }

    carregarProximaAula(){

         var oQueFazer = localStorage.getItem("aulaHasTeste");

         if(oQueFazer=="nao"){

            this.views.iniciarCurso();
            this.models.carregarProximaAula(); 

         }else{

            // DIRECIONAR O USUÁRIO PARA O TESTE
            this.views.detalheTeste();

         }

           

    }


    detalheTeste(idTeste){

        this.views.detalheTeste(idTeste);

    }


    corrigirTeste(){
         
         this.views.corrigirTeste();

         

    }





    /* INDIQUE E GANHE */
    indiqueEGanhe(){
         
         this.views.indiqueEGanhe();

    }


    configuracoes(){

        this.views.configuracoes();

    }
    

    configuracoesProfissionais(){

         this.views.configuracoes();

    }

    duvidasESuporte(){

        this.views.duvidasESuporte();
        this.models.duvidasESuporte();
    }


    /* ABRIR OU FECHAR O MENU CLIENTE */
    abrirFecharMenuCliente(){

      if($(".menu-adicional-cliente").hasClass("aberto")){
         
            $(".menu-adicional-cliente").removeClass("aberto");
        
      }else{

            $(".menu-adicional-cliente").addClass("aberto");
        
      }

    }

    /* ABRIR OU FECHAR O MENU PROFISSIONAL */
    abrirFecharMenuProfissional(){

      if($(".menu-adicional-profissional").hasClass("aberto")){
         
            $(".menu-adicional-profissional").removeClass("aberto");
        
      }else{

            $(".menu-adicional-profissional").addClass("aberto");
        
      }

    }


    finalizarServico(){
       
       aviso("Você realizou atendimento para esse cliente?","Apenas confirme o atendimento se você realizou o serviço orçado para esse cliente");

    }




/**
*  ------------------------------------------------------------------------------------------------
*
*
*   EDITAR PERFIL USUARIO LOGADO
*
*
*  ------------------------------------------------------------------------------------------------
*/
    editarPerfil(){

       this.views.editarPerfil();
       this.models.editarPerfil();

    }
    procEditarPerfil(){
       
       this.models.procEditarPerfil();

    }




    view2(){
        this.views.view2();
        this.views.ativarMenuDois();
    }

    view3(){
        this.views.view3();
        this.views.ativarMenuTres();
    }

    viewLogin(){
        this.views.viewLogin();
        this.views.desativarTodosMenus();
    }

    viewUploadFoto(){
        this.views.viewUploadFoto();
        this.views.desativarTodosMenus();
    }

}


class Sessao{
    
	constructor(){
	      
	     this.logado = "nao-logado";
	     this.bdLogado = localStorage.getItem("bdLogado");
	     this.idUsuario = localStorage.getItem("idUsuario");
	     this.emailUsuario = localStorage.getItem("emailUsuario");
	     this.dadosUsuario = localStorage.getItem("dadosUsuario");

	}
    
    logarUsuario(idUsuario,emailUusario,dadosUsuario){
    	this.logado = "logado";
    	this.idUsuario = idUsuario;
    	this.dadosUsuario = dadosUsuario;
    	localStorage.setItem("bdLogado","logado");
        localStorage.setItem("idUsuario",this.idUsuario);
        
        // DIRECIONAR O USUÁRIO PARA O INÍCIO
    	app.inicio();
    }

    verificarLogado(){
      
	      if(this.bdLogado!="logado"){
	      	app.viewLogin();
	      	
	      }

    }

    deslogarUusario(){
    	this.logado = "nao-logado";
    	localStorage.setItem("bdLogado","nao-logado");
    	localStorage.clear();
    }

}