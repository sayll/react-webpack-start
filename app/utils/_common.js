// 检验金额
export function isMoney(money) {
  const reg = /^\d{0,7}(?:\.\d{0,2})?$/
  return reg.test(money)
}

// 检验手机号
export function isMobile(mobile) {
  const reg = /^1\d{10}$/
  return reg.test(mobile)
}

// 检验邮箱
export function isEmail(email) {
  const reg = /^[.\w-]+@[\w-]+(\.[\w-]+)+$/
  return reg.test(email)
}

// 检验银行卡号
export function isBankCard(cardId) {
  const reg = /^\d{16,}$/
  return reg.test(cardId)
}

// 掩盖手机号码
export function maskMobile(mobile) {
  if (mobile && mobile.length === 11) {
    return `${mobile.slice(0, 3)}****${mobile.slice(7)}`
  }
  return mobile
}
