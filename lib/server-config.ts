export const SERVER = {
  name: 'SCP: Roleplay',
  host: '62.122.215.220',
  port: 19291,
  get address() {
    return `${this.host}:${this.port}`
  },
  get connectUrl() {
    return `steam://connect/${this.host}:${this.port}`
  },
  game: "Garry's Mod",
}
