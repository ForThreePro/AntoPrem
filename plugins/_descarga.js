import axios from 'axios'
import fetch from "node-fetch"
import yts from 'yt-search'

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `╔═══「 ⚡ 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 」═══╗
║
║ 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦
║ 𝗘𝗦𝗧𝗔𝗗𝗢 : 𝗢𝗡𝗟𝗜𝗡𝗘
║
╠═══「 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 」═══╣
║ [1].play nombre → Audio
║ [2].play2 nombre → Video
║ [3].ytmp3 link → Audio Directo
║ [4].ytmp4 link → Video 720p
║
╠═══「 𝗦𝗢𝗖𝗜𝗔𝗟 」═══╣
║ [5].spotify nombre → Audio
║ [6].tiktok link → Video
║ [7].tiktoksearch txt → Buscar
║ [8].ig link → Instagram
║ [9].fb link → Facebook
║ [10].mediafire link → Archivo
║
╚═══「 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗖𝗬𝗕𝗘𝗥 𝗔𝗜 」═══╝`, m)

    await m.react('⏳')
    const keyEvo = Buffer.from('ZWt1c2Fz', 'base64').toString('utf-8').split('').reverse().join('')
    const keySasuke = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')

    try {
        // ===== PLAY / PLAY2 YOUTUBE BUSQUEDA =====
        if (/^(play|play2)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let isVideo = command === 'play2'
            let apiUrl = isVideo
            ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `╔═══「 ⚡ 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 ${isVideo? '𝗩𝗜𝗗𝗘𝗢' : '𝗔𝗨𝗗𝗜𝗢'} 」═══╗
║
║ 𝗧𝗜𝗧𝗨𝗟𝗢 : ${vid.title}
║ 𝗗𝗨𝗥𝗔𝗖𝗜𝗢𝗡 : ${vid.timestamp}
║ 𝗔𝗨𝗧𝗢𝗥 : ${vid.author.name}
║ 𝗩𝗜𝗦𝗧𝗔𝗦 : ${vid.views.toLocaleString()}
║ 𝗙𝗢𝗥𝗠𝗔𝗧𝗢 : ${isVideo? 'MP4 720p' : 'MP3 320kbps'}
║
╚═══「 𝗘𝗫𝗧𝗥𝗔𝗬𝗘𝗡𝗗𝗢 𝗗𝗔𝗧𝗢𝗦 」═══╝`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== YTMP3 / YTMP4 DIRECTO =====
        if (/^(ytmp3|ytmp4)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('⏳')

            let isVideo = command === 'ytmp4'
            let apiUrl = isVideo
             ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `╔═══「 ⚡ 𝗬𝗧 ${isVideo? '𝗩𝗜𝗗𝗘𝗢' : '𝗔𝗨𝗗𝗜𝗢'} 𝗗𝗜𝗥𝗘𝗖𝗧𝗢 」═══╗
║
║ 𝗧𝗜𝗧𝗨𝗟𝗢 : ${vid.title}
║ 𝗙𝗢𝗥𝗠𝗔𝗧𝗢 : ${isVideo? 'MP4 720p' : 'MP3'}
║ 𝗗𝗨𝗥𝗔𝗖𝗜𝗢𝗡 : ${vid.timestamp}
║ 𝗩𝗜𝗦𝗧𝗔𝗦 : ${vid.views.toLocaleString()}
║
╚═══「 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗜𝗡𝗜𝗖𝗜𝗔𝗗𝗔 」═══╝`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== SPOTIFY =====
        if (/^(spotify)$/i.test(command)) {
            let searchRes = await fetch(`https://api.evogb.org/search/spotify?query=${encodeURIComponent(text)}&key=${keySasuke}`)
            let searchData = await searchRes.json()
            if (!searchData.status ||!searchData.result[0]) throw 'SP_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let song = searchData.result[0]
            let dlRes = await fetch(`https://api.evogb.org/dl/spotify?url=${encodeURIComponent(song.link)}&key=${keySasuke}`)
            let dlData = await dlRes.json()
            if (!dlData.status) throw 'SP_DL_ERROR'

            let cap = `╔═══「 🎵 𝗦𝗣𝗢𝗧𝗜𝗙𝗬 」═══╗
║
║ 𝗧𝗜𝗧𝗨𝗟𝗢 : ${dlData.data.name}
║ 𝗔𝗥𝗧𝗜𝗦𝗧𝗔 : ${dlData.data.artist}
║ 𝗔𝗟𝗕𝗨𝗠 : ${dlData.data.album}
║ 𝗗𝗨𝗥𝗔𝗖𝗜𝗢𝗡 : ${dlData.data.duration}
║ 𝗔𝗡𝗢 : ${dlData.data.year}
║
╚═══「 𝗠𝗨𝗦𝗜𝗖𝗔 𝗣𝗥𝗢𝗖𝗘𝗦𝗔𝗗𝗔 」═══╝`

            await conn.sendMessage(m.chat, { image: { url: dlData.data.image }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, { audio: { url: dlData.data.url }, mimetype: 'audio/mpeg', fileName: `${dlData.data.name}.mp3` }, { quoted: m })
            return await m.react('✅')
        }

        // ===== TIKTOK =====
        if (/^(tiktok|tiktoksearch)$/i.test(command)) {
            if (command === 'tiktoksearch') {
                let res = await (await fetch(`https://api.evogb.org/search/tiktok?query=${text}&key=${keySasuke}`)).json()
                let video = res.data[0]
                if (!video) throw 'TT_NOT_FOUND'

                let caption = `╔═══「 ⚡ 𝗧𝗜𝗞𝗧𝗢𝗞 𝗦𝗘𝗔𝗥𝗖𝗛 」═══╗
║
║ 𝗧𝗜𝗧𝗨𝗟𝗢 : ${video.title}
║ 𝗔𝗨𝗧𝗢𝗥 : ${video.author.nickname}
║ 𝗩𝗜𝗦𝗧𝗔𝗦 : ${video.play_count.toLocaleString()}
║ 𝗟𝗜𝗞𝗘𝗦 : ${video.digg_count.toLocaleString()}
║
╚═══「 𝗩𝗜𝗗𝗘𝗢 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗢 」═══╝`
                await conn.sendFile(m.chat, video.dl, 'tiktok.mp4', caption, m)
            } else {
                let res = await (await fetch(`https://api.evogb.org/dl/tiktok?url=${text}&key=${keySasuke}`)).json()
                let data = res.data
                if (!data) throw 'TT_DL_ERROR'

                let caption = `╔═══「 ⚡ 𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 」═══╗
║
║ 𝗧𝗜𝗧𝗨𝗟𝗢 : ${data.title}
║ 𝗔𝗨𝗧𝗢𝗥 : ${data.author.nickname}
║
╚═══「 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗔 」═══╝`
                await conn.sendFile(m.chat, Array.isArray(data.dl)? data.dl[0] : data.dl, 'tiktok.mp4', caption, m)
            }
            return await m.react('✅')
        }

        // ===== INSTAGRAM =====
        if (/^(ig|instagram)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/instagram?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'IG_ERROR'
            let media = data.data[0]
            let type = media.type === 'video'? '𝗩𝗜𝗗𝗘𝗢' : '𝗜𝗠𝗔𝗚𝗘𝗡'

            let cap = `╔═══「 📸 𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠 」═══╗
║
║ 𝗧𝗜𝗣𝗢 : ${type}
║ 𝗘𝗦𝗧𝗔𝗗𝗢 : 𝗘𝗡𝗩𝗜𝗔𝗡𝗗𝗢
║
╚═══「 𝗖𝗢𝗡𝗧𝗘𝗡𝗜𝗗𝗢 𝗖𝗔𝗣𝗧𝗨𝗥𝗔𝗗𝗢 」═══╝`

            await conn.sendMessage(m.chat, {
                [media.type === 'video'? 'video' : 'image']: { url: media.url },
                mimetype: media.type === 'video'? 'video/mp4' : 'image/jpeg',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== FACEBOOK =====
        if (/^(fb|facebook)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/facebook?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'FB_ERROR'
            let video = data.resultados[0]

            let cap = `╔═══「 📘 𝗙𝗔𝗖𝗘𝗕𝗢𝗞 」═══╗
║
║ 𝗖𝗔𝗟𝗜𝗗𝗔𝗗 : ${video.calidad || '𝗛𝗗'}
║ 𝗘𝗦𝗧𝗔𝗗𝗢 : 𝗘𝗡𝗩𝗜𝗔𝗡𝗗𝗢
║
╚═══「 𝗩𝗜𝗗𝗘𝗢 𝗘𝗫𝗧𝗥𝗔𝗜𝗗𝗢 」═══╝`

            await conn.sendMessage(m.chat, {
                video: { url: video.url },
                mimetype: 'video/mp4',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== MEDIAFIRE =====
        if (/^(mediafire|mf|mediafiredl)$/i.test(command)) {
            let response = await fetch(`https://api.evogb.org/dl/mediafire?url=${encodeURIComponent(text)}&key=${keySasuke}`)
            let result = await response.json()
            if (!result.status ||!result.data) throw 'MF_ERROR'

            let { name, size, date, dl } = result.data
            let caption = `╔═══「 📦 𝗠𝗘𝗗𝗜𝗔𝗙𝗜𝗥𝗘 」═══╗
║
║ 𝗡𝗢𝗠𝗕𝗥𝗘 : ${name}
║ 𝗧𝗔𝗠𝗔𝗡𝗢 : ${size}
║ 𝗙𝗘𝗖𝗛𝗔 : ${date}
║
╚═══「 𝗔𝗥𝗖𝗛𝗜𝗩𝗢 𝗘𝗫𝗧𝗥𝗔𝗜𝗗𝗢 」═══╝`

            await conn.sendFile(m.chat, dl, name, caption, m)
            return await m.react('✅')
        }

    } catch (e) {
        console.error(e)
        await m.react('❌')
        let msgs = {
            YT_NOT_FOUND: '𝗡𝗢 𝗦𝗘 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗢 𝗘𝗟 𝗩𝗜𝗗𝗘𝗢',
            YT_DL_ERROR: '𝗘𝗥𝗥𝗢𝗥 𝗘𝗡 𝗬𝗢𝗨𝗧𝗨𝗕𝗘',
            SP_NOT_FOUND: `𝗡𝗢 𝗛𝗔𝗬 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢𝗦: ${text}`,
            SP_DL_ERROR: '𝗘𝗥𝗢𝗥 𝗘𝗡 𝗦𝗣𝗢𝗧𝗜𝗙𝗬',
            TT_NOT_FOUND: '𝗡𝗢 𝗛𝗔𝗬 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢𝗦 𝗧𝗧',
            TT_DL_ERROR: '𝗘𝗥𝗢𝗥 𝗘𝗡 𝗧𝗜𝗞𝗧𝗢𝗞',
            IG_ERROR: '𝗘𝗥𝗥𝗢𝗥 𝗘𝗡 𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠',
            FB_ERROR: '𝗘𝗥𝗢𝗥 𝗘𝗡 𝗙𝗔𝗖𝗘𝗕𝗢𝗞',
            MF_ERROR: '𝗔𝗥𝗖𝗛𝗜𝗩𝗢 𝗡𝗢 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗢'
        }
        m.reply(`╔═══「 ❌ 𝗘𝗥𝗢𝗥 𝗗𝗘 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 」═══╗
║
║ 𝗗𝗘𝗧𝗔𝗟𝗘 : ${msgs[e] || '𝗘𝗥𝗥𝗢𝗥 𝗜𝗡𝗘𝗦𝗣𝗘𝗥𝗔𝗗𝗢'}
║ 𝗔𝗖𝗜𝗢𝗡 : 𝗩𝗘𝗥𝗜𝗙𝗜𝗖𝗔𝗥 𝗘𝗡𝗟𝗔𝗖𝗘
║
╚═══「 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 」═══╝`)
    }
}

handler.help = ['play', 'play2', 'ytmp3', 'ytmp4', 'spotify', 'tiktok', 'tiktoksearch', 'ig', 'fb', 'mediafire']
handler.tags = ['downloader']
handler.command = /^(play|play2|ytmp3|ytmp4|spotify|tiktok|tiktoksearch|ig|instagram|fb|facebook|mediafire|mf|mediafiredl)$/i

export default handler