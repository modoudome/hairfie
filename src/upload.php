<?php
define('IMAGES_DIRECTORY', __DIR__.'/../public/profile/thumb');

header('Content-Type: application/json');

$response = array('status' => 500);
$extensions = array('jpg', 'png', 'gif', 'jpeg');

$_GET['id'] = "1";

print_r($_FILES);

if (!empty($_GET['id']) && ctype_digit((string) $_GET['id']) &&
    !empty($_FILES['file']['error']) && !$_FILES['file']['error']) {

    $imageId = intval($_GET['id']);
    $extension = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));

    if (in_array($extension, $extensions)) {
        if (!file_exists(IMAGES_DIRECTORY)) {
            $directoryIsCreate = @mkdir(IMAGES_DIRECTORY, 0777, true);
        } else {
            $directoryIsCreate = is_dir(IMAGES_DIRECTORY);
        }

        if ($directoryIsCreate) {
            $destination = IMAGES_DIRECTORY . DIRECTORY_SEPARATOR . $imageId . ".$extension";
            if (@move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
                $response['status'] = 200;
            }
        }
    }
}

echo json_encode($response);