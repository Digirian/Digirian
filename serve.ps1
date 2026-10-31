# PowerShell Native HTTP Static Server for Desa Majelis Hidayah Website
$port = 8080
$rootPath = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  Website Resmi Desa Majelis Hidayah Server Aktif!" -ForegroundColor Cyan
    Write-Host "  URL: $prefix" -ForegroundColor Yellow
    Write-Host "  Direktori: $rootPath" -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Green
} catch {
    Write-Host "Error starting listener on $prefix : $_" -ForegroundColor Red
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.RawUrl.Split('?')[0]
        if ($rawUrl -eq "/" -or $rawUrl -eq "") {
            $relativePath = "index.html"
        } else {
            $relativePath = $rawUrl.TrimStart('/') -replace '/', '\'
        }

        $filePath = Join-Path $rootPath $relativePath

        if (Test-Path $filePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = $mimeTypes[$extension]
            if (-not $contentType) {
                $contentType = "application/octet-stream"
            }

            $response.ContentType = $contentType
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.StatusCode = 200
            Write-Host "[200 OK] $rawUrl ($($bytes.Length) bytes)" -ForegroundColor Green
        } else {
            $response.StatusCode = 404
            $notFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found - Desa Majelis Hidayah")
            $response.ContentLength64 = $notFoundMsg.Length
            $response.OutputStream.Write($notFoundMsg, 0, $notFoundMsg.Length)
            Write-Host "[404 Not Found] $rawUrl" -ForegroundColor Red
        }

        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
