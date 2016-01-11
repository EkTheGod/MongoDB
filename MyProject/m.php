<?php
$connection = new MongoClient();
$collection = $connection->database->Book;

$cursor = $collection->find();
foreach ( $cursor as $id => $value )
{
    echo "$id: ";
    var_dump( $value );
}
?>
