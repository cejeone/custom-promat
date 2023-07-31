<?php

$db_handle = pg_connect("host=192.168.12.180 port=5432 dbname=promat2 user=cmdbuild password=cmdbuild");
     if ($db_handle) {
          echo 'Connection succeeded.';
     } else {
          echo 'Connection failed.';
     }

// echo "<h3>Connection Information</h3>";
// echo "DATABASE NAME:" . pg_dbname($db_handle) . "<br>";
// echo "HOSTNAME: " . pg_host($db_handle) . "<br>";
// echo "PORT: " . pg_port($db_handle) . "<br>";

// echo "<h3>Checking the query status</h3>";
//  $query = 'SELECT * FROM unit';
//     $result = pg_query($query) or die('Error message: ' . pg_last_error());
//     while ($row = pg_fetch_row($result)) {
//         var_dump($row);
//     }
//     pg_free_result($result);
// pg_close($db_handle);
function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}

function query($query){
    global $db_handle;
    $result = pg_query($db_handle, $query);
    $rows = [];
    while($row = pg_fetch_assoc($result)){
        $rows[] = $row;
    }
    return $rows;
}



?>