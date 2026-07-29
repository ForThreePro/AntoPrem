import moment from 'moment-timezone'
import os from 'os'

const CATEGORY_META = {
config: '⚙️ CONFIG',
main: '🔧 MAIN',
tools: '🛠️ TOOLS',
owner: '👑 OWNER',
sorteos: '🎯 SORTEOS',
fun: '😈 FUN',
ff: '🔫 FF',
buscadores: '🔍 SEARCH',
descargas: '📥 DOWNLOADER',
grupo: '⚔️ GRUPOS',
grupos: '🛡️ GRUPO',
gacha: '👥 GROUP',
ia: '🤖 INTELIGENCIA ARTIFICIAL',
info: 'ℹ️ INFO',
sticker: '🎨 STICKER',
}

let handler = async (m, { conn }) => {
try {
await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } })

const fecha = moment.tz('America/Lima').format('dddd')
const fecha2 = moment.tz('America/Lima').format('DD [de] MMMM [de] YYYY')
const hora = moment.tz('America/Lima').format('hh:mm:ss a')
const uptime = process.uptime()
const horas = Math.floor(uptime / 3600)
const minutos = Math.floor((uptime % 3600) / 60)
const segundos = Math.floor(uptime % 60)
const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
const totalram = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
const pluginsCount = Object.values(global.plugins || {}).filter(p =>!p?.disabled).length
const totalUsers = Object.keys(global.db.data.users || {}).length

const byTag = {}
for (const plugin of Object.values(global.plugins || {})) {
  if (plugin.disabled) continue
  const tags = Array.isArray(plugin.tags)? plugin.tags : (plugin.tags? [plugin.tags] : [])
  const helps = Array.isArray(plugin.help)? plugin.help : (plugin.help? [plugin.help] : [])
  for (const tag of tags) {
    if (!CATEGORY_META[tag]) continue
    if (!byTag[tag]) byTag[tag] = new Set()
    for (const h of helps) if (typeof h === 'string' && h.trim()) byTag[tag].add(h.trim())
  }
}

const userName = m.pushName || 'Usuario'
const IMG_MENU = 'https://d.uguu.se/hNMqwsKZ.jpg'

let menuTexto = `⚡ *CYBER BOT* 🔥 ୨

 ⤷ ┇ *SYSTEM:* v3.0 Cyber ：✦ 。
╰─ ◈ online • ${horas}h ${minutos}m ${segundos}s

 ╭─「 👤 USUARIO 」─╮
│ 💀 @${userName}
│ 💬 "Conectado. Listo para dominar"
╰────────────────╯

──⚡ *ESTADÍSTICAS* ╏ 📊
👥 Usuarios: ${totalUsers} | 📜 Comandos: ${pluginsCount}
💾 RAM: ${ram}mb | 🌐 Servidor: ${totalram}gb

──🔧 *SISTEMA* 🔧──
📅 ${fecha}
📆 ${fecha2}
🕐 ${hora} | 📡 Ping: ${Math.round(performance.now())}ms

`

for (const tag of Object.keys(CATEGORY_META)) {
  const set = byTag[tag]
  if (!set || set.size === 0) continue
  const cmds = [...set].sort()

  let icono = '🔧'
  if(tag === 'config') icono = '⚙️'
  if(tag === 'owner') icono = '👑'
  if(tag === 'fun') icono = '😈'
  if(tag === 'ff') icono = '🔫'
  if(tag === 'buscadores') icono = '🔍'
  if(tag === 'descargas') icono = '📥'
  if(tag === 'grupo') icono = '⚔️'
  if(tag === 'grupos') icono = '🛡️'
  if(tag === 'gacha') icono = '👥'
  if(tag === 'ia') icono = '🤖'
  if(tag === 'info') icono = 'ℹ️'
  if(tag === 'sticker') icono = '🎨'

  menuTexto += `╭─「 ${CATEGORY_META[tag]} 」─╮\n`
  menuTexto += cmds.map(c => `│ ${icono}.${c}`).join('\n') + '\n'
  menuTexto += `╰─────────────────╯\n\n`
}

menuTexto += `⚡━━━━━━━━━━━━━━━⚡
🔥 *BOT:* CYBER BOT
💀 *CREADOR:* Whois Yallli co 👑
⚡ *VERSION:* 3.0 Cyber Masculino
🌐 *WEB:* github.com

> "Conectado al sistema. Domina o muere" ⚡
⚡━━━━━━━━━━━━━━━⚡`

await conn.sendMessage(m.chat, {
  image: { url: IMG_MENU },
  caption: menuTexto.trim(),
  mentions: [m.sender]
}, { quoted: m })

} catch (e) {
await conn.sendMessage(m.chat, { text: `❌ *SYSTEM ERROR:* ${e.message}` }, { quoted: m })
}
}

handler.help = ['menu']
handler.tags = ['info']
handler.command = ['menu', 'help', 'menucyber']

export default handler