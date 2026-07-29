import moment from 'moment-timezone'
import { getBotConfig } from '../lib/botconfig.js'

const CATEGORY_META = {
main: '⚡ 𝙼𝙰𝙸𝙽 𝙲𝙾𝚁𝙴',
rg: '📝 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝚈',
info: '📊 𝙸𝙽𝙵𝙾 𝙼𝙾𝙳𝚄𝙻𝙴',
ia: '🧠 𝙰𝙸 𝙽𝙴𝚄𝚁𝙰𝙻',
buscadores: '🔍 𝚂𝙲𝙰𝙽 𝙴𝙽𝙶𝙸𝙽𝙴',
descargas: '📥 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 𝙷𝚄𝙱',
imagen: '🖼️ 𝙸𝙼𝙰𝙶𝙴 𝙶𝙴𝙽',
fun: '🎮 𝙴𝙽𝚃𝙴𝚁𝚃𝙰𝙸𝙽𝙼𝙴𝙽𝚃',
game: '🎯 𝙰𝚁𝙲𝙰𝙳𝙴',
anime: '🌸 𝙰𝙽𝙸𝙼𝙴 𝚅𝙴𝚁𝚂𝙴',
grupo: '👥 𝙶𝚁𝙾𝚄𝙿 𝙲𝙾𝙽𝚃𝚁𝙾𝙻',
gacha: '🎲 𝙶𝙰𝙲𝙷𝙰 𝚂𝚈𝚂𝚃𝙴𝙼',
text: '✨ 𝚃𝙴𝚇𝚃 𝙴𝙵𝙵𝙴𝙲𝚃𝚂',
rpg: '💰 𝙲𝚁𝙴𝙳𝙸𝚃 𝙼𝙰𝚁𝙺𝙴𝚃',
sticker: '🎨 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝙵𝙰𝙱',
tools: '🛠️ 𝚃𝙾𝙾𝙻 𝙱𝙾𝚇',
nsfw: '🔞 𝚁𝙴𝚂𝚃𝚁𝙸𝙲𝚃𝙴𝙳',
serbot: '🌐 𝚂𝚄𝙱-𝙱𝙾𝚃 𝙽𝙴𝚃',
owner: '👑 𝙰𝙳𝙼𝙸𝙽 𝙿𝙰𝙽𝙴𝙻'
}

let handler = async (m, { conn }) => {
try {

await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } })

const pluginsActivos = Object.values(global.plugins || {}).filter(p =>!p?.disabled)
const pluginsCount = pluginsActivos.length
const fecha = moment.tz('America/Havana').format('DD/MM/YYYY')
const hora = moment.tz('America/Havana').format('hh:mm:ss A')

const byTag = {}
for (const plugin of pluginsActivos) {
  const tags = Array.isArray(plugin.tags)? plugin.tags : (plugin.tags? [plugin.tags] : [])
  const helps = Array.isArray(plugin.help)? plugin.help : (plugin.help? [plugin.help] : [])
  for (const tag of tags) {
    if (!CATEGORY_META[tag]) continue
    if (!byTag[tag]) byTag[tag] = new Set()
    for (const h of helps) {
      if (typeof h === 'string' && h.trim()) byTag[tag].add(h.trim())
    }
  }
}

const userName = m.pushName || 'Usuario'
const botnameConfig = 'CYBER BOT'
const mainBotJid = global.conn?.user?.jid?.split(':')[0]
const currentBotJid = conn.user?.jid?.split(':')[0]
const isMainBot = mainBotJid && currentBotJid && mainBotJid === currentBotJid
const botType = isMainBot? '🔵 𝙼𝙰𝙸𝙽 𝙽𝙾𝙳𝙴' : '🟣 𝚂𝚄𝙱 𝙽𝙾𝙳𝙴'

// LINK DE TU BANNER CYBER
const IMG_MENU = 'https://d.uguu.se/hNMqwsKZ.jpg'

let menuTexto = `
╔══════════════════════════╗
║ ▄▀▄ ▄▀▀▄ ▄▀▄ ▄ ▄ ▄▀▄ ║
║ █▀█ █ █ █▀█ █ █ █▀█ ║
║ ▀ ▀ ▀ ▀ ▀ ▀ ▀ ▀ ▀ ▀ ║
║ 𝙲𝚈𝙱𝙴𝚁 𝙱𝙾𝚃 𝚅3.0 ║
╚══════════════════╝

╭─〔 👤 𝚄𝚂𝙴𝚁 𝙳𝙰𝚃𝙰 〕─╮
│ 🆔 𝙽𝚊𝚖𝚎 : ${userName}
│ 🤖 𝙱𝚘𝚝 : ${botnameConfig}
│ ⚡ 𝚃𝚢𝚙𝚎 : ${botType}
│ 👨‍💻 𝙳𝚎𝚟 : Whois Yallico
╰──────────────────╯

╭─〔 📡 𝚂𝚈𝚂𝚃𝙴𝙼 𝚂𝚃𝙰𝚃𝚄𝚂 〕─╮
│ 📅 𝙳𝚊𝚝𝚎 : ${fecha}
│ ⏰ 𝚃𝚒𝚖𝚎 : ${hora}
│ 📦 𝙿𝚕𝚞𝚐𝚒𝚗𝚜 : ${pluginsCount} Active
│ 🔗 𝙲𝚑𝚊𝚗𝚎𝚕 : bit.ly/cyber-canal
╰──────────────────╯

`

for (const tag of Object.keys(CATEGORY_META)) {
  const set = byTag[tag]
  if (!set || set.size === 0) continue
  const cmds = [...set].sort()

  menuTexto += `┏━━━[ ${CATEGORY_META[tag]} ]━━━┓\n`
  menuTexto += cmds.map(c => `┃ ⚡.${c}`).join('\n') + '\n'
  menuTexto += `┗━━━━━━━━━━━━━━━━━━━┛\n\n`
}

menuTexto += `
╔══════════╗
║ 💎 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚆𝙷𝙾𝙸𝚂 𝚈𝙰𝙻𝙻𝙸𝙲𝙾 💎 ║
║ 𝙽𝙴𝚇𝚃 𝙶𝙴𝙽 𝙱𝙾𝚃 𝚃𝙴𝙲𝙷𝙽𝙾𝙻𝙾𝙶𝚈 ║
╚══════════╝
`

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