import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BookingForm from "@/components/forms/BookingForm";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

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
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredBookings = mockBookings.filter(booking =>
    booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.space.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Button 
                onClick={() => setShowBookingForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Booking
              </Button>
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
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
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
                </CardContent>
              </Card>
            </div>

            {/* Bookings List */}
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
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
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
