
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, Users, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  title: string;
  space: string;
  startTime: string;
  endTime: string;
  attendees: number;
  credits: number;
  status: "confirmed" | "pending" | "cancelled";
}

const mockBookings: Booking[] = [
  {
    id: "1",
    title: "Team Standup",
    space: "Meeting Room A",
    startTime: "09:00",
    endTime: "10:00",
    attendees: 8,
    credits: 2,
    status: "confirmed"
  },
  {
    id: "2",
    title: "Client Presentation",
    space: "Meeting Room B",
    startTime: "14:00",
    endTime: "16:00",
    attendees: 12,
    credits: 4,
    status: "confirmed"
  },
  {
    id: "3",
    title: "Interview Session",
    space: "Private Office 1",
    startTime: "11:30",
    endTime: "12:30",
    attendees: 3,
    credits: 3,
    status: "pending"
  }
];

const BookingCalendar = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getBookingForTimeSlot = (timeSlot: string) => {
    return mockBookings.find(booking => 
      booking.startTime <= timeSlot && booking.endTime > timeSlot
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleBookNow = (timeSlot: string) => {
    toast({
      title: "Booking Initiated",
      description: `Booking slot for ${timeSlot}. Please fill out the booking form.`,
    });
  };

  const handlePreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
    toast({
      title: "Date Changed",
      description: `Viewing bookings for ${prevDay.toLocaleDateString()}`,
    });
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
    toast({
      title: "Date Changed",
      description: `Viewing bookings for ${nextDay.toLocaleDateString()}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Meeting Room Schedule</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handlePreviousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">
                {currentDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <Button variant="outline" size="icon" onClick={handleNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeSlots.map((timeSlot) => {
              const booking = getBookingForTimeSlot(timeSlot);
              return (
                <div
                  key={timeSlot}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    booking 
                      ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                      : 'border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="font-medium">{timeSlot}</span>
                    </div>
                    {booking && (
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(booking.status)}`} />
                    )}
                  </div>
                  
                  {booking ? (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">{booking.title}</h4>
                      <p className="text-xs text-muted-foreground">{booking.space}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{booking.attendees}</span>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-3 w-3 mr-1" />
                          <span>{booking.credits}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {booking.status}
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-xs text-muted-foreground">Available</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-xs"
                        onClick={() => handleBookNow(timeSlot)}
                      >
                        Book Now
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCalendar;
