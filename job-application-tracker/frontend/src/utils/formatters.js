export const STATUS_OPTIONS = ['Applied', 'Interview', 'Selected', 'Rejected']

function parseDate(value) {
  if (typeof value === 'string') {
    const [datePart] = value.split('T')
    const [year, month, day] = datePart.split('-').map(Number)

    if (year && month && day) {
      return new Date(year, month - 1, day)
    }
  }

  return new Date(value)
}

export function formatDate(value) {
  if (!value) {
    return 'Not set'
  }

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parseDate(value))
}

export function toDateInputValue(value) {
  if (!value) {
    return new Date().toISOString().slice(0, 10)
  }

  if (typeof value === 'string') {
    return value.split('T')[0]
  }

  return parseDate(value).toISOString().slice(0, 10)
}

export function todayInputValue() {
  return new Date().toISOString().slice(0, 10)
}
