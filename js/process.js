var buscador = {
	init: function(){
    this.llenarDatosCiudadTipo();
		this.mostrarTodo()
    this.filtro()
	},
  llenarDatosCiudadTipo: function(){
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
  filtro: function(){

    $("#formulario").submit(function(event){
      event.preventDefault();

      //Obtenemos los datos del formulario
      var ciudad  = $("select[name=ciudad]").val();
      var tipo    = $("select[name=tipo]").val()
      var precio  = $("input[name=precio]").val()

      //Cuando se ejecute este proceso removemos los registros existentes
      $(".search").remove();

      $.ajax({
        type: "POST",
        dataType: "json",
        url: "includes/backend.php", 
        data:  {"case":"DatosFiltro", "ciudad":ciudad, "tipo":tipo, "precio":precio},
        success: function(result){
          //Si obtenemos resultado realizamos el siguiente proceso
          for(var i = 0; i < result.result.length; i++){
            $(".colContenido").append('<div class="tituloContenido  card search">'+
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

        },error: function(){ 
          console.log('error');
        }
      });
     
    })
  },
	mostrarTodo: function(){

		$("#mostrarTodos").click(function(event){
			event.preventDefault();

      $(".search").remove();

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
                		$(".colContenido").append('<div class="tituloContenido  card search">'+
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
                }else{
                  alert('ok1')
                }
              },error: function(){ 
                alert('ok2')
              }
            });
		});

	}

}

buscador.init();