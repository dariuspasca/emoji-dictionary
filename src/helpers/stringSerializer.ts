const convertEmojiToUnicode = (emoji: string) => {
  const code = emoji.codePointAt(0);
  return code?.toString(16);
};

const convertUnicodeToEmoji = (unicode: string) => {
  const code = parseInt(unicode, 16);
  return String.fromCodePoint(code);
};

const serializeString = (text: string) =>
  text
    .normalize()
    .replace(/\p{Emoji}/gu, (m) => `[e-${convertEmojiToUnicode(m)}]`);

const deserializeString = (text: string) =>
  text
    .normalize()
    .replace(/\[e-([0-9a-fA-F]+)\]/g, (_, code) => convertUnicodeToEmoji(code));

export { serializeString, deserializeString };
