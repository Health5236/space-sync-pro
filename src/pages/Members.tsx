import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, Mail, Phone, Building2, Plus, Search, Filter, Download, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import MemberForm from "@/components/forms/MemberForm";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useToast } from "@/hooks/use-toast";

const Members = () => {
  const { toast } = useToast();
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const mockMembers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      company: "Tech Solutions Inc",
      plan: "Premium",
      status: "active",
      joinDate: "2024-01-15",
      avatar: "",
      credits: 120,
      lastVisit: "2024-01-20"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@startup.com",
      phone: "+91 87654 32109",
      company: "Startup Ventures",
      plan: "Basic",
      status: "active",
      joinDate: "2024-01-10",
      avatar: "",
      credits: 45,
      lastVisit: "2024-01-19"
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@freelance.com",
      phone: "+91 76543 21098",
      company: "Freelance",
      plan: "Day Pass",
      status: "inactive",
      joinDate: "2024-01-05",
      avatar: "",
      credits: 5,
      lastVisit: "2024-01-15"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "inactive": return "secondary";
      case "suspended": return "destructive";
      default: return "outline";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Premium": return "bg-purple-100 text-purple-800";
      case "Basic": return "bg-blue-100 text-blue-800";
      case "Enterprise": return "bg-green-100 text-green-800";
      case "Day Pass": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlan = filterPlan === "all" || member.plan === filterPlan;
    const matchesStatus = filterStatus === "all" || member.status === filterStatus;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Member data is being exported to CSV...",
    });
  };

  const handleMemberAction = (action: string, memberName: string) => {
    toast({
      title: `${action} Member`,
      description: `${action} action for ${memberName} has been processed.`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${action} action applied to selected members.`,
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
                <h1 className="text-3xl font-bold text-gray-900">Members</h1>
                <p className="text-gray-600 mt-1">Manage workspace members and memberships</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleBulkAction("Import")}>
                  Import Members
                </Button>
                <Button 
                  onClick={() => setShowMemberForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Member
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterPlan} onValueChange={setFilterPlan}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="Day Pass">Day Pass</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
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
                      <p className="text-sm font-medium text-gray-600">Total Members</p>
                      <p className="text-2xl font-bold">324</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+12 this month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Members</p>
                      <p className="text-2xl font-bold">298</p>
                    </div>
                    <UserPlus className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">92% retention rate</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New This Month</p>
                      <p className="text-2xl font-bold">42</p>
                    </div>
                    <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xl">+</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+15% growth</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue (MTD)</p>
                      <p className="text-2xl font-bold">₹4,28,750</p>
                    </div>
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-bold">₹</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+8% vs last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Members List */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>All Members ({filteredMembers.length})</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("Send Welcome Email")}>
                      Bulk Actions
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {member.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {member.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {member.company}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <span>Credits: {member.credits}</span>
                            <span>•</span>
                            <span>Last visit: {member.lastVisit}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(member.plan)}`}>
                          {member.plan}
                        </span>
                        <span className="text-sm text-gray-500">
                          Joined {member.joinDate}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleMemberAction("Edit", member.name)}>
                              Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMemberAction("Send Email", member.name)}>
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMemberAction("View History", member.name)}>
                              View History
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMemberAction("Suspend", member.name)}>
                              Suspend Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <MemberForm 
            open={showMemberForm} 
            onOpenChange={setShowMemberForm} 
          />
        </main>
      </div>
    </div>
  );
};

export default Members;
