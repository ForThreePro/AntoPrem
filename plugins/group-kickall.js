lvar handler = async (m, { conn, participants }) => {
  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = globalThis.owner[0][0] + '@s.whatsapp.net';

  let targets = participants
  .map(p => p.id)
  .filter(id => id!== conn.user.jid)
  .filter(id => id!== ownerGroup)
  .filter(id => id!== ownerBot)
  .filter(id => {
      const isAdmin = participants.find(p => p.id === id)?.admin
      return!isAdmin // No expulsa admins
    });

  if (!targets.length) {
    return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⚠️ *ayy no hay nadie que expulsar*
│
│ ✨ *Todos son admins o protegidos*
╰─────────────────💖`, m);
  }

  // Mensaje de advertencia antes de ejecutar
  await conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 🔴 *ejecutando limpieza*
│
│ 👥 *Objetivo:* ${targets.length} usuarios
│ ✨ *Estado:* Eliminando...
│ 💕 *Por:* @${m.sender.split('@')[0]}
│
│ > *“Iniciando limpieza del grupo bb”*
╰─────────────────💖`, m, { mentions: [m.sender] });

  await conn.groupParticipantsUpdate(m.chat, targets, 'remove');

  await conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ✅ *limpieza completada*
│
│ 👥 *Expulsados:* ${targets.length}
│ ✨ *Estado:* Grupo limpio
│ 💕 *Por:* @${m.sender.split('@')[0]}
│
│ > *“El grupo ya está purificado”*
╰─────────────────💖`, m, { mentions: [m.sender] });
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = ['kickall'];
handler.admin = true;
handler.botAdmin = true;
handler.group = true

export default handler;