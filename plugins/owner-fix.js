import fs from 'fs';
import path from 'path';

var handler = async (m, { conn }) => {

  const ignoredFolders = ['node_modules', '.git']
  const ignoredFiles = ['package-lock.json'];

  async function getAllJSFiles(dir) {
    let jsFiles = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (ignoredFolders.includes(item.name) || ignoredFiles.includes(item.name)) continue;

      if (item.isDirectory()) {
        jsFiles = jsFiles.concat(await getAllJSFiles(fullPath));
      } else if (item.isFile() && fullPath.endsWith('.js')) {
        jsFiles.push(fullPath);
      }
    }
    return jsFiles
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
    conn.sendPresenceUpdate('composing', m.chat);

    const baseDir = path.resolve('./')
    const jsFiles = await getAllJSFiles(baseDir)

    let response = `⚡━━━━━━━━━━━━━━━⚡
🔍 𝗘𝗦𝗖𝗔𝗡𝗘𝗢 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 🔍
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗜𝗡𝗜𝗖𝗜𝗔𝗡𝗗𝗢 」─╮
│ 𝗔𝗥𝗖𝗛𝗜𝗩𝗢𝗦: ${jsFiles.length}
│ 𝗘𝗦𝗧𝗔𝗗𝗢: 𝗔𝗻𝗮𝗹𝗶𝘇𝗮𝗻𝗱𝗼...
╰──────────────────╯\n\n`
    
    let hasErrors = false
    let errorCount = 0

    for (const file of jsFiles) {
      try {
        await import(`file://${file}?update=${Date.now()}`);
      } catch (error) {
        hasErrors = true;
        errorCount++
        response += `╭─「 𝗘𝗥𝗢𝗥 #${errorCount} 」─╮\n`
        response += `│ 📁 𝗔𝗥𝗖𝗛𝗜𝗩𝗢: ${file.replace(baseDir + '/', '')}\n`
        response += `│ ❌ 𝗗𝗘𝗧𝗔𝗟𝗘: ${error.message.split('\n')[0]}\n`
        response += `╰─────────────────╯\n\n`
      }
    }

    if (!hasErrors) {
      response += `⚡━━━━━━━━━━━━━━━⚡
✅ 𝗘𝗦𝗖𝗔𝗡𝗘𝗢 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗢 ✅
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢 」─╮
│ 𝗘𝗥𝗢𝗥𝗘𝗦: 0
│ 𝗘𝗦𝗧𝗔𝗗𝗢: 𝗧𝗼𝗱𝗼 𝗲𝗻 𝗼𝗿𝗱𝗲𝗻
╰──────────────────╯`
    } else {
      response = `⚡━━━━━━━━━━━━━━━⚡
🔴 𝗘𝗦𝗖𝗔𝗡𝗘𝗢 𝗙𝗜𝗡𝗔𝗟𝗜𝗭𝗔𝗗𝗢 🔴
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗥𝗘𝗦𝗨𝗠𝗘𝗡 」─╮
│ 𝗔𝗥𝗖𝗛𝗜𝗩𝗢𝗦: ${jsFiles.length}
│ 𝗘𝗥𝗢𝗥𝗘𝗦: ${errorCount}
╰─────────────────╯\n\n` + response
    }

    await conn.reply(m.chat, response, m);

    await conn.sendMessage(m.chat, {
      react: { text: hasErrors ? '❌' : '✅', key: m.key }
    });

  } catch (err) {
    conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
❌ 𝗘𝗥𝗢𝗥 𝗖𝗥𝗜𝗧𝗜𝗖𝗢 ❌
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗗𝗘𝗧𝗔𝗟𝗘 」─╮
│ ${err.message}
╰─────────────╯`, m);
  }
}

handler.command = ['revsall'];
handler.help = ['revsall'];
handler.tags = ['owner'];
handler.owner = true;

export default handler;