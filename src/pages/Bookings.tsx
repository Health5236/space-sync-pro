
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import BookingCalendar from "@/components/bookings/BookingCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CreditCard, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Bookings = () => {
  const { toast } = useToast();

  const bookingStats = [
    { label: "Today's Bookings", value: "47", change: "+8 from yesterday", icon: Calendar },
    { label: "Active Sessions", value: "32", change: "Currently ongoing", icon: Clock },
    { label: "Credits Used", value: "156", change: "This month", icon: CreditCard },
    { label: "Total Attendees", value: "284", change: "Today", icon: Users },
  ];

  const upcomingBookings = [
    { id: "1", title: "Board Meeting", room: "Conference Room A", time: "10:00 - 12:00", attendees: 8, status: "confirmed" },
    { id: "2", title: "Client Presentation", room: "Meeting Room B", time: "14:00 - 16:00", attendees: 12, status: "confirmed" },
    { id: "3", title: "Team Standup", room: "Hot Desk Area", time: "09:00 - 09:30", attendees: 15, status: "pending" },
  ];

  const handleNewBooking = () => {
    toast({
      title: "New Booking",
      description: "Opening booking form...",
    });
    // In a real app, this would open a booking form modal or navigate to a booking form page
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Booking Management</h1>
            <p className="text-muted-foreground">Credit-based booking system with real-time availability</p>
          </div>

          {/* Booking Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {bookingStats.map((stat) => (
              <Card key={stat.label} className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <BookingCalendar />
            </div>

            {/* Upcoming Bookings */}
            <div>
              <Card className="animate-slide-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <Button size="sm" onClick={handleNewBooking}>New Booking</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{booking.title}</h4>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{booking.room}</p>
                        <div className="flex items-center justify-between mt-2 text-sm">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {booking.attendees}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Bookings;
