import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

interface BloodPressureReading {
  id: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  timestamp: Date;
  notes?: string;
}

interface HealthChartProps {
  readings: BloodPressureReading[];
}

export function HealthChart({ readings }: HealthChartProps) {
  // Prepare data for chart (reverse to show chronologically)
  const chartData = readings
    .slice()
    .reverse()
    .map((reading, index) => ({
      index: index + 1,
      date: reading.timestamp.toLocaleDateString(),
      time: reading.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      systolic: reading.systolic,
      diastolic: reading.diastolic,
      pulse: reading.pulse,
      fullDate: reading.timestamp
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 border rounded-lg shadow-md">
          <p className="font-medium">{data.date} at {data.time}</p>
          <p className="text-primary">Systolic: {payload[0].value} mmHg</p>
          <p className="text-secondary">Diastolic: {payload[1].value} mmHg</p>
          <p className="text-muted-foreground">Pulse: {data.pulse} bpm</p>
        </div>
      );
    }
    return null;
  };

  if (readings.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Blood Pressure Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Calendar className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-medium text-foreground mb-2">No readings yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Start logging your blood pressure readings to see trends and track your progress over time.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate average readings
  const avgSystolic = Math.round(readings.reduce((sum, r) => sum + r.systolic, 0) / readings.length);
  const avgDiastolic = Math.round(readings.reduce((sum, r) => sum + r.diastolic, 0) / readings.length);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Blood Pressure Trends
          </div>
          <div className="text-sm text-muted-foreground">
            Last {readings.length} readings
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="index"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                domain={['dataMin - 10', 'dataMax + 10']}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Reference lines for healthy ranges */}
              <ReferenceLine y={120} stroke="hsl(var(--success))" strokeDasharray="5 5" />
              <ReferenceLine y={80} stroke="hsl(var(--success))" strokeDasharray="5 5" />
              <ReferenceLine y={140} stroke="hsl(var(--warning))" strokeDasharray="5 5" />
              <ReferenceLine y={90} stroke="hsl(var(--warning))" strokeDasharray="5 5" />
              
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--secondary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Statistics */}
        <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Average Systolic</p>
            <p className="text-xl font-bold text-primary">{avgSystolic} mmHg</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Average Diastolic</p>
            <p className="text-xl font-bold text-secondary">{avgDiastolic} mmHg</p>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 p-3 bg-accent/30 rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-1 bg-success mr-2"></div>
              <span>Normal (&lt;120/80)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-1 bg-warning mr-2"></div>
              <span>High (≥140/90)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}