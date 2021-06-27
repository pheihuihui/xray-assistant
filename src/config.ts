import { APIService } from "lib/v2ray-config-json-schema/src/api";
import { V2RayProtocol } from "lib/v2ray-config-json-schema/src/common";
import { LogLevel } from "lib/v2ray-config-json-schema/src/log";
import { IStrategy } from "lib/v2ray-config-json-schema/src/routing";
import { IV2Ray } from "lib/v2ray-config-json-schema/src/v2ray";
import { ipaddr } from "./ipaddr";


let v2ray: IV2Ray = {
    stats: {
        routing: {
            enabled: true
        }
    },
    outbounds: [
        {
            mux: {
                enabled: false
            },
            protocol: V2RayProtocol.VMESS,
            streamSettings: {
                network: "tcp",
                security: "none"
            },
            settings: {
                vnext: [
                    {
                        port: 111,
                        users: [
                            {
                                "id": "aaa",
                                "alterId": 1
                            }
                        ],
                        address: "aaa"
                    }
                ]
            },
            tag: "main"
        },
        {
            protocol: V2RayProtocol.FREEDOM,
            tag: "bt"
        }
    ],
    log: {
        loglevel: LogLevel.warning
    },
    api: {
        services: [
            APIService.HandlerService,
            APIService.LoggerService,
            APIService.StatsService,
            APIService.RoutingService
        ],
        tag: "api"
    },
    routing: {
        rules: [
            {
                type: "field",
                protocol: [
                    "bittorrent"
                ],
                outboundTag: "bt"
            },
            {
                type: "field",
                domain: [
                    "torrent",
                    "peer_id=",
                    "info_hash",
                    "get_peers",
                    "find_node",
                    "BitTorrent",
                    "announce_peer",
                    "announce.php?passkey="
                ],
                outboundTag: "bt"
            },
            {
                type: "field",
                inboundTag: [
                    "api"
                ],
                outboundTag: "api"
            }
        ],
        domainStrategy: IStrategy.IPIfNonMatch
    },
    inbounds: [
        {
            port: 10085,
            protocol: V2RayProtocol.DOKODEMO_DOOR,
            tag: "api",
            settings: {
                address: "127.0.0.1"
            },
            listen: ipaddr
        }
    ]
}

let json = JSON.stringify(v2ray)
console.log(json)
