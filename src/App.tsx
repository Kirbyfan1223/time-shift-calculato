import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TimeInput } from "@/components/TimeInput"
import { calculateTimeDifference, formatTimeDifference } from "@/lib/timeUtils"
import { Calculator, ArrowRight, Clock } from "@phosphor-icons/react"
import { useKV } from "@github/spark/hooks"

function App() {
  const [startTime, setStartTime] = useKV<string>("start-time", "")
  const [originalArrival, setOriginalArrival] = useKV<string>("original-arrival", "")
  const [newArrival, setNewArrival] = useKV<string>("new-arrival", "")
  const [endTime, setEndTime] = useKV<string>("end-time", "")
  
  const [result, setResult] = useState<{
    minutes: number
    isEarlier: boolean
    isValid: boolean
    error?: string
    newPunchInTime?: string
    endTimeDifference?: number
    newPunchOutTime?: string
    totalDifference?: number
  } | null>(null)

  const handleCalculate = () => {
    const calculation = calculateTimeDifference(
      startTime || "", 
      originalArrival || "", 
      newArrival || "",
      endTime || ""
    )
    setResult(calculation)
  }

  const isReadyToCalculate = startTime && originalArrival && newArrival

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Calculator size={28} className="text-primary" />
            Time Difference Calculator
          </h1>
          <p className="text-sm text-muted-foreground">
            Calculate when to punch in for half-day schedules
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              Schedule Times
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TimeInput
              label="Usual Punch-In Time"
              value={startTime || ""}
              onChange={setStartTime}
              id="start-time"
            />
            
            <div className="flex items-center justify-center py-2">
              <ArrowRight size={20} className="text-muted-foreground" />
            </div>
            
            <TimeInput
              label="Usual Arrival Time"
              value={originalArrival || ""}
              onChange={setOriginalArrival}
              id="original-arrival"
            />
            
            <div className="flex items-center justify-center py-2">
              <ArrowRight size={20} className="text-accent" />
            </div>
            
            <TimeInput
              label="Target Arrival Time"
              value={newArrival || ""}
              onChange={setNewArrival}
              id="new-arrival"
            />
            
            <div className="flex items-center justify-center py-2">
              <ArrowRight size={20} className="text-muted-foreground" />
            </div>
            
            <TimeInput
              label="Usual Clock Out Time (Optional)"
              value={endTime || ""}
              onChange={setEndTime}
              id="end-time"
            />
          </CardContent>
        </Card>

        <Button
          onClick={handleCalculate}
          disabled={!isReadyToCalculate}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          size="lg"
        >
          <Calculator size={20} className="mr-2" />
          Calculate New Punch-In Time
        </Button>

        {result && (
          <Card>
            <CardContent className="pt-6">
              {result.isValid ? (
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">New Punch-In Time</div>
                    <div className="text-3xl font-bold tabular-nums text-primary">
                      {result.newPunchInTime}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-lg font-semibold tabular-nums">
                      {result.minutes} minutes
                    </div>
                    <Alert className={result.isEarlier ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}>
                      <AlertDescription className="text-center font-medium">
                        {formatTimeDifference(result.minutes, result.isEarlier)} than your usual punch-in time
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  {result.newPunchOutTime && (
                    <>
                      <div className="border-t pt-4 space-y-2">
                        <div className="text-sm text-muted-foreground">New Clock Out Time</div>
                        <div className="text-3xl font-bold tabular-nums text-primary">
                          {result.newPunchOutTime}
                        </div>
                      </div>
                      
                      {result.endTimeDifference !== undefined && (
                        <div className="space-y-2">
                          <div className="text-lg font-semibold tabular-nums">
                            {result.endTimeDifference} minutes
                          </div>
                          <Alert className="border-blue-200 bg-blue-50">
                            <AlertDescription className="text-center font-medium">
                              End time shift
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                      
                      {result.totalDifference !== undefined && (
                        <div className="border-t pt-4 space-y-2">
                          <div className="text-sm text-muted-foreground">Total Time Difference</div>
                          <div className="text-2xl font-bold tabular-nums text-accent">
                            {result.totalDifference} minutes
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <Alert className="border-destructive/20 bg-destructive/5">
                  <AlertDescription className="text-destructive">
                    {result.error}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default App