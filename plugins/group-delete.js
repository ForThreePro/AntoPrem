let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 🥺 *ayy cita el mensaje*
│
│ ✨ *el que deseas eliminar bb*
╰─────────────────💖`, m)

try {
    // Caso 1: Mensaje de otro usuario
    let key = m.quoted.vM.key
    await conn.sendMessage(m.chat, { delete: key })
    await conn.sendMessage(m.chat, { react: { text: '💖', key: m.key } })

} catch (e) {
    // Caso 2: Fallback si falla
    try {
        let delet = m.quoted.vM.key
        await conn.sendMessage(m.chat, { delete: delet })
    } catch {
        return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 😿 *no se pudo eliminar*
│
│ ⚡ *Revisa mis permisos bb*
╰─────────────────💖`, m)
    }
}}

handler.help = ['delete']
handler.tags = ['group']
handler.command = ['del','delete','d']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler