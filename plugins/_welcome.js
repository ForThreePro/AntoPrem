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
            actor? `💕 *Recibida por* @${actor.split('@')[0]}` : '✨ *Se unió solita*',

        [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]:
            actor? `🥺 *Expulsada por* @${actor.split('@')[0]}` : '😿 *Fue expulsada*',

        [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]:
            '💔 *Se fue del grupo*'
    };

    const format = (text) => {
        return text
       .replace('@user', `@${target.split('@')[0]}`)
       .replace('@name', targetName)
       .replace('@group', groupMetadata.subject)
       .replace('@desc', groupMetadata.desc?.toString() || '💖 *Sin descripción*')
       .replace('%users', memberCount)
       .replace('@action', actionText[m.messageStubType] || '')
       .replace('@date', new Date().toLocaleString('es-PE'));
    };

    // DETECTAR SI TIENE FOTO O NO
    let ppUrl;
    try {
        ppUrl = await conn.profilePictureUrl(target, 'image');
    } catch {
        // NUEVO LINK ANTITOP
        ppUrl = 'https://files.evogb.win/raPUZJ.jpg'
    }

    const welcome = format(`
╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ✨ *nueva integrante*
│
│ 🆔 *Nombre:* @name
│ 👥 *Grupo:* @group
│
│ 📡 *Estado:* @action
│
│ ── *INFO DEL GRUPO* ──
│ 📜 *Desc:* @desc
│ 👥 *Miembros:* %users
│ 💋 *Tip:* Lee las reglas bb
╰─────────────────💖

> *“Bienvenida al club. Pórtate bonito”*
`.trim());

    const bye = format(`
╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ 💔 *se nos fue una bb*
│
│ 🆔 *Nombre:* @name
│ 👥 *Grupo:* @group
│
│ 📡 *Estado:* @action
│
│ ── *REPORTE* ──
│ 👥 *Miembros:* %users
│ 🕐 *Salida:* @date
╰─────────────────💖

> *“Te vamos a extrañar. Cuídate mucho”*
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