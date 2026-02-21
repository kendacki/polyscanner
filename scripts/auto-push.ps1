# Auto-push watcher for the workspace
# Usage: Run this script from PowerShell. It watches the repo and auto-adds/commits/pushes changes.

# Move to repo root (one level up from scripts folder)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location (Resolve-Path (Join-Path $scriptDir ".."))

$debounceSeconds = 5
$global:pending = $false
$global:lastEvent = Get-Date

function OnChange {
    $global:pending = $true
    $global:lastEvent = Get-Date
    Write-Output "Change detected at $($global:lastEvent). Will commit in $debounceSeconds seconds if no further changes."
}

$pathToWatch = (Get-Location).Path
$filter = '*.*'
$watcher = New-Object System.IO.FileSystemWatcher $pathToWatch, $filter
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$created = Register-ObjectEvent $watcher Created -Action { OnChange } -SourceIdentifier FileCreated
$changed = Register-ObjectEvent $watcher Changed -Action { OnChange } -SourceIdentifier FileChanged
$deleted = Register-ObjectEvent $watcher Deleted -Action { OnChange } -SourceIdentifier FileDeleted
$renamed = Register-ObjectEvent $watcher Renamed -Action { OnChange } -SourceIdentifier FileRenamed

Write-Output "Auto-push watcher started. Watching: $pathToWatch"
Write-Output "Debounce interval: $debounceSeconds seconds. Press Ctrl+C to stop."

try {
    while ($true) {
        if ($global:pending -and ((Get-Date) - $global:lastEvent).TotalSeconds -ge $debounceSeconds) {
            $global:pending = $false
            Write-Output "Preparing auto-commit at $(Get-Date -Format o)"

            & git add -A
            & git commit -m "auto: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" 2>$null
            if ($LASTEXITCODE -ne 0) {
                Write-Output "No changes to commit."
            } else {
                Write-Output "Committed changes. Pushing to origin/main..."
                & git push origin main
                if ($LASTEXITCODE -eq 0) { Write-Output "Push succeeded." } else { Write-Output "Push failed. Check authentication or remote." }
            }
        }
        Start-Sleep -Seconds 1
    }
} finally {
    Unregister-Event -SourceIdentifier FileCreated -ErrorAction SilentlyContinue
    Unregister-Event -SourceIdentifier FileChanged -ErrorAction SilentlyContinue
    Unregister-Event -SourceIdentifier FileDeleted -ErrorAction SilentlyContinue
    Unregister-Event -SourceIdentifier FileRenamed -ErrorAction SilentlyContinue
    if ($watcher) { $watcher.EnableRaisingEvents = $false; $watcher.Dispose() }
    Write-Output "Auto-push watcher stopped."
}
