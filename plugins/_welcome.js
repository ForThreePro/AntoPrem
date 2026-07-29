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
            actor? `𝗥𝗲𝗰𝗹𝘂𝘁𝗮𝗱𝗼 𝗽𝗼𝗿 @${actor.split('@')[0]}` : '𝗜𝗻𝗴𝗿𝗲𝘀𝗼 𝗮𝗹 𝘀𝗶𝘀𝘁𝗲𝗺𝗮',

        [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]:
            actor? `𝗘𝗹𝗶𝗺𝗶𝗻𝗮𝗱𝗼 𝗽𝗼𝗿 @${actor.split('@')[0]}` : '𝗘𝘅𝗽𝘂𝗹𝘀𝗮𝗱𝗼 𝗱𝗲𝗹 𝘀𝗶𝘀𝘁𝗲𝗺𝗮',

        [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]:
            '𝗔𝗯𝗮𝗻𝗱𝗼𝗻𝗼 𝗲𝗹 𝘀𝗶𝘀𝘁𝗲𝗺𝗮'
    };

    const format = (text) => {
        return text
        .replace('@user', `@${target.split('@')[0]}`)
        .replace('@name', targetName)
        .replace('@group', groupMetadata.subject)
        .replace('@desc', groupMetadata.desc?.toString() || '𝗦𝗶𝗻 𝗱𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼𝗻')
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
💀 𝗡𝗨𝗘𝗩𝗢 𝗢𝗣𝗘𝗥𝗔𝗧𝗜𝗩𝗢 𝗗𝗘𝗧𝗘𝗖𝗧𝗔𝗗𝗢 💀
⚡━━━━━━━━━━━━━━━⚡

🆔 𝗡𝗢𝗠𝗕𝗥𝗘: @name
👥 𝗚𝗥𝗨𝗣𝗢: @group

📡 𝗘𝗦𝗧𝗔𝗗𝗢: @action

╭─「 𝗜𝗡𝗙𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 」─╮
│ 📜 𝗗𝗘𝗦𝗖: @desc
│ 👥 𝗠𝗜𝗘𝗠𝗕𝗥𝗢𝗦: %users
│ ⚠️ 𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔: 𝗟𝗲𝗲 𝗿𝗲𝗴𝗹𝗮𝘀 𝗼 𝗯𝗮𝗻
╰───────────────────────╯

> "𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼 𝗮 𝗹𝗮 𝗿𝗲𝗱. 𝗡𝗼 𝗹𝗮 𝗰𝗮𝗴𝘂𝗲𝘀"
`.trim());

    const bye = format(`
⚡━━━━━━━━━━━━━━━⚡
🔻 𝗢𝗣𝗘𝗥𝗔𝗧𝗜𝗩𝗢 𝗗𝗔𝗗𝗢 𝗗𝗘 𝗕𝗔𝗝𝗔 🔻
⚡━━━━━━━━━━━━━━━⚡

🆔 𝗡𝗢𝗠𝗕𝗥𝗘: @name
👥 𝗚𝗥𝗨𝗣𝗢: @group

📡 𝗘𝗦𝗧𝗔𝗗𝗢: @action

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─╮
│ 👥 𝗠𝗜𝗘𝗠𝗕𝗥𝗢𝗦 𝗔𝗖𝗧𝗨𝗔𝗟𝗘𝗦: %users
│ 🕐 𝗦𝗔𝗟𝗜𝗗𝗔: @date
╰────────────────╯

> "𝗨𝗻 𝘀𝗼𝗹𝗱𝗮𝗱𝗼 𝗺𝗲𝗻𝗼𝘀. 𝗘𝗹 𝘀𝗶𝘀𝘁𝗲𝗺𝗮 𝘀𝗶𝗴𝘂𝗲"
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