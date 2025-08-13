
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import FloorPlan from "@/components/spaces/FloorPlan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, Clock, Settings } from "lucide-react";

const Spaces = () => {
  const spaceStats = [
    { label: "Total Spaces", value: "127", icon: Building2 },
    { label: "Occupied", value: "89", icon: Users },
    { label: "Available", value: "38", icon: Clock },
    { label: "Maintenance", value: "3", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Space Management</h1>
            <p className="text-muted-foreground">Real-time availability and floor plans</p>
          </div>

          {/* Space Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {spaceStats.map((stat) => (
              <Card key={stat.label} className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Floor Plan */}
          <FloorPlan />

          {/* Space Configuration */}
          <Card className="mt-6 animate-slide-up">
            <CardHeader>
              <CardTitle>Space Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Hot Desks</h4>
                  <p className="text-sm text-muted-foreground mb-2">Flexible seating</p>
                  <Badge variant="outline">24 Available</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Dedicated Desks</h4>
                  <p className="text-sm text-muted-foreground mb-2">Reserved seating</p>
                  <Badge variant="outline">12 Available</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Private Offices</h4>
                  <p className="text-sm text-muted-foreground mb-2">1-6 people</p>
                  <Badge variant="outline">8 Available</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Meeting Rooms</h4>
                  <p className="text-sm text-muted-foreground mb-2">Hourly booking</p>
                  <Badge variant="outline">6 Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Spaces;
