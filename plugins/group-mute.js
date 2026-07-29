let handler = async (m, { conn, text, isAdmin, isOwner, command }) => {
    if (!m.isGroup) return m.reply(`⚡━━━━━━━━━━━━━━━⚡
❌ 𝗘𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ❌
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗔𝗖𝗘𝗦𝗢 」─╮
│ 𝗘𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝘀𝗼𝗹𝗼 𝗲𝗻 𝗴𝗿𝘂𝗽𝗼𝘀
╰─────────────╯`)

    if (!isAdmin &&!isOwner) return m.reply(`⚡━━━━━━━━━━━━━━━⚡
⛔ 𝗔𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ⛔
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗣𝗘𝗥𝗠𝗜𝗦𝗢𝗦 」─╮
│ 𝗦𝗼𝗹𝗼 𝗮𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝗿𝗲𝘀
╰───────────────╯`)

    let mentioned = await m.mentionedJid
    let who = mentioned.length > 0
       ? mentioned[0]
        : m.quoted
       ? m.quoted.sender
        : text
       ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        : false

    if (!who) {
        return m.reply(`⚡━━━━━━━━━━━━━━━⚡
❌ 𝗘𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ❌
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗖𝗜𝗢𝗡 」─╮
│ 𝗘𝘁𝗶𝗾𝘂𝗲𝘁𝗮 𝗼 𝗰𝗶𝘁𝗮 𝗮𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼
│ 𝗘𝗷𝗲𝗺𝗽𝗹𝗼:.𝗺𝘂𝘁𝗲 @𝘂𝘀𝘂𝗮𝗿𝗶𝗼
╰───────────────────╯`)
    }

    const groupInfo = await conn.groupMetadata(m.chat)
    const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
    const protectedOwners = global.owner.map(o => o[0] + '@s.whatsapp.net')
    const targetName = global.db.data.users[who]?.name || await conn.getName(who)

    if (who === conn.user.jid || who === ownerGroup || who === ownerBot || protectedOwners.includes(who)) {
        return m.reply(`⚡━━━━━━━━━━━━━━━⚡
⛔ 𝗔𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ⛔
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 」─╮
│ 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝘀𝗶𝗹𝗲𝗻𝗰𝗶𝗮𝗿 𝗮𝗹 𝗼𝘄𝗻𝗲𝗿
╰──────────────────╯`)
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat.mutedUsers) chat.mutedUsers = []

    if (/^(mute|silenciar)$/i.test(command)) {
        if (chat.mutedUsers.includes(who)) {
            return m.reply(`⚡━━━━━━━━━━━━━━━⚡
⚠️ 𝗔𝗩𝗜𝗦𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ⚠️
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗘𝗦𝗧𝗔𝗗𝗢 」─╮
│ ${targetName} 𝘆𝗮 𝗲𝘀𝘁𝗮 𝘀𝗶𝗹𝗲𝗻𝗰𝗶𝗮𝗱𝗼
╰───────────────╯`)
        }

        chat.mutedUsers.push(who)

        await conn.reply(
            m.chat,
            `⚡━━━━━━━━━━━━━━━⚡
🔇 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 𝗦𝗜𝗟𝗘𝗡𝗖𝗜𝗔𝗗𝗢 🔇
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─╮
│ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢: ${targetName}
│ 𝗘𝗦𝗧𝗔𝗗𝗢: 𝗦𝗶𝗹𝗲𝗻𝗰𝗶𝗮𝗱𝗼
│ 𝗣𝗢𝗥: @${m.sender.split('@')[0]}
╰───────────────╯

> "𝗧𝗼𝗱𝗼𝘀 𝘀𝘂𝘀 𝗺𝗲𝗻𝘀𝗮𝗷𝗲𝘀 𝘀𝗲𝗿𝗮𝗻 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗱𝗼𝘀"`,
            m,
            { mentions: [who, m.sender] }
        )
    } else {
        if (!chat.mutedUsers.includes(who)) {
            return m.reply(`⚡━━━━━━━━━━━━━━━⚡
⚠️ 𝗔𝗩𝗜𝗦𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ⚠️
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗘𝗦𝗧𝗔𝗗𝗢 」─╮
│ ${targetName} 𝗻𝗼 𝗲𝘀𝘁𝗮 𝘀𝗶𝗹𝗲𝗻𝗰𝗶𝗮𝗱𝗼
╰───────────────╯`)
        }

        chat.mutedUsers = chat.mutedUsers.filter(u => u!== who)

        await conn.reply(
            m.chat,
            `⚡━━━━━━━━━━━━━━━⚡
🔊 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 𝗗𝗘𝗦𝗜𝗟𝗘𝗡𝗖𝗜𝗔𝗗𝗢 🔊
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─╮
│ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢: ${targetName}
│ 𝗘𝗦𝗧𝗔𝗗𝗢: 𝗟𝗶𝗯𝗲𝗿𝗮𝗱𝗼
│ 𝗣𝗢𝗥: @${m.sender.split('@')[0]}
╰───────────────╯`,
            m,
            { mentions: [who, m.sender] }
        )
    }
}

handler.before = async function (m, { conn, chat, isBotAdmin }) {
    if (!m.isGroup || m.fromMe) return false
    if (!isBotAdmin) return false
    if (!chat.mutedUsers ||!Array.isArray(chat.mutedUsers)) return false

    if (chat.mutedUsers.includes(m.sender)) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key })
            await conn.sendMessage(m.chat, { react: { text: '🔇', key: m.key } })
        } catch (e) {
            console.error(e)
        }
        return true
    }

    return false
}

handler.help = ['mute @user', 'unmute @user']
handler.tags = ['grupo']
handler.command = /^(mute|silenciar|unmute|desilenciar)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler