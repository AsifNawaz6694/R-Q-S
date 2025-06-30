# PowerShell script to run Laravel scheduler
$phpPath = 'C:\laragon\bin\php\php-8.2.0-Win32-vs16-x64\php.exe'  # Adjust path as needed
$projectPath = 'C:\laragon\www\rental-quotation-system-new'

# Navigate to project directory and run Laravel scheduler
Set-Location $projectPath
& $phpPath artisan schedule:run >> $projectPath\storage\logs\scheduler.log 2>&1
