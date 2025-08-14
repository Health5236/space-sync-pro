
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Plus, Filter, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BookingForm from "@/components/forms/BookingForm";
import BookingCalendar from "@/components/bookings/BookingCalendar";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  title: string;
  member: string;
  space: string;
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  status: "confirmed" | "pending" | "cancelled";
}

const Bookings = () => {
  const { toast } = useToast();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentView, setCurrentView] = useState<"list" | "calendar">("list");

  const mockBookings = [
    {
      id: "1",
      title: "Team Standup",
      member: "John Doe",
      space: "Meeting Room A",
      date: "2024-01-15",
      startTime: "09:00",
      endTime: "10:00",
      attendees: 8,
      status: "confirmed" as const,
    },
    {
      id: "2",
      title: "Client Presentation",
      member: "Sarah Johnson",
      space: "Meeting Room B",
      date: "2024-01-15",
      startTime: "14:00",
      endTime: "16:00",
      attendees: 12,
      status: "confirmed" as const,
    },
    {
      id: "3",
      title: "Interview Session",
      member: "Mike Wilson",
      space: "Private Office 1",
      date: "2024-01-16",
      startTime: "11:30",
      endTime: "12:30",
      attendees: 3,
      status: "pending" as const,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "default";
      case "pending": return "secondary";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.space.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "" || booking.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your booking data is being exported to CSV...",
    });
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
    toast({
      title: "Filter Applied",
      description: `Showing ${value || "all"} bookings`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
                <p className="text-gray-600 mt-1">Manage space reservations and bookings</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentView(currentView === "list" ? "calendar" : "list")}
                >
                  {currentView === "list" ? "Calendar View" : "List View"}
                </Button>
                <Button 
                  onClick={() => setShowBookingForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Booking
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+3 from yesterday</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Week</p>
                      <p className="text-2xl font-bold">47</p>
                    </div>
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">85% capacity</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Attendees</p>
                      <p className="text-2xl font-bold">324</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Avg 6.9 per booking</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold">₹28,750</p>
                    </div>
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-bold">₹</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+12% this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            {currentView === "calendar" ? (
              <BookingCalendar />
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div>
                              <h3 className="font-semibold">{booking.title}</h3>
                              <p className="text-sm text-gray-600">by {booking.member}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {booking.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {booking.startTime} - {booking.endTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {booking.attendees} attendees
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <span className="text-sm font-medium text-gray-700">
                            {booking.space}
                          </span>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <BookingForm 
            open={showBookingForm} 
            onOpenChange={setShowBookingForm} 
          />
        </main>
      </div>
    </div>
  );
};

export default Bookings;
