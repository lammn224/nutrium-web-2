export function convertTimeStampsToString(ts) {
  const date = new Date(ts * 1000)

  const year = date.getFullYear()
  const month = padTo2Digits(date.getMonth() + 1)
  const day = padTo2Digits(date.getDate())

  return `${day}/${month}/${year}`
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

export function convertStringToTimeStamps(str) {
  const [day, month, year] = str.split('/')

  const date = new Date(+year, +month - 1, +day)

  return Math.floor(date.getTime() / 1000)
}
