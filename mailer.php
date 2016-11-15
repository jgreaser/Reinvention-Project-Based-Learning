<?php

$to = 'thaines@flvs.net';

//$to = $_GET["receiver"];
$headers = 'From: PBL' . "\r\n";

$headers .= 'Cc: jgreaser@flvs.net' . "\r\n";


$subject = "PBL STUDENT ".$_GET["name"];
$message = $_GET["name"]." ".$_GET["email"];


mail($to, $subject, $message, $headers);
?>

