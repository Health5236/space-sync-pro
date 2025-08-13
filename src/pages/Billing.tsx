
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, CreditCard, FileText, AlertTriangle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Billing = () => {
  const { toast } = useToast();

  const billingStats = [
    { label: "Monthly Revenue", value: "₹28,75,000", change: "+15.3% vs last month", icon: DollarSign },
    { label: "Outstanding", value: "₹3,24,000", change: "12 invoices", icon: AlertTriangle },
    { label: "Processed", value: "₹1,56,89,000", change: "This month", icon: CreditCard },
    { label: "Growth Rate", value: "23.5%", change: "Year over year", icon: TrendingUp },
  ];

  const recentInvoices = [
    { 
      id: "INV-001", 
      member: "TechCorp Inc.", 
      amount: "₹1,29,900", 
      dueDate: "2024-02-15", 
      status: "Paid", 
      plan: "Enterprise" 
    },
    { 
      id: "INV-002", 
      member: "Startup Agency", 
      amount: "₹59,900", 
      dueDate: "2024-02-20", 
      status: "Pending", 
      plan: "Premium" 
    },
    { 
      id: "INV-003", 
      member: "Design Studio", 
      amount: "₹29,900", 
      dueDate: "2024-02-18", 
      status: "Overdue", 
      plan: "Basic" 
    },
    { 
      id: "INV-004", 
      member: "Marketing Co.", 
      amount: "₹89,900", 
      dueDate: "2024-02-25", 
      status: "Paid", 
      plan: "Premium" 
    },
  ];

  const handleGenerateInvoice = () => {
    toast({
      title: "Invoice Generated",
      description: "New invoice has been created successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "default";
      case "Pending": return "secondary";
      case "Overdue": return "destructive";
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
                <h1 className="text-3xl font-bold text-foreground">Billing & Payments</h1>
                <p className="text-muted-foreground">Automated billing with plan management and payment tracking</p>
              </div>
              <Button onClick={handleGenerateInvoice}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Invoice
              </Button>
            </div>
          </div>

          {/* Billing Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {billingStats.map((stat) => (
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
            {/* Recent Invoices */}
            <div className="lg:col-span-2">
              <Card className="animate-slide-up">
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{invoice.member}</div>
                              <div className="text-sm text-muted-foreground">{invoice.plan}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">{invoice.amount}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods & Plans */}
            <div className="space-y-6">
              <Card className="animate-slide-up">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-3" />
                        <div>
                          <p className="font-medium">Credit Card</p>
                          <p className="text-sm text-muted-foreground">**** 4242</p>
                        </div>
                      </div>
                      <Badge>Primary</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-slide-up">
                <CardHeader>
                  <CardTitle>Plan Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Enterprise</span>
                      <span className="font-semibold">42 members</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Premium</span>
                      <span className="font-semibold">89 members</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Basic</span>
                      <span className="font-semibold">156 members</span>
                    </div>
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

export default Billing;
