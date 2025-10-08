export function parseTime(timeStr: string): Date | null {
  if (!timeStr) return null
  
  const timeRegex = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  const match = timeStr.match(timeRegex)
  
  if (!match) return null
  
  const [, hourStr, minuteStr, period] = match
  let hour = parseInt(hourStr)
  const minute = parseInt(minuteStr)
  
  if (hour < 1 || hour > 12 || minute < 0 || minute > 59) {
    return null
  }
  
  if (period.toUpperCase() === "PM" && hour !== 12) {
    hour += 12
  } else if (period.toUpperCase() === "AM" && hour === 12) {
    hour = 0
  }
  
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  return date
}

export function calculateTimeDifference(startTime: string, originalArrival: string, newArrival: string): {
  minutes: number
  isEarlier: boolean
  isValid: boolean
  error?: string
} {
  const start = parseTime(startTime)
  const original = parseTime(originalArrival)
  const newTime = parseTime(newArrival)
  
  if (!start) {
    return { minutes: 0, isEarlier: false, isValid: false, error: "Invalid start time" }
  }
  
  if (!original) {
    return { minutes: 0, isEarlier: false, isValid: false, error: "Invalid original arrival time" }
  }
  
  if (!newTime) {
    return { minutes: 0, isEarlier: false, isValid: false, error: "Invalid new arrival time" }
  }
  
  // Calculate time differences in minutes from midnight for same-day calculations
  const startMinutes = start.getHours() * 60 + start.getMinutes()
  const originalMinutes = original.getHours() * 60 + original.getMinutes()
  const newTimeMinutes = newTime.getHours() * 60 + newTime.getMinutes()
  
  // Calculate the original duration and new duration from start time
  let originalDuration = originalMinutes - startMinutes
  let newDuration = newTimeMinutes - startMinutes
  
  // Handle cases where arrival is earlier in the day than start (e.g., start at 2PM, arrive at 12PM)
  // In this case, we assume it's still the same working period/shift
  if (originalDuration < 0) {
    originalDuration = Math.abs(originalDuration)
  }
  
  if (newDuration < 0) {
    newDuration = Math.abs(newDuration)
  }
  
  // Calculate the difference between new and original durations
  const difference = newDuration - originalDuration
  
  return {
    minutes: Math.abs(difference),
    isEarlier: difference < 0,
    isValid: true
  }
}

export function formatTimeDifference(minutes: number, isEarlier: boolean): string {
  if (minutes === 0) {
    return "No time change"
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  let result = ""
  if (hours > 0) {
    result += `${hours} hour${hours !== 1 ? 's' : ''}`
    if (remainingMinutes > 0) {
      result += ` and ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`
    }
  } else {
    result = `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`
  }
  
  return `${result} ${isEarlier ? 'earlier' : 'later'}`
}