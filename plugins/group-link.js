var handler = async (m, { conn, args }) => {

let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 🔗 *enlace del grupo*
│
│ ✨ *Link:* ${link}
│ 💕 *Estado:* Activo
│
│ > *“Compártelo con cuidadito bb”*
╰─────────────────💖`, m, { detectLink: true })

}
handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler