
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Phone, Mail, Calendar, TrendingUp, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Leads = () => {
  const { toast } = useToast();

  const leadStats = [
    { label: "Total Leads", value: "156", change: "+23 this week", icon: UserPlus },
    { label: "Qualified", value: "89", change: "57% conversion", icon: TrendingUp },
    { label: "Tours Scheduled", value: "34", change: "This week", icon: Calendar },
    { label: "Signed", value: "28", change: "This month", icon: Mail },
  ];

  const leads = [
    { 
      id: "1", 
      name: "Alex Rodriguez", 
      email: "alex@startup.co", 
      phone: "+1 (555) 123-4567",
      source: "Website", 
      stage: "Qualified", 
      probability: 75,
      assignedTo: "Sarah M.",
      lastContact: "2024-01-15"
    },
    { 
      id: "2", 
      name: "Jennifer Kim", 
      email: "jen@agency.com", 
      phone: "+1 (555) 987-6543",
      source: "Referral", 
      stage: "Tour", 
      probability: 85,
      assignedTo: "Mike T.",
      lastContact: "2024-01-14"
    },
    { 
      id: "3", 
      name: "David Chen", 
      email: "david@techcorp.io", 
      phone: "+1 (555) 456-7890",
      source: "Walk-in", 
      stage: "Lead", 
      probability: 35,
      assignedTo: "Lisa W.",
      lastContact: "2024-01-13"
    },
  ];

  const handleAddLead = () => {
    toast({
      title: "Add Lead",
      description: "Opening lead capture form...",
    });
    // In a real app, this would open a lead capture form modal or navigate to a form page
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Lead": return "outline";
      case "Qualified": return "secondary";
      case "Tour": return "default";
      case "Signed": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Lead Management</h1>
                <p className="text-muted-foreground">End-to-end CRM pipeline from lead capture to conversion</p>
              </div>
              <Button onClick={handleAddLead}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>

          {/* Lead Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {leadStats.map((stat) => (
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

          {/* Pipeline Overview */}
          <Card className="mb-6 animate-slide-up">
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-foreground">156</div>
                  <div className="text-sm text-muted-foreground">Leads</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-blue-600">89</div>
                  <div className="text-sm text-muted-foreground">Qualified</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-yellow-600">34</div>
                  <div className="text-sm text-muted-foreground">Tours</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-green-600">28</div>
                  <div className="text-sm text-muted-foreground">Signed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card className="animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Leads Directory</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search leads..." className="pl-10 w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {lead.email}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 mr-1" />
                            {lead.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.source}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStageColor(lead.stage)}>{lead.stage}</Badge>
                      </TableCell>
                      <TableCell>{lead.probability}%</TableCell>
                      <TableCell>{lead.assignedTo}</TableCell>
                      <TableCell>{lead.lastContact}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Call</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Leads;
