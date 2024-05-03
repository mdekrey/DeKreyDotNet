Push-Location $PSScriptRoot

$path = "src/thoughts/$(Get-Date -Format 'yyyy-MM/ddTHHmmss' -AsUTC).mdx"
$null = New-Item -ItemType File -Name $path -Force
@'
---
tags: []
---
'@ > $path

code $path

Pop-Location
