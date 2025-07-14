import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pill, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timesTaken: number;
  totalRequired: number;
  nextDose: Date;
}

interface MedicationTrackerProps {
  medications: Medication[];
  onMarkTaken: (medicationId: string) => void;
}

export function MedicationTracker({ medications, onMarkTaken }: MedicationTrackerProps) {
  const { toast } = useToast();

  const handleMarkTaken = (medication: Medication) => {
    onMarkTaken(medication.id);
    toast({
      title: "Medication Taken",
      description: `${medication.name} ${medication.dosage} has been recorded.`,
      variant: "default"
    });
  };

  const formatTimeUntilNext = (nextDose: Date) => {
    const now = new Date();
    const diffMs = nextDose.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffMs <= 0) return "Due now";
    if (diffHours > 0) return `${diffHours}h ${diffMinutes}m`;
    return `${diffMinutes}m`;
  };

  const isDue = (nextDose: Date) => {
    return nextDose.getTime() <= Date.now();
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Pill className="w-5 h-5 mr-2 text-secondary" />
          Medication Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {medications.map((medication) => {
          const adherence = (medication.timesTaken / medication.totalRequired) * 100;
          const due = isDue(medication.nextDose);
          
          return (
            <div
              key={medication.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                due 
                  ? "border-warning bg-warning/5 shadow-sm" 
                  : "border-border bg-accent/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">{medication.name}</h4>
                    {due && (
                      <Badge variant="outline" className="border-warning text-warning">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Due
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{medication.dosage} • {medication.frequency}</p>
                </div>
                
                <Button
                  size="sm"
                  variant={due ? "default" : "outline"}
                  onClick={() => handleMarkTaken(medication)}
                  className={due ? "bg-gradient-secondary hover:shadow-glow" : ""}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Mark Taken
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress this week</span>
                  <span className="font-medium">
                    {medication.timesTaken}/{medication.totalRequired} doses
                  </span>
                </div>
                <Progress 
                  value={adherence} 
                  className="h-2"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{Math.round(adherence)}% adherence</span>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Next dose: {formatTimeUntilNext(medication.nextDose)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-6 p-4 bg-primary-light/20 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Pill className="w-4 h-4 text-primary" />
            <h5 className="font-medium text-primary">Medication Reminders</h5>
          </div>
          <p className="text-sm text-muted-foreground">
            Set up medication reminders on your phone to never miss a dose. 
            Consistent medication adherence is crucial for controlling hypertension.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}