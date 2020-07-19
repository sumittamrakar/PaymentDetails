#!/usr/bin/env pwsh

./cleanup.ps1

New-Item -ItemType "Directory" -Force -Path ./publish

Push-Location ./WebApi
   dotnet clean
   dotnet msbuild -t:Restore,Build
   if (! ($?)) {
      throw "build fail"
   }
   dotnet publish -o ../../publish
Pop-Location

Push-Location ./publish
   Start-Process -FilePath "dotnet" -ArgumentList "WebAPI.dll --urls=http://*:5555"
Pop-Location

Write-Host "Starting UI. This might take upto few minutes..."

Push-Location ./ui
	ng serve --o
Pop-Location