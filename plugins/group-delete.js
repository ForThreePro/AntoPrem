let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `⚡ *𝗘𝗥𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔* ⚡\n\n╭─「 𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗜𝗢𝗡 」─╮\n│ 𝗖𝗶𝘁𝗮 𝗲𝗹 𝗺𝗲𝗻𝘀𝗮𝗷𝗲 𝗾𝘂𝗲 𝗱𝗲𝘀𝗲𝗮𝘀 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿\n╰────────────────╯`, m)

try {
    // Caso 1: Mensaje de otro usuario
    let key = m.quoted.vM.key
    await conn.sendMessage(m.chat, { delete: key })
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    
} catch (e) {
    // Caso 2: Fallback si falla
    try {
        let delet = m.quoted.vM.key
        await conn.sendMessage(m.chat, { delete: delet })
    } catch {
        return conn.reply(m.chat, `❌ *𝗙𝗔𝗟𝗟𝗢:* 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗱𝗼 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 𝗲𝗹 𝗺𝗲𝗻𝘀𝗮𝗷𝗲`, m)
    }
}}

handler.help = ['delete']
handler.tags = ['𝗴𝗿𝘂𝗽𝗼']
handler.command = ['del','delete','d']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler