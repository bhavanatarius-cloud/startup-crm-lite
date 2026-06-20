Get-ChildItem -Path "src" -Recurse -Include "*.jsx" | ForEach-Object {
    $path = $_.FullName
    $content = Get-Content $path -Raw
    $updated = $content -replace 'dark:text-slate-550', 'dark:text-slate-500'
    $updated = $updated -replace 'dark:text-slate-505', 'dark:text-slate-400'
    [System.IO.File]::WriteAllText($path, $updated)
}
Write-Host "Done fixing Tailwind typos."
