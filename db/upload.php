<?php
require_once('conn.php');
header('Access-Control-Allow-Origin: *');
/* Getting file name */
if (isset($_POST['last_id']) && isset($_FILES['file']['name'])) {
    $last_id = $_POST['last_id'];
    $filename = $_FILES['file']['name'];
    $new = explode('.', $filename);
    $filname2 = $new[0] . date('his') . '.' . $new[1];
    /* Location */
    $location = '../upload/';
    $response = array();
    /* Upload file */
    if (move_uploaded_file($_FILES['file']['tmp_name'], $location . $filname2)) {
        $sql = "select cand_id from candidate_project where id ='$last_id'";
        $candi_id = 0;
        $res = mysqli_query($conn, $sql);
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $candi_id = $row['cand_id'];
            }
            $sql = "INSERT into resume_candidate(project_id,candidate_id,resume_name) VALUES('$last_id','$candi_id','$filname2')";
            if (mysqli_query($conn, $sql)) {
                $msg = "ADDED ON SAPERATE TABLE updated";
            } else {
                $msg = "NOT ADDED ON SEPARATE TABLE";
            }
        }
        return false;
        $response = array(
            'status'  => 200,
            'name' => $filname2,
            'last_id' => $last_id,
            "fileupdate_status" => $msg
        );
    } else {
        $response = array(
            'status'  => 202,
            'name' => "File not uploaded.",
            'last_id' => $last_id,
            "fileupdate_status" => ""
        );
    }
    echo json_encode($response);
    exit;
}
