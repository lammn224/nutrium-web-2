export function convertTimeStamps(ts) {
  const date = new Date(ts * 1000)

  const year = date.getFullYear()
  const month = padTo2Digits(date.getMonth() + 1)
  const day = padTo2Digits(date.getDate())

  return `${day}/${month}/${year}`
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}
