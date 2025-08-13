
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, CreditCard, Calendar, Search } from "lucide-react";

const Members = () => {
  const memberStats = [
    { label: "Total Members", value: "324", change: "+12 this week", icon: Users },
    { label: "New This Month", value: "28", change: "+15.3% vs last month", icon: UserPlus },
    { label: "Active Today", value: "156", change: "Currently in space", icon: Calendar },
    { label: "Premium Plans", value: "89", change: "27% of members", icon: CreditCard },
  ];

  const members = [
    { id: "1", name: "John Smith", email: "john@company.com", plan: "Premium", joinDate: "2024-01-15", status: "Active", credits: 45 },
    { id: "2", name: "Sarah Johnson", email: "sarah@startup.io", plan: "Basic", joinDate: "2024-02-20", status: "Active", credits: 12 },
    { id: "3", name: "Mike Chen", email: "mike@techcorp.com", plan: "Enterprise", joinDate: "2024-01-08", status: "Active", credits: 120 },
    { id: "4", name: "Lisa Williams", email: "lisa@agency.com", plan: "Premium", joinDate: "2024-03-01", status: "Pending", credits: 30 },
  ];

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Member Management</h1>
                <p className="text-muted-foreground">Manage member profiles, plans, and access</p>
              </div>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>

          {/* Member Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {memberStats.map((stat) => (
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

          {/* Members Table */}
          <Card className="animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Members Directory</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search members..." className="pl-10 w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Badge variant={member.plan === "Enterprise" ? "default" : member.plan === "Premium" ? "secondary" : "outline"}>
                          {member.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.joinDate}</TableCell>
                      <TableCell>{member.credits}</TableCell>
                      <TableCell>
                        <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
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

export default Members;
