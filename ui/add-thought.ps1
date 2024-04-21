Push-Location $PSScriptRoot

$path = "src/thoughts/$(Get-Date -Format 'yyyy-MM/ddTHHmmss').md"
$null = New-Item -ItemType File -Name $path -Force

code $path

Pop-Location
