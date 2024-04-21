Push-Location $PSScriptRoot

$path = "src/thoughts/$(Get-Date -Format 'yyyy-MM/ddThhmmss' -AsUTC)z.md"
$null = New-Item -ItemType File -Name $path -Force

code $path

Pop-Location
