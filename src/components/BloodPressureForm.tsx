import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BloodPressureFormProps {
  onSubmit: (reading: {
    systolic: number;
    diastolic: number;
    pulse: number;
    notes?: string;
  }) => void;
}

export function BloodPressureForm({ onSubmit }: BloodPressureFormProps) {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!systolic || !diastolic || !pulse) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const systolicNum = parseInt(systolic);
    const diastolicNum = parseInt(diastolic);
    const pulseNum = parseInt(pulse);

    // Basic validation
    if (systolicNum < 70 || systolicNum > 250) {
      toast({
        title: "Invalid Reading",
        description: "Systolic pressure should be between 70-250 mmHg.",
        variant: "destructive"
      });
      return;
    }

    if (diastolicNum < 40 || diastolicNum > 150) {
      toast({
        title: "Invalid Reading", 
        description: "Diastolic pressure should be between 40-150 mmHg.",
        variant: "destructive"
      });
      return;
    }

    if (pulseNum < 40 || pulseNum > 200) {
      toast({
        title: "Invalid Reading",
        description: "Pulse should be between 40-200 bpm.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      onSubmit({
        systolic: systolicNum,
        diastolic: diastolicNum,
        pulse: pulseNum,
        notes: notes.trim() || undefined
      });

      // Reset form
      setSystolic("");
      setDiastolic("");
      setPulse("");
      setNotes("");

      // Determine alert level
      let alertType = "default";
      let message = "Blood pressure reading saved successfully.";
      
      if (systolicNum >= 180 || diastolicNum >= 120) {
        alertType = "destructive";
        message = "Critical reading saved. Please contact your doctor immediately.";
      } else if (systolicNum >= 140 || diastolicNum >= 90) {
        alertType = "warning";
        message = "High reading saved. Monitor closely and follow your treatment plan.";
      }

      toast({
        title: "Reading Saved",
        description: message,
        variant: alertType as any
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save reading. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gradient-hero border-primary/20">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systolic" className="text-sm font-medium">
                Systolic (mmHg) *
              </Label>
              <Input
                id="systolic"
                type="number"
                placeholder="120"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                className="text-center text-lg font-semibold"
                min="70"
                max="250"
              />
              <p className="text-xs text-muted-foreground">Top number</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diastolic" className="text-sm font-medium">
                Diastolic (mmHg) *
              </Label>
              <Input
                id="diastolic"
                type="number"
                placeholder="80"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                className="text-center text-lg font-semibold"
                min="40"
                max="150"
              />
              <p className="text-xs text-muted-foreground">Bottom number</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pulse" className="text-sm font-medium">
                Pulse (bpm) *
              </Label>
              <Input
                id="pulse"
                type="number"
                placeholder="72"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                className="text-center text-lg font-semibold"
                min="40"
                max="200"
              />
              <p className="text-xs text-muted-foreground">Heart rate</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes (optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="How are you feeling? Any symptoms or observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-medical hover:shadow-glow transition-all duration-300"
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Reading"}
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Measurements should be taken while seated after 5 minutes of rest
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}