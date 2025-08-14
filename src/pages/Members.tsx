
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, Mail, Phone, Building2, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import MemberForm from "@/components/forms/MemberForm";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const Members = () => {
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.company.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-3xl font-bold text-gray-900">Members</h1>
                <p className="text-gray-600 mt-1">Manage workspace members and memberships</p>
              </div>
              <Button 
                onClick={() => setShowMemberForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
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
                      <p className="text-sm font-medium text-gray-600">Total Members</p>
                      <p className="text-2xl font-bold">324</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
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
                </CardContent>
              </Card>
            </div>

            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle>All Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
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
