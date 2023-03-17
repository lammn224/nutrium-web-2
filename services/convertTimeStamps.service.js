export function convertTimeStampsToString(ts) {
  const date = new Date(ts * 1000)

  const year = date.getFullYear()
  const month = padTo2Digits(date.getMonth() + 1)
  const day = padTo2Digits(date.getDate())

  return `${day}/${month}/${year}`
}

export function convertTimeStampsToDatePickerString(ts) {
  const date = new Date(ts * 1000)

  let formattedString = date.getFullYear() + '-'

  if (date.getMonth() < 9) {
    formattedString += '0'
  }
  formattedString += date.getMonth() + 1
  formattedString += '-'

  if (date.getDate() < 10) {
    formattedString += '0'
  }
  formattedString += date.getDate()

  return formattedString
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

export function convertStringToTimeStamps(str) {
  const [day, month, year] = str.split('/')

  const date = new Date(+year, +month - 1, +day)

  return Math.floor(date.getTime() / 1000)
}

export function convertStringDatePickerToTimeStamps(str) {
  const [year, month, day] = str.split('-')

  const date = new Date(+year, +month - 1, +day)

  return Math.floor(date.getTime() / 1000)
}

export function dateToString(inputDate) {
  let date, month, year

  date = inputDate.getDate()
  month = inputDate.getMonth() + 1
  // eslint-disable-next-line prefer-const
  year = inputDate.getFullYear()

  date = date.toString().padStart(2, '0')

  month = month.toString().padStart(2, '0')

  return `${date}/${month}/${year}`
}

export function startOfWeek(ts) {
  const date = new Date(ts * 1000)
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)

  return new Date(date.setDate(diff))
}

export function endOfWeek(ts) {
  const date = new Date(ts * 1000)
  let lastday
  if (date.getDay()) {
    lastday = date.getDate() - (date.getDay() - 1) + 6
  } else {
    lastday = date.getDate()
  }

  return new Date(date.setDate(lastday))
}
