let handler = async (m, { conn, args, command, isOwner }) => {
  const setting = args[0]?.toLowerCase();
  const chatData = global.db.data.chats[m.chat];
  const botSettings = global.db.data.settings[conn.user.jid];

  const statusIcon = (conf) => conf? '✅' : '❌';
  const statusText = (conf) => conf? 'ACTIVADO' : 'DESACTIVADO';

  const configList = `
╭━━━〔 ⚙️ 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 〕━━━╮
│
│ ${statusIcon(chatData.welcome)} 𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐚 : ${statusText(chatData.welcome)}
│ ${statusIcon(chatData.antiLink)} 𝐀𝐧𝐭𝐢𝐋𝐢𝐧𝐤 : ${statusText(chatData.antiLink)}
│ ${statusIcon(chatData.economy)} 𝐄𝐜𝐨𝐧𝐨𝐦𝐢𝐚 : ${statusText(chatData.economy)}
│ ${statusIcon(chatData.gacha)} 𝐆𝐚𝐜𝐡𝐚 : ${statusText(chatData.gacha)}
│ ${statusIcon(chatData.adminonly)} 𝐌𝐨𝐝𝐨 𝐀𝐝𝐦𝐢𝐧 : ${statusText(chatData.adminonly)}
│ ${statusIcon(chatData.reaction)} 𝐑𝐞𝐚𝐜𝐜𝐢𝐨𝐧𝐞𝐬 : ${statusText(chatData.reaction)}
│ ${statusIcon(chatData.nsfw)} 𝐍𝐒𝐅𝐖 : ${statusText(chatData.nsfw)}
│ ${statusIcon(chatData.alerts)} 𝐀𝐥𝐞𝐫𝐭𝐚𝐬 : ${statusText(chatData.alerts)}
│ ${statusIcon(chatData.notprefix)} 𝐒𝐢𝐧 𝐏𝐫𝐞𝐟𝐢𝐣𝐨 : ${statusText(chatData.notprefix)}
│ ${statusIcon(botSettings?.jadibotmd)} 𝐒𝐮𝐛𝐁𝐨𝐭𝐬 : ${statusText(botSettings?.jadibotmd)}
│
╰━━━〔 💡 𝐔𝐒𝐎 〕━━━╮
│ ${command} welcome on/off
│ ${command} antilink on/off
╰━━━━━━━━━━╯`.trim();

  if (!setting) {
    return m.reply(configList);
  }

  const status = command === 'on';

  const reply = (name) =>
    m.reply(`
╭━━━〔 ⚙️ 𝐅𝐔𝐍𝐂𝐈𝐎́𝐍 〕━━━╮
│
│ 📌 𝐎𝐩𝐜𝐢𝐨𝐧 : ${name}
│ 📊 𝐄𝐬𝐭𝐚𝐝𝐨 : ${status? '✅ ACTIVADO' : '❌ DESACTIVADO'}
│
╰━━━━━━━━━━╯`.trim());

  switch (setting) {
    case 'antilink':
    case 'antilinks':
    case 'antienlaces':
      chatData.antiLink = status;
      reply('Anti Enlaces');
      break;

    case 'rpg':
    case 'economia':
      chatData.rpg = status;
      chatData.economy = status;
      reply('Economía');
      break;

    case 'gacha':
      chatData.gacha = status;
      reply('Gacha');
      break;

    case 'modoadmin':
    case 'adminonly':
    case 'onlyadmin':
      chatData.adminonly = status;
      reply('Modo Admin');
      break;

    case 'nsfw':
      chatData.nsfw = status;
      reply('NSFW');
      break;

    case 'bienvenida':
    case 'welcome':
      chatData.welcome = status;
      reply('Bienvenida');
      break;

    case 'reaccion':
    case 'reaction':
      chatData.reaction = status;
      reply('Reacciones');
      break;

    case 'alerts':
    case 'alertas':
      chatData.alerts = status;
      reply('Alertas');
      break;

    case 'notprefix':
    case 'noprefix':
    case 'sinprefijo':
      chatData.notprefix = status;
      reply('Sin Prefijo');
      break;

    case 'serbot':
    case 'jadibot':
    case 'subbots':
      if (!isOwner) {
        return m.reply(`
╭━━━〔 ⛔ 𝐀𝐂𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 〕━━━╮
│
│ Solo el 𝐎𝐰𝐧𝐞𝐫 puede modificar
│ esta función del sistema
│
╰━━━━━━━━━━╯`.trim());
      }

      if (botSettings) {
        botSettings.jadibotmd = status;
        reply('SubBots');
      }
      break;

    default:
      m.reply(`
╭━━━〔 ⚠️ 𝐄𝐑𝐎𝐑 〕━━━╮
│
│ Opción no válida
│
╰━━━━━━━━━━╯

${configList}
`.trim());
      break;
  }
};

handler.help = ['on', 'off'];
handler.tags = ['grupo'];
handler.command = ['on', 'off'];
handler.admin = true;
handler.botAdmin = false;

export default handler