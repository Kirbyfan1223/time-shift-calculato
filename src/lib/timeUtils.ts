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

export function calculateTimeDifference(
  startTime: string, 
  originalArrival: string, 
  newArrival: string, 
  endTime?: string
): {
  minutes: number
  isEarlier: boolean
  isValid: boolean
  error?: string
  newPunchInTime?: string
  endTimeDifference?: number
  newPunchOutTime?: string
  totalDifference?: number
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
  
  // Calculate the travel time (from punch-in to arrival)
  const startMinutes = start.getHours() * 60 + start.getMinutes()
  const originalMinutes = original.getHours() * 60 + original.getMinutes()
  const newTimeMinutes = newTime.getHours() * 60 + newTime.getMinutes()
  
  // Calculate travel duration (always positive)
  let travelDuration = originalMinutes - startMinutes
  if (travelDuration < 0) {
    travelDuration += 24 * 60 // Handle next day scenario
  }
  
  // Calculate when you need to punch in to arrive at the new time
  let newPunchInMinutes = newTimeMinutes - travelDuration
  if (newPunchInMinutes < 0) {
    newPunchInMinutes += 24 * 60 // Handle previous day scenario
  }
  
  // Calculate the difference in punch-in times
  let difference = newPunchInMinutes - startMinutes
  
  // Handle day boundary crossings
  if (difference > 12 * 60) {
    difference -= 24 * 60
  } else if (difference < -12 * 60) {
    difference += 24 * 60
  }
  
  // Format the new punch-in time
  const newPunchInHour = Math.floor(newPunchInMinutes / 60) % 24
  const newPunchInMin = newPunchInMinutes % 60
  const displayHour = newPunchInHour === 0 ? 12 : newPunchInHour > 12 ? newPunchInHour - 12 : newPunchInHour
  const period = newPunchInHour < 12 ? 'AM' : 'PM'
  const newPunchInTime = `${displayHour}:${newPunchInMin.toString().padStart(2, '0')} ${period}`
  
  const result: {
    minutes: number
    isEarlier: boolean
    isValid: boolean
    newPunchInTime: string
    endTimeDifference?: number
    newPunchOutTime?: string
    totalDifference?: number
  } = {
    minutes: Math.abs(difference),
    isEarlier: difference < 0,
    isValid: true,
    newPunchInTime
  }
  
  // Calculate end time if provided
  if (endTime) {
    const end = parseTime(endTime)
    if (end) {
      const endMinutes = end.getHours() * 60 + end.getMinutes()
      
      // Calculate the work duration (from punch-in to punch-out)
      let workDuration = endMinutes - startMinutes
      if (workDuration < 0) {
        workDuration += 24 * 60 // Handle next day scenario
      }
      
      // Calculate new punch-out time
      let newPunchOutMinutes = newPunchInMinutes + workDuration
      if (newPunchOutMinutes >= 24 * 60) {
        newPunchOutMinutes -= 24 * 60 // Handle next day scenario
      }
      
      // Format the new punch-out time
      const newPunchOutHour = Math.floor(newPunchOutMinutes / 60) % 24
      const newPunchOutMin = newPunchOutMinutes % 60
      const displayEndHour = newPunchOutHour === 0 ? 12 : newPunchOutHour > 12 ? newPunchOutHour - 12 : newPunchOutHour
      const endPeriod = newPunchOutHour < 12 ? 'AM' : 'PM'
      result.newPunchOutTime = `${displayEndHour}:${newPunchOutMin.toString().padStart(2, '0')} ${endPeriod}`
      
      // Calculate end time difference
      let endDifference = newPunchOutMinutes - endMinutes
      
      // Handle day boundary crossings
      if (endDifference > 12 * 60) {
        endDifference -= 24 * 60
      } else if (endDifference < -12 * 60) {
        endDifference += 24 * 60
      }
      
      result.endTimeDifference = Math.abs(endDifference)
      
      // Calculate total difference (start + end)
      result.totalDifference = result.minutes + result.endTimeDifference
    }
  }
  
  return result
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