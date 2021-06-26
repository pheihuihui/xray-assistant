import pathLib from 'path'
import { loadSync, Options } from '@grpc/proto-loader'
import { credentials, loadPackageDefinition } from '@grpc/grpc-js'
import { ipaddr } from './ipaddr'
import { ProtoGrpcType } from '../lib/protos/command'

const libPath = pathLib.join(__dirname, '../lib/Xray-core/')

const options: Options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: [libPath]
}

const protoPath_router = pathLib.join(libPath, './app/router/command/command.proto')
const protoPath_stats = pathLib.join(libPath, './app/stats/command/command.proto')

const packDef_router = loadSync(protoPath_router, options)
const packDef_stats = loadSync(protoPath_stats, options)

const routerPackDef = loadPackageDefinition(packDef_router) as unknown as ProtoGrpcType
const statsPackDef = loadPackageDefinition(packDef_stats) as unknown as ProtoGrpcType

const _commands_router = routerPackDef.xray.app.router.command
const _commands_stats = statsPackDef.xray.app.stats.command

const stub_router = new _commands_router.RoutingService(`${ipaddr}:10085`, credentials.createInsecure())
const stub_stats = new _commands_stats.StatsService(`${ipaddr}:10085`, credentials.createInsecure())

// stub_stats.getSysStats({}, (err, res) => {
//     console.log(err)
//     console.log(res)
// })

const stream = stub_router.subscribeRoutingStats({})

stream.on('data', dt => {
    console.log(dt)
})