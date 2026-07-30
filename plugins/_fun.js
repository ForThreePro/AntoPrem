let handler = async (m, { conn, command, text }) => {
    if(!m.isGroup) return m.reply('💖 *ayy esto es solo para grupos bb*')

    let metadata = await conn.groupMetadata(m.chat)
    let users = metadata.participants.map(u => u.id)
    let porcentaje = Math.floor(Math.random() * 101)

    const BOX_TOP = `╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮`
    const BOX_BOT = `╰─────────────────💖`

    const frasesDuo = ["Somos el duo perfecto 😘","Juntas somos un peligro 💕","El duo que rompe corazones ✨","Duo de chisme nivel diosa ☕","Pura dinamita rosa 🧨","El mejor duo del server 👑"]
    const frasesBro = ['"ay bb pásame 5 soles"','"ya pe no seas malo"','"después te pago juro"','"invítame un cafecito"']
    const frasesPerro = ['Te dice "amor" y a 3 más también','Huele a cuernos 🥺','Te deja en visto','Sube historias sin ti']

    // RANDOM SIN REPETIR
    function getRandomUsers(cantidad) {
        let shuffled = [...users].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, cantidad)
    }

    function jidToTag(jid) {
        return '@' + jid.split('@')[0]
    }

    function findUserByName(name) {
        name = name.toLowerCase().replace('@','')
        return users.find(u => {
            let num = u.split('@')[0].toLowerCase()
            return num.includes(name)
        })
    }

    let txt = ''
    let mentions = []

    // SOLO PARA COMANDOS DE 1 PERSONA
    let target = m.mentionedJid[0] || m.quoted?.sender
    if(!target && text &&!['2p2','3p3','duo'].includes(command.toLowerCase())) {
        let possibleName = text.split(' ')[0]
        target = findUserByName(possibleName)
    }

    if(!target &&!['2p2','3p3','duo'].includes(command.toLowerCase()))
        return m.reply(`╭─💖 *『 𝗔𝗡𝗧𝗜𝗧𝗢𝗣 𝗕𝗢𝗧 』* 💖─╮
│ ⚠️ *ayy falta el @*
│
│ ✨ *USO:*.${command} @tag
│ 💕 *EJEMPLO:*.${command} @Maria
│ 💋 *ALT:* Responde +.${command}
╰─────────────────💖`)

    let cmd = command.toLowerCase().replace(' ','') // quita espacios

    switch(cmd) {
        // ========== FLIRT ==========
        case 'miamor':
            mentions = [target]
            txt = `${BOX_TOP}
│ 💕 *MÓDULO:* Amor detectado
│
│ 👤 *Target:* ${jidToTag(target)}
│ ✨ *Nivel:* ${porcentaje}%
│ 💋 *Diagnóstico:* ${porcentaje > 70? 'Almas Gemelas' : porcentaje > 40? 'Hay Química' : 'Frío Como Hielo'}
${BOX_BOT}`
            break

        case 'mibebito':
            mentions = [target]
            txt = `${BOX_TOP}
│ 💋 *MÓDULO:* Fiu Fiu Detectado
│
│ 👤 *Target:* ${jidToTag(target)} 😏
│ ✨ *Nivel:* ${porcentaje}%
${BOX_BOT}`
            break

        case 'bratz':
            mentions = [target]
            txt = `${BOX_TOP}
│ 🎀 *MÓDULO:* Bratz Detectada
│
│ 👤 *Target:* ${jidToTag(target)}
│ ✨ *Nivel:* ${porcentaje}%
${BOX_BOT}`
            break

        case 'bellaka':
            mentions = [target]
            txt = `${BOX_TOP}
│ 😈 *MÓDULO:* Bellaka Detectada
│
│ 👤 *Target:* ${jidToTag(target)}
│ ✨ *Pereo:* ${porcentaje}%
${BOX_BOT}`
            break

        // ========== TROLO ==========
        case 'brother':
            mentions = [target]
            txt = `${BOX_TOP}
│ 🥺 *MÓDULO:* Frase Pitufa
│
│ 👤 *Target:* ${jidToTag(target)}
│ 💬 *Frase:* ${frasesBro[Math.floor(Math.random()*4)]}
${BOX_BOT}`
            break

        case 'perroinfiel':
            mentions = [target]
            txt = `${BOX_TOP}
│ 🐶 *MÓDULO:* Perro Infiel
│
│ 👤 *Target:* ${jidToTag(target)}
│ 📝 *Evidencia:* ${frasesPerro[Math.floor(Math.random()*4)]}
│ ✨ *Nivel:* ${porcentaje}%
${BOX_BOT}`
            break

        case 'mentiroso': case 'mentiras':
            mentions = [target]
            txt = `${BOX_TOP}
│ 🤥 *MÓDULO:* Mentiroso Detectado
│
│ 👤 *Target:* ${jidToTag(target)}
│ 💬 *Frase:* "Te lo juro por mi mamá"
│ ✨ *Nivel:* ${porcentaje}%
${BOX_BOT}`
            break

        // ========== GRUPALES RANDOM ==========
        case '2p2': // 4 PERSONAS = 2 PAREJAS
            if(users.length < 4) return m.reply('💖 *mínimo 4 personas bb*')
            let cuatro = getRandomUsers(4)
            mentions = cuatro
            txt = `${BOX_TOP}
│ 💕 *MÓDULO:* Sistema 2P2
│
│ 👩‍❤️‍👩 *Pareja 1:* ${jidToTag(cuatro[0])} ❤️ ${jidToTag(cuatro[1])}
│ 👩‍❤️‍👩 *Pareja 2:* ${jidToTag(cuatro[2])} ❤️ ${jidToTag(cuatro[3])}
│
│ ✨ *Compatibilidad:* ${porcentaje}%
${BOX_BOT}`
            break

        case '3p3': // 6 PERSONAS = 3 PAREJAS
            if(users.length < 6) return m.reply('💖 *mínimo 6 personas bb*')
            let seis = getRandomUsers(6)
            mentions = seis
            txt = `${BOX_TOP}
│ 💕 *MÓDULO:* Sistema 3P3
│
│ 👩‍❤️‍👩 *Pareja 1:* ${jidToTag(seis[0])} ❤️ ${jidToTag(seis[1])}
│ 👩‍❤️‍👩 *Pareja 2:* ${jidToTag(seis[2])} ❤️ ${jidToTag(seis[3])}
│ 👩‍❤️‍👩 *Pareja 3:* ${jidToTag(seis[4])} ❤️ ${jidToTag(seis[5])}
│
│ ✨ *Compatibilidad:* ${porcentaje}%
${BOX_BOT}`
            break

        case 'duo': // 2 PERSONAS = 1 PAREJA
            if(users.length < 2) return m.reply('💖 *mínimo 2 personas bb*')
            let dos = getRandomUsers(2)
            mentions = dos
            let frase = frasesDuo[Math.floor(Math.random() * frasesDuo.length)]
            txt = `${BOX_TOP}
│ 💕 *MÓDULO:* Duo Random
│
│ 👤 *Usuaria 1:* ${jidToTag(dos[0])}
│ 👤 *Usuaria 2:* ${jidToTag(dos[1])}
│
│ ✨ *Resultado:* ${frase}
│ 💖 *Compatibilidad:* ${porcentaje}%
${BOX_BOT}`
            break

        default:
            return
    }

    if(txt) await conn.sendMessage(m.chat, {
        text: txt,
        mentions: mentions // SOLO ETIQUETA A LOS QUE SALIERON
    }, { quoted: m })
}

handler.help = ['miamor','mibebito','bratz','bellaka','brother','perroinfiel','mentiroso','2p2','3p3','duo']
handler.tags = ['joda']
handler.command = /^(miamor|mi amor|mibebito|bratz|bellaka|brother|perroinfiel|perro infiel|mentiroso|mentiras|2p2|3p3|duo)$/i
handler.group = true
export default handler