import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Clock } from "@phosphor-icons/react"

interface TimeInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  id: string
}

export function TimeInput({ label, value, onChange, id }: TimeInputProps) {
  const [hour, setHour] = useState("")
  const [minute, setMinute] = useState("")
  const [period, setPeriod] = useState<"AM" | "PM">("AM")

  const updateValue = (newHour: string, newMinute: string, newPeriod: "AM" | "PM") => {
    if (newHour && newMinute) {
      const formattedTime = `${newHour}:${newMinute.padStart(2, '0')} ${newPeriod}`
      onChange(formattedTime)
    }
  }

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === "" || (parseInt(val) >= 1 && parseInt(val) <= 12)) {
      setHour(val)
      updateValue(val, minute, period)
    }
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === "" || (parseInt(val) >= 0 && parseInt(val) <= 59)) {
      setMinute(val)
      updateValue(hour, val, period)
    }
  }

  const handlePeriodToggle = () => {
    const newPeriod = period === "AM" ? "PM" : "AM"
    setPeriod(newPeriod)
    updateValue(hour, minute, newPeriod)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium flex items-center gap-2">
        <Clock size={16} className="text-muted-foreground" />
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Input
          id={`${id}-hour`}
          type="number"
          min="1"
          max="12"
          placeholder="12"
          value={hour}
          onChange={handleHourChange}
          className="w-16 text-center"
        />
        <span className="text-lg font-medium">:</span>
        <Input
          id={`${id}-minute`}
          type="number"
          min="0"
          max="59"
          placeholder="00"
          value={minute}
          onChange={handleMinuteChange}
          className="w-16 text-center"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handlePeriodToggle}
          className="w-16"
        >
          {period}
        </Button>
      </div>
    </div>
  )
}