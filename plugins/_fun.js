let handler = async (m, { conn, command }) => {
    if(!m.isGroup) return m.reply('⚡ Solo funciona en grupos')

    let metadata = await conn.groupMetadata(m.chat)
    let users = metadata.participants.map(u => u.id)
    let porcentaje = Math.floor(Math.random() * 101)

    const BOX_TOP = `⚡━━━━━━━━━━━━━━━⚡`
    const BOX_MID = `│`
    const BOX_BOT = `⚡━━━━━━━━━━━━━━━⚡`

    const frasesDuo = ["Somos el duo perfecto 😎","Juntos somos un peligro ⚠️","El duo que rompe grupos 💥","Duo de chisme nivel dios ☕","Dinamita pura 🧨","El mejor duo del server 👑"]
    const frasesBro = ['"Oe mano pásame 5 soles"','"Ya pe no seas malo"','"Después te pago juro"','"Invítame una gaseosa"']
    const frasesPerro = ['Te dice "amor" y a 3 más también','Huele a cuernos','Te deja en visto','Sube historias sin ti']

    function getRandomUsers(cantidad) {
        let shuffled = [...users].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, cantidad)
    }

    function jidToTag(jid) {
        return '@' + jid.split('@')[0] // WhatsApp detecta así
    }

    let txt = ''
    let mentions = []

    switch(command.toLowerCase()) {
        // ========== FLIRT ==========
        case 'miamor': case 'mi amor':
            let target1 = m.mentionedJid[0] || m.quoted?.sender || m.sender
            mentions = [target1]
            txt = `${BOX_TOP}
😈 𝙰𝙼𝙾𝚁 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙾 😈
${BOX_BOT}

${BOX_MID} 💕 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target1)} 💕
${BOX_MID}
${BOX_MID} 𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙰𝙼𝙾𝚁: ${porcentaje}%
${BOX_MID} 𝙳𝙸𝙰𝙶𝙽𝙾𝚂𝚃𝙸𝙲𝙾: Aunque seas tóxico/a
${BOX_BOT}`
            break

        case 'mibebito':
            let target2 = m.mentionedJid[0] || m.quoted?.sender || m.sender
            mentions = [target2]
            txt = `${BOX_TOP}
🍼 𝙵𝙸𝚄 𝙵𝙸𝚄 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙾 🍼
${BOX_BOT}

${BOX_MID} 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target2)} 😏
${BOX_MID} 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_MID} 𝙴𝚂𝚃𝙰𝙳𝙾: Pásame tu número
${BOX_BOT}`
            break

        case 'bratz':
            let target3 = m.mentionedJid[0] || m.quoted?.sender || m.sender
            mentions = [target3]
            txt = `${BOX_TOP}
💄 𝙱𝚁𝙰𝚃𝚉 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙰 💄
${BOX_BOT}

${BOX_MID} 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target3)}
${BOX_MID} 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_MID} 𝙴𝚂𝚃𝙰𝙳𝙾: Muñeca malcriada
${BOX_BOT}`
            break

        case 'bellaka':
            let target4 = m.mentionedJid[0] || m.quoted?.sender || m.sender
            mentions = [target4]
            txt = `${BOX_TOP}
💃 𝙱𝙴𝙻𝙰𝙺𝙰 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙰 💃
${BOX_BOT}

${BOX_MID} 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target4)}
${BOX_MID} 𝙿𝙴𝚁𝙴𝙾: ${porcentaje}%
${BOX_MID} 𝙴𝚂𝚃𝙰𝙳𝙾: Perrea hasta el suelo
${BOX_BOT}`
            break

        // ========== TROLO ==========
        case 'brother':
            let target5 = m.mentionedJid[0] || m.quoted?.sender || m.sender
            mentions = [target5]
            txt = `${BOX_TOP}
👬 𝙵𝚁𝙰𝚂𝙴 𝙿𝙸𝚃𝚄𝙵𝙾 👬
${BOX_BOT}

${BOX_MID} 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target5)}
${BOX_MID} 𝙳𝙸𝙲𝙴: ${frasesBro[Math.floor(Math.random()*4)]}
${BOX_BOT}`
            break

        case 'perroinfiel': case 'perro infiel':
            let target6 = m.mentionedJid[0] || m.quoted?.sender || m.sender
            mentions = [target6]
            txt = `${BOX_TOP}
🐕 𝙿𝙴𝚁𝙾 𝙸𝙽𝙵𝙸𝙴𝙻 🐕
${BOX_BOT}

${BOX_MID} 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target6)}
${BOX_MID} 𝙴𝚅𝙸𝙳𝙴𝙽𝙲𝙸𝙰: ${frasesPerro[Math.floor(Math.random()*4)]}
${BOX_MID} 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_BOT}`
            break

        case 'mentiroso': case 'mentiras':
            let target7 = m.mentionedJid[0] || m.quoted?.sender || m.sender
            mentions = [target7]
            txt = `${BOX_TOP}
🤥 𝙼𝙴𝙽𝚃𝙸𝚁𝙾𝚂𝙾 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙾 🤥
${BOX_BOT}

${BOX_MID} 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target7)}
${BOX_MID} 𝙵𝚁𝙰𝚂𝙴: "Te lo juro por mi mamá"
${BOX_MID} 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_BOT}`
            break

        // ========== GRUPALES ==========
        case '2p2':
            if(users.length < 4) return m.reply('⚡ Mínimo 4 personas en el grupo')
            let cuatro = getRandomUsers(4)
            mentions = cuatro
            txt = `${BOX_TOP}
2️⃣ 𝚂𝙸𝚂𝚃𝙴𝙼𝙰 2𝙿2 2️⃣
${BOX_BOT}

${BOX_MID} 𝙿𝙰𝚁𝙴𝙹𝙰 1: ${jidToTag(cuatro[0])} ❤️ ${jidToTag(cuatro[1])}
${BOX_MID} 𝙿𝙰𝚁𝙴𝙹𝙰 2: ${jidToTag(cuatro[2])} ❤️ ${jidToTag(cuatro[3])}
${BOX_MID}
${BOX_MID} 𝙲𝙾𝙼𝙿𝙰𝚃𝙸𝙱𝙸𝙻𝙸𝙳𝙰𝙳: ${porcentaje}%
${BOX_BOT}`
            break

        case '3p3':
            if(users.length < 6) return m.reply('⚡ Mínimo 6 personas en el grupo')
            let seis = getRandomUsers(6)
            mentions = seis
            txt = `${BOX_TOP}
3️⃣ 𝚂𝙸𝚂𝚃𝙴𝙼𝙰 3𝙿3 3️⃣
${BOX_BOT}

${BOX_MID} 𝙿1: ${jidToTag(seis[0])} ❤️ ${jidToTag(seis[1])}
${BOX_MID} 𝙿2: ${jidToTag(seis[2])} ❤️ ${jidToTag(seis[3])}
${BOX_MID} 𝙿3: ${jidToTag(seis[4])} ❤️ ${jidToTag(seis[5])}
${BOX_MID}
${BOX_MID} 𝙲𝙾𝙼𝙿𝙰𝚃𝙸𝙱𝙸𝙻𝙸𝙳𝙰𝙳: ${porcentaje}%
${BOX_BOT}`
            break

        case 'duo':
            if(users.length < 2) return m.reply('⚡ Mínimo 2 personas en el grupo')
            let dos = getRandomUsers(2)
            mentions = dos
            let frase = frasesDuo[Math.floor(Math.random() * frasesDuo.length)]
            txt = `${BOX_TOP}
👯 𝙳𝚄𝙾 𝚁𝙰𝙽𝙳𝙾𝙼 👯
${BOX_BOT}

${BOX_MID} ${jidToTag(dos[0])} + ${jidToTag(dos[1])}
${BOX_MID}
${BOX_MID} ${frase}
${BOX_MID}
${BOX_MID} 𝙲𝙾𝙼𝙿𝙰𝚃𝙸𝙱𝙸𝙻𝙸𝙳𝙰𝙳: ${porcentaje}%
${BOX_BOT}`
            break

        default:
            return
    }

    if(txt) await conn.sendMessage(m.chat, {
        text: txt,
        mentions: mentions // ESTO ES LO QUE HACE QUE ETIQUETE
    }, { quoted: m })
}

handler.help = ['miamor','mibebito','bratz','bellaka','brother','perroinfiel','perro infiel','mentiroso','mentiras','2p2','3p3','duo']
handler.tags = ['joda']
handler.command = /^(miamor|mi amor|mibebito|bratz|bellaka|brother|perroinfiel|perro infiel|mentiroso|mentiras|2p2|3p3|duo)$/i
handler.group = true
export default handler