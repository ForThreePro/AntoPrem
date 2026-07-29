let handler = async (m, { conn, args, usedPrefix, command }) => {
    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : args[0]? (args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net') : false
    if (!who) return m.reply(`⚡ *USO:* ${usedPrefix + command} @tag\n\n*Ejemplo:* ${usedPrefix + command} @${m.sender.split('@')[0]}`)

    let name = await conn.getName(who)
    let name2 = await conn.getName(m.sender)
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://d.uguu.se/hNMqwsKZ.jpg')

    let opciones = [
        'gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'burro', 'burra',
        'kbro', 'chivo', 'kchera', 'choro', 'cachero', 'cauchera', 'cabezón',
        'jinetero', 'sangre', 'tragón', 'fresa', 'pipero', 'muerto', 'bamba',
        'yapa', 'caña', 'pata', 'floro', 'miserable', 'gil', 'gilasa', 'lenteja',
        'chibolo', 'chibola', 'viejo', 'vieja', 'grasa', 'graso', 'pituco',
        'pituca', 'sapa', 'sapo', 'pavo', 'pava', 'trome', 'reina', 'king',
        'zombie', 'tóxica', 'tóxico', 'simp', 'vago', 'vaga', 'loquito',
        'manco', 'manca', 'rata', 'prostituta', 'prostituto', 'fiel', 'infiel'
    ]

    let random = opciones[Math.floor(Math.random() * opciones.length)]

    let txt = `⚡━━━━━━━━━━━━━━━⚡
😈 𝙰𝙽𝙰𝙻𝙸𝚂𝙸𝚂 𝙳𝙴𝙻 𝚂𝙸𝚂𝚃𝙴𝙼𝙰 😈
⚡━━━━━━━━━━━━━━━⚡

💀 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: @${who.split('@')[0]}
👤 𝙴𝚂𝙲𝙰𝙽𝙴𝙰𝙳𝙾 𝙿𝙾𝚁: @${m.sender.split('@')[0]}

╭─「 𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾 」─╮
│ 🔍 𝙳𝙸𝙰𝙶𝙽𝙾𝚂𝚃𝙸𝙲𝙾: ${random.toUpperCase()}
│ 📊 𝙽𝙸𝚅𝙴𝙻: ${Math.floor(Math.random() * 100)}%
╰─────────────────╯

> "El sistema no miente" ⚡`

    await conn.sendMessage(m.chat, {
        image: { url: pp },
        caption: txt,
        mentions: [who, m.sender]
    }, { quoted: m })
}

handler.help = ['joda @tag']
handler.tags = ['fun']
handler.command = ['joda', 'diagnostico']
handler.group = true

export default handler