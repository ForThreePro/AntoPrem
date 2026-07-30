var handler = async (m, { conn, participants, usedPrefix, command }) => {
  let texto = await m.mentionedJid;
  let user = texto.length > 0? texto[0] : (m.quoted? await m.quoted.sender : false);

  if (!user) {
    return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 🥺 *menciona o responde a alguien*
│
│ ✨ *Ejemplo:*.kick @usuario
╰─────────────────💖`, m);
  }

  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = globalThis.owner[0][0] + '@s.whatsapp.net';
  const protectedOwners = global.owner.map(o => o[0] + '@s.whatsapp.net');
  const targetName = globalThis.db.data.users[user]?.name || await conn.getName(user)

  if (user === m.sender) {
    return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⛔ *no puedes expulsarte bb*
╰─────────────────💖`, m);
  }

  if (user === conn.user.jid) {
    return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⛔ *no puedo expulsarme*
╰─────────────────💖`, m);
  }

  if (user === ownerGroup) {
    return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⛔ *no se puede expulsar al creador*
╰─────────────────💖`, m);
  }

  if (user === ownerBot || protectedOwners.includes(user)) {
    return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⛔ *no se puede expulsar al owner*
╰─────────────────💖`, m);
  }

  const participant = groupInfo.participants.find(p => p.jid === user);

  if (!participant) {
    return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⚠️ *${targetName} ya no está en el grupo*
╰─────────────────💖`, m);
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

  await conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 🔻 *expulsión ejecutada*
│
│ 👤 *Usuario:* ${targetName}
│ ✨ *Acción:* Expulsado
│ 💕 *Por:* @${m.sender.split('@')[0]}
│
│ > *“La puerta se cerró tras su salida”*
╰─────────────────💖`, m, { mentions: [m.sender] });
};

handler.help = ['kick'];
handler.tags = ['group'];
handler.command = ['kick'];
handler.admin = true;
handler.botAdmin = true;

export default handler;