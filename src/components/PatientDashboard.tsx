import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Calendar, Pill, TrendingUp, AlertTriangle, Activity, Clock, User } from "lucide-react";
import { BloodPressureForm } from "./BloodPressureForm";
import { MedicationTracker } from "./MedicationTracker";
import { HealthChart } from "./HealthChart";
import { EmergencyAlert } from "./EmergencyAlert";
import { LifestyleRecommendations } from "./LifestyleRecommendations";

interface BloodPressureReading {
  id: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  timestamp: Date;
  notes?: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timesTaken: number;
  totalRequired: number;
  nextDose: Date;
}

export function PatientDashboard() {
  const [readings, setReadings] = useState<BloodPressureReading[]>([]);
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Amlodipine",
      dosage: "5mg",
      frequency: "Once daily",
      timesTaken: 6,
      totalRequired: 7,
      nextDose: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
    },
    {
      id: "2", 
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Twice daily",
      timesTaken: 13,
      totalRequired: 14,
      nextDose: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
    }
  ]);

  const [currentUser] = useState({
    name: "Sarah Mwangi",
    age: 58,
    lastCheckup: "2024-01-10",
    doctor: "Dr. James Kiprotich"
  });

  // Calculate latest reading status
  const latestReading = readings[0];
  const getBloodPressureStatus = (systolic: number, diastolic: number) => {
    if (systolic >= 180 || diastolic >= 120) return { status: "critical", color: "destructive" };
    if (systolic >= 140 || diastolic >= 90) return { status: "high", color: "warning" };
    if (systolic >= 130 || diastolic >= 80) return { status: "elevated", color: "warning" };
    return { status: "normal", color: "success" };
  };

  const addReading = (reading: Omit<BloodPressureReading, "id" | "timestamp">) => {
    const newReading: BloodPressureReading = {
      ...reading,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setReadings(prev => [newReading, ...prev]);
  };

  const markMedicationTaken = (medicationId: string) => {
    setMedications(prev => prev.map(med => 
      med.id === medicationId 
        ? { ...med, timesTaken: med.timesTaken + 1 }
        : med
    ));
  };

  // Calculate medication adherence
  const overallAdherence = medications.reduce((acc, med) => 
    acc + (med.timesTaken / med.totalRequired), 0) / medications.length * 100;

  return (
    <div className="min-h-screen bg-gradient-hero p-4 space-y-6">
      {/* Header */}
      <div className="bg-card shadow-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-medical rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, {currentUser.name}</h1>
              <p className="text-muted-foreground">Managing your hypertension journey</p>
            </div>
          </div>
          <Badge variant="outline" className="text-primary">
            <Heart className="w-4 h-4 mr-1" />
            Patient
          </Badge>
        </div>
      </div>

      {/* Emergency Alert */}
      {latestReading && (
        <EmergencyAlert reading={latestReading} />
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Latest Reading</p>
                <p className="text-2xl font-bold text-foreground">
                  {latestReading ? `${latestReading.systolic}/${latestReading.diastolic}` : "No data"}
                </p>
                {latestReading && (
                  <Badge 
                    variant={getBloodPressureStatus(latestReading.systolic, latestReading.diastolic).color as any}
                    className="mt-1"
                  >
                    {getBloodPressureStatus(latestReading.systolic, latestReading.diastolic).status}
                  </Badge>
                )}
              </div>
              <Heart className="w-8 h-8 text-primary animate-pulse-medical" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Medication Adherence</p>
                <p className="text-2xl font-bold text-foreground">{Math.round(overallAdherence)}%</p>
                <Progress value={overallAdherence} className="mt-2" />
              </div>
              <Pill className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Days Tracked</p>
                <p className="text-2xl font-bold text-foreground">{readings.length}</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Pressure Logging */}
        <div className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                Log Blood Pressure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BloodPressureForm onSubmit={addReading} />
            </CardContent>
          </Card>

          <MedicationTracker 
            medications={medications}
            onMarkTaken={markMedicationTaken}
          />
        </div>

        {/* Charts and Recommendations */}
        <div className="space-y-4">
          <HealthChart readings={readings} />
          <LifestyleRecommendations />
        </div>
      </div>

      {/* Footer */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Last updated: {new Date().toLocaleString()}
            </div>
            <div>
              Next appointment: {currentUser.lastCheckup} with {currentUser.doctor}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}