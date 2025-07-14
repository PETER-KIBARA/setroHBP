import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, MapPin, Heart } from "lucide-react";

interface BloodPressureReading {
  id: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  timestamp: Date;
  notes?: string;
}

interface EmergencyAlertProps {
  reading: BloodPressureReading;
}

export function EmergencyAlert({ reading }: EmergencyAlertProps) {
  const isCritical = reading.systolic >= 180 || reading.diastolic >= 120;
  const isHigh = reading.systolic >= 140 || reading.diastolic >= 90;
  
  if (!isCritical && !isHigh) return null;

  const emergencyContacts = [
    { name: "Emergency Services", number: "911", type: "emergency" },
    { name: "Dr. James Kiprotich", number: "+254 712 345 678", type: "doctor" },
    { name: "Nairobi Hospital", number: "+254 20 284 9000", type: "hospital" }
  ];

  const nearbyFacilities = [
    { name: "Nairobi Hospital", distance: "2.3 km", time: "8 min" },
    { name: "Aga Khan Hospital", distance: "3.1 km", time: "12 min" },
    { name: "Kenyatta National Hospital", distance: "4.5 km", time: "15 min" }
  ];

  return (
    <Card className={`shadow-glow border-2 ${isCritical ? 'border-destructive bg-destructive/5' : 'border-warning bg-warning/5'}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-full ${isCritical ? 'bg-destructive' : 'bg-warning'}`}>
            <AlertTriangle className="w-6 h-6 text-white animate-bounce-gentle" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant={isCritical ? "destructive" : "secondary"} className="font-semibold">
                {isCritical ? "CRITICAL ALERT" : "HIGH READING"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {reading.timestamp.toLocaleString()}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-primary" />
                  <span className="font-bold text-lg">{reading.systolic}/{reading.diastolic} mmHg</span>
                </div>
                <span className="text-sm text-muted-foreground">Pulse: {reading.pulse} bpm</span>
              </div>
              
              <p className={`text-sm font-medium ${isCritical ? 'text-destructive' : 'text-warning'}`}>
                {isCritical 
                  ? "Your blood pressure reading is in the critical range. Seek immediate medical attention."
                  : "Your blood pressure is elevated. Monitor closely and contact your healthcare provider."
                }
              </p>
            </div>

            {isCritical && (
              <div className="space-y-4">
                {/* Immediate Actions */}
                <div className="p-4 bg-card rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-3">Immediate Actions:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Sit down and rest immediately</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Take slow, deep breaths</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Call your doctor or emergency services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Take prescribed emergency medication if available</span>
                    </li>
                  </ul>
                </div>

                {/* Emergency Contacts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {emergencyContacts.map((contact, index) => (
                    <Button
                      key={index}
                      variant={contact.type === 'emergency' ? 'destructive' : 'outline'}
                      size="sm"
                      className="justify-start"
                      onClick={() => window.open(`tel:${contact.number}`, '_self')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs opacity-90">{contact.number}</div>
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Nearby Facilities */}
                <div className="p-4 bg-card rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Nearby Medical Facilities
                  </h4>
                  <div className="space-y-2">
                    {nearbyFacilities.map((facility, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="font-medium">{facility.name}</span>
                        <span className="text-muted-foreground">{facility.distance} • {facility.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!isCritical && isHigh && (
              <div className="space-y-3">
                <div className="p-3 bg-card rounded-lg border">
                  <h5 className="font-medium text-foreground mb-2">Recommended Actions:</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Rest and recheck reading in 15 minutes</li>
                    <li>• Contact your healthcare provider within 24 hours</li>
                    <li>• Review your medication adherence</li>
                    <li>• Monitor stress levels and practice relaxation techniques</li>
                  </ul>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`tel:+254712345678`, '_self')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Your Doctor
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}