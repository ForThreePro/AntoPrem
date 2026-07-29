import { getBotConfig } from '../lib/botconfig.js'

const handler = async (m, { conn, command }) => {
  try {
    const jid = (id) => id?.includes('@')? id : `${id}@s.whatsapp.net`
    let who =
      m.mentionedJid?.[0] ||
      m.msg?.contextInfo?.mentionedJid?.[0] ||
      m.quoted?.sender ||
      null

    if (!who) {
      return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
❌ 𝗘𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ❌
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗖𝗜𝗢𝗡 」─╮
│ 𝗠𝗲𝗻𝗰𝗶𝗼𝗻𝗮 𝗼 𝗰𝗶𝘁𝗮 𝗮𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼
╰───────────────────╯`, m)
    }

    who = jid(who)

    const groupMetadata = await conn.groupMetadata(m.chat)
    const participant = groupMetadata.participants.find(
      p => jid(p.id || p.jid) === who
    )

    const isPromote = command === 'promote'
    const protectedOwners = global.owner.map(
      o => o[0] + '@s.whatsapp.net'
    )
    const targetName = await conn.getName(who)

    if (isPromote) {
      if (participant?.admin) {
        return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⚠️ 𝗔𝗩𝗜𝗦𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ⚠️
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗘𝗦𝗧𝗔𝗗𝗢 」─╮
│ @${who.split('@')[0]} 𝘆𝗮 𝗲𝘀 𝗮𝗱𝗺𝗶𝗻
╰───────────────╯`, m, { mentions: [who] })
      }

      await conn.groupParticipantsUpdate(m.chat, [who], 'promote')

      return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
👑 𝗔𝗦𝗖𝗘𝗡𝗦𝗢 𝗘𝗝𝗘𝗖𝗨𝗧𝗔𝗗𝗢 👑
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─╮
│ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢: @${who.split('@')[0]}
│ 𝗡𝗨𝗘𝗩𝗢 𝗥𝗔𝗡𝗚𝗢: 𝗔𝗗𝗠𝗜𝗡𝗜𝗦𝗧𝗥𝗔𝗗𝗢𝗥
│ 𝗣𝗢𝗥: @${m.sender.split('@')[0]}
╰───────────────╯`, m, { mentions: [who, m.sender] })
    }

    // DEMOTE
    if (protectedOwners.includes(who)) {
      return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⛔ 𝗔𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ⛔
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 」─╮
│ 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗱𝗲𝗴𝗿𝗮𝗱𝗮𝗿 𝗮𝗹 𝗼𝘄𝗻𝗲𝗿
╰──────────────────╯`, m)
    }

    if (!participant?.admin) {
      return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⚠️ 𝗔𝗩𝗜𝗦𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 ⚠️
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗘𝗦𝗧𝗔𝗗𝗢 」─╮
│ @${who.split('@')[0]} 𝗻𝗼 𝗲𝘀 𝗮𝗱𝗺𝗶𝗻
╰───────────────╯`, m, { mentions: [who] })
    }

    if (who === groupMetadata.owner) {
      return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⛔ 𝗔𝗖𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ⛔
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 」─╮
│ 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗱𝗲𝗴𝗿𝗮𝗱𝗮𝗿 𝗮𝗹 𝗰𝗿𝗲𝗮𝗱𝗼𝗿
╰──────────────────╯`, m)
    }

    if (who === conn.user.jid) {
      return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
⛔ 𝗔𝗖𝗘𝗦𝗢 𝗗𝗘𝗡𝗘𝗚𝗔𝗗𝗢 ⛔
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 」─╮
│ 𝗡𝗼 𝗽𝘂𝗲𝗱𝗼 𝗱𝗲𝗴𝗿𝗮𝗱𝗮𝗿𝗺𝗲 𝗮 𝗺𝗶 𝗺𝗶𝘀𝗺𝗼
╰──────────────────╯`, m)
    }

    await conn.groupParticipantsUpdate(m.chat, [who], 'demote')

    return conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
🔻 𝗗𝗘𝗚𝗥𝗔𝗗𝗔𝗖𝗜𝗢𝗡 𝗘𝗝𝗘𝗖𝗨𝗧𝗔𝗗𝗔 🔻
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─╮
│ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢: @${who.split('@')[0]}
│ 𝗡𝗨𝗘𝗩𝗢 𝗥𝗔𝗡𝗚𝗢: 𝗠𝗜𝗘𝗠𝗕𝗥𝗢
│ 𝗣𝗢𝗥: @${m.sender.split('@')[0]}
╰───────────────╯`, m, { mentions: [who, m.sender] })

  } catch (e) {
    conn.reply(m.chat, `⚡━━━━━━━━━━━━━━━⚡
❌ 𝗘𝗥𝗢𝗥 𝗖𝗥𝗜𝗧𝗜𝗖𝗢 ❌
⚡━━━━━━━━━━━━━━━⚡

╭─「 𝗗𝗘𝗧𝗔𝗟𝗘 」─╮
│ ${e.message}
╰───────────────╯`, m)
  }
}

handler.help = ['promote', 'demote']
handler.tags = ['𝗴𝗿𝘂𝗽𝗼']
handler.command = ['promote', 'demote']
handler.admin = true
handler.botAdmin = true

export default handler