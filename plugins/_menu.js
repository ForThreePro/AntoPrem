import moment from 'moment-timezone'
import { getBotConfig } from '../lib/botconfig.js'

const CATEGORY_META = {
main: '⚡ MAIN',
rg: '📝 REGISTRO',
info: '📊 INFORMACIÓN',
ia: '🧠 INTELIGENCIA AI',
buscadores: '🔍 BUSCADORES',
descargas: '📥 DESCARGAS',
imagen: '🖼️ IMÁGENES',
fun: '🎮 DIVERSIÓN',
game: '🎯 JUEGOS',
anime: '🌸 ANIME',
grupo: '👥 GRUPO ADMIN',
gacha: '🎲 GACHA',
text: '✨ EFECTOS',
rpg: '💰 ECONOMÍA',
sticker: '🎨 STICKERS',
tools: '🛠️ UTILIDADES',
nsfw: '🔞 NSFW',
serbot: '🌐 SUB-BOTS',
owner: '👑 OWNER'
}

let handler = async (m, { conn }) => {
try {

await conn.sendMessage(m.chat, {
  react: { text: '💻', key: m.key }
})

const pluginsActivos = Object.values(global.plugins || {}).filter(p =>!p?.disabled)
const pluginsCount = pluginsActivos.length

const fecha = moment.tz('America/Havana').format('DD/MM/YYYY')
const hora = moment.tz('America/Havana').format('hh:mm A')

const byTag = {}

for (const plugin of pluginsActivos) {
  const tags = Array.isArray(plugin.tags)
 ? plugin.tags
    : (plugin.tags? [plugin.tags] : [])

  const helps = Array.isArray(plugin.help)
 ? plugin.help
    : (plugin.help? [plugin.help] : [])

  for (const tag of tags) {
    if (!CATEGORY_META[tag]) continue

    if (!byTag[tag]) byTag[tag] = new Set()

    for (const h of helps) {
      if (typeof h === 'string' && h.trim()) {
        byTag[tag].add(h.trim())
      }
    }
  }
}

const userName = m.pushName || 'Usuario'
const botnameConfig = 'Cyber Bot'

const mainBotJid = global.conn?.user?.jid?.split(':')[0]
const currentBotJid = conn.user?.jid?.split(':')[0]
const isMainBot = mainBotJid && currentBotJid && mainBotJid === currentBotJid

const botType = isMainBot? '🤖 MAIN BOT' : '👾 SUB-BOT'

let menuTexto = ''

menuTexto += `┏━━━━━━━━━━━━━┓\n`
menuTexto += `┃ 🌐 𝚂𝚈𝚂𝚃𝙴𝙼 𝙾𝙽𝙻𝙸𝙽𝙴 🌐 ┃\n`
menuTexto += `┗━━━━━━━━━━━━━━━━━━━━━┛\n\n`
menuTexto += `👋 *𝙷𝚘𝚕𝚊:* @${userName}\n`
menuTexto += `🤖 *𝙱𝚘𝚝:* ${botnameConfig} ${botType}\n\n`
menuTexto += `╭─「 📡 𝙳𝙰𝚃𝙾𝚂 」─╮\n`
menuTexto += `│ 📅 𝙵𝚎𝚌𝚑𝚊: ${fecha}\n`
menuTexto += `│ ⏰ 𝙷𝚘𝚛𝚊: ${hora}\n`
menuTexto += `│ 📦 𝙿𝚕𝚞𝚐𝚒𝚗𝚜: ${pluginsCount}\n`
menuTexto += `│ 👨‍💻 𝙲𝚛𝚎𝚊𝚍𝚘𝚛: Whois Yallico\n`
menuTexto += `╰───────────────────╯\n\n`
menuTexto += `🔗 𝙲𝚊𝚗𝚊𝚕: https://whatsapp.com/channel/0029Vb7h1qC65yDEhghegc2O\n\n`

for (const tag of Object.keys(CATEGORY_META)) {
  const set = byTag[tag]

  if (!set || set.size === 0) continue

  const cmds = [...set].sort()

  menuTexto += `┌──「 ${CATEGORY_META[tag]} 」──\n`
  menuTexto += `│\n`

  menuTexto += cmds.map(c => `│ ◉.${c}`).join('\n') + '\n'

  menuTexto += `└───────────────────\n\n`
}

menuTexto += `╭─「 ⚙️ 𝙲𝚁𝙴𝙳𝙸𝚃𝙾𝚂 」─╮\n`
menuTexto += `│ 💙 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 Whois Yallico\n`
menuTexto += `│ 🚀 𝚅𝚎𝚛𝚜𝚒𝚘𝚗: Cyber v2.0\n`
menuTexto += `╰───────────────────╯`

// LINK FIJO DIRECTO
const IMG_MENU = 'https://d.uguu.se/hNMqwsKZ.jpg'

await conn.sendMessage(m.chat, {
  image: { url: IMG_MENU },
  caption: menuTexto.trim(),
  mentions: [m.sender]
}, { quoted: m })

} catch (e) {
await conn.sendMessage(m.chat, {
text: `❌ *Error:* ${e.message || e}`
}, { quoted: m })
}
}

handler.help = ['menu']
handler.tags = ['info']
handler.command = ['menu', 'help']

export default handler