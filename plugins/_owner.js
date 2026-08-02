let handler = async (m, { conn }) => {
    let vcard = `BEGIN:VCARD
VERSION:3.0
N:;Antitop;;;
FN:Antitop
ORG:𝐀𝐍𝐓𝐈𝐓𝐎𝐏 𝐁𝐎𝐓
TEL;type=CELL;type=VOICE;waid=56920592945:+56 9 2059 2945
END:VCARD`

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: 'Antitop',
            contacts: [{ vcard }]
        }
    }, { quoted: m })

    await conn.reply(m.chat, `🥊 *𝐁𝐎𝐓 𝐀𝐍𝐓𝐈𝐓𝐎𝐏*

╭─「 👑 𝐂𝐑𝐄𝐀𝐃𝐎𝐑𝐀 」─╮
│
│ *𝐍𝐎𝐌𝐁𝐑𝐄:* 𝐀𝐧𝐭𝐢𝐭𝐨𝐩
│ *𝐄𝐒𝐓𝐀𝐃𝐎:* 𝐑𝐞𝐢𝐧𝐚 𝐝𝐞𝐥 𝐛𝐨𝐭 💅
│
╰─────────────────╯

> 𝐄𝐬𝐜𝐫𝐢𝐛𝐞𝐦𝐞 𝐥𝐢𝐧𝐝𝐚 𝐩𝐞𝐫𝐨 𝐬𝐢𝐧 𝐬𝐩𝐚𝐦 🥊💋`, m)
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner']
export default handler