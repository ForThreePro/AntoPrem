let handler = (m) => m;

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner }) {
  if (!m.isGroup || !isBotAdmin) return; // solo grupos y si el bot es admin

  const chat = global.db.data.chats[m.chat];
  if (!chat.reaction) return; // si está desactivado

  if (!m.text) return;

  const emojiResponses = {
    "hola": "👋", "buenas": "👋",
    "gracias": "🙏", "thx": "🙏",
    "adiós": "👋", "chau": "👋", "bye": "👋",
    "jaja": "😂", "xd": "😂", "lol": "😂",
    "triste": "😢", "sad": "😢",
    "genial": "😎", "god": "😎",
    "amor": "❤️", "love": "❤️",
    "ok": "👌", "dale": "👌",
    "wow": "😮", "wtf": "😮",
    "ayuda": "❓", "help": "❓",
    "bien": "😊", "good": "😊",
    "mal": "😞", "bad": "😞",
    "feliz": "😁", "happy": "😁",
    "sí": "✅", "si": "✅", "yes": "✅",
    "no": "❌", "nop": "❌",
    "comida": "🍕", "hambre": "🍕",
    "fiesta": "🎉", "party": "🎉",
    "musica": "🎵", "music": "🎵",
    "dinero": "💵", "plata": "💵",
    "trabajo": "💼",
    "casa": "🏠", "home": "🏠",
    "sol": "☀️", "calor": "☀️",
    "lluvia": "🌧️", "frio": "🌧️",
    "noche": "🌙",
    "estrella": "⭐",
    "fuego": "🔥", "hot": "🔥",
    "agua": "💧",
    "corazón": "💖", "corazon": "💖",
    "beso": "💋",
    "abrazo": "🤗",
    "tiempo": "⏰",
    "café": "☕", "cafe": "☕",
    "idea": "💡",
    "regalo": "🎁",
    "carro": "🚗",
    "viaje": "✈️",
    "teléfono": "📱", "telefono": "📱",
    "computadora": "💻", "pc": "💻",
    "error": "❗",
    "robot": "🤖", "bot": "🤖",
    "flor": "🌸",
    "árbol": "🌳", "arbol": "🌳",
    "montaña": "⛰️", "montana": "⛰️",
    "mar": "🌊", "playa": "🌊",
  };

  const lowerMessage = m.text.toLowerCase();
  let emojiToReact = null;

  // Busca la primera palabra clave que encuentre
  for (const [key, emoji] of Object.entries(emojiResponses)) {
    if (lowerMessage.includes(key)) {
      emojiToReact = emoji;
      break;
    }
  }

  // Si no encontró nada, 30% de probabilidad de reaccionar random
  if (!emojiToReact && Math.random() < 0.3) {
    const allEmojis = ["😀", "😃", "😄", "😁", "😆", "😂", "🤣", "😊", "😇", "😉", "😍", "🥰", "😘", "🤗", "🤔", "😌", "😏", "🔥", "💯", "✨"];
    emojiToReact = allEmojis[Math.floor(Math.random() * allEmojis.length)];
  }

  if (!emojiToReact) return; // si no hay nada que hacer, no hace nada

  try {
    await m.react(emojiToReact);
    console.log(`✰ [REACTION] ${m.chat.split('@')[0]} → ${emojiToReact}`);
  } catch (err) {
    console.error("❏ Error al reaccionar:", err);
  }

  return true;
};

handler.disabled = false;
export default handler;