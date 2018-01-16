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
	
	default:
		# code...
		break;
}


?>