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
      return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 🥺 *menciona o responde a alguien*
│
│ ✨ *Para darle/quitarle admin*
╰─────────────────💖`, m)
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
        return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⚠️ *ayy @${who.split('@')[0]} ya es admin*
╰─────────────────💖`, m, { mentions: [who] })
      }

      await conn.groupParticipantsUpdate(m.chat, [who], 'promote')

      return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 👑 *ascenso ejecutado*
│
│ 👤 *Usuario:* @${who.split('@')[0]}
│ ✨ *Nuevo rango:* Administradora
│ 💕 *Por:* @${m.sender.split('@')[0]}
│
│ > *“Ahora cuida bien el grupo bb”*
╰─────────────────💖`, m, { mentions: [who, m.sender] })
    }

    // DEMOTE
    if (protectedOwners.includes(who)) {
      return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⛔ *no puedo degradar al owner*
╰─────────────────💖`, m)
    }

    if (!participant?.admin) {
      return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⚠️ *@${who.split('@')[0]} no es admin*
╰─────────────────💖`, m, { mentions: [who] })
    }

    if (who === groupMetadata.owner) {
      return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⛔ *no se puede degradar al creador*
╰─────────────────💖`, m)
    }

    if (who === conn.user.jid) {
      return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⛔ *no puedo degradarme a mi misma*
╰─────────────────💖`, m)
    }

    await conn.groupParticipantsUpdate(m.chat, [who], 'demote')

    return conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 🔻 *degradación ejecutada*
│
│ 👤 *Usuario:* @${who.split('@')[0]}
│ ✨ *Nuevo rango:* Miembro
│ 💕 *Por:* @${m.sender.split('@')[0]}
│
│ > *“Ya no tiene poderes bb”*
╰─────────────────💖`, m, { mentions: [who, m.sender] })

  } catch (e) {
    conn.reply(m.chat, `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 😿 *ayy errorcito*
│
│ 📝 *Detalle:* ${e.message}
╰─────────────────💖`, m)
  }
}

handler.help = ['promote', 'demote']
handler.tags = ['group']
handler.command = ['promote', 'demote']
handler.admin = true
handler.botAdmin = true

export default handler