let handler = async (m, { conn, command, args }) => {
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

    async function getName(jid) {
        let name = await conn.getName(jid).catch(_ => null)
        return name || jid.split('@')[0]
    }

    let txt = ''
    let mentions = []

    // AGARRA TAG, REPLY O NUMERO
    let target = m.mentionedJid[0] || m.quoted?.sender || args[0]? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null

    if(!target) return m.reply(`⚡ *USO:*.${command} @tag\n*Ejemplo:*.${command} @${m.sender.split('@')[0]}\n*O:* Responde al mensaje con.${command}`)

    let targetName = await getName(target)

    switch(command.toLowerCase()) {
        case 'miamor': case 'mi amor':
            mentions = [target]
            txt = `${BOX_TOP}
😈 𝙰𝙼𝙾𝚁 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙾 😈
${BOX_BOT}

│ 💕 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: @${target.split('@')[0]}
│ 𝙽𝙾𝙼𝙱𝚁𝙴: ${targetName}
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

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: @${target.split('@')[0]}
│ 𝙽𝙾𝙼𝙱𝚁𝙴: ${targetName} 😏
│ 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_BOT}`
            break

        case 'bratz':
            mentions = [target]
            txt = `${BOX_TOP}
💄 𝙱𝚁𝙰𝚃𝚉 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙰 💄
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: @${target.split('@')[0]}
│ 𝙽𝙾𝙼𝙱𝚁𝙴: ${targetName}
│ 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_BOT}`
            break

        case 'bellaka':
            mentions = [target]
            txt = `${BOX_TOP}
💃 𝙱𝙴𝙻𝙰𝙺𝙰 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙰 💃
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: @${target.split('@')[0]}
│ 𝙽𝙾𝙼𝙱𝚁𝙴: ${targetName}
│ 𝙿𝙴𝚁𝙴𝙾: ${porcentaje}%
${BOX_BOT}`
            break

        case 'brother':
            mentions = [target]
            txt = `${BOX_TOP}
👬 𝙵𝚁𝙰𝚂𝙴 𝙿𝙸𝚃𝚄𝙵𝙾 👬
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: @${target.split('@')[0]}
│ 𝙽𝙾𝙼𝙱𝚁𝙴: ${targetName}
│ 𝙳𝙸𝙲𝙴: ${frasesBro[Math.floor(Math.random()*4)]}
${BOX_BOT}`
            break

        case 'perroinfiel': case 'perro infiel':
            mentions = [target]
            txt = `${BOX_TOP}
🐕 𝙿𝙴𝚁𝙾 𝙸𝙽𝙵𝙸𝙴𝙻 🐕
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: @${target.split('@')[0]}
│ 𝙽𝙾𝙼𝙱𝚁𝙴: ${targetName}
│ 𝙴𝚅𝙸𝙳𝙴𝙽𝙲𝙸𝙰: ${frasesPerro[Math.floor(Math.random()*4)]}
│ 𝙽𝙸𝚅𝙴𝙻: ${porcentaje}%
${BOX_BOT}`
            break

        case 'mentiroso': case 'mentiras':
            mentions = [target]
            txt = `${BOX_TOP}
🤥 𝙼𝙴𝙽𝚃𝙸𝚁𝙾𝚂𝙾 𝙳𝙴𝚃𝙴𝙲𝚃𝙰𝙳𝙾 🤥
${BOX_BOT}

│ 𝙾𝙱𝙹𝙴𝚃𝙸𝚅𝙾: @${target.split('@')[0]}
│ 𝙽𝙾𝙼𝙱𝚁𝙴: ${targetName}
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

│ 𝙿𝙰𝚁𝙴𝙹𝙰 1: @${cuatro[0].split('@')[0]} ❤️ @${cuatro[1].split('@')[0]}
│ 𝙿𝙰𝚁𝙴𝙹𝙰 2: @${cuatro[2].split('@')[0]} ❤️ @${cuatro[3].split('@')[0]}
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

│ 𝙿1: @${seis[0].split('@')[0]} ❤️ @${seis[1].split('@')[0]}
│ 𝙿2: @${seis[2].split('@')[0]} ❤️ @${seis[3].split('@')[0]}
│ 𝙿3: @${seis[4].split('@')[0]} ❤️ @${seis[5].split('@')[0]}
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

│ @${dos[0].split('@')[0]} + @${dos[1].split('@')[0]}
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

handler.help = ['miamor','mibebito','bratz','bellaka','brother','perroinfiel','perro infiel','mentiroso','mentiras','2p2','3p3','duo']
handler.tags = ['joda']
handler.command = /^(miamor|mi amor|mibebito|bratz|bellaka|brother|perroinfiel|perro infiel|mentiroso|mentiras|2p2|3p3|duo)$/i
handler.group = true
export default handler