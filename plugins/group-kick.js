var handler = async (m, { conn, participants, usedPrefix, command }) => {
  let texto = await m.mentionedJid;
  let user = texto.length > 0? texto[0] : (m.quoted? await m.quoted.sender : false);

  if (!user) {
    return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
❌ 𝗘𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ❌
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗖𝗜𝗢𝗡 」─╮
│ 𝗠𝗲𝗻𝗰𝗶𝗼𝗻𝗮 𝗼 𝗰𝗶𝘁𝗮 𝗮𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼
│ 𝗘𝗷𝗲𝗺𝗽𝗹𝗼:.𝗸𝗶𝗰𝗸 @𝘂𝘀𝘂𝗮𝗿𝗶𝗼
╰───────────────────╯`, m);
  }

  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = globalThis.owner[0][0] + '@s.whatsapp.net';
  const protectedOwners = global.owner.map(o => o[0] + '@s.whatsapp.net');
  const targetName = globalThis.db.data.users[user]?.name || await conn.getName(user)

  if (user === m.sender) {
    return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⛔ 𝗔𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ⛔
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 」─╮
│ 𝗡𝗼 𝗽𝘂𝗲𝗱𝗲𝘀 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿𝘁𝗲 𝗮 𝘁𝗶 𝗺𝗶𝘀𝗺𝗼
╰──────────────────╯`, m);
  }

  if (user === conn.user.jid) {
    return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⛔ 𝗔𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ⛔
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 」─╮
│ 𝗡𝗼 𝗽𝘂𝗲𝗱𝗼 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿𝗺𝗲 𝗮 𝗺𝗶 𝗺𝗶𝘀𝗺𝗼
╰──────────────────╯`, m);
  }

  if (user === ownerGroup) {
    return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⛔ 𝗔𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ⛔
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 」─╮
│ 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿 𝗮𝗹 𝗰𝗿𝗲𝗮𝗱𝗼𝗿
╰──────────────────╯`, m);
  }

  if (user === ownerBot || protectedOwners.includes(user)) {
    return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⛔ 𝗔𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ⛔
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 」─╮
│ 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿 𝗮𝗹 𝗼𝘄𝗻𝗲𝗿
╰──────────────────╯`, m);
  }

  const participant = groupInfo.participants.find(p => p.jid === user);

  if (!participant) {
    return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⚠️ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 𝗡𝗢 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗢 ⚠️
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗘𝗦𝗧𝗔𝗗𝗢 」─╮
│ ${targetName} 𝘆𝗮 𝗻𝗼 𝗲𝘀𝘁𝗮 𝗲𝗻 𝗲𝗹 𝗴𝗿𝘂𝗽𝗼
╰───────────────╯`, m);
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

  await conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
🔻 𝗘𝗫𝗣𝗨𝗟𝗦𝗜𝗢𝗡 𝗘𝗝𝗘𝗖𝗨𝗧𝗔𝗗𝗔 🔻
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─╮
│ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢: ${targetName}
│ 𝗔𝗖𝗜𝗢𝗡: 𝗘𝗫𝗣𝗨𝗟𝗦𝗔𝗗𝗢
│ 𝗣𝗢𝗥: @${m.sender.split('@')[0]}
╰───────────────╯

> "𝗟𝗮 𝗽𝘂𝗲𝗿𝘁𝗮 𝘀𝗲 𝗰𝗲𝗿𝗼 𝘁𝗿𝗮𝘀 𝘀𝘂 𝘀𝗮𝗹𝗶𝗱𝗮"`, m, { mentions: [m.sender] });
};

handler.help = ['kick'];
handler.tags = ['𝗴𝗿𝘂𝗽𝗼'];
handler.command = ['kick'];
handler.admin = true;
handler.botAdmin = true;

export default handler;