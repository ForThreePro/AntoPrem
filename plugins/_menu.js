import moment from 'moment-timezone'
import os from 'os'

const CATEGORY_META = {
config: '⚙️ 𝗖𝗢𝗡𝗙𝗜𝗚',
main: '🔧 𝗠𝗔𝗜𝗡',
tools: '🛠️ 𝗧𝗢𝗟𝗦',
owner: '👑 𝗢𝗪𝗡𝗘𝗥',
sorteos: '🎯 𝗦𝗢𝗥𝗧𝗘𝗢𝗦',
fun: '😈 𝗙𝗨𝗡',
joda: '😎 𝗝𝗢𝗗𝗔',
ff: '🔫 𝗙𝗙',
buscadores: '🔍 𝗦𝗘𝗔𝗥𝗖𝗛',
descargas: '📥 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥',
grupo: '⚔️ 𝗚𝗥𝗨𝗣𝗢𝗦',
grupos: '🛡️ 𝗚𝗥𝗨𝗣𝗢',
gacha: '👥 𝗚𝗥𝗢𝗨𝗣',
ia: '🤖 𝗜𝗡𝗧𝗘𝗟𝗜𝗚𝗘𝗡𝗖𝗜𝗔 𝗔𝗥𝗧𝗜𝗙𝗜𝗖𝗜𝗔𝗟',
info: 'ℹ️ 𝗜𝗡𝗙𝗢',
sticker: '🎨 𝗦𝗧𝗜𝗖𝗞𝗘𝗥',
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
const IMG_MENU = 'https://files.evogb.win/4EIjxL.jpg'

let menuTexto = `⚡ *𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧* 🔥 ୨

⤷ ┇ *𝗦𝗬𝗦𝗧𝗘𝗠:* v3.0 Cyber ：✦ 。
╰─ ◈ *𝗢𝗡𝗟𝗜𝗡𝗘* • ${horas}𝗵 ${minutos}𝗺 ${segundos}𝘀

╭─「 👤 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 」─╮
│ 💀 @${userName}
│ 💬 "𝗖𝗼𝗻𝗲𝗰𝘁𝗮𝗱𝗼. 𝗟𝗶𝘀𝘁𝗼 𝗽𝗮𝗿𝗮 𝗱𝗼𝗺𝗶𝗻𝗮𝗿"
╰────────────────╯

──⚡ *𝗘𝗦𝗧𝗔𝗗𝗜𝗦𝗧𝗜𝗖𝗔𝗦* ╏ 📊
👥 *𝗨𝘀𝘂𝗮𝗿𝗶𝗼𝘀:* ${totalUsers} | 📜 *𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀:* ${pluginsCount}
💾 *𝗥𝗔𝗠:* ${ram}𝗺𝗯 | 🌐 *𝗦𝗲𝗿𝘃𝗶𝗱𝗼𝗿:* ${totalram}𝗴𝗯

──🔧 *𝗦𝗜𝗦𝗧𝗘𝗠𝗔* 🔧──
📅 *𝗗𝗶𝗮:* ${fecha}
📆 *𝗙𝗲𝗰𝗵𝗮:* ${fecha2}
🕐 *𝗛𝗼𝗿𝗮:* ${hora} | 📡 *𝗣𝗶𝗻𝗴:* ${Math.round(performance.now())}𝗺𝘀

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

  menuTexto += `\n╭─「 ${CATEGORY_META[tag]} 」─╮\n`
  menuTexto += cmds.map(c => `│ ${icono}.${c}`).join('\n') + '\n'
  menuTexto += `╰─────────────────╯\n`
}

menuTexto += `
⚡━━━━━━━━━━━━━━━⚡
🔥 *𝗕𝗢𝗧:* 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧
💀 *𝗖𝗥𝗘𝗔𝗗𝗢𝗥:* 𝗪𝗵𝗼𝗶𝘀 𝗬𝗮𝗹𝗹𝗶 𝗰𝗼 👑
⚡ *𝗩𝗘𝗥𝗦𝗜𝗢𝗡:* 3.0 𝗖𝘆𝗯𝗲𝗿 𝗠𝗮𝘀𝗰𝘂𝗹𝗶𝗻𝗼
🌐 *𝗪𝗘𝗕:* 𝗴𝗶𝘁𝗵𝘂𝗯.𝗰𝗼𝗺

> "𝗖𝗼𝗻𝗲𝗰𝘁𝗮𝗱𝗼 𝗮𝗹 𝘀𝗶𝘀𝘁𝗲𝗺𝗮. 𝗗𝗼𝗺𝗶𝗻𝗮 𝗼 𝗺𝘂𝗲𝗿𝗲" ⚡
⚡━━━━━━━━━━━━━━━⚡`

await conn.sendMessage(m.chat, {
  image: { url: IMG_MENU },
  caption: menuTexto.trim(),
  mentions: [m.sender]
}, { quoted: m })

} catch (e) {
await conn.sendMessage(m.chat, { text: `❌ *𝗦𝗬𝗦𝗧𝗘𝗠 𝗘𝗥𝗢𝗥:* ${e.message}` }, { quoted: m })
}
}

handler.help = ['menu']
handler.tags = ['info']
handler.command = ['menu', 'help', 'menucyber']

export default handler