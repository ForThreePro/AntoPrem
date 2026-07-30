const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply(`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ✨ *ya eres admin bb*
│
│ 💋 *No necesitas más*
╰─────────────────💖`);

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react('💖')
    m.reply(`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 👑 *ascenso concedido*
│
│ 👤 *Usuario:* @${m.sender.split('@')[0]}
│ ✨ *Nuevo rango:* Administradora
│ 💕 *Por:* Sistema Antitop
╰─────────────────💖`, null, { mentions: [m.sender] });

  } catch (e) {
    console.error(e)
    m.reply(`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 😿 *no pude darte admin*
│
│ ⚡ *Dame permisos de admin primero*
╰─────────────────💖`);
  }
};

handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler