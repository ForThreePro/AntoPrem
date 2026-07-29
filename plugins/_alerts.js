let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import fs from 'fs'
import path from 'path'
import { getBotConfig } from '../lib/botconfig.js'

const lidCache = new Map()
let handler = m => m

handler.before = async function (m, { conn }) {
    if (!m.messageStubType ||!m.isGroup) return

    let chat = global.db.data.chats[m.chat]
    let userss = m.messageStubParameters?.[0]
    if (!userss) return

    const realSenderRaw = await resolveLidToRealJid(m?.sender, conn, m?.chat)
    const realSender = realSenderRaw?.includes('@')? realSenderRaw : null

    const userTag = `@${userss.split('@')[0]}`
    const adminTag = realSender? `@${realSender.split('@')[0]}` : 'SISTEMA'

    const mentions = [userss]
    if (realSender) mentions.push(realSender)

    const context = {
        contextInfo: {
            mentionedJid: mentions,
            isForwarded: true
        }
    }

    // DISEÑO NUEVO CYBER MASCULINO
    const admingp = `
⚡━━━━━━━━━━━━━━━⚡
👑 𝙽𝚄𝙴𝚅𝙾 𝙰𝙳𝙼𝙸𝙽 𝙰𝚂𝙸𝙶𝙽𝙰𝙳𝙾 👑
⚡━━━━━━━━━━━━━━━⚡

💀 𝚄𝚂𝚄𝙰𝚁𝙸𝙾: ${userTag}
⚡ 𝙴𝚂𝚃𝙰𝙳𝙾: Rango Ascendido

🛡️ 𝙰𝚄𝚃𝙾𝚁𝙸𝚉𝙰𝙳𝙾 𝙿𝙾𝚁: ${adminTag}

╭─「 𝙿𝙾𝙳𝙴𝚁𝙴𝚂 𝙰𝙲𝚃𝙸𝚅𝙰𝙳𝙾𝚂 」─╮
│ 🔧 Kick / Promote / Demote
│ 🛡️ Editar info del grupo
│ 📢 Anuncios y Config
╰───────────────────╯

> "El poder conlleva responsabilidad"
`.trim()

    const noadmingp = `
⚡━━━━━━━━━━━━━━━⚡
🔒 𝙰𝙳𝙼𝙸𝙽 𝙳𝙴𝙶𝚁𝙰𝙳𝙰𝙳𝙾 🔒
⚡━━━━━━━━━━━━━━━⚡

❌ 𝚄𝚂𝚄𝙰𝚁𝙸𝙾: ${userTag}
⚠️ 𝙴𝚂𝚃𝙰𝙳𝙾: Rango Revocado

🛡️ 𝙰𝙲𝙲𝙸𝙾𝙽 𝙿𝙾𝚁: ${adminTag}

╭─「 𝙿𝙴𝚁𝙼𝙸𝚂𝙾𝚂 𝚁𝙴𝚅𝙾𝙲𝙰𝙳𝙾𝚂 」─╮
│ ❌ Ya no puede administrar
│ ❌ Acceso denegado a comandos
╰──────────────────────╯

> "Sin rango, sin poder"
`.trim()

    // LIMPIAR SESSION SI KICKEAN BOT
    if (chat.detect && m.messageStubType == 2) {
        const uniqid = (m.isGroup? m.chat : m.sender).split('@')[0]
        const sessionPath = `./sessions/`
        for (const file of await fs.readdir(sessionPath)) {
            if (file.includes(uniqid)) {
                await fs.unlink(path.join(sessionPath, file))
            }
        }
    }

    // PROMOTE
    if (chat.alerts && m.messageStubType == 29) {
        await conn.sendMessage(m.chat, {
            image: { url: getBotConfig(conn, 'banner') },
            caption: admingp,
           ...context
        }, { quoted: null })
        return
    }

    // DEMOTE
    if (chat.alerts && m.messageStubType == 30) {
        await conn.sendMessage(m.chat, {
            image: { url: getBotConfig(conn, 'banner') },
            caption: noadmingp,
           ...context
        }, { quoted: null })
        return
    }

    if (m.messageStubType == 2) return
}

export default handler

async function resolveLidToRealJid(lid, conn, groupChatId, maxRetries = 3, retryDelay = 60000) {
    const inputJid = lid?.toString?.() || ''
    if (!inputJid.endsWith("@lid") ||!groupChatId?.endsWith("@g.us")) {
        return inputJid.includes("@")? inputJid : `${inputJid}@s.whatsapp.net`
    }

    if (lidCache.has(inputJid)) {
        return lidCache.get(inputJid)
    }

    const lidToFind = inputJid.split("@")[0]
    let attempts = 0

    while (attempts < maxRetries) {
        try {
            const metadata = await conn?.groupMetadata(groupChatId)
            if (!metadata?.participants) throw new Error()

            for (const participant of metadata.participants) {
                try {
                    if (!participant?.jid) continue
                    const contactDetails = await conn?.onWhatsApp(participant.jid)
                    if (!contactDetails?.[0]?.lid) continue

                    const possibleLid = contactDetails[0].lid.split("@")[0]
                    if (possibleLid === lidToFind) {
                        lidCache.set(inputJid, participant.jid)
                        return participant.jid
                    }
                } catch {}
            }
            lidCache.set(inputJid, inputJid)
            return inputJid
        } catch {
            if (++attempts >= maxRetries) {
                lidCache.set(inputJid, inputJid)
                return inputJid
            }
            await new Promise(r => setTimeout(r, retryDelay))
        }
    }
    return inputJid
}