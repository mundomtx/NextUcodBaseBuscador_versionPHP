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
	
	default:
		# code...
		break;
}


?>