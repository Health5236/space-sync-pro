
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, Users, Building2, Calendar, Target } from "lucide-react";

const Analytics = () => {
  const kpiStats = [
    { label: "Occupancy Rate", value: "87%", change: "+5.2% from last month", icon: Building2 },
    { label: "Revenue Growth", value: "23.5%", change: "Year over year", icon: DollarSign },
    { label: "Member Retention", value: "94%", change: "+2.1% from last quarter", icon: Users },
    { label: "Booking Efficiency", value: "76%", change: "Room utilization", icon: Calendar },
  ];

  const revenueData = [
    { month: "Jan", revenue: 24500, forecast: 26000 },
    { month: "Feb", revenue: 28750, forecast: 30000 },
    { month: "Mar", revenue: 32100, forecast: 33500 },
    { month: "Apr", revenue: 29800, forecast: 31000 },
    { month: "May", revenue: 35600, forecast: 37000 },
    { month: "Jun", revenue: 41200, forecast: 42500 },
  ];

  const spaceUtilization = [
    { name: "Hot Desks", value: 68, color: "#8884d8" },
    { name: "Private Offices", value: 89, color: "#82ca9d" },
    { name: "Meeting Rooms", value: 76, color: "#ffc658" },
    { name: "Event Spaces", value: 45, color: "#ff7300" },
  ];

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-muted-foreground">AI-integrated insights for occupancy forecasting and revenue prediction</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Export Report</Button>
                <Button>
                  <Target className="h-4 w-4 mr-2" />
                  Scenario Planning
                </Button>
              </div>
            </div>
          </div>

          {/* KPI Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {kpiStats.map((stat) => (
              <Card key={stat.label} className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Occupancy Chart */}
            <OccupancyChart />

            {/* Revenue Prediction */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Revenue Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Actual Revenue" />
                    <Bar dataKey="forecast" fill="hsl(var(--primary))" opacity={0.5} name="Forecast" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Space Utilization */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Space Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={spaceUtilization}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {spaceUtilization.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Operational Insights */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Operational Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                      <span className="font-medium">Peak Hours</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">2:00 PM - 4:00 PM daily</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-medium">Average Stay</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">6.5 hours per visit</p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-yellow-600 mr-2" />
                      <span className="font-medium">Booking Lead Time</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">2.3 days average</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts & Recommendations */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium">Capacity Optimization</h4>
                    <p className="text-sm text-muted-foreground">Consider adding 3 more hot desks in Zone A</p>
                  </div>
                  
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-medium">Revenue Opportunity</h4>
                    <p className="text-sm text-muted-foreground">Meeting Room B has 35% unused capacity</p>
                  </div>
                  
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-medium">Member Retention</h4>
                    <p className="text-sm text-muted-foreground">12 members at risk of churning next month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
