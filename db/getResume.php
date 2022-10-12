<?php
require_once('conn.php');
// print_r($_GET);
if (isset($_GET['for']) && $_GET['for'] == "get_resume") {
    $proj_id = $_GET['id'];
    $sql = "select cand_id from candidate_project where id ='$proj_id'";
    $candi_id = 0;
    $res = mysqli_query($conn, $sql);
    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $candi_id = $row['cand_id'];
        }
    }
    $res = mysqli_query($conn, "select * from resume_candidate where candidate_id=$candi_id");
    $data = array();
    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $data[] = $row;
        }
    };
    echo json_encode($data);
}
