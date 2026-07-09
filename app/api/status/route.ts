import { GameDig } from 'gamedig'
import { NextResponse } from 'next/server'
import { SERVER } from '@/lib/server-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const state = await GameDig.query({
      type: 'garrysmod',
      host: SERVER.host,
      port: SERVER.port,
      socketTimeout: 4000,
      attemptTimeout: 8000,
    })

    return NextResponse.json({
      online: true,
      name: state.name,
      map: state.map,
      players: state.players.length,
      maxPlayers: state.maxplayers,
      ping: state.ping,
      playerList: state.players
        .map((p) => ({ name: p.name ?? 'Неизвестно', raw: p.raw }))
        .filter((p) => p.name && p.name.trim() !== ''),
      queriedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json({
      online: false,
      players: 0,
      maxPlayers: 0,
      playerList: [],
      queriedAt: new Date().toISOString(),
    })
  }
}
