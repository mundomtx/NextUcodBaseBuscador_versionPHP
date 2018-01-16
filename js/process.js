var buscador = {
	init: function(){
    this.llenarDatosCiudad();
		this.mostrarTodo()
	},
  llenarDatosCiudad: function(){
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "includes/backend.php", 
      data: {"case":"DatosCiudad"},
      success: function(result){
        console.log(result)
        if(result.rps==1){

          for(var i = 0; i < result.result[0].length; i++){
            $("#selectCiudad").append('<option value="'+result.result[0][i]+'">'+result.result[0][i]+'</option>');
          }

          for(var i = 0; i < result.result[1].length; i++){
            $("#selectTipo").append('<option value="'+result.result[1][i]+'">'+result.result[1][i]+'</option>');
          }

          $('select').material_select();

        }else{
          $('select').material_select();
        }
      },error: function(){ 
        $('select').material_select();
      }
    });
  },
	mostrarTodo: function(){

		$("#mostrarTodos").click(function(event){
			event.preventDefault();

			$.ajax({
              type: "POST",
              dataType: "json",
              url: "includes/backend.php", 
              data: {"case":"mostrarTodo"},
              success: function(result){
              	console.log(result)
                if(result.rps==1){

                	for(var i = 0; i <= result.result.length; i++){
                		if(result.result[i].Direccion!='' || result.result[i].Direccion!=null || result.result[i].Direccion!=undefined){

                		}
                		$(".colContenido").append('<div class="tituloContenido  card">'+
	                		'<div class="itemMostrado">'+
	                			'<img src="img/home.jpg">'+
	                			'<p>'+
	                			'<b>Dirección:</b> '+result.result[i].Direccion+' <br>'+
	                			'<b>Ciudad:</b> '+result.result[i].Ciudad+'<br>'+
	                			'<b>Teléfono:</b> '+result.result[i].Telefono+'<br>'+
	                			'<b>Código Postal:</b> '+result.result[i].Codigo_Postal+'<br>'+
	                			'<b>Tipo:</b> '+result.result[i].Tipo+'<br>'+
	                			'<b>Precio:</b> <span class="precioTexto">'+result.result[i].Precio+'</span><br>'+
	                			'</p>'+
	                		'</div>'+
	                	'</div>')
                	}




                	// $(".colContenido").append('<div class="tituloContenido  card">'+
                	// 	'<div class="itemMostrado">'+
                	// 		'<img src="img/home.jpg">'+
                	// 		'<p>'+
                	// 		'<b>Dirección:</b> asdsdf <br>'+
                	// 		'<b>Ciudad:</b> asa<br>'+
                	// 		'<b>Teléfono:</b> asa<br>'+
                	// 		'<b>Código Postal:</b> asa<br>'+
                	// 		'<b>Tipo:</b> asa<br>'+
                	// 		'<b>Precio:</b> <span class="precioTexto">$45,4</span><br>'+
                	// 		'</p>'+
                	// 	'</div>'+
                	// '</div>')
                	

                  // $("button[name=no_autorizar_retiros]").removeAttr('disabled');

                  // swal("<?php echo p_ad_men_a_355; ?>", result.message, "success");

                  // $(".button_autorizar").html('<button type="button" name="autorizar_retiros" class="btn btn-labeled btn-success"><span class="btn-label"><i class="fa fa-check"></i></span>Autorizar retiros a mi dirección BTC configurada.</button>')

                  // autorizar_retiros();
                }else{
                  alert('ok1')
                }
              },error: function(){ 
                alert('ok2')
              }
            });
		});



		// xmlhttp.onreadystatechange = function(){
		//     if(this.readyState == 4 && this.status == 200){
		//       var data = JSON.parse(this.responseText)

		//       if(!data.rps){
		//         window.location = data.respuesta
		//       }
		//     }
		//   };

		//   xmlhttp.open("POST", "includes/backend.php", true);
		//   xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//   xmlhttp.send("case=realTime");
	}

}

buscador.init();