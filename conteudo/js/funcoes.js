/* Ajustes para uso do Howler.js */
var audio_trilha_sonora = new Howl({urls: ['media/audio/audio_trilha_sonora.mp3'],loop:true, volume: 0.2, onend: function() { tocar_audio_trilha_sonora();}});

var audio_narracao_introducao = new Howl({urls: ['media/audio/audio_narracao_introducao.mp3'],volume: 1, sprite:{audio_narracao_introducao_corte1: [4000, 20000], audio_narracao_introducao_corte2: [3000, 20000]}});

var audio_narracao_tutorial_passo1 = new Howl({urls: ['media/audio/audio_narracao_tutorial_passo1.mp3'],volume: 1, sprite:{audio_narracao_tutorial_passo1_corte1: [3900, 20000], audio_narracao_tutorial_passo1_corte2: [3000, 20000]}});

var audio_narracao_tutorial_passo2 = new Howl({urls: ['media/audio/audio_narracao_tutorial_passo2.mp3'],volume: 1, sprite:{audio_narracao_tutorial_passo2_corte1: [4000, 20000], audio_narracao_tutorial_passo2_corte2: [4900, 20000]}});

var audio_narracao_tutorial_passo3 = new Howl({urls: ['media/audio/audio_narracao_tutorial_passo3.mp3'],volume: 1, sprite:{audio_narracao_tutorial_passo3_corte1: [4000, 20000], audio_narracao_tutorial_passo3_corte2: [4900, 20000]}});

var audio_narracao_tutorial_passo4 = new Howl({urls: ['media/audio/audio_narracao_tutorial_passo4.mp3'],volume: 1, sprite:{audio_narracao_tutorial_passo4_corte1: [4000, 20000], audio_narracao_tutorial_passo4_corte2: [4900, 20000]}});

var audio_narracao_proxima_fase = new Howl({urls: ['media/audio/audio_narracao_proxima_fase.mp3'],volume: 1, sprite:{audio_narracao_proxima_fase_corte1: [3000, 20000], audio_narracao_proxima_fase_corte2: [4900, 20000]}});

var audio_narracao_conclusao_erro = new Howl({urls: ['media/audio/audio_narracao_conclusao_erro.mp3'],volume: 1, sprite:{audio_narracao_conclusao_erro_corte1: [3000, 20000], audio_narracao_conclusao_erro_corte2: [4900, 20000]}});

var audio_narracao_conclusao_acerto = new Howl({urls: ['media/audio/audio_narracao_conclusao_acerto.mp3'],volume: 1, sprite:{audio_narracao_conclusao_acerto_corte1: [3000, 20000], audio_narracao_conclusao_acerto_corte2: [4900, 20000]}});

var audio_efeito_acerto = new Howl({urls: ['media/audio/audio_efeito_acerto.mp3'], volume: 0.4});
var audio_efeito_erro = new Howl({urls: ['media/audio/audio_efeito_erro.mp3'], volume: 0.4});
/* */
function tocar_audio_trilha_sonora(){
	audio_trilha_sonora.stop();
	audio_trilha_sonora.play();
}
function parar_todos_audios(){
	audio_narracao_introducao.stop();
	audio_narracao_tutorial_passo1.stop();
	audio_narracao_tutorial_passo2.stop();
	audio_narracao_tutorial_passo3.stop();
	audio_narracao_tutorial_passo4.stop();
	audio_narracao_proxima_fase.stop();
	audio_narracao_conclusao_erro.stop();
	audio_narracao_conclusao_acerto.stop();
}
'use strict';
var fase_tutorial;
fase_tutorial=0;
/* Váriaveis para horários aleatórios dos relógios */
var horas=["0","0","0","0","0","0","0","0","0"];
var minutos=["0","0","0","0","0","0","0","0","0"];

var horas_input=["0","0","0","0","0","0","0","0","0"];
var minutos_input=["0","0","0","0","0","0","0","0","0"];

var tentativas =[0,0,0,0,0,0,0,0,0];

var fase_atual;
fase_atual=1;
var startGame = {

	// SEU CÓDIGO JAVASCRIPT AQUI
	init: function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		//document.querySelector("#tutorial_texto_passo1").style.fontSize="24px";
		$("#tutorial_texto_passo1, #tutorial_texto_passo4, #tutorial_texto_passo3").css("font-size", "24px");
		$("#inicial_texto, #tutorial_texto_passo2").css("font-size", "25px");
		$("#jogo_fase1_bloco1_input, #jogo_fase1_bloco2_input, #jogo_fase1_bloco3_input, #jogo_fase2_bloco1_input, #jogo_fase2_bloco2_input, #jogo_fase2_bloco3_input, #jogo_fase3_bloco1_input, #jo#devolutiva_btn_continuar1, #devolutiva_btn_continuar2, #devolutiva_btn_recomecargo_fase3_bloco2_input, #jogo_fase3_bloco3_input").css("left", "0px");
		$("#devolutiva_btn_continuar1, #devolutiva_btn_continuar2, #devolutiva_btn_recomecar").css("font-size", "18px");
		

	}
		
		audio_trilha_sonora.play();
		audio_narracao_introducao.play("audio_narracao_introducao_corte1");
		gerar_horas_fase1();
		gerar_horas_fase2();
		gerar_horas_fase3();
	}
};
/* Abaixo, funções para navegabilidade */
$("#inicial_btn_comecar").click(function() {
	movimento_saida_inicial();
	movimento_entrada_tutorial();
	parar_todos_audios();
});

$("#tutorial_btn_avancar").click(function() {
	fase_tutorial++;
	controle_fases_tutorial();
});

$("#tutorial_btn_retornar").click(function() {
	fase_tutorial--;
	controle_fases_tutorial();	
});

$("#tutorial_btn_jogar").click(function() {
	if(fase_atual==1){
		movimento_entrada_jogo_fase1();
	}
	if(fase_atual==2){
		movimento_entrada_jogo_fase2();
	}	
	if(fase_atual==3){
		movimento_entrada_jogo_fase3();
	}
	movimento_saida_tutorial();
	parar_todos_audios();
});
/* Botões de confirmação */
$("#jogo_fase1_bloco1_btn").click(function() {
	var resposta_fase1_bloco1;
	resposta_fase1_bloco1=document.querySelector("#jogo_fase1_bloco1_input").value;
	var resposta_fase1_bloco1_hora12;
	//console.log(horas_input[0]);
	resposta_fase1_bloco1_hora12=parseInt(horas_input[0])+12;	
	/*if(parseInt(horas_input[0]>=10)){
		var resposta_fase1_bloco1_hora12=parseInt(horas_input[0])+12;
		console.log(resposta_fase1_bloco1_hora12);
	}
	if(parseInt(horas_input[0]<10)){
		var resposta_fase1_bloco1_hora12=parseInt(horas_input[0].substring(0, 2))+12;	
	}*/	
	//	
	//console.log(resposta_fase1_bloco1 + " / "+horas_input[0]+":"+minutos_input[0])
	if(resposta_fase1_bloco1==horas_input[0]+":"+minutos_input[0] || resposta_fase1_bloco1==resposta_fase1_bloco1_hora12+":"+minutos_input[0]){
		//alert((parseInt(resposta_fase1_bloco1)+"/"+parseInt(horas_input[0])+12)+":"+minutos_input[0]);
		tentativas[0]="ok";audio_efeito_acerto.play();
		document.querySelector("#jogo_fase1_bloco1_input").readOnly = true;
		document.querySelector("#jogo_fase1_bloco1").style.backgroundImage= "url('./img/jogo_bloco_acerto.png')";
		document.querySelector("#jogo_fase1_bloco1_correto").style.display="inherit";
		document.querySelector("#jogo_fase1_bloco1_btn").style.display="none";
		//
		document.querySelector("#jogo_fase1_bloco1_correto").className="animacao_atraso_0 tada";
		document.querySelector("#jogo_fase1_bloco1_painel").className="animacao_atraso_0 tada";	
		document.querySelector("#jogo_fase1_bloco1_relogio").className="animacao_atraso_0 tada";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase1_bloco1_correto").className="animacao_atraso_0 rubberBand";
		}, 1000);		
	}else{
		tentativas[0]++;audio_efeito_erro.play();
		document.querySelector("#jogo_fase1_bloco1").style.backgroundImage= "url('./img/jogo_bloco_erro.png')";
		document.querySelector("#jogo_fase1_bloco1_incorreto").style.display="inherit";
		document.querySelector("#jogo_fase1_bloco1_incorreto").className="animacao_atraso_0 shake";
		document.querySelector("#jogo_fase1_bloco1_btn").style.display="none";
		document.querySelector("#jogo_fase1_bloco1_erro"+tentativas[0]).style.display="inherit";	
		document.querySelector("#jogo_fase1_bloco1_erro"+tentativas[0]).className="animacao_atraso_1s vanishIn";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase1_bloco1_incorreto").className="animacao_atraso_0 vanishOut";
			document.querySelector("#jogo_fase1_bloco1_btn").style.display="inherit";
		}, 2000);
		setTimeout(function(){ 
			document.querySelector("#jogo_fase1_bloco1_incorreto").style.display="none";
		}, 3000);		
		//console.log(tentativas);
		
	}
	verificar_tentativas();
});
//
$("#jogo_fase1_bloco2_btn").click(function() {
	var resposta_fase1_bloco1;
	resposta_fase1_bloco1=document.querySelector("#jogo_fase1_bloco2_input").value;
	var resposta_fase1_bloco2_hora12;
	//console.log(horas_input[1]);
	resposta_fase1_bloco2_hora12=parseInt(horas_input[1])+12;	
	/*if(parseInt(horas_input[1]>=10)){
		var resposta_fase1_bloco2_hora12=parseInt(horas_input[1])+12;
		console.log(resposta_fase1_bloco2_hora12);
	}if(parseInt(horas_input[1]<10)){
		var resposta_fase1_bloco2_hora12=parseInt(horas_input[1].substring(0, 2))+12;
	}*/	
	//		
	//console.log(resposta_fase1_bloco1 + " / "+horas_input[1]+":"+minutos_input[1])
	if(resposta_fase1_bloco1==horas_input[1]+":"+minutos_input[1] || resposta_fase1_bloco1==resposta_fase1_bloco2_hora12+":"+minutos_input[1]){
		tentativas[1]="ok";audio_efeito_acerto.play();
		document.querySelector("#jogo_fase1_bloco2_input").readOnly = true;
		document.querySelector("#jogo_fase1_bloco2").style.backgroundImage= "url('./img/jogo_bloco_acerto.png')";
		document.querySelector("#jogo_fase1_bloco2_correto").style.display="inherit";
		document.querySelector("#jogo_fase1_bloco2_btn").style.display="none";
		//
		document.querySelector("#jogo_fase1_bloco2_correto").className="animacao_atraso_0 tada";
		document.querySelector("#jogo_fase1_bloco2_painel").className="animacao_atraso_0 tada";	
		document.querySelector("#jogo_fase1_bloco2_relogio").className="animacao_atraso_0 tada";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase1_bloco2_correto").className="animacao_atraso_0 rubberBand";
		}, 1000);		
	}else{
		tentativas[1]++;audio_efeito_erro.play();
		document.querySelector("#jogo_fase1_bloco2").style.backgroundImage= "url('./img/jogo_bloco_erro.png')";
		document.querySelector("#jogo_fase1_bloco2_incorreto").style.display="inherit";
		document.querySelector("#jogo_fase1_bloco2_incorreto").className="animacao_atraso_0 shake";
		document.querySelector("#jogo_fase1_bloco2_btn").style.display="none";
		document.querySelector("#jogo_fase1_bloco2_erro"+tentativas[1]).style.display="inherit";	
		document.querySelector("#jogo_fase1_bloco2_erro"+tentativas[1]).className="animacao_atraso_1s vanishIn";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase1_bloco2_incorreto").className="animacao_atraso_0 vanishOut";
			document.querySelector("#jogo_fase1_bloco2_btn").style.display="inherit";
		}, 2000);
		setTimeout(function(){ 
			document.querySelector("#jogo_fase1_bloco2_incorreto").style.display="none";
		}, 3000);		
		//console.log(tentativas);
		
	}
	verificar_tentativas();	
});
//
$("#jogo_fase1_bloco3_btn").click(function() {
	var resposta_fase1_bloco1;
	resposta_fase1_bloco1=document.querySelector("#jogo_fase1_bloco3_input").value;
	var resposta_fase1_bloco3_hora12;
	//console.log(horas_input[2]);
	resposta_fase1_bloco3_hora12=parseInt(horas_input[2])+12;	
	/*if(parseInt(horas_input[2]>=10)){
		var resposta_fase1_bloco3_hora12=parseInt(horas_input[2])+12;
		console.log(resposta_fase1_bloco3_hora12);
	}
	if(parseInt(horas_input[2]<10)){
		var resposta_fase1_bloco3_hora12=parseInt(horas_input[2].substring(0, 2))+12;
	}*/	
	//		
	//console.log(resposta_fase1_bloco1 + " / "+horas_input[2]+":"+minutos_input[2])
	if(resposta_fase1_bloco1==horas_input[2]+":"+minutos_input[2] || resposta_fase1_bloco1==resposta_fase1_bloco3_hora12+":"+minutos_input[2]){
		tentativas[2]="ok";audio_efeito_acerto.play();
		document.querySelector("#jogo_fase1_bloco3_input").readOnly = true;
		document.querySelector("#jogo_fase1_bloco3").style.backgroundImage= "url('./img/jogo_bloco_acerto.png')";
		document.querySelector("#jogo_fase1_bloco3_correto").style.display="inherit";
		document.querySelector("#jogo_fase1_bloco3_btn").style.display="none";
		//
		document.querySelector("#jogo_fase1_bloco3_correto").className="animacao_atraso_0 tada";
		document.querySelector("#jogo_fase1_bloco3_painel").className="animacao_atraso_0 tada";	
		document.querySelector("#jogo_fase1_bloco3_relogio").className="animacao_atraso_0 tada";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase1_bloco3_correto").className="animacao_atraso_0 rubberBand";
		}, 1000);		
	}else{
		tentativas[2]++;audio_efeito_erro.play();
		document.querySelector("#jogo_fase1_bloco3").style.backgroundImage= "url('./img/jogo_bloco_erro.png')";
		document.querySelector("#jogo_fase1_bloco3_incorreto").style.display="inherit";
		document.querySelector("#jogo_fase1_bloco3_incorreto").className="animacao_atraso_0 shake";
		document.querySelector("#jogo_fase1_bloco3_btn").style.display="none";
		document.querySelector("#jogo_fase1_bloco3_erro"+tentativas[2]).style.display="inherit";	
		document.querySelector("#jogo_fase1_bloco3_erro"+tentativas[2]).className="animacao_atraso_1s vanishIn";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase1_bloco3_incorreto").className="animacao_atraso_0 vanishOut";
			document.querySelector("#jogo_fase1_bloco3_btn").style.display="inherit";
		}, 2000);
		setTimeout(function(){ 
			document.querySelector("#jogo_fase1_bloco3_incorreto").style.display="none";
		}, 3000);		
		//console.log(tentativas);
		
	}
	verificar_tentativas();
});
//
$("#jogo_fase2_bloco1_btn").click(function() {
	var resposta_fase1_bloco1;
	resposta_fase1_bloco1=document.querySelector("#jogo_fase2_bloco1_input").value;
	var resposta_fase2_bloco1_hora12=parseInt(horas_input[3])+12;
	//			
	//console.log(resposta_fase1_bloco1 + " / "+horas_input[3]+":"+minutos_input[3])
	if(resposta_fase1_bloco1==horas_input[3]+":"+minutos_input[3] || resposta_fase1_bloco1==resposta_fase2_bloco1_hora12+":"+minutos_input[3]){
		tentativas[3]="ok";audio_efeito_acerto.play();
		document.querySelector("#jogo_fase2_bloco1_input").readOnly = true;
		document.querySelector("#jogo_fase2_bloco1").style.backgroundImage= "url('./img/jogo_bloco_acerto.png')";
		document.querySelector("#jogo_fase2_bloco1_correto").style.display="inherit";
		document.querySelector("#jogo_fase2_bloco1_btn").style.display="none";
		//
		document.querySelector("#jogo_fase2_bloco1_correto").className="animacao_atraso_0 tada";
		document.querySelector("#jogo_fase2_bloco1_painel").className="animacao_atraso_0 tada";	
		document.querySelector("#jogo_fase2_bloco1_relogio").className="animacao_atraso_0 tada";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase2_bloco1_correto").className="animacao_atraso_0 rubberBand";
		}, 1000);		
	}else{
		tentativas[3]++;audio_efeito_erro.play();
		document.querySelector("#jogo_fase2_bloco1").style.backgroundImage= "url('./img/jogo_bloco_erro.png')";
		document.querySelector("#jogo_fase2_bloco1_incorreto").style.display="inherit";
		document.querySelector("#jogo_fase2_bloco1_incorreto").className="animacao_atraso_0 shake";
		document.querySelector("#jogo_fase2_bloco1_btn").style.display="none";
		document.querySelector("#jogo_fase2_bloco1_erro"+tentativas[3]).style.display="inherit";	
		document.querySelector("#jogo_fase2_bloco1_erro"+tentativas[3]).className="animacao_atraso_1s vanishIn";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase2_bloco1_incorreto").className="animacao_atraso_0 vanishOut";
			document.querySelector("#jogo_fase2_bloco1_btn").style.display="inherit";
		}, 2000);
		setTimeout(function(){ 
			document.querySelector("#jogo_fase2_bloco1_incorreto").style.display="none";
		}, 3000);		
		//console.log(tentativas);
		
	}
	verificar_tentativas();
});
//
$("#jogo_fase2_bloco2_btn").click(function() {
	var resposta_fase1_bloco1;
	resposta_fase1_bloco1=document.querySelector("#jogo_fase2_bloco2_input").value;
	var resposta_fase2_bloco2_hora12=parseInt(horas_input[4])+12;
	//		
	//console.log(resposta_fase1_bloco1 + " / "+horas_input[4]+":"+minutos_input[4])
	if(resposta_fase1_bloco1==horas_input[4]+":"+minutos_input[4] || resposta_fase1_bloco1==resposta_fase2_bloco2_hora12+":"+minutos_input[4]){
		tentativas[4]="ok";audio_efeito_acerto.play();
		document.querySelector("#jogo_fase2_bloco2_input").readOnly = true;
		document.querySelector("#jogo_fase2_bloco2").style.backgroundImage= "url('./img/jogo_bloco_acerto.png')";
		document.querySelector("#jogo_fase2_bloco2_correto").style.display="inherit";
		document.querySelector("#jogo_fase2_bloco2_btn").style.display="none";
		//
		document.querySelector("#jogo_fase2_bloco2_correto").className="animacao_atraso_0 tada";
		document.querySelector("#jogo_fase2_bloco2_painel").className="animacao_atraso_0 tada";	
		document.querySelector("#jogo_fase2_bloco2_relogio").className="animacao_atraso_0 tada";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase2_bloco2_correto").className="animacao_atraso_0 rubberBand";
		}, 1000);		
	}else{
		tentativas[4]++;audio_efeito_erro.play();
		document.querySelector("#jogo_fase2_bloco2").style.backgroundImage= "url('./img/jogo_bloco_erro.png')";
		document.querySelector("#jogo_fase2_bloco2_incorreto").style.display="inherit";
		document.querySelector("#jogo_fase2_bloco2_incorreto").className="animacao_atraso_0 shake";
		document.querySelector("#jogo_fase2_bloco2_btn").style.display="none";
		document.querySelector("#jogo_fase2_bloco2_erro"+tentativas[4]).style.display="inherit";	
		document.querySelector("#jogo_fase2_bloco2_erro"+tentativas[4]).className="animacao_atraso_1s vanishIn";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase2_bloco2_incorreto").className="animacao_atraso_0 vanishOut";
			document.querySelector("#jogo_fase2_bloco2_btn").style.display="inherit";
		}, 2000);
		setTimeout(function(){ 
			document.querySelector("#jogo_fase2_bloco2_incorreto").style.display="none";
		}, 3000);		
		//console.log(tentativas);
		
	}
	verificar_tentativas();
});
//
$("#jogo_fase2_bloco3_btn").click(function() {
	var resposta_fase1_bloco1;
	resposta_fase1_bloco1=document.querySelector("#jogo_fase2_bloco3_input").value;
	var resposta_fase2_bloco3_hora12=parseInt(horas_input[5])+12;
	//		
	//console.log(resposta_fase1_bloco1 + " / "+horas_input[5]+":"+minutos_input[5])
	if(resposta_fase1_bloco1==horas_input[5]+":"+minutos_input[5] || resposta_fase1_bloco1==resposta_fase2_bloco3_hora12+":"+minutos_input[5]){
		tentativas[5]="ok";audio_efeito_acerto.play();
		document.querySelector("#jogo_fase2_bloco3_input").readOnly = true;
		document.querySelector("#jogo_fase2_bloco3").style.backgroundImage= "url('./img/jogo_bloco_acerto.png')";
		document.querySelector("#jogo_fase2_bloco3_correto").style.display="inherit";
		document.querySelector("#jogo_fase2_bloco3_btn").style.display="none";
		//
		document.querySelector("#jogo_fase2_bloco3_correto").className="animacao_atraso_0 tada";
		document.querySelector("#jogo_fase2_bloco3_painel").className="animacao_atraso_0 tada";	
		document.querySelector("#jogo_fase2_bloco3_relogio").className="animacao_atraso_0 tada";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase2_bloco3_correto").className="animacao_atraso_0 rubberBand";
		}, 1000);		
	}else{
		tentativas[5]++;audio_efeito_erro.play();
		document.querySelector("#jogo_fase2_bloco3").style.backgroundImage= "url('./img/jogo_bloco_erro.png')";
		document.querySelector("#jogo_fase2_bloco3_incorreto").style.display="inherit";
		document.querySelector("#jogo_fase2_bloco3_incorreto").className="animacao_atraso_0 shake";
		document.querySelector("#jogo_fase2_bloco3_btn").style.display="none";
		document.querySelector("#jogo_fase2_bloco3_erro"+tentativas[5]).style.display="inherit";	
		document.querySelector("#jogo_fase2_bloco3_erro"+tentativas[5]).className="animacao_atraso_1s vanishIn";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase2_bloco3_incorreto").className="animacao_atraso_0 vanishOut";
			document.querySelector("#jogo_fase2_bloco3_btn").style.display="inherit";
		}, 2000);
		setTimeout(function(){ 
			document.querySelector("#jogo_fase2_bloco3_incorreto").style.display="none";
		}, 3000);		
		//console.log(tentativas);
		
	}
	verificar_tentativas();
});
//
$("#jogo_fase3_bloco1_btn").click(function() {
	var resposta_fase1_bloco1;
	resposta_fase1_bloco1=document.querySelector("#jogo_fase3_bloco1_input").value;
	var resposta_fase3_bloco1_hora12=parseInt(horas_input[6])+12;
	//console.log(horas_input[6]+":"+minutos_input[6]);
	//
	//console.log(resposta_fase1_bloco1 + " / "+horas_input[6]+":"+minutos_input[6])
	if(resposta_fase1_bloco1==horas_input[6]+":"+minutos_input[6] || resposta_fase1_bloco1==resposta_fase3_bloco1_hora12+":"+minutos_input[6]){
		tentativas[6]="ok";audio_efeito_acerto.play();
		document.querySelector("#jogo_fase3_bloco1_input").readOnly = true;
		document.querySelector("#jogo_fase3_bloco1").style.backgroundImage= "url('./img/jogo_bloco_acerto.png')";
		document.querySelector("#jogo_fase3_bloco1_correto").style.display="inherit";
		document.querySelector("#jogo_fase3_bloco1_btn").style.display="none";
		//
		document.querySelector("#jogo_fase3_bloco1_correto").className="animacao_atraso_0 tada";
		document.querySelector("#jogo_fase3_bloco1_painel").className="animacao_atraso_0 tada";	
		document.querySelector("#jogo_fase3_bloco1_relogio").className="animacao_atraso_0 tada";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase3_bloco1_correto").className="animacao_atraso_0 rubberBand";
		}, 1000);		
	}else{
		tentativas[6]++;audio_efeito_erro.play();
		document.querySelector("#jogo_fase3_bloco1").style.backgroundImage= "url('./img/jogo_bloco_erro.png')";
		document.querySelector("#jogo_fase3_bloco1_incorreto").style.display="inherit";
		document.querySelector("#jogo_fase3_bloco1_incorreto").className="animacao_atraso_0 shake";
		document.querySelector("#jogo_fase3_bloco1_btn").style.display="none";
		document.querySelector("#jogo_fase3_bloco1_erro"+tentativas[6]).style.display="inherit";	
		document.querySelector("#jogo_fase3_bloco1_erro"+tentativas[6]).className="animacao_atraso_1s vanishIn";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase3_bloco1_incorreto").className="animacao_atraso_0 vanishOut";
			document.querySelector("#jogo_fase3_bloco1_btn").style.display="inherit";
		}, 2000);
		setTimeout(function(){ 
			document.querySelector("#jogo_fase3_bloco1_incorreto").style.display="none";
		}, 3000);		
		//console.log(tentativas);
		
	}
	verificar_tentativas();
});
//
$("#jogo_fase3_bloco2_btn").click(function() {
	var resposta_fase1_bloco1;
	resposta_fase1_bloco1=document.querySelector("#jogo_fase3_bloco2_input").value;
	var resposta_fase3_bloco2_hora12=parseInt(horas_input[7])+12;
	//		
	//console.log(resposta_fase1_bloco1 + " / "+horas_input[7]+":"+minutos_input[7])
	if(resposta_fase1_bloco1==horas_input[7]+":"+minutos_input[7] || resposta_fase1_bloco1==resposta_fase3_bloco2_hora12+":"+minutos_input[7]){
		tentativas[7]="ok";audio_efeito_acerto.play();
		document.querySelector("#jogo_fase3_bloco2_input").readOnly = true;
		document.querySelector("#jogo_fase3_bloco2").style.backgroundImage= "url('./img/jogo_bloco_acerto.png')";
		document.querySelector("#jogo_fase3_bloco2_correto").style.display="inherit";
		document.querySelector("#jogo_fase3_bloco2_btn").style.display="none";
		//
		document.querySelector("#jogo_fase3_bloco2_correto").className="animacao_atraso_0 tada";
		document.querySelector("#jogo_fase3_bloco2_painel").className="animacao_atraso_0 tada";	
		document.querySelector("#jogo_fase3_bloco2_relogio").className="animacao_atraso_0 tada";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase3_bloco2_correto").className="animacao_atraso_0 rubberBand";
		}, 1000);		
	}else{
		tentativas[7]++;audio_efeito_erro.play();
		document.querySelector("#jogo_fase3_bloco2").style.backgroundImage= "url('./img/jogo_bloco_erro.png')";
		document.querySelector("#jogo_fase3_bloco2_incorreto").style.display="inherit";
		document.querySelector("#jogo_fase3_bloco2_incorreto").className="animacao_atraso_0 shake";
		document.querySelector("#jogo_fase3_bloco2_btn").style.display="none";
		document.querySelector("#jogo_fase3_bloco2_erro"+tentativas[7]).style.display="inherit";	
		document.querySelector("#jogo_fase3_bloco2_erro"+tentativas[7]).className="animacao_atraso_1s vanishIn";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase3_bloco2_incorreto").className="animacao_atraso_0 vanishOut";
			document.querySelector("#jogo_fase3_bloco2_btn").style.display="inherit";
		}, 2000);
		setTimeout(function(){ 
			document.querySelector("#jogo_fase3_bloco2_incorreto").style.display="none";
		}, 3000);		
		//console.log(tentativas);
		
	}
	verificar_tentativas();
});
//
$("#jogo_fase3_bloco3_btn").click(function() {
	var resposta_fase1_bloco1;
	resposta_fase1_bloco1=document.querySelector("#jogo_fase3_bloco3_input").value;
	var resposta_fase3_bloco3_hora12=parseInt(horas_input[8])+12;
	//console.log(resposta_fase1_bloco1 + " / "+horas_input[8]+":"+minutos_input[8])
	if(resposta_fase1_bloco1==horas_input[8]+":"+minutos_input[8] || resposta_fase1_bloco1==resposta_fase3_bloco3_hora12+":"+minutos_input[8]){
		tentativas[8]="ok";audio_efeito_acerto.play();
		document.querySelector("#jogo_fase3_bloco3_input").readOnly = true;
		document.querySelector("#jogo_fase3_bloco3").style.backgroundImage= "url('./img/jogo_bloco_acerto.png')";
		document.querySelector("#jogo_fase3_bloco3_correto").style.display="inherit";
		document.querySelector("#jogo_fase3_bloco3_btn").style.display="none";
		//
		document.querySelector("#jogo_fase3_bloco3_correto").className="animacao_atraso_0 tada";
		document.querySelector("#jogo_fase3_bloco3_painel").className="animacao_atraso_0 tada";	
		document.querySelector("#jogo_fase3_bloco3_relogio").className="animacao_atraso_0 tada";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase3_bloco3_correto").className="animacao_atraso_0 rubberBand";
		}, 1000);		
	}else{
		tentativas[8]++;audio_efeito_erro.play();
		document.querySelector("#jogo_fase3_bloco3").style.backgroundImage= "url('./img/jogo_bloco_erro.png')";
		document.querySelector("#jogo_fase3_bloco3_incorreto").style.display="inherit";
		document.querySelector("#jogo_fase3_bloco3_incorreto").className="animacao_atraso_0 shake";
		document.querySelector("#jogo_fase3_bloco3_btn").style.display="none";
		document.querySelector("#jogo_fase3_bloco3_erro"+tentativas[8]).style.display="inherit";	
		document.querySelector("#jogo_fase3_bloco3_erro"+tentativas[8]).className="animacao_atraso_1s vanishIn";
		setTimeout(function(){ 
			document.querySelector("#jogo_fase3_bloco3_incorreto").className="animacao_atraso_0 vanishOut";
			document.querySelector("#jogo_fase3_bloco3_btn").style.display="inherit";
		}, 2000);
		setTimeout(function(){ 
			document.querySelector("#jogo_fase3_bloco3_incorreto").style.display="none";
		}, 3000);		
		//console.log(tentativas);
		
	}
	verificar_tentativas();
});
//
/* Ajustes para os campos de texto */
function selecionar_campo_escolhido(campo_id){
	document.querySelector("#"+campo_id).select();
}
	var valor_hora_campo;
	var horas_inseridas;
	var minutos_inseridas;
	var pos_1;
	var pos_2;

function formatar_hora_lacuna(campo_id){
	//console.log(document.querySelector("#"+campo_id).value.length);
	//
	document.querySelector("#"+campo_id).maxLength = "5";
	//
	setTimeout(function(){
		/*if(document.querySelector("#"+campo_id).value.length==3){
			
				valor_hora_campo=document.querySelector("#"+campo_id).value;
				//valor_hora_campo="1234";
				horas_inseridas=valor_hora_campo.substr(0, 1);
				minutos_inseridas=valor_hora_campo.substr(1,2);
				//
				pos_1=valor_hora_campo.indexOf(":");
				pos_2=valor_hora_campo.lastIndexOf(":");
				//
				console.log(":>Inicial "+pos_1+" :>final "+pos_2)
				//console.log(horas_inseridas+":"+minutos_inseridas);
				if(pos_1==-1 && pos_2==-1){
					document.querySelector("#"+campo_id).maxLength = "5";
					document.querySelector("#"+campo_id).value="0"+horas_inseridas+":"+minutos_inseridas;
				}

		
		}*/		
		if(document.querySelector("#"+campo_id).value.length==4){
				valor_hora_campo=document.querySelector("#"+campo_id).value;
				//valor_hora_campo="1234";
				horas_inseridas=valor_hora_campo.substr(0, 2);
				minutos_inseridas=valor_hora_campo.substr(2,2);
				//
				pos_1=valor_hora_campo.indexOf(":");
				pos_2=valor_hora_campo.lastIndexOf(":");
				//			
				//console.log(":>Inicial "+pos_1+" :>final "+pos_2)
				//console.log(horas_inseridas+":"+minutos_inseridas);
				if(pos_1==-1 && pos_2==-1){
					document.querySelector("#"+campo_id).maxLength = "5";
					document.querySelector("#"+campo_id).value=horas_inseridas+":"+minutos_inseridas;
				}
				if(pos_1==1 && pos_2==1){
					document.querySelector("#"+campo_id).maxLength = "5";
					document.querySelector("#"+campo_id).value="0"+horas_inseridas+minutos_inseridas;
				}
				
		}
		
	}, 500);
}

$("input").keypress(function() {
	return inserir_apenas_numeros (event);
});



function inserir_apenas_numeros(chamada){
    var codigo_teclado=(window.event)?event.keyCode:chamada.which;   
    if((codigo_teclado>47 && codigo_teclado<59)) return true;
    else{
    	if (codigo_teclado==8 || codigo_teclado==0) return true;
	else  return false;
    }
}
/* Devolutivas: passagem de etapas */
$("#devolutiva_btn_continuar1").click(function() {
	parar_todos_audios();
	document.querySelector("#devolutiva_fundo").className="animacao_atraso_0 vanishOut";	
	document.querySelector("#devolutiva_area_com_botao").className="animacao_atraso_0 bounceOutDown";		
	document.querySelector("#devolutiva_area_texto_acerto").className="animacao_atraso_0 bounceOutRight";			
	document.querySelector("#devolutiva_btn_continuar1").className="animacao_atraso_0 bounceOutLeft";			

	//
	setTimeout(function(){
		document.querySelector("#devolutiva_area").style.display="none";	
		document.querySelector("#devolutiva_area_com_botao").style.display="none";	
		document.querySelector("#devolutiva_area_texto_acerto").style.display="none";	
		document.querySelector("#devolutiva_btn_continuar1").style.display="none";		
	}, 1000);
	setTimeout(function(){
		movimento_entrada_jogo_fase2();		
	}, 500);		
	
});

$("#devolutiva_btn_continuar2").click(function() {
	parar_todos_audios();	
	document.querySelector("#devolutiva_fundo").className="animacao_atraso_0 vanishOut";	
	document.querySelector("#devolutiva_area_com_botao").className="animacao_atraso_0 bounceOutDown";		
	document.querySelector("#devolutiva_area_texto_acerto").className="animacao_atraso_0 bounceOutRight";			
	document.querySelector("#devolutiva_btn_continuar2").className="animacao_atraso_0 bounceOutLeft";			

	//
	setTimeout(function(){
		document.querySelector("#devolutiva_area").style.display="none";	
		document.querySelector("#devolutiva_area_com_botao").style.display="none";	
		document.querySelector("#devolutiva_area_texto_acerto").style.display="none";	
		document.querySelector("#devolutiva_btn_continuar2").style.display="none";		
	}, 1000);
	setTimeout(function(){
		movimento_entrada_jogo_fase3();		
	}, 500);		
	
});

$("#devolutiva_btn_recomecar").click(function() {
	sessionStorage.setItem('reiniciar_oed', 'sim');	
});

/* Voltar ao tutorial */
$("#jogos_btn_tutorial").click(function() {
	TrocaInstrucao('Clique nas setas para avançar ou voltar os passos do tutorial.');
	document.querySelector("#jogo_fase"+fase_atual+"_area").className="animacao_atraso_0 slideOutRight";
	document.querySelector("#jogos_titulo_topo").className="animacao_atraso_0 fadeOut";
	document.querySelector("#jogos_btn_tutorial").className="animacao_atraso_0 fadeOut";
	//
	document.querySelector("#jogo_fase"+fase_atual+"_bloco1").className="animacao_atraso_0 bounceOutLeft";
	document.querySelector("#jogo_fase"+fase_atual+"_bloco2").className="animacao_atraso_0 bounceOutLeft";	
	document.querySelector("#jogo_fase"+fase_atual+"_bloco3").className="animacao_atraso_0 bounceOutLeft";	
	//
	document.querySelector("#tutorial_area").style.display="inherit";
	document.querySelector("#tutorial_area").className="animacao_atraso_0 slideInRight";
	fase_tutorial=1;
	controle_fases_tutorial();
	document.querySelector("#tutorial_btn_avancar").style.display="inherit";	
	document.querySelector("#tutorial_btn_avancar").className="animacao_atraso_1 bounceInRight";
	
	setTimeout(function(){ 
		document.querySelector("#jogo_fase"+fase_atual+"_area").style.display="none";
		document.querySelector("#jogos_titulo_topo").style.display="none";
		document.querySelector("#jogos_btn_tutorial").style.display="none";
		//
		document.querySelector("#jogo_fase"+fase_atual+"_area").className="nada";
		document.querySelector("#jogos_titulo_topo").className="nada";
		document.querySelector("#jogos_btn_tutorial").className="nada";	
	}, 1000);	
	
	
});

function verificar_tentativas(){
	// Fase 1
	if(tentativas[0]=="ok" && tentativas[1]=="ok" && tentativas[2]=="ok"){
		movimento_entrada_devolutiva_fase1();
		tentativas[0]=0;
	}
	// Fase 2
	if(tentativas[3]=="ok" && tentativas[4]=="ok" && tentativas[5]=="ok"){
		movimento_entrada_devolutiva_fase2();
		tentativas[3]=0;
	}
	// Fase 3
	if(tentativas[6]=="ok" && tentativas[7]=="ok" && tentativas[8]=="ok"){
		movimento_entrada_devolutiva_fase3();
		tentativas[6]=0;
	}
	// Erros
	if(tentativas[0]>=4 || tentativas[1]>=4 || tentativas[2]>=4 || tentativas[3]>=4 || tentativas[4]>=4 || tentativas[5]>=4 || tentativas[6]>=4 || tentativas[7]>=4 || tentativas[8]>=4){
		//alert("Erros!")
	TrocaInstrucao('Clique no botão Recomeçar para jogar novamente.');
	sessionStorage.setItem('reiniciar_oed', 'sem_instrucao');
	audio_trilha_sonora.stop();
	audio_narracao_conclusao_erro.play("audio_narracao_conclusao_erro_corte1");
	document.querySelector("#jogo_fase1_area").className="escala_cinza animacao_atraso_conclusao zoomOut";
	document.querySelector("#jogo_fase2_area").className="escala_cinza animacao_atraso_conclusao zoomOut";
	document.querySelector("#jogo_fase3_area").className="escala_cinza animacao_atraso_conclusao zoomOut";
	//
	document.querySelector("#devolutiva_area").style.display="inherit";
	document.querySelector("#devolutiva_fundo").className="animacao_atraso_0 vanishIn";	
	//
	document.querySelector("#txt_final_ok").style.display="none";	
	document.querySelector("#devolutiva_area_com_botao").style.display="none";	
	document.querySelector("#devolutiva_area_sem_botao").style.display="inherit";	
	document.querySelector("#devolutiva_area_texto_erro").style.display="inherit";	
	document.querySelector("#devolutiva_btn_recomecar").style.display="none";	
	//
	document.querySelector("#devolutiva_area_sem_botao").className="animacao_atraso_1 bounceInUp";		
	document.querySelector("#devolutiva_area_texto_erro").className="animacao_atraso_1 bounceInDown";			
	//document.querySelector("#devolutiva_btn_recomecar").className="animacao_atraso_1 bounceInLeft";
	setTimeout(function(){
			sessionStorage.setItem('reiniciar_oed', 'sim');
	}, 8000);		
	}
}


function gerar_horas_fase1(){
		selecionar_hora1_relogio1=Math.floor((Math.random()*11))+1;
		selecionar_minuto1_relogio1="00";
		horas[0]=selecionar_hora1_relogio1;	
		minutos[0]=selecionar_minuto1_relogio1;
		if(selecionar_hora1_relogio1<10){
			selecionar_hora1_relogio1="0"+selecionar_hora1_relogio1;
		}		
		//		
		horas_input[0]=selecionar_hora1_relogio1;
		minutos_input[0]=selecionar_minuto1_relogio1;		
		//-
		selecionar_hora1_relogio2=Math.floor((Math.random()*11))+1;
		selecionar_minuto1_relogio2="00";		
		horas[1]=selecionar_hora1_relogio2;		
		minutos[1]=selecionar_minuto1_relogio2;		
		if(selecionar_hora1_relogio2<10){
			selecionar_hora1_relogio2="0"+selecionar_hora1_relogio2;
		}		
		//			
		horas_input[1]=selecionar_hora1_relogio2;		
		minutos_input[1]=selecionar_minuto1_relogio2;
		//-
		selecionar_hora1_relogio3=Math.floor((Math.random()*11))+1;
		selecionar_minuto1_relogio3="00";
		horas[2]=selecionar_hora1_relogio3;	
		minutos[2]=selecionar_minuto1_relogio3;			
		if(selecionar_hora1_relogio3<10){
			selecionar_hora1_relogio3="0"+selecionar_hora1_relogio3;
		}		
		//
		horas_input[2]=selecionar_hora1_relogio3;	
		minutos_input[2]=selecionar_minuto1_relogio3;			
		//		
		//console.log(selecionar_hora1_relogio1+":"+selecionar_minuto1_relogio1);	
		//console.log(selecionar_hora1_relogio2+":"+selecionar_minuto1_relogio2);
		//console.log(selecionar_hora1_relogio3+":"+selecionar_minuto1_relogio3);
		//console.log( " - - - - - - - - - - - ");
		//
		if(selecionar_hora1_relogio1==selecionar_hora1_relogio2 || selecionar_hora1_relogio1==selecionar_hora1_relogio3 || selecionar_hora1_relogio2==selecionar_hora1_relogio3){
			//alert("Iguais!");
			gerar_horas_fase1();
		}
}

function gerar_horas_fase2(){
		selecionar_hora2_relogio1=Math.floor((Math.random()*11))+1;
		//selecionar_minuto2_relogio1=Math.floor((Math.random() * 60));
		selecionar_minuto2_relogio1="30";
		minutos[3]=selecionar_minuto2_relogio1;	
		horas[3]=selecionar_hora2_relogio1;			
		if(selecionar_minuto2_relogio1<10){
			selecionar_minuto2_relogio1="0"+selecionar_minuto2_relogio1;
		}
		if(selecionar_hora2_relogio1<10){
			selecionar_hora2_relogio1="0"+selecionar_hora2_relogio1;
		}
		minutos_input[3]=selecionar_minuto2_relogio1;	
		horas_input[3]=selecionar_hora2_relogio1;				
		//-
		selecionar_hora2_relogio2=Math.floor((Math.random()*11))+1;
		//selecionar_minuto2_relogio2=Math.floor((Math.random() * 60));
		selecionar_minuto2_relogio2="30";
		minutos[4]=selecionar_minuto2_relogio2;		
		horas[4]=selecionar_hora2_relogio2;	
		if(selecionar_minuto2_relogio2<10){
			selecionar_minuto2_relogio2="0"+selecionar_minuto2_relogio2;
		}
		if(selecionar_hora2_relogio2<10){
			selecionar_hora2_relogio2="0"+selecionar_hora2_relogio2;
		}
		minutos_input[4]=selecionar_minuto2_relogio2;		
		horas_input[4]=selecionar_hora2_relogio2;			
		//-
		selecionar_hora2_relogio3=Math.floor((Math.random()*11))+1;
		//selecionar_minuto2_relogio3=Math.floor((Math.random() * 60));
		selecionar_minuto2_relogio3="30";		
		minutos[5]=selecionar_minuto2_relogio3;	
		horas[5]=selecionar_hora2_relogio3;			
		if(selecionar_minuto2_relogio3<10){
			selecionar_minuto2_relogio3="0"+selecionar_minuto2_relogio3;
		}
		if(selecionar_hora2_relogio3<10){
			selecionar_hora2_relogio3="0"+selecionar_hora2_relogio3;
		}
		minutos_input[5]=selecionar_minuto2_relogio3;	
		horas_input[5]=selecionar_hora2_relogio3;			
		//-	
		//console.log(selecionar_hora2_relogio1+":"+selecionar_minuto2_relogio1);	
		//console.log(selecionar_hora2_relogio2+":"+selecionar_minuto2_relogio2);
		//console.log(selecionar_hora2_relogio3+":"+selecionar_minuto2_relogio3);
		//console.log( " - - - - - - - - - - - ");
		//
		if(selecionar_hora2_relogio1==selecionar_hora2_relogio2 || selecionar_hora2_relogio1==selecionar_hora2_relogio3 || selecionar_hora2_relogio2==selecionar_hora2_relogio3){
			//alert("Iguais!");
			gerar_horas_fase2();
		}
}


function gerar_horas_fase3(){
		selecionar_hora3_relogio1=Math.floor((Math.random()*11))+1;
		selecionar_minuto3_relogio1=Math.floor((Math.random()*11))+1;
		selecionar_minuto3_relogio1=selecionar_minuto3_relogio1*5;
		//
		minutos[6]=selecionar_minuto3_relogio1;
		horas[6]=selecionar_hora3_relogio1;		
		if(selecionar_minuto3_relogio1<10){
			selecionar_minuto3_relogio1="0"+selecionar_minuto3_relogio1;
		}
		if(selecionar_hora3_relogio1<10){
			selecionar_hora3_relogio1="0"+selecionar_hora3_relogio1;
		}		
		minutos_input[6]=selecionar_minuto3_relogio1;
		horas_input[6]=selecionar_hora3_relogio1;			
		//
		selecionar_hora3_relogio2=Math.floor((Math.random()*11))+1;
		selecionar_minuto3_relogio2=Math.floor((Math.random()*11))+1;
		selecionar_minuto3_relogio2=selecionar_minuto3_relogio2*5;
		horas[7]=selecionar_hora3_relogio2;
		minutos[7]=selecionar_minuto3_relogio2;
		if(selecionar_minuto3_relogio2<10){
			selecionar_minuto3_relogio2="0"+selecionar_minuto3_relogio2;
		}
		if(selecionar_hora3_relogio2<10){
			selecionar_hora3_relogio2="0"+selecionar_hora3_relogio2;
		}		
		minutos_input[7]=selecionar_minuto3_relogio2;
		horas_input[7]=selecionar_hora3_relogio2;	
		//
		selecionar_hora3_relogio3=Math.floor((Math.random()*11))+1;
		selecionar_minuto3_relogio3=Math.floor((Math.random()*11))+1;
		selecionar_minuto3_relogio3=selecionar_minuto3_relogio3*5;
		minutos[8]=selecionar_minuto3_relogio3;	
		horas[8]=selecionar_hora3_relogio3;	
		if(selecionar_minuto3_relogio3<10){
			selecionar_minuto3_relogio3="0"+selecionar_minuto3_relogio3;
		}
		if(selecionar_hora3_relogio3<10){
			selecionar_hora3_relogio3="0"+selecionar_hora3_relogio3;
		}			
		minutos_input[8]=selecionar_minuto3_relogio3;
		horas_input[8]=selecionar_hora3_relogio3;		
		//	
		if(selecionar_hora3_relogio1==selecionar_hora3_relogio2 || selecionar_hora3_relogio1==selecionar_hora3_relogio3 || selecionar_hora3_relogio2==selecionar_hora3_relogio3){
			//alert("Iguais!");
			gerar_horas_fase3();
		}
		//console.log(selecionar_hora3_relogio1+":"+selecionar_minuto3_relogio1);	
		//console.log(selecionar_hora3_relogio2+":"+selecionar_minuto3_relogio2);
		//console.log(selecionar_hora3_relogio3+":"+selecionar_minuto3_relogio3);
		//console.log( " - - - - - - - - - - - ");
		//		
}

function controle_fases_tutorial(){
	//console.log("Fase "+fase_tutorial);
	if(fase_tutorial==99){
	setTimeout(function(){
		parar_todos_audios();
		audio_narracao_tutorial_passo1.play("audio_narracao_tutorial_passo1_corte1");
		document.querySelector("#tutorial_imagem_explica_fase1").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";
		document.querySelector("#tutorial_imagem_explica_fase2").style.display="inherit";
		document.querySelector("#tutorial_imagem_explica_fase2").className="tutorial_imagem_explica animacao_atraso_0 fadeIn";
		//
		document.querySelector("#tutorial_bloco_passo1").style.display="inherit";
		document.querySelector("#tutorial_seta_passo1").style.display="inherit";		
		document.querySelector("#tutorial_bloco_passo1").className="tutorial_imagem_explica animacao_atraso_0 bounceInUp";	
		document.querySelector("#tutorial_seta_passo1").className="tutorial_imagem_explica animacao_atraso_0 zoomInUp";
		//
		fase_tutorial=1;
	}, 1000);			
		document.querySelector("#tutorial_bloco_passo2").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_seta_passo2").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_imagem_explica_fase3").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";		
		//	
	}
//

	if(fase_tutorial==1){
		parar_todos_audios();
		audio_narracao_tutorial_passo1.play("audio_narracao_tutorial_passo1_corte1")
		//		
		document.querySelector("#tutorial_btn_retornar").className="animacao_atraso_0 bounceOutLeft";
		//
		document.querySelector("#tutorial_imagem_explica_fase1").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";
		document.querySelector("#tutorial_imagem_explica_fase2").style.display="inherit";
		document.querySelector("#tutorial_imagem_explica_fase2").className="tutorial_imagem_explica animacao_atraso_0 fadeIn";
		//
		document.querySelector("#tutorial_bloco_passo1").style.display="inherit";
		document.querySelector("#tutorial_seta_passo1").style.display="inherit";		
		document.querySelector("#tutorial_bloco_passo1").className="tutorial_imagem_explica animacao_atraso_0 bounceInUp";	
		document.querySelector("#tutorial_seta_passo1").className="tutorial_imagem_explica animacao_atraso_0 zoomInUp";		
		//
		document.querySelector("#tutorial_bloco_passo2").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_seta_passo2").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_imagem_explica_fase3").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";		
		//	
	}
	if(fase_tutorial==2){
		parar_todos_audios();
		audio_narracao_tutorial_passo2.play("audio_narracao_tutorial_passo2_corte1")
		//
		document.querySelector("#tutorial_btn_retornar").style.display="inherit";	
		document.querySelector("#tutorial_btn_retornar").className="animacao_atraso_0 bounceInLeft";		
		//
		document.querySelector("#tutorial_bloco_passo1").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_seta_passo1").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_imagem_explica_fase2").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";
		//
		document.querySelector("#tutorial_bloco_passo3").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_seta_passo3").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_imagem_explica_fase4").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";	
		//		
		document.querySelector("#tutorial_imagem_explica_fase3").style.display="inherit";	
		document.querySelector("#tutorial_imagem_explica_fase3").className="tutorial_imagem_explica animacao_atraso_0 fadeIn";
		//
		document.querySelector("#tutorial_bloco_passo2").style.display="inherit";
		document.querySelector("#tutorial_seta_passo2").style.display="inherit";		
		document.querySelector("#tutorial_bloco_passo2").className="tutorial_imagem_explica animacao_atraso_0 bounceInUp";	
		document.querySelector("#tutorial_seta_passo2").className="tutorial_imagem_explica animacao_atraso_0 zoomInUp";			
	}	
//
	if(fase_tutorial==3){
		parar_todos_audios();
		audio_narracao_tutorial_passo3.play("audio_narracao_tutorial_passo3_corte1")
		//		
		document.querySelector("#tutorial_btn_avancar").className="animacao_atraso_0 bounceInRight";	
		//
		document.querySelector("#tutorial_bloco_passo2").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_seta_passo2").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_imagem_explica_fase3").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";
		//
		document.querySelector("#tutorial_bloco_passo4").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_seta_passo4").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_imagem_explica_fase5").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";	
		//		
		document.querySelector("#tutorial_imagem_explica_fase4").style.display="inherit";	
		document.querySelector("#tutorial_imagem_explica_fase4").className="tutorial_imagem_explica animacao_atraso_0 fadeIn";
		//
		document.querySelector("#tutorial_bloco_passo3").style.display="inherit";
		document.querySelector("#tutorial_seta_passo3").style.display="inherit";		
		document.querySelector("#tutorial_bloco_passo3").className="tutorial_imagem_explica animacao_atraso_0 bounceInUp";	
		document.querySelector("#tutorial_seta_passo3").className="tutorial_imagem_explica animacao_atraso_0 zoomInUp";	
		//
		document.querySelector("#tutorial_btn_jogar").className="animacao_atraso_0 slideOutRight";	
	}		
//
	if(fase_tutorial==4){
		parar_todos_audios();
		audio_narracao_tutorial_passo4.play("audio_narracao_tutorial_passo4_corte1")
		//			
		document.querySelector("#tutorial_btn_avancar").className="animacao_atraso_0 bounceOutRight";	
		//
		document.querySelector("#tutorial_bloco_passo3").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_seta_passo3").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_imagem_explica_fase4").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";
		//
		//document.querySelector("#tutorial_bloco_passo5").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		//document.querySelector("#tutorial_seta_passo5").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		//document.querySelector("#tutorial_imagem_explica_fase3").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";	
		//
		document.querySelector("#tutorial_btn_jogar").style.display="inherit";
		document.querySelector("#tutorial_btn_jogar").className="animacao_atraso_0 slideInRight";	
		//	
		document.querySelector("#tutorial_imagem_explica_fase5").style.display="inherit";	
		document.querySelector("#tutorial_imagem_explica_fase5").className="tutorial_imagem_explica animacao_atraso_0 fadeIn";
		//
		document.querySelector("#tutorial_bloco_passo4").style.display="inherit";
		document.querySelector("#tutorial_seta_passo4").style.display="inherit";		
		document.querySelector("#tutorial_bloco_passo4").className="tutorial_imagem_explica animacao_atraso_0 bounceInUp";	
		document.querySelector("#tutorial_seta_passo4").className="tutorial_imagem_explica animacao_atraso_0 zoomInUp";			
	}	
}



/* Abaixo, funções para movimentos e animações */
function movimento_saida_inicial(){
	document.querySelector("#incial_fundo").className="animacao_atraso_0 slideOutLeft";
	document.querySelector("#incial_area_texto").className="animacao_atraso_0 bounceOutRight";
	//
	setTimeout(function(){
		document.querySelector("#incial_area").style.display="none";
	}, 1000);	
}

function movimento_entrada_tutorial(){
	TrocaInstrucao('Clique nas setas para avançar ou voltar os passos do tutorial.');
	document.querySelector("#tutorial_area").style.display="inherit";
	document.querySelector("#tutorial_imagem_explica_fase1").style.display="inherit";
	document.querySelector("#tutorial_imagem_explica_fase1").className="tutorial_imagem_explica animacao_atraso_0 fadeInUp";
	//
	document.querySelector("#tutorial_btn_avancar").style.display="inherit";	
	document.querySelector("#tutorial_btn_avancar").className="animacao_atraso_1 bounceInRight";
	fase_tutorial=99;
	controle_fases_tutorial();
}

function movimento_saida_tutorial(){
	document.querySelector("#tutorial_area").className="animacao_atraso_0 slideOutRight";
	setTimeout(function(){
		document.querySelector("#tutorial_area").style.display="none";
		//
		document.querySelector("#tutorial_bloco_passo4").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_seta_passo4").className="tutorial_imagem_explica animacao_atraso_0 bounceOutLeft";	
		document.querySelector("#tutorial_imagem_explica_fase5").className="tutorial_imagem_explica animacao_atraso_0 fadeOut";			
		document.querySelector("#tutorial_btn_jogar").className="animacao_atraso_0 slideOutRight";
	}, 1000);			
}

function movimento_entrada_devolutiva_fase1(){
	audio_narracao_proxima_fase .play("audio_narracao_proxima_fase_corte1");	
	TrocaInstrucao('Clique na seta para prosseguir à próxima fase.');
	document.querySelector("#jogo_fase1_area").className="escala_cinza animacao_atraso_conclusao zoomOut";
	document.querySelector("#devolutiva_area").style.display="inherit";
	document.querySelector("#devolutiva_fundo").className="animacao_atraso_0 vanishIn";	
	//
	document.querySelector("#devolutiva_area_com_botao").style.display="inherit";	
	document.querySelector("#devolutiva_area_texto_acerto").style.display="inherit";	
	document.querySelector("#devolutiva_btn_continuar1").style.display="inherit";	
	//
	document.querySelector("#devolutiva_area_com_botao").className="animacao_atraso_1 bounceInUp";		
	document.querySelector("#devolutiva_area_texto_acerto").className="animacao_atraso_1 bounceInRight";			
	document.querySelector("#devolutiva_btn_continuar1").className="animacao_atraso_1 bounceInLeft";			
	//movimento_entrada_jogo_fase2();
}

function movimento_entrada_devolutiva_fase2(){
	audio_narracao_proxima_fase .play("audio_narracao_proxima_fase_corte1");
	TrocaInstrucao('Clique na seta para prosseguir à próxima fase.');
	document.querySelector("#jogo_fase2_area").className="escala_cinza animacao_atraso_conclusao zoomOut";
	document.querySelector("#devolutiva_area").style.display="inherit";
	document.querySelector("#devolutiva_fundo").className="animacao_atraso_0 vanishIn";	
	//
	document.querySelector("#devolutiva_area_com_botao").style.display="inherit";	
	document.querySelector("#devolutiva_area_texto_acerto").style.display="inherit";	
	document.querySelector("#devolutiva_btn_continuar2").style.display="inherit";	
	//
	document.querySelector("#devolutiva_area_com_botao").className="animacao_atraso_1 bounceInUp";		
	document.querySelector("#devolutiva_area_texto_acerto").className="animacao_atraso_1 bounceInRight";			
	document.querySelector("#devolutiva_btn_continuar2").className="animacao_atraso_1 bounceInLeft";	
	//movimento_entrada_jogo_fase3();
}

function movimento_entrada_devolutiva_fase3(){
	audio_narracao_conclusao_acerto.play("audio_narracao_conclusao_acerto_corte1");
	document.querySelector("#devolutiva_area").style.display="inherit";
	document.querySelector("#devolutiva_fundo").className="animacao_atraso_0 vanishIn";	
	//
	document.querySelector("#devolutiva_area_sem_botao").style.display="inherit";	
	document.querySelector("#devolutiva_area_texto_sem_botao").style.display="inherit";	
	//
	document.querySelector("#devolutiva_area_sem_botao").className="animacao_atraso_1 bounceInUp";		
	document.querySelector("#devolutiva_area_texto_sem_botao").className="animacao_atraso_1 bounceDown";			
	//movimento_entrada_jogo_fase3();
	movimento_entrada_conclusao();
}



/*function movimento_entrada_devolutiva_fase3(){
	movimento_entrada_conclusao();
}*/
function movimento_entrada_jogo_fase1(){
	TrocaInstrucao('Preencha a lacuna com as horas e os minutos indicados no relógio.<br /><br />Preencha a lacuna utilizando apenas números.<br /><br />Clique no botão Confirmar após escrever a hora e tiver certeza de que está correta.');
	fase_atual=1;
	document.querySelector("#jogo_fase1_area").style.display="inherit";
	document.querySelector("#jogos_titulo_topo").style.display="inherit";
	document.querySelector("#jogos_btn_tutorial").style.display="inherit";
	document.querySelector("#jogo_fase1_area").className="animacao_atraso_0 slideInLeft";
	document.querySelector("#jogo_fase1_bloco1").className="animacao_atraso_0 bounceInUp";
	document.querySelector("#jogo_fase1_bloco2").className="animacao_atraso_0 bounceInUp";	
	document.querySelector("#jogo_fase1_bloco3").className="animacao_atraso_0 bounceInUp";
	//
	document.querySelector("#jogo_fase1_bloco1_horas").className="animacao_atraso_1 hora_"+horas[0];
	document.querySelector("#jogo_fase1_bloco2_horas").className="animacao_atraso_1 hora_"+horas[1];
	document.querySelector("#jogo_fase1_bloco3_horas").className="animacao_atraso_1 hora_"+horas[2];	
	//
	document.querySelector("#jogo_fase1_bloco1_minutos").className="animacao_atraso_1 minuto_"+minutos[0];
	document.querySelector("#jogo_fase1_bloco2_minutos").className="animacao_atraso_1 minuto_"+minutos[1];
	document.querySelector("#jogo_fase1_bloco3_minutos").className="animacao_atraso_1 minuto_"+minutos[2];	
	//
	  if(Math.round((parseInt(horas[0])))>5 && Math.round((parseInt(horas[0])))<10){
		 $("#jogo_fase1_bloco1_horas").css({"top": "-7px"});
	  }		
	  if(Math.round((parseInt(horas[0])))==7 || Math.round((parseInt(horas[0])))==8 || Math.round((parseInt(horas[0])))==6){
		$("#jogo_fase1_bloco1_horas").css({"top": "-9px"});
	  }	
	  //
	  if(Math.round((parseInt(horas[1])))>5 && Math.round((parseInt(horas[1])))<10){
		 $("#jogo_fase1_bloco2_horas").css({"top": "-7px"});
	  }		
	  if(Math.round((parseInt(horas[1])))==7 || Math.round((parseInt(horas[1])))==8 || Math.round((parseInt(horas[1])))==6){
		$("#jogo_fase1_bloco2_horas").css({"top": "-9px"});
	  }	
	//
	  if(Math.round((parseInt(horas[2])))>5 && Math.round((parseInt(horas[2])))<10){
		 $("#jogo_fase1_bloco3_horas").css({"top": "-7px"});
	  }		
	  if(Math.round((parseInt(horas[2])))==7 || Math.round((parseInt(horas[2])))==8 || Math.round((parseInt(horas[2])))==6){
		$("#jogo_fase1_bloco3_horas").css({"top": "-9px"});
	  }		  


	
	document.querySelector("#jogos_titulo_topo").className="animacao_atraso_1 spaceInUp";
	document.querySelector("#jogos_btn_tutorial").className="animacao_atraso_1 slideInRight";
	setTimeout(function(){
		document.querySelector("#jogos_titulo_topo").className="animacao_atraso_0 rubberBand";
	}, 2000);	
}

function movimento_entrada_jogo_fase2(){
	document.querySelector("#jogo_fase1_area").className="animacao_atraso_0 slideOutLeft";
	TrocaInstrucao('Preencha a lacuna com as horas e os minutos indicados no relógio.<br /><br />Preencha a lacuna utilizando apenas números.<br /><br />Clique no botão Confirmar após escrever a hora e tiver certeza de que está correta.');	
	fase_atual=2;
	//
	document.querySelector("#jogo_fase2_area").style.display="inherit";
	document.querySelector("#jogos_titulo_topo").style.display="inherit";
	document.querySelector("#jogos_btn_tutorial").style.display="inherit";
	document.querySelector("#jogo_fase2_area").className="animacao_atraso_0 slideInLeft";
	document.querySelector("#jogo_fase2_bloco1").className="animacao_atraso_0 bounceInUp";
	document.querySelector("#jogo_fase2_bloco2").className="animacao_atraso_0 bounceInUp";	
	document.querySelector("#jogo_fase2_bloco3").className="animacao_atraso_0 bounceInUp";
	//
	//document.querySelector("#jogo_fase2_bloco1_horas").className="animacao_atraso_1 hora_"+horas[3];
	//document.querySelector("#jogo_fase2_bloco2_horas").className="animacao_atraso_1 hora_"+horas[4];
	//document.querySelector("#jogo_fase2_bloco3_horas").className="animacao_atraso_1 hora_"+horas[5];	
	//
	document.querySelector("#jogo_fase2_bloco1_minutos").className="animacao_atraso_1 minuto_"+minutos[3];
	document.querySelector("#jogo_fase2_bloco2_minutos").className="animacao_atraso_1 minuto_"+minutos[4];
	document.querySelector("#jogo_fase2_bloco3_minutos").className="animacao_atraso_1 minuto_"+minutos[5];	
	//	
	document.querySelector("#jogos_titulo_topo").className="animacao_atraso_1 spaceInUp";
	document.querySelector("#jogos_btn_tutorial").className="animacao_atraso_1 slideInRight";
	setTimeout(function(){
		//document.querySelector("#jogos_titulo_topo").className="animacao_atraso_0 rubberBand";
			document.querySelector("#jogo_fase1_area").style.display="none";
	}, 2000);

	//setTimeout(function(){
		//console.log(parseInt(horas[3])+" / "+parseInt(minutos[3]));
		//document.querySelector("#jogo_fase2_bloco1_horas").style.WebkitTransform="rotate("+()+(parseInt(minutos[3])/5)+"deg)";
		//document.querySelector("#jogo_fase2_bloco1_horas").className="nada";
	  if(Math.round((parseInt(horas[3])))>5 && Math.round((parseInt(horas[3])))<10){
		 $("#jogo_fase2_bloco1_horas").css({"top": "-7px"});
		 $("#jogo_fase2_bloco1_minutos").css({"top": "-7px"});
	  }
	  if(Math.round((parseInt(horas[3])))==7 || Math.round((parseInt(horas[3])))==8 || Math.round((parseInt(horas[3])))==6){
		 $("#jogo_fase2_bloco1_horas").css({"top": "-9px"});
		 $("#jogo_fase2_bloco1_minutos").css({"top": "-7px"});
	  }
//	  
	  if(Math.round((parseInt(horas[4])))>5 && Math.round((parseInt(horas[4])))<10){
		 $("#jogo_fase2_bloco2_horas").css({"top": "-7px"});
		 $("#jogo_fase2_bloco2_minutos").css({"top": "-7px"});
	  }
	  if(Math.round((parseInt(horas[4])))==7 || Math.round((parseInt(horas[4])))==8 || Math.round((parseInt(horas[4])))==6){
		 $("#jogo_fase2_bloco3_horas").css({"top": "-9px"});
		 $("#jogo_fase2_bloco3_minutos").css({"top": "-9px"});
	  }	
//	  
	  if(Math.round((parseInt(horas[5])))>5 && Math.round((parseInt(horas[5])))<10){
		 $("#jogo_fase2_bloco3_horas").css({"top": "-7px"});
		 $("#jogo_fase2_bloco3_minutos").css({"top": "-7px"});
	  }		
	  if(Math.round((parseInt(horas[5])))==7 || Math.round((parseInt(horas[5])))==8 || Math.round((parseInt(horas[5])))==6){
		 $("#jogo_fase2_bloco3_horas").css({"top": "-9px"});
		 $("#jogo_fase2_bloco3_minutos").css({"top": "-9px"});
	  }	
		
setTimeout(function(){

		
 $('#jogo_fase2_bloco1_horas').animate({  borderSpacing: Math.round((parseInt(horas[3])*30)+(parseInt(minutos[3])/2)) }, {
    step: function(now1,fx1) {
	
      $(this).css('-webkit-transform','rotate('+now1+'deg)'); 
      $(this).css('-moz-transform','rotate('+now1+'deg)');
      $(this).css('transform','rotate('+now1+'deg)');
    },
    duration:1000
},'linear')

 $('#jogo_fase2_bloco2_horas').animate({  borderSpacing: Math.round((parseInt(horas[4])*30)+(parseInt(minutos[4])/2)) }, {
    step: function(now2,fx2) {
      $(this).css('-webkit-transform','rotate('+now2+'deg)'); 
      $(this).css('-moz-transform','rotate('+now2+'deg)');
      $(this).css('transform','rotate('+now2+'deg)');
    },
    duration:1000
},'linear')	

  $('#jogo_fase2_bloco3_horas').animate({  borderSpacing: Math.round((parseInt(horas[5])*30)+(parseInt(minutos[5])/2)) }, {
    step: function(now3,fx3) {
      $(this).css('-webkit-transform','rotate('+now3+'deg)'); 
      $(this).css('-moz-transform','rotate('+now3+'deg)');
      $(this).css('transform','rotate('+now3+'deg)');
    },
    duration:1000
},'linear')	
	
}, 1000);	


	
}

function movimento_entrada_jogo_fase3(){
	document.querySelector("#jogo_fase2_area").className="animacao_atraso_0 slideOutLeft";
	TrocaInstrucao('Preencha a lacuna com as horas e os minutos indicados no relógio.<br /><br />Preencha a lacuna utilizando apenas números.<br /><br />Clique no botão Confirmar após escrever a hora e tiver certeza de que está correta.');
	fase_atual=3;
	//
	document.querySelector("#jogo_fase3_area").style.display="inherit";
	document.querySelector("#jogos_titulo_topo").style.display="inherit";
	document.querySelector("#jogos_btn_tutorial").style.display="inherit";
	document.querySelector("#jogo_fase3_area").className="animacao_atraso_0 slideInLeft";
	document.querySelector("#jogo_fase3_bloco1").className="animacao_atraso_0 bounceInUp";
	document.querySelector("#jogo_fase3_bloco2").className="animacao_atraso_0 bounceInUp";	
	document.querySelector("#jogo_fase3_bloco3").className="animacao_atraso_0 bounceInUp";
	//
	//document.querySelector("#jogo_fase3_bloco1_horas").className="animacao_atraso_1 hora_"+horas[6];
	//document.querySelector("#jogo_fase3_bloco2_horas").className="animacao_atraso_1 hora_"+horas[7];
	//document.querySelector("#jogo_fase3_bloco3_horas").className="animacao_atraso_1 hora_"+horas[8];	
	//
	document.querySelector("#jogo_fase3_bloco1_minutos").className="animacao_atraso_1 minuto_"+minutos[6];
	document.querySelector("#jogo_fase3_bloco2_minutos").className="animacao_atraso_1 minuto_"+minutos[7];
	document.querySelector("#jogo_fase3_bloco3_minutos").className="animacao_atraso_1 minuto_"+minutos[8];	
	//	
	document.querySelector("#jogos_titulo_topo").className="animacao_atraso_1 spaceInUp";
	document.querySelector("#jogos_btn_tutorial").className="animacao_atraso_1 slideInRight";
	setTimeout(function(){
		//document.querySelector("#jogos_titulo_topo").className="animacao_atraso_0 rubberBand";
			document.querySelector("#jogo_fase2_area").style.display="none";
	}, 2000);
//
	setTimeout(function(){
$("#jogo_fase1_bloco1_horas, #jogo_fase1_bloco2_horas, #jogo_fase1_bloco3_horas, #jogo_fase2_bloco1_horas, #jogo_fase2_bloco2_horas, #jogo_fase2_bloco3_horas, #jogo_fase3_bloco1_horas, #jogo_fase3_bloco2_horas, #jogo_fase3_bloco3_horas").css({"top": "-2px"});

$("#jogo_fase1_bloco1_minutos, #jogo_fase1_bloco2_minutos, #jogo_fase1_bloco3_minutos, #jogo_fase2_bloco1_minutos, #jogo_fase2_bloco2_minutos, #jogo_fase2_bloco3_minutos, #jogo_fase3_bloco1_minutos, #jogo_fase3_bloco2_minutos, #jogo_fase3_bloco3_minutos").css({"top": "0px"});
	}, 1100);



	  /*if(Math.round((parseInt(horas[6])))>5 && Math.round((parseInt(horas[6])))<10){
		 $("#jogo_fase3_bloco1_horas").css({"top": "-7px"});
		 $("#jogo_fase3_bloco1_minutos").css({"top": "-7px"});
	  }
	  if(Math.round((parseInt(horas[6])))==7 || Math.round((parseInt(horas[6])))==8 || Math.round((parseInt(horas[6])))==6){
		 $("#jogo_fase3_bloco1_horas").css({"top": "-9px"});
		 $("#jogo_fase3_bloco1_minutos").css({"top": "-9px"});
	  }	
//
	  if(Math.round((parseInt(horas[7])))>5 && Math.round((parseInt(horas[7])))<10){
		 $("#jogo_fase3_bloco2_horas").css({"top": "-7px"});
		 $("#jogo_fase3_bloco2_minutos").css({"top": "-7px"});
	  }
	  if(Math.round((parseInt(horas[7])))==7 || Math.round((parseInt(horas[7])))==8 || Math.round((parseInt(horas[7])))==6){
		 $("#jogo_fase3_bloco2_horas").css({"top": "-9px"});
		 $("#jogo_fase3_bloco2_minutos").css({"top": "-7px"});
	  }
//
	  if(Math.round((parseInt(horas[8])))>5 && Math.round((parseInt(horas[8])))<10){
		 $("#jogo_fase3_bloco3_horas").css({"top": "-7px"});
		 $("#jogo_fase3_bloco3_minutos").css({"top": "-7px"});
	  }
	  if(Math.round((parseInt(horas[8])))==7 || Math.round((parseInt(horas[8])))==8 || Math.round((parseInt(horas[8])))==6){
		 $("#jogo_fase3_bloco3_horas").css({"top": "-9px"});
		 $("#jogo_fase3_bloco3_minutos").css({"top": "-9px"});
	  }	*/
	
	
setTimeout(function(){
	
 $('#jogo_fase3_bloco1_horas').animate({  borderSpacing: Math.round((parseInt(horas[6])*30)+(parseInt(minutos[6])/2)) }, {
    step: function(now4,fx4) {
      $(this).css('-webkit-transform','rotate('+now4+'deg)'); 
      $(this).css('-moz-transform','rotate('+now4+'deg)');
      $(this).css('transform','rotate('+now4+'deg)');
    },
    duration:1000
},'linear')

 $('#jogo_fase3_bloco2_horas').animate({  borderSpacing: Math.round((parseInt(horas[7])*30)+(parseInt(minutos[7])/2)) }, {
    step: function(now5,fx5) {
      $(this).css('-webkit-transform','rotate('+now5+'deg)'); 
      $(this).css('-moz-transform','rotate('+now5+'deg)');
      $(this).css('transform','rotate('+now5+'deg)');
    },
    duration:1000
},'linear')	

  $('#jogo_fase3_bloco3_horas').animate({  borderSpacing: Math.round((parseInt(horas[8])*30)+(parseInt(minutos[8])/2)) }, {
    step: function(now6,fx6) {
      $(this).css('-webkit-transform','rotate('+now6+'deg)'); 
      $(this).css('-moz-transform','rotate('+now6+'deg)');
      $(this).css('transform','rotate('+now6+'deg)');
    },
    duration:1000
},'linear')	
	
}, 1000);
	
}

function movimento_entrada_conclusao(){
	sessionStorage.setItem('reiniciar_oed', 'sem_instrucao');	
	document.querySelector("#jogo_fase3_area").className="escala_cinza animacao_atraso_conclusao zoomOut";
	setTimeout(function(){
			sessionStorage.setItem('reiniciar_oed', 'sim');
	}, 10000);		
	
}


function iniciar_com_tap(){
	//alert("Tap");
	startGame.init();
	clearInterval(verificar_inicio_cnd);
}



