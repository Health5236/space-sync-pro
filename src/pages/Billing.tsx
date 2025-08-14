
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Search, Filter, Download, DollarSign, CreditCard, Calendar, TrendingUp, Send, Eye, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import InvoiceForm from "@/components/forms/InvoiceForm";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useToast } from "@/hooks/use-toast";

const Billing = () => {
  const { toast } = useToast();
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const mockInvoices = [
    {
      id: "INV-001",
      clientName: "TechCorp Solutions",
      amount: "₹25,000",
      status: "paid",
      dueDate: "2024-01-30",
      issueDate: "2024-01-15",
      items: ["Premium Membership", "Meeting Room Usage"],
    },
    {
      id: "INV-002",
      clientName: "Startup Inc",
      amount: "₹15,500",
      status: "pending",
      dueDate: "2024-02-05",
      issueDate: "2024-01-20",
      items: ["Basic Membership", "Hot Desk"],
    },
    {
      id: "INV-003",  
      clientName: "Freelance Designer",
      amount: "₹8,750",
      status: "overdue",
      dueDate: "2024-01-25",
      issueDate: "2024-01-10",
      items: ["Day Pass", "Conference Room"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "default";
      case "pending": return "secondary";
      case "overdue": return "destructive";
      case "draft": return "outline";
      default: return "outline";
    }
  };

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "" || invoice.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleInvoiceAction = (action: string, invoiceId: string) => {
    toast({
      title: `${action} Invoice`,
      description: `${action} action for invoice ${invoiceId} has been processed.`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${action} action applied to selected invoices.`,
    });
  };

  const handlePaymentSetup = () => {
    toast({
      title: "Payment Settings",
      description: "Opening payment gateway configuration...",
    });
  };

  const handleAutoReminder = () => {
    toast({
      title: "Auto Reminders",
      description: "Setting up automatic payment reminders...",
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
                <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
                <p className="text-gray-600 mt-1">Manage invoices, payments and billing</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleBulkAction("Send Reminders")}>
                  Send Reminders
                </Button>
                <Button 
                  onClick={() => setShowInvoiceForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Generate Invoice
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => handleBulkAction("Export")} className="flex items-center gap-2">
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
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold">₹4,28,750</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+12.5% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Outstanding</p>
                      <p className="text-2xl font-bold">₹67,250</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">15 pending invoices</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-2xl font-bold">₹89,500</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">23 invoices generated</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                      <p className="text-2xl font-bold">94%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+2% improvement</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Invoices */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Invoices ({filteredInvoices.length})</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("Mark as Sent")}>
                      Bulk Actions
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{invoice.id}</h3>
                            <Badge variant={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{invoice.clientName}</p>
                          <p className="text-xs text-gray-500">
                            Items: {invoice.items.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-semibold">{invoice.amount}</p>
                          <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
                          <p className="text-xs text-gray-400">Issued: {invoice.issueDate}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleInvoiceAction("View", invoice.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleInvoiceAction("Send", invoice.id)}>
                              <Send className="h-4 w-4 mr-2" />
                              Send Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleInvoiceAction("Download", invoice.id)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleInvoiceAction("Mark as Paid", invoice.id)}>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Mark as Paid
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded">
                          <CreditCard className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">UPI Payments</p>
                          <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</p>
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded">
                          <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Bank Transfer</p>
                          <p className="text-sm text-gray-500">NEFT, RTGS, IMPS</p>
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded">
                          <CreditCard className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Credit/Debit Cards</p>
                          <p className="text-sm text-gray-500">Visa, MasterCard, RuPay</p>
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4" onClick={handlePaymentSetup}>
                      Configure Payment Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setShowInvoiceForm(true)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Create Quote
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleBulkAction("Download Reports")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Reports
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handlePaymentSetup}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleAutoReminder}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Reminders
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleBulkAction("Generate Report")}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Financial Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <InvoiceForm 
            open={showInvoiceForm} 
            onOpenChange={setShowInvoiceForm} 
          />
        </main>
      </div>
    </div>
  );
};

export default Billing;
