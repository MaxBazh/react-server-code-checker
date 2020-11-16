<?php
// необходимые HTTP-заголовки 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

require_once('./classes/checker404.class.php');


$out = [
  'errors' => false,
  'data' => [],
];


$postData = file_get_contents('php://input');
if( !$postData ){
  http_response_code(404);
}
$urls = json_decode($postData, true);

$api = new Checker404($urls);
$data = $api->getAnswer();

if( !$data ){
  $out['errors'] = true;
} else {
  $out['data'] = $data;
}

echo json_encode($out);
// die();