<?php 
require_once("class_buscador.php");

if(!empty($_POST["case"])){
	$caseProcess = $_POST["case"];
}else{
	$caseProcess = 0;
}

switch ($caseProcess) {
	case 'mostrarTodo':
		$buscadorNextU = new buscadorNextU("../data-1.json");
		$rps = json_encode(array("rps" => 1, "result" => $buscadorNextU->datosJson()));
		echo $rps;
		//print_r($buscadorNextU->datosJson());

		break;

	case 'DatosCiudad':

		$buscadorNextU 	= new buscadorNextU("../data-1.json");
		$datos 			= $buscadorNextU->datosJson();
		$tipos = $ciudad= array();
				
		foreach($datos as $data){
			if(!empty($data["Ciudad"])){
				if(count($ciudad)>0){
					if(!in_array($data["Ciudad"], $ciudad)){
						array_push($ciudad, $data["Ciudad"]);
					}
				}else{
					array_push($ciudad, $data["Ciudad"]);
				}
			}

			if(!empty($data["Tipo"])){
				if(count($tipos)>0){
					if(!in_array($data["Tipo"], $tipos)){
						array_push($tipos, $data["Tipo"]);
					}
				}else{
					array_push($tipos, $data["Tipo"]);
				}
			}
		}

		$rps = json_encode(array("rps" => 1, "result" => array($ciudad, $tipos)));

		echo $rps;

		break;

	case 'DatosFiltro':

		$buscadorNextU 	= new buscadorNextU("../data-1.json");
		$datos 			= $buscadorNextU->datosJson();
		
		$ciudad 		= $_POST["ciudad"];
		$tipo 			= $_POST["tipo"];
		$precio 		= explode(";", $_POST["precio"]);

		$datos_mostrar 	= array();
				
		foreach($datos as $data){
			$fag_ciudad = false;
			$fag_tipo 	= false;
			$fag_precio = false;

			if(!empty($ciudad)){
				if($data["Ciudad"]==$ciudad){
					$fag_ciudad = true;
				}
			}else{
				$fag_ciudad = true;
			}

			if(!empty($tipo)){
				if($data["Tipo"]==$tipo){
					$fag_tipo = true;
				}
			}else{
				$fag_tipo = true;
			}

			$precio_limpio = str_replace(array("$",","), array("",""), $data["Precio"]);
			if($precio_limpio>=$precio[0] && $precio_limpio<=$precio[1]){
				$fag_precio = true;
			}

			if($fag_ciudad && $fag_tipo && $fag_precio){
				array_push($datos_mostrar, $data);
			}

			$rps = json_encode(array("rps" => 1, "result" => $datos_mostrar));
		}	

		echo $rps;

		break;
	
	default:
		# code...
		break;
}


?>