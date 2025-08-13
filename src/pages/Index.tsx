
import { useState } from "react";
import { 
  Building2, 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  UserPlus 
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MetricCard from "@/components/dashboard/MetricCard";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import FloorPlan from "@/components/spaces/FloorPlan";
import BookingCalendar from "@/components/bookings/BookingCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "spaces":
        return <FloorPlan />;
      case "bookings":
        return <BookingCalendar />;
      default:
        return (
          <div className="space-y-6 animate-fade-in">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Occupancy"
                value="87%"
                change={{ value: "+5.2% from yesterday", trend: "up" }}
                icon={Building2}
              />
              <MetricCard
                title="Active Members"
                value="324"
                change={{ value: "+12 this week", trend: "up" }}
                icon={Users}
              />
              <MetricCard
                title="Bookings Today"
                value="47"
                change={{ value: "+8 from yesterday", trend: "up" }}
                icon={Calendar}
              />
              <MetricCard
                title="Revenue (MTD)"
                value="$28,750"
                change={{ value: "+15.3% vs last month", trend: "up" }}
                icon={DollarSign}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OccupancyChart />
              
              {/* Recent Activity */}
              <Card className="animate-slide-up">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-full">
                        <UserPlus className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New member joined</p>
                        <p className="text-xs text-muted-foreground">Sarah Johnson - Premium Plan</p>
                      </div>
                      <Badge variant="outline">2 min ago</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Meeting room booked</p>
                        <p className="text-xs text-muted-foreground">Conference Room A - 2:00 PM</p>
                      </div>
                      <Badge variant="outline">5 min ago</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <TrendingUp className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Peak occupancy reached</p>
                        <p className="text-xs text-muted-foreground">95% capacity at 2:30 PM</p>
                      </div>
                      <Badge variant="outline">1 hour ago</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <UserPlus className="h-6 w-6 text-primary mb-2" />
                    <p className="font-medium">Add Member</p>
                    <p className="text-xs text-muted-foreground">Register new member</p>
                  </button>
                  
                  <button className="p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Calendar className="h-6 w-6 text-primary mb-2" />
                    <p className="font-medium">Book Space</p>
                    <p className="text-xs text-muted-foreground">Reserve meeting room</p>
                  </button>
                  
                  <button className="p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Building2 className="h-6 w-6 text-primary mb-2" />
                    <p className="font-medium">View Floor Plan</p>
                    <p className="text-xs text-muted-foreground">Check space availability</p>
                  </button>
                  
                  <button className="p-4 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <TrendingUp className="h-6 w-6 text-primary mb-2" />
                    <p className="font-medium">View Analytics</p>
                    <p className="text-xs text-muted-foreground">Usage reports</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-white rounded-lg p-1 w-fit">
              {[
                { id: "dashboard", label: "Dashboard" },
                { id: "spaces", label: "Spaces" },
                { id: "bookings", label: "Bookings" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
