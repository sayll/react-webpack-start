/**
 * 清除emoji表情
 * @param {string} str 输入str
 * @param {string} symbol 替换符号
 * @return 替换后的string
 */
export function replaceEmoji(str, symbol = '') {
  return str.replace(/\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g, symbol);
}
export default replaceEmoji;
