import { getBotConfig } from '../lib/botconfig.js'

let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
  const botname = getBotConfig(conn, 'botname')

    if (!text) return m.reply(`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 🥺 *ayy me falta el link*
│
│ ✨ *Pásame la invitación para que*
│ 💕 *${botname}* *se una al grupo*
╰─────────────────💖`);

    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply(`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ❌ *link no válido bb*
│
│ 😭 *Revisa que sea un link de WhatsApp*
╰─────────────────💖`);

    if (isOwner) {
        await conn.groupAcceptInvite(code)
            .then(res => m.reply(`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ✨ *ya me uní al grupo*
│
│ 💋 *Gracias por invitarme*
╰─────────────────💖`))
            .catch(err => m.reply(`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 😿 *no pude unirme*
│
│ ⚡ *Revisa mis permisos bb*
╰─────────────────💖`));
    } else {
        let message = `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 📨 *solicitud de ingreso*
│
│ 🔗 *Link:* ${text}
│ 👤 *Por:* @${m.sender.split('@')[0]}
╰─────────────────💖`;
        await conn.sendMessage(`${suittag}` + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 📤 *listo, envié tu solicitud*
│
│ 💕 *Ya le avisé al owner*
╰─────────────────💖`, null, { mentions: [m.sender] });
    }
};

handler.help = ['invite'];
handler.tags = ['owner'];
handler.command = ['invite', 'join'];

export default handler