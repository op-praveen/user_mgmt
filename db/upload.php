<?php
require_once('conn.php');
header('Access-Control-Allow-Origin: *');
/* Getting file name */
$last_id=$_POST['last_id'];
$filename = $_FILES['file']['name'];
$new = explode('.', $filename);
$filname2 = $new[0] . date('his') . '.' . $new[1];
/* Location */
$location = '../upload/';

$response = array();
/* Upload file */
if (move_uploaded_file($_FILES['file']['tmp_name'], $location . $filname2)) {
    $sql = "UPDATE candidate_project SET resume = '$filname2' WHERE id = '$last_id'";
    if (mysqli_query($conn, $sql)) {
        $msg="filename updated";
    }else{
        $msg= "filename not updated";
    }
    $response = array(
        'status'  => 200,
        'name' => $filname2,
        'last_id' => $last_id,
        "fileupdate_status" => $msg
    );
} else {
    $response = array(
        'status'  => 202,
        'name' =>"File not uploaded.",
        'last_id' => $last_id,
        "fileupdate_status" => ""
    );
}
echo json_encode($response);
