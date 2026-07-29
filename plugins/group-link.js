var handler = async (m, { conn, args }) => {

let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
🔗 𝗘𝗡𝗟𝗔𝗖𝗘 𝗗𝗘𝗟 𝗚𝗥𝗨𝗣𝗢 🔗
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗜𝗡𝗙𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 」─╮
│ 𝗘𝗡𝗟𝗔𝗖𝗘: ${link}
│ 𝗘𝗦𝗧𝗔𝗗𝗢: 𝗔𝗰𝘁𝗶𝘃𝗼
╰───────────────────────╯

> "𝗖𝗼𝗺𝗽𝗮𝗿𝘁𝗲 𝗰𝗼𝗻 𝗰𝘂𝗶𝗱𝗮𝗱𝗼"`, m, { detectLink: true })

}
handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler