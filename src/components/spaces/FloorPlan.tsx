
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, Coffee, Printer } from "lucide-react";

interface WorkspaceItem {
  id: string;
  type: "desk" | "office" | "meeting-room";
  status: "available" | "occupied" | "reserved" | "maintenance";
  name: string;
  position: { top: string; left: string };
  size: { width: string; height: string };
  capacity?: number;
  amenities?: string[];
}

const workspaces: WorkspaceItem[] = [
  { id: "D001", type: "desk", status: "available", name: "Hot Desk 1", position: { top: "10%", left: "10%" }, size: { width: "8%", height: "12%" } },
  { id: "D002", type: "desk", status: "occupied", name: "Hot Desk 2", position: { top: "10%", left: "20%" }, size: { width: "8%", height: "12%" } },
  { id: "D003", type: "desk", status: "reserved", name: "Hot Desk 3", position: { top: "10%", left: "30%" }, size: { width: "8%", height: "12%" } },
  { id: "M001", type: "meeting-room", status: "available", name: "Meeting Room A", position: { top: "30%", left: "10%" }, size: { width: "25%", height: "20%" }, capacity: 8, amenities: ["Projector", "Whiteboard"] },
  { id: "M002", type: "meeting-room", status: "occupied", name: "Meeting Room B", position: { top: "30%", left: "40%" }, size: { width: "25%", height: "20%" }, capacity: 12, amenities: ["TV", "Conference Phone"] },
  { id: "O001", type: "office", status: "occupied", name: "Private Office 1", position: { top: "60%", left: "10%" }, size: { width: "20%", height: "25%" }, capacity: 4 },
  { id: "O002", type: "office", status: "available", name: "Private Office 2", position: { top: "60%", left: "35%" }, size: { width: "20%", height: "25%" }, capacity: 6 },
];

const FloorPlan = () => {
  const [selectedSpace, setSelectedSpace] = useState<WorkspaceItem | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 border-green-300 hover:bg-green-200";
      case "occupied": return "bg-red-100 border-red-300 hover:bg-red-200";
      case "reserved": return "bg-yellow-100 border-yellow-300 hover:bg-yellow-200";
      case "maintenance": return "bg-purple-100 border-purple-300 hover:bg-purple-200";
      default: return "bg-gray-100 border-gray-300";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "available": return "default";
      case "occupied": return "destructive";
      case "reserved": return "secondary";
      case "maintenance": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Floor Plan - Ground Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              {/* Common areas */}
              <div className="absolute top-4 right-4 w-16 h-12 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                <Coffee className="h-4 w-4 text-blue-600" />
              </div>
              <div className="absolute bottom-4 right-4 w-16 h-12 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                <Printer className="h-4 w-4 text-gray-600" />
              </div>
              
              {/* Workspaces */}
              {workspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className={`absolute border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 flex items-center justify-center text-xs font-medium ${getStatusColor(workspace.status)}`}
                  style={{
                    top: workspace.position.top,
                    left: workspace.position.left,
                    width: workspace.size.width,
                    height: workspace.size.height,
                  }}
                  onClick={() => setSelectedSpace(workspace)}
                >
                  <div className="text-center">
                    <div className="font-semibold">{workspace.id}</div>
                    {workspace.capacity && (
                      <div className="flex items-center justify-center mt-1">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{workspace.capacity}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* WiFi indicators */}
              <div className="absolute top-2 left-2">
                <Wifi className="h-4 w-4 text-green-500" />
              </div>
              <div className="absolute top-2 left-1/2">
                <Wifi className="h-4 w-4 text-green-500" />
              </div>
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
                <span className="text-sm">Occupied</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded mr-2"></div>
                <span className="text-sm">Reserved</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded mr-2"></div>
                <span className="text-sm">Maintenance</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Space Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSpace ? (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="font-semibold text-lg">{selectedSpace.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {selectedSpace.id}</p>
                </div>
                
                <Badge variant={getStatusBadgeVariant(selectedSpace.status)}>
                  {selectedSpace.status.charAt(0).toUpperCase() + selectedSpace.status.slice(1)}
                </Badge>
                
                {selectedSpace.capacity && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">Capacity: {selectedSpace.capacity} people</span>
                  </div>
                )}
                
                {selectedSpace.amenities && (
                  <div>
                    <h4 className="font-medium mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedSpace.amenities.map((amenity) => (
                        <Badge key={amenity} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedSpace.status === "available" && (
                  <button className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium hover:bg-primary-dark transition-colors">
                    Book Now
                  </button>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Click on a space to view details</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FloorPlan;
