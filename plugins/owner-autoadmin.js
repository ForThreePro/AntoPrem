const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply(`⚡━━━━━━━━━━━━━━━⚡
⚠️ 𝗔𝗩𝗜𝗦𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ⚠️
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗘𝗦𝗧𝗔𝗗𝗢 」─╮
│ 𝗬𝗮 𝗲𝗿𝗲𝘀 𝗮𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝗿
╰───────────────╯`);
  
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react('✅')
    m.reply(`⚡━━━━━━━━━━━━━━━⚡
👑 𝗔𝗦𝗖𝗘𝗡𝗦𝗢 𝗖𝗢𝗡𝗖𝗘𝗗𝗜𝗗𝗢 👑
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─╮
│ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢: @${m.sender.split('@')[0]}
│ 𝗡𝗨𝗘𝗩𝗢 𝗥𝗔𝗡𝗚𝗢: 𝗔𝗗𝗠𝗜𝗡𝗜𝗦𝗧𝗥𝗔𝗗𝗢𝗥
│ 𝗣𝗢𝗥: 𝗦𝗜𝗦𝗧𝗘𝗠𝗔
╰───────────────╯`, null, { mentions: [m.sender] });
    
  } catch (e) {
    console.error(e)
    m.reply(`⚡━━━━━━━━━━━━━━━⚡
❌ 𝗘𝗥𝗢𝗥 𝗖𝗥𝗜𝗧𝗜𝗖𝗢 ❌
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗗𝗘𝗧𝗔𝗟𝗘 」─╮
│ 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗱𝗼 𝗱𝗮𝗿 𝗮𝗱𝗺𝗶𝗻
│ 𝗩𝗲𝗿𝗶𝗳𝗶𝗰𝗮 𝗽𝗲𝗿𝗺𝗶𝘀𝗼𝘀 𝗱𝗲𝗹 𝗯𝗼𝘁
╰─────────────────╯`);
  }
};

handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;