import axios from 'axios'
import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

let handler = async (m, { conn, args }) => {
  try {
    let q = m.quoted? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    // 1. SI RESPONDE A IMAGEN/VIDEO/WEBP
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 10) {
        return m.reply(`《✧》 *El video no puede durar mas de 10 segundos*`)
      }

      let img = await q.download?.()
      if (!img) return m.reply(`《✧》 Envía una imagen/video/gif y responde con.s`)

      let stiker
      try {
        stiker = await sticker(img, false, '', '') // pack y author vacíos
      } catch (e) {
        console.error(e)
        let out
        if (/webp/g.test(mime)) out = await webp2png(img)
        else if (/image/g.test(mime)) out = await uploadImage(img)
        else if (/video/g.test(mime)) out = await uploadFile(img)

        if (typeof out!== 'string') out = await uploadImage(img)
        stiker = await sticker(false, out, '', '')
      }

      return await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
    }

    // 2. SI MANDA URL
    else if (args[0] && isUrl(args[0])) {
      let stiker = await sticker(false, args[0], '', '')
      return await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
    }

    // 3. SI NO MANDA NADA
    else {
      return m.reply(`《✧》 Responde a una imagen/video o manda una url`)
    }

  } catch (e) {
    console.error(e)
    return m.reply(`《✧》 Error al convertir a sticker`)
  }
}

handler.help = ['sticker']
handler.tags = ['tools']
handler.command = ['s', 'sticker']
handler.limit = true

export default handler