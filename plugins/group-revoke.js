let handler = async (m, { conn }) => {
  try {
    const grupoID = m.chat

    await conn.groupRevokeInvite(grupoID)

    const nuevoEnlace = await conn.groupInviteCode(grupoID)
    const enlaceCompleto = 'https://chat.whatsapp.com/' + nuevoEnlace

    await conn.reply(m.sender, 
`⚡━━━━━━━━━━━━━━━⚡
✅ 𝗣𝗥𝗢𝗧𝗢𝗖𝗢𝗟𝗢 𝗘𝗝𝗘𝗖𝗨𝗧𝗔𝗗𝗢 ✅
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 𝗗𝗘 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 」─╮
│ 🔻 𝗘𝗡𝗟𝗔𝗖𝗘 𝗔𝗡𝗧𝗘𝗥𝗜𝗢𝗥: 𝗥𝗲𝘃𝗼𝗰𝗮𝗱𝗼
│ 🔗 𝗡𝗨𝗘𝗩𝗢 𝗘𝗡𝗟𝗔𝗖𝗘: ${enlaceCompleto}
│ 🛡️ 𝗘𝗦𝗧𝗔𝗗𝗢: 𝗦𝗶𝘀𝘁𝗲𝗺𝗮 𝗦𝗲𝗴𝘂𝗿𝗼
╰─────────────────────────╯

> "𝗘𝗹 𝗮𝗰𝗲𝘀𝗼 𝗮𝗻𝘁𝗲𝗿𝗶𝗼𝗿 𝗵𝗮 𝘀𝗶𝗱𝗼 𝗮𝗻𝘂𝗹𝗮𝗱𝗼"`, 
      m, { detectLink: true })

    await conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
🔒 𝗘𝗡𝗟𝗔𝗖𝗘 𝗥𝗘𝗦𝗧𝗔𝗕𝗟𝗘𝗖𝗜𝗗𝗢 🔒
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔 」─╮
│ 𝗘𝗹 𝗲𝗻𝗹𝗮𝗰𝗲 𝗮𝗻𝘁𝗲𝗿𝗶𝗼𝗿 𝘆𝗮 𝗻𝗼 𝗳𝘂𝗻𝗰𝗶𝗼𝗻𝗮
│ 𝗦𝗼𝗹𝗼 𝗲𝗹 𝗻𝘂𝗲𝘃𝗼 𝗲𝗻𝗹𝗮𝗰𝗲 𝗲𝘀 𝘃𝗮𝗹𝗶𝗱𝗼
╰───────────────────╯`, m)

  } catch (error) {
    console.error(error)
    await m.reply(`⚡━━━━━━━━━━━━━━━⚡
❌ 𝗘𝗥𝗢𝗥 𝗖𝗥𝗜𝗧𝗜𝗖𝗢 ❌
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗗𝗘𝗧𝗔𝗟𝗘 」─╮
│ ${error.message}
╰─────────────╯

╭─「 𝗦𝗢𝗟𝗨𝗖𝗜𝗢𝗡 」─╮
│ 𝗩𝗲𝗿𝗶𝗳𝗶𝗰𝗮 𝗾𝘂𝗲 𝗲𝗹 𝗯𝗼𝘁 𝘀𝗲𝗮 𝗮𝗱𝗺𝗶𝗻
╰─────────────────╯`)
  }
}

handler.help = ['revoke']
handler.tags = ['grupo']
handler.command = ['revoke', 'restablecer']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler