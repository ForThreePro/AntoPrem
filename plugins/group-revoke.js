,let handler = async (m, { conn }) => {
  try {
    const grupoID = m.chat

    await conn.groupRevokeInvite(grupoID)

    const nuevoEnlace = await conn.groupInviteCode(grupoID)
    const enlaceCompleto = 'https://chat.whatsapp.com/' + nuevoEnlace

    await conn.reply(m.sender,
`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ✨ *protocolo ejecutado*
│
│ 🔻 *Link anterior:* Revocado
│ 🔗 *Nuevo link:* ${enlaceCompleto}
│ 🛡️ *Estado:* Sistema seguro
│
│ > *“El acceso anterior fue anulado bb”*
╰─────────────────💖`,
      m, { detectLink: true })

    await conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 🔒 *link restablecido*
│
│ ⚠️ *El link anterior ya no sirve*
│ 💕 *Solo el nuevo link es válido*
╰─────────────────💖`, m)

  } catch (error) {
    console.error(error)
    await m.reply(`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 😿 *ayy errorcito*
│
│ 📝 *Detalle:* ${error.message}
│
│ ⚡ *Solución:* Dame admin bb
╰─────────────────💖`)
  }
}

handler.help = ['revoke']
handler.tags = ['grupo']
handler.command = ['revoke', 'restablecer']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler