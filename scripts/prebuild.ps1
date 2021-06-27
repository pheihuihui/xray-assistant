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
$str = "export const ipaddr = '"
$ip = (wsl hostname -I).trim()
$str + $ip + "'" | Out-File -Encoding utf8 ..\\src\\ipaddr.ts

# generate config.json for xray