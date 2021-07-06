# generate prototypes
Set-Location .\lib
proto-loader-gen-types `
    --longs=String `
    --enums=String `
    --defaults `
    --oneofs `
    --includeDirs=.\Xray-core\ `
    --grpcLib=@grpc/grpc-js `
    --outDir=protos `
    .\Xray-core\app\router\command\command.proto `
    .\Xray-core\app\stats\command\command.proto

# get wsl ip
Set-Location ..\
$dir = (Get-Location)
$str = "export const ipaddr = '"
$ip = (wsl hostname -I).trim()
$ipaddrContent = $str + $ip + "'"
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
$ipaddrPath = $dir.Path + "\src\ipaddr.ts"
[System.IO.File]::WriteAllLines($ipaddrPath, $ipaddrContent, $Utf8NoBomEncoding)

# generate config.json for xray
$jsonName = "xrayconfig.json"
$jsonPath = $dir.Path + "\" + $jsonName
$userName = (wsl whoami)
$content = (ts-node .\src\config.ts --files)
[System.IO.File]::WriteAllLines($jsonPath, $content, $Utf8NoBomEncoding)

# copy file to wsl
$connStr = "${userName}@${ip}:/home/${userName}/Xray-core/config.json"
scp $jsonPath $connStr

# start xray core
$command = "/home/${userName}/Xray-core/xray"
wsl $command