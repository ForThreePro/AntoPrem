var handler = async (m, { conn, participants }) => {
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
    return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⚠️ 𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ⚠️
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗘𝗦𝗧𝗔𝗗𝗢 」─╮
│ 𝗡𝗼 𝗵𝗮𝘆 𝘂𝘀𝘂𝗮𝗿𝗶𝗼𝘀 𝘃𝗮𝗹𝗶𝗱𝗼𝘀 𝗽𝗮𝗿𝗮 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿
╰───────────────╯`, m);
  }

  // Mensaje de advertencia antes de ejecutar
  await conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
🔴 𝗘𝗝𝗘𝗖𝗨𝗧𝗔𝗡𝗗𝗢 𝗣𝗥𝗢𝗧𝗢𝗖𝗢𝗟𝗢 🔴
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗞𝗜𝗖𝗞𝗔𝗟𝗟 」─╮
│ 𝗢𝗕𝗝𝗘𝗧𝗜𝗩𝗢𝗦: ${targets.length}
│ 𝗘𝗦𝗧𝗔𝗗𝗢: 𝗘𝗹𝗶𝗺𝗶𝗻𝗮𝗻𝗱𝗼...
│ 𝗔𝗨𝗧𝗢𝗥: @${m.sender.split('@')[0]}
╰───────────────╯

> "𝗜𝗻𝗶𝗰𝗶𝗮𝗻𝗱𝗼 𝗹𝗶𝗺𝗽𝗶𝗲𝘇𝗮 𝗱𝗲𝗹 𝘀𝗶𝘀𝘁𝗲𝗺𝗮"`, m, { mentions: [m.sender] });

  await conn.groupParticipantsUpdate(m.chat, targets, 'remove');

  await conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
✅ 𝗣𝗥𝗢𝗧𝗢𝗖𝗢𝗟𝗢 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗔𝗗𝗢 ✅
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─╮
│ 𝗘𝗫𝗣𝗨𝗟𝗦𝗔𝗗𝗢𝗦: ${targets.length}
│ 𝗘𝗦𝗧𝗔𝗗𝗢: 𝗚𝗿𝘂𝗽𝗼 𝗹𝗶𝗺𝗽𝗶𝗼
│ 𝗣𝗢𝗥: @${m.sender.split('@')[0]}
╰───────────────╯

> "𝗘𝗹 𝘀𝗶𝘀𝘁𝗲𝗺𝗮 𝗵𝗮 𝘀𝗶𝗱𝗼 𝗽𝘂𝗿𝗴𝗮𝗱𝗼"`, m, { mentions: [m.sender] });
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = ['kickall'];
handler.admin = true;
handler.botAdmin = true;
handler.group = true

export default handler;