$pid3001 = (Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue).OwningProcess
if ($pid3001) { Stop-Process -Id $pid3001 -Force -ErrorAction SilentlyContinue }
$pid3000 = (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess
if ($pid3000) { Stop-Process -Id $pid3000 -Force -ErrorAction SilentlyContinue }
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
