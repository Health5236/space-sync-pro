
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const occupancyData = [
  { time: "9:00", occupancy: 45 },
  { time: "10:00", occupancy: 68 },
  { time: "11:00", occupancy: 82 },
  { time: "12:00", occupancy: 95 },
  { time: "13:00", occupancy: 78 },
  { time: "14:00", occupancy: 88 },
  { time: "15:00", occupancy: 92 },
  { time: "16:00", occupancy: 85 },
  { time: "17:00", occupancy: 72 },
  { time: "18:00", occupancy: 45 },
];

const OccupancyChart = () => {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Today's Occupancy</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={occupancyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Line 
              type="monotone" 
              dataKey="occupancy" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ r: 4, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;
