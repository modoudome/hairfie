<?php
/**
 * Created by PhpStorm.
 * User: mamadou
 * Date: 13/12/2015
 * Time: 00:46
*/
$save = str_replace('data:image/png;base64,', '', $_POST['image'] );
file_put_contents( 'image.png', base64_decode( $save ) );