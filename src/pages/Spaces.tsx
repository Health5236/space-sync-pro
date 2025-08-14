
import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import FloorPlan from "@/components/spaces/FloorPlan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, Clock, Settings, Plus, Search, Filter, Eye, Edit, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Spaces = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const spaceStats = [
    { label: "Total Spaces", value: "127", icon: Building2, change: "+3 this month" },
    { label: "Occupied", value: "89", icon: Users, change: "70% capacity" },
    { label: "Available", value: "38", icon: Clock, change: "Ready to book" },
    { label: "Maintenance", value: "3", icon: Settings, change: "2 scheduled" },
  ];

  const mockSpaces = [
    {
      id: "1",
      name: "Meeting Room A",
      type: "Meeting Room",
      capacity: 12,
      status: "available",
      amenities: ["Projector", "Whiteboard", "Video Conferencing"],
      hourlyRate: 500,
      location: "Floor 1, Wing A"
    },
    {
      id: "2",
      name: "Hot Desk 15",
      type: "Hot Desk",
      capacity: 1,
      status: "occupied",
      amenities: ["Power Outlet", "Ergonomic Chair"],
      hourlyRate: 100,
      location: "Floor 2, Open Area"
    },
    {
      id: "3",
      name: "Private Office 3",
      type: "Private Office",
      capacity: 4,
      status: "available",
      amenities: ["Private Bathroom", "Air Conditioning", "Phone Line"],
      hourlyRate: 800,
      location: "Floor 3, Wing B"
    },
    {
      id: "4",
      name: "Conference Hall",
      type: "Conference Room",
      capacity: 50,
      status: "maintenance",
      amenities: ["AV System", "Stage", "Microphones"],
      hourlyRate: 2000,
      location: "Ground Floor"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "default";
      case "occupied": return "secondary";
      case "maintenance": return "destructive";
      case "reserved": return "outline";
      default: return "outline";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Meeting Room": return "bg-blue-100 text-blue-800";
      case "Hot Desk": return "bg-green-100 text-green-800";
      case "Private Office": return "bg-purple-100 text-purple-800";
      case "Conference Room": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredSpaces = mockSpaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || space.type === filterType;
    const matchesStatus = filterStatus === "all" || space.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSpaceAction = (action: string, spaceName: string) => {
    toast({
      title: `${action} Space`,
      description: `${action} action for ${spaceName} has been processed successfully.`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${action} action applied to selected spaces successfully.`,
    });
  };

  const handleQuickBook = (spaceName: string) => {
    toast({
      title: "Quick Booking Initiated",
      description: `Booking process started for ${spaceName}. Redirecting to booking form...`,
    });
    // Simulate booking process
    setTimeout(() => {
      toast({
        title: "Booking Confirmed",
        description: `${spaceName} has been successfully booked for the next available slot.`,
      });
    }, 2000);
  };

  const handleSpaceConfiguration = (spaceName: string) => {
    toast({
      title: "Configuration Updated",
      description: `Configuration settings for ${spaceName} have been updated successfully.`,
    });
  };

  const handleAddSpace = () => {
    toast({
      title: "Add New Space",
      description: "Opening space creation form...",
    });
    // Simulate adding new space
    setTimeout(() => {
      toast({
        title: "Space Added Successfully",
        description: "New space has been added to your workspace inventory.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Space Management</h1>
                <p className="text-muted-foreground">Real-time availability and floor plans</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleBulkAction("Refresh Status")}>
                  Refresh All
                </Button>
                <Button onClick={handleAddSpace}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Space
                </Button>
              </div>
            </div>
          </div>

          {/* Space Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {spaceStats.map((stat) => (
              <Card key={stat.label} className="animate-fade-in cursor-pointer hover:shadow-md transition-shadow">
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

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search spaces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Space Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Meeting Room">Meeting Room</SelectItem>
                <SelectItem value="Hot Desk">Hot Desk</SelectItem>
                <SelectItem value="Private Office">Private Office</SelectItem>
                <SelectItem value="Conference Room">Conference Room</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => handleBulkAction("Export")} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Floor Plan */}
          <FloorPlan />

          {/* Space List */}
          <Card className="mt-6 animate-slide-up">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Spaces ({filteredSpaces.length})</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction("Update Pricing")}>
                  Bulk Actions
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSpaces.map((space) => (
                  <div key={space.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{space.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(space.type)}`}>
                            {space.type}
                          </span>
                          <Badge variant={getStatusColor(space.status)}>
                            {space.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{space.location}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {space.capacity} people
                          </span>
                          <span>₹{space.hourlyRate}/hour</span>
                          <span>{space.amenities.length} amenities</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {space.status === "available" && (
                        <Button size="sm" onClick={() => handleQuickBook(space.name)}>
                          Quick Book
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleSpaceAction("View Details", space.name)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSpaceAction("Edit", space.name)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Space
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSpaceConfiguration(space.name)}>
                            <Settings className="h-4 w-4 mr-2" />
                            Configuration
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSpaceAction("View Bookings", space.name)}>
                            <Clock className="h-4 w-4 mr-2" />
                            View Bookings
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Space Configuration Grid */}
          <Card className="mt-6 animate-slide-up">
            <CardHeader>
              <CardTitle>Space Configuration Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleSpaceConfiguration("Hot Desks")}>
                  <h4 className="font-semibold mb-2">Hot Desks</h4>
                  <p className="text-sm text-muted-foreground mb-2">Flexible seating</p>
                  <Badge variant="outline">24 Available</Badge>
                  <p className="text-xs text-gray-500 mt-2">₹100-150/hour</p>
                </div>
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleSpaceConfiguration("Dedicated Desks")}>
                  <h4 className="font-semibold mb-2">Dedicated Desks</h4>
                  <p className="text-sm text-muted-foreground mb-2">Reserved seating</p>
                  <Badge variant="outline">12 Available</Badge>
                  <p className="text-xs text-gray-500 mt-2">₹200-300/hour</p>
                </div>
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleSpaceConfiguration("Private Offices")}>
                  <h4 className="font-semibold mb-2">Private Offices</h4>
                  <p className="text-sm text-muted-foreground mb-2">1-6 people</p>
                  <Badge variant="outline">8 Available</Badge>
                  <p className="text-xs text-gray-500 mt-2">₹500-1000/hour</p>
                </div>
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleSpaceConfiguration("Meeting Rooms")}>
                  <h4 className="font-semibold mb-2">Meeting Rooms</h4>
                  <p className="text-sm text-muted-foreground mb-2">Hourly booking</p>
                  <Badge variant="outline">6 Available</Badge>
                  <p className="text-xs text-gray-500 mt-2">₹500-2000/hour</p>
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
