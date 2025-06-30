<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use PDO;

/**
 * Command to synchronize rental stock data from SQL Server
 * 
 * This command connects to the SQL Server database and fetches rental stock data
 * using direct PDO connection with proper SSL settings disabled.
 */
class SyncStockCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stock:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Synchronize rental stock data from SQL Server';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            // Load database configuration from environment
            $host = env('DB_SQLSRV_HOST', '172.16.0.21');
            $port = env('DB_SQLSRV_PORT', '1433');
            $database = env('DB_SQLSRV_DATABASE', 'AXIntegrationDB');
            $username = env('DB_SQLSRV_USERNAME', 'fivetran');
            $password = env('DB_SQLSRV_PASSWORD', '1&TF%}}m,Zy8Cvj4%FET2ec)6+');
            
            // Build DSN string with SSL settings
            $dsn = "sqlsrv:Server={$host},{$port};Database={$database};Encrypt=no;TrustServerCertificate=no";
            
            // Establish database connection
            $pdo = new PDO($dsn, $username, $password);
            
            // Execute query and fetch results
            $query = "SELECT * FROM WMS_LIVE_STOCK WHERE storer = 'Rental'";
            $stmt = $pdo->prepare($query);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Output results
            echo "Connected successfully!\n";
            print_r($results);
            
            return Command::SUCCESS;
            
        } catch (\Exception $e) {
            Log::error('Stock synchronization failed: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            $this->error('Error: ' . $e->getMessage());
        }
    }
}
