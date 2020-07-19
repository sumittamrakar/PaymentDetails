#!/usr/bin/env pwsh

# Cleanup TestResults folder
Remove-Item -Path ./publish -Force -Recurse -ErrorAction Ignore
