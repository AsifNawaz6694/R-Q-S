<?php
$server = '94.77.196.222,1433';
$database = 'AXIntegrationDB';
$username = 'fivetran';
$password = '1&TF%}}m,Zy8Cvj4%FET2ec)6+'; // double}} if you have a } in real pw

$options = [
    // Try as string:
    //"TrustServerCertificate" => true,
    // Try as integer (works on some systems):
    "Encrypt" => 0,
];

// $dsn = "sqlsrv:Server=$server;Database=$database";
$dsn = "sqlsrv:Server=172.16.0.21,1433;Database=AXIntegrationDB;Encrypt=no;TrustServerCertificate=no";
try {
    $pdo = new PDO($dsn, $username, $password);
    $query = "SELECT * FROM WMS_LIVE_STOCK WHERE storer = 'Rental'";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "Connected successfully!\n";
    print_r($results);
    
    // Log results to file
    // $logFile = __DIR__ . '/public/stock_results_' . date('Y-m-d_H-i-s') . '.txt';
    // $logContent = "=== Stock Results - " . date('Y-m-d H:i:s') . " ===\n\n";
    // $logContent .= print_r($results, true);
    // file_put_contents($logFile, $logContent);
    // echo "Results logged to: $logFile\n";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
    // Log error to file
    // $errorFile = __DIR__ . '/public/error_' . date('Y-m-d_H-i-s') . '.txt';
    // $errorContent = "=== Error - " . date('Y-m-d H:i:s') . " ===\n" .
                //    "Error: " . $e->getMessage() . "\n";
    // file_put_contents($errorFile, $errorContent);
    // echo "Error logged to: $errorFile\n";
}