import { PlayerRole } from '../enums/player-role'

export interface Player {
    socketId: string
    username: string,
    role: PlayerRole,
    isOwner: boolean,
    vote?: number
}
