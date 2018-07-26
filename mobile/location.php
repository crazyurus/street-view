<?php

header('Content-type: application/json');

$longitude = $_POST['longitude'];
$latitude = $_POST['latitude'];

$result = json_decode(file_get_contents('https://restapi.amap.com/v3/assistant/coordinate/convert?key=d513a6c5b54aa66f71bfa49a263acb17&locations='.$longitude.','.$latitude.'&coordsys=gps'), true);

$temp = explode(',', $result['locations']);
$result = array(
    'longitude' => $temp[0],
    'latitude' => $temp[1]
);

echo json_encode($result);