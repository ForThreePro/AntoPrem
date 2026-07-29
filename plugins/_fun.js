let handler = async (m, { conn, command, text }) => {
    if(!m.isGroup) return m.reply('⚡ Solo funciona en grupos')

    let metadata = await conn.groupMetadata(m.chat)
    let users = metadata.participants.map(u => u.id)
    let porcentaje = Math.floor(Math.random() * 101)

    const BOX_TOP = `⚡━━━━━━━━━━━━━━━⚡`
    const BOX_BOT = `⚡━━━━━━━━━━━━━━━⚡`

    const frasesDuo = ["Somos el duo perfecto 😎","Juntos somos un peligro ⚠️","El duo que rompe grupos 💥","Duo de chisme nivel dios ☕","Dinamita pura 🧨","El mejor duo del server 👑"]
    const frasesBro = ['"Oe mano pásame 5 soles"','"Ya pe no seas malo"','"Después te pago juro"','"Invítame una gaseosa"']
    const frasesPerro = ['Te dice "amor" y a 3 más también','Huele a cuernos','Te deja en visto','Sube historias sin ti']

    function getRandomUsers(cantidad) {
        let shuffled = [...users].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, cantidad)
    }

    function jidToTag(jid) {
        return '@' + jid.split('@')[0]
    }

    // FIX: BUSCAR EL JID POR NOMBRE ESCRITO
    function findUserByName(name) {
        name = name.toLowerCase().replace('@','')
        return users.find(u => {
            let num = u.split('@')[0].toLowerCase()
            return num.includes(name)
        })
    }

    let txt = ''
    let mentions = []

    // 1. TAG REAL 2. REPLY 3. BUSCAR POR TEXTO
    let target = m.mentionedJid[0] || m.quoted?.sender
    if(!target && text) {
        let possibleName = text.split(' ')[0] // agarra la primera palabra despues del comando
        target = findUserByName(possibleName)
    }

    if(!target) return m.reply(`⚡ *USO:*.${command} @tag\n*Ejemplo:*.${command} @Juan\n*O:* Responde a alguien +.${command}`)

    let cmd = command.toLowerCase().replace(' ','') // quita espacios

    switch(cmd) {
        case 'miamor':
            mentions = [target]
            txt = `${BOX_TOP}
😈 𝙰𝙼𝙾𝚁 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙾 😈
${BOX_BOT}

│ 💕 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target)}
│
│ 𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙰𝙼𝙾𝚁: ${porcentaje}%
│ 𝙳𝙸𝙰𝙶𝙽𝙾𝚂𝚃𝙸𝙲𝙾: ${porcentaje > 70? 'Almas gemelas' : porcentaje > 40? 'Hay química' : 'Frio como hielo'}
${BOX_BOT}`
            break

        case 'mibebito':
            mentions = [target]
            txt = `${BOX_TOP}
🍼 𝙵𝙸𝚄 𝙵𝙸𝚄 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙾 🍼
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target)} 😏
│ 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_BOT}`
            break

        case 'bratz':
            mentions = [target]
            txt = `${BOX_TOP}
💄 𝙱𝚁𝙰𝚃𝚉 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙰 💄
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target)}
│ 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_BOT}`
            break

        case 'bellaka':
            mentions = [target]
            txt = `${BOX_TOP}
💃 𝙱𝙴𝙻𝙰𝙺𝙰 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙰 💃
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target)}
│ 𝙿𝙴𝚁𝙴𝙾: ${porcentaje}%
${BOX_BOT}`
            break

        case 'brother':
            mentions = [target]
            txt = `${BOX_TOP}
👬 𝙵𝚁𝙰𝚂𝙴 𝙿𝙸𝚃𝚄𝙵𝙾 👬
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target)}
│ 𝙳𝙸𝙲𝙴: ${frasesBro[Math.floor(Math.random()*4)]}
${BOX_BOT}`
            break

        case 'perroinfiel':
            mentions = [target]
            txt = `${BOX_TOP}
🐕 𝙿𝙴𝚁𝙾 𝙸𝙽𝙵𝙸𝙴𝙻 🐕
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target)}
│ 𝙴𝚅𝙸𝙳𝙴𝙽𝙲𝙸𝙰: ${frasesPerro[Math.floor(Math.random()*4)]}
│ 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_BOT}`
            break

        case 'mentiroso': case 'mentiras':
            mentions = [target]
            txt = `${BOX_TOP}
🤥 𝙼𝙴𝙽𝚃𝙸𝚁𝙾𝚂𝙾 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙾 🤥
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: ${jidToTag(target)}
│ 𝙵𝚁𝙰𝚂𝙴: "Te lo juro por mi mamá"
│ 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_BOT}`
            break

        case '2p2':
            if(users.length < 4) return m.reply('⚡ Mínimo 4 personas')
            let cuatro = getRandomUsers(4)
            mentions = cuatro
            txt = `${BOX_TOP}
2️⃣ 𝚂𝙸𝚂𝚃𝙴𝙼𝙰 2𝙿2 2️⃣
${BOX_BOT}

│ 𝙿𝙰𝚁𝙴𝙹𝙰 1: ${jidToTag(cuatro[0])} ❤️ ${jidToTag(cuatro[1])}
│ 𝙿𝙰𝚁𝙴𝙹𝙰 2: ${jidToTag(cuatro[2])} ❤️ ${jidToTag(cuatro[3])}
│ 𝙲𝙾𝙼𝙿𝙰𝚃𝙸𝙱𝙸𝙻𝙸𝙳𝙰𝙳: ${porcentaje}%
${BOX_BOT}`
            break

        case '3p3':
            if(users.length < 6) return m.reply('⚡ Mínimo 6 personas')
            let seis = getRandomUsers(6)
            mentions = seis
            txt = `${BOX_TOP}
3️⃣ 𝚂𝙸𝚂𝚃𝙴𝙼𝙰 3𝙿3 3️⃣
${BOX_BOT}

│ 𝙿1: ${jidToTag(seis[0])} ❤️ ${jidToTag(seis[1])}
│ 𝙿2: ${jidToTag(seis[2])} ❤️ ${jidToTag(seis[3])}
│ 𝙿3: ${jidToTag(seis[4])} ❤️ ${jidToTag(seis[5])}
│ 𝙲𝙾𝙼𝙿𝙰𝚃𝙸𝙱𝙸𝙻𝙸𝙳𝙰𝙳: ${porcentaje}%
${BOX_BOT}`
            break

        case 'duo':
            if(users.length < 2) return m.reply('⚡ Mínimo 2 personas')
            let dos = getRandomUsers(2)
            mentions = dos
            let frase = frasesDuo[Math.floor(Math.random() * frasesDuo.length)]
            txt = `${BOX_TOP}
👯 𝙳𝚄𝙾 𝚁𝙰𝙽𝙳𝙾𝙼 👯
${BOX_BOT}

│ ${jidToTag(dos[0])} + ${jidToTag(dos[1])}
│ ${frase}
│ 𝙲𝙾𝙼𝙿𝙰𝚃𝙸𝙱𝙸𝙻𝙸𝙳𝙰𝙳: ${porcentaje}%
${BOX_BOT}`
            break
    }

    if(txt) await conn.sendMessage(m.chat, {
        text: txt,
        mentions: mentions
    }, { quoted: m })
}

handler.help = ['miamor','mibebito','bratz','bellaka','brother','perroinfiel','mentiroso','2p2','3p3','duo']
handler.tags = ['joda']
handler.command = /^(miamor|mi amor|mibebito|bratz|bellaka|brother|perroinfiel|perro infiel|mentiroso|mentiras|2p2|3p3|duo)$/i
handler.group = true
export default handler