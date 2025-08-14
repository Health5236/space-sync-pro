
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Mail, Phone, Building2, Plus, Search, Filter, TrendingUp, Users, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LeadForm from "@/components/forms/LeadForm";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const Leads = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterInterest, setFilterInterest] = useState("all");
  const [leads, setLeads] = useState([
    {
      id: "1",
      name: "Alice Cooper",
      email: "alice@techcorp.com",
      phone: "+91 99887 76543",
      company: "TechCorp Solutions",
      source: "Website",
      interest: "High",
      budget: "₹15,000 - ₹30,000/month",
      status: "new",
      createdDate: "2024-01-15",
      avatar: "",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@startup.io",
      phone: "+91 88776 65432",
      company: "Startup Inc",
      source: "Referral",
      interest: "Medium",
      budget: "₹5,000 - ₹15,000/month",
      status: "contacted",
      createdDate: "2024-01-12",
      avatar: "",
    },
    {
      id: "3",
      name: "Carol Williams",
      email: "carol@freelance.com",
      phone: "+91 77665 54321",
      company: "Freelance Designer",
      source: "Social Media",
      interest: "High",
      budget: "₹0 - ₹5,000/month",
      status: "qualified",
      createdDate: "2024-01-10",
      avatar: "",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "contacted": return "secondary";
      case "qualified": return "outline";
      case "converted": return "default";
      case "lost": return "destructive";
      default: return "outline";
    }
  };

  const getInterestColor = (interest: string) => {
    switch (interest) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    const matchesInterest = filterInterest === "all" || lead.interest === filterInterest;
    
    return matchesSearch && matchesStatus && matchesInterest;
  });

  const handleAddLead = (leadData: any) => {
    const newLead = {
      id: (leads.length + 1).toString(),
      name: `${leadData.firstName} ${leadData.lastName}`,
      email: leadData.email,
      phone: leadData.phone,
      company: leadData.company,
      source: leadData.source,
      interest: leadData.interest,
      budget: leadData.budget,
      status: "new",
      createdDate: new Date().toISOString().split('T')[0],
      avatar: "",
    };
    
    setLeads(prevLeads => [newLead, ...prevLeads]);
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
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600 mt-1">Manage potential customers and track conversions</p>
              </div>
              <Button 
                onClick={() => setShowLeadForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Lead
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterInterest} onValueChange={setFilterInterest}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Interest</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

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
                      <p className="text-sm font-medium text-gray-600">Total Leads</p>
                      <p className="text-2xl font-bold">{leads.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New This Week</p>
                      <p className="text-2xl font-bold">{leads.filter(l => l.status === 'new').length}</p>
                    </div>
                    <UserPlus className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                      <p className="text-2xl font-bold">
                        {Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) || 0}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">High Interest</p>
                      <p className="text-2xl font-bold">{leads.filter(l => l.interest === 'High').length}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leads List */}
            <Card>
              <CardHeader>
                <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={lead.avatar} />
                          <AvatarFallback>
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{lead.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {lead.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {lead.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {lead.company}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">Source: {lead.source}</span>
                            <span className="text-xs text-gray-500">Budget: {lead.budget}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInterestColor(lead.interest)}`}>
                          {lead.interest}
                        </span>
                        <span className="text-sm text-gray-500">
                          {lead.createdDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <LeadForm 
            open={showLeadForm} 
            onOpenChange={setShowLeadForm}
            onLeadAdded={handleAddLead}
          />
        </main>
      </div>
    </div>
  );
};

export default Leads;
