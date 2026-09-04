# Local preview server for the Tbilisi House demo (no Node required).
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$prefix = "http://127.0.0.1:4173/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "Tbilisi House demo: $prefix"
while ($listener.IsListening) {
  $context = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))
  if ([string]::IsNullOrWhiteSpace($path)) { $path = "index.html" }
  $full = Join-Path $root $path
  if (Test-Path $full -PathType Container) { $full = Join-Path $full "index.html" }
  $response = $context.Response
  if (-not (Test-Path $full -PathType Leaf)) {
    $response.StatusCode = 404
    $bytes = [Text.Encoding]::UTF8.GetBytes("Not found")
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
    $response.Close()
    continue
  }
  $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
  $types = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "text/javascript; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".json" = "application/json"
  }
  $response.ContentType = $(if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" })
  $bytes = [IO.File]::ReadAllBytes($full)
  $response.ContentLength64 = $bytes.Length
  $response.OutputStream.Write($bytes, 0, $bytes.Length)
  $response.Close()
}
