import { WAMessageStubType } from '@whiskeysockets/baileys';

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType ||!m.isGroup) return true;

    const chat = global.db.data.chats[m.chat];
    if (!chat.welcome) return true;

    const target = m.messageStubParameters?.[0];
    if (!target) return true;

    const userData = global.db.data.users[target] || {};
    const targetName = userData.name || await conn.getName(target) || `@${target.split('@')[0]}`;

    const actor = m.participant || m.key.participant || m.messageStubParameters?.[1] || null;

    let memberCount = participants.length;
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) memberCount++;
    if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) memberCount--;

    const actionText = {
        [WAMessageStubType.GROUP_PARTICIPANT_ADD]:
            actor? `Reclutado por @${actor.split('@')[0]}` : 'Ingreso al sistema',

        [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]:
            actor? `Eliminado por @${actor.split('@')[0]}` : 'Expulsado del sistema',

        [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]:
            'Abandonó el sistema'
    };

    const format = (text) => {
        return text
         .replace('@user', `@${target.split('@')[0]}`)
         .replace('@name', targetName)
         .replace('@group', groupMetadata.subject)
         .replace('@desc', groupMetadata.desc?.toString() || 'Sin descripción')
         .replace('%users', memberCount)
         .replace('@action', actionText[m.messageStubType] || '')
         .replace('@date', new Date().toLocaleString('es-PE'));
    };

    // DETECTAR SI TIENE FOTO O NO
    let ppUrl;
    try {
        ppUrl = await conn.profilePictureUrl(target, 'image');
    } catch {
        // Si no tiene foto, usa tu banner cyber
        ppUrl = 'https://d.uguu.se/hNMqwsKZ.jpg'
    }

    const welcome = format(`
⚡━━━━━━━━━━━━━━━⚡
💀 𝙽𝚄𝙴𝚅𝙾 𝙾𝙿𝙴𝚁𝙰𝚃𝙸𝚅𝙾 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙾 💀
⚡━━━━━━━━━━━━━━━⚡

🆔 𝙽𝙾𝙼𝙱𝚁𝙴: @name
👥 𝙶𝚁𝚄𝙿𝙾: @group

📡 𝙴𝚂𝚃𝙰𝙳𝙾: @action

╭─「 𝙸𝙽𝙵𝙾 𝙳𝙴𝙻 𝚂𝙸𝚂𝚃𝙴𝙼𝙰 」─╮
│ 📜 𝙳𝙴𝚂𝙲: @desc
│ 👥 𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂: %users
│ ⚠️ 𝙰𝙳𝚅𝙴𝚁𝚃𝙴𝙽𝙲𝙸𝙰: Lee reglas o ban
╰───────────────────────╯

> "Bienvenido a la red. No la cagues"
`.trim());

    const bye = format(`
⚡━━━━━━━━━━━━━━━⚡
🔻 𝙾𝙿𝙴𝚁𝙰𝚃𝙸𝚅𝙾 𝙳𝙰𝙳𝙾 𝙳𝙴 𝙱𝙰𝙹𝙰 🔻
⚡━━━━━━━━━━━━━━━⚡

🆔 𝙽𝙾𝙼𝙱𝚁𝙴: @name
👥 𝙶𝚁𝚄𝙿𝙾: @group

📡 𝙴𝚂𝚃𝙰𝙳𝙾: @action

╭─「 𝚁𝙴𝙿𝙾𝚁𝚃𝙴 」─╮
│ 👥 𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂 𝙰𝙲𝚃𝚄𝙰𝙻𝙴𝚂: %users
│ 🕐 𝚂𝙰𝙻𝙸𝙳𝙰: @date
╰────────────────╯

> "Un soldado menos. El sistema sigue"
`.trim());

    const mentions = [target];
    if (actor) mentions.push(actor);

    const context = {
        contextInfo: {
            mentionedJid: mentions,
            isForwarded: true
        }
    };

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        await conn.sendMessage(m.chat, {
            image: { url: ppUrl },
            caption: welcome,
         ...context
        });
    }

    if ([WAMessageStubType.GROUP_PARTICIPANT_LEAVE, WAMessageStubType.GROUP_PARTICIPANT_REMOVE].includes(m.messageStubType)) {
        await conn.sendMessage(m.chat, {
            image: { url: ppUrl },
            caption: bye,
         ...context
        });
    }
}