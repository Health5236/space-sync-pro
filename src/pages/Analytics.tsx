import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Building, DollarSign, Download, FileText, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const Analytics = () => {
  const { toast } = useToast();

  // Mock data for charts
  const occupancyData = [
    { month: "Jan", occupancy: 75, revenue: 285000 },
    { month: "Feb", occupancy: 82, revenue: 320000 },
    { month: "Mar", occupancy: 78, revenue: 298000 },
    { month: "Apr", occupancy: 88, revenue: 385000 },
    { month: "May", occupancy: 85, revenue: 370000 },
    { month: "Jun", occupancy: 92, revenue: 420000 },
  ];

  const spaceUtilizationData = [
    { name: "Meeting Rooms", value: 35, color: "#8884d8" },
    { name: "Hot Desks", value: 25, color: "#82ca9d" },
    { name: "Private Offices", value: 20, color: "#ffc658" },
    { name: "Co-working", value: 20, color: "#ff7300" },
  ];

  const membershipData = [
    { plan: "Basic", members: 120, revenue: 240000 },
    { plan: "Premium", members: 85, revenue: 340000 },
    { plan: "Enterprise", members: 45, revenue: 360000 },
    { plan: "Day Pass", members: 200, revenue: 100000 },
  ];

  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Generating comprehensive analytics report...",
    });
    
    // Create and download CSV
    const csvData = [
      ["Month", "Occupancy %", "Revenue"],
      ...occupancyData.map(item => [item.month, item.occupancy, item.revenue])
    ];
    
    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    setTimeout(() => {
      toast({
        title: "Report Downloaded",
        description: "Analytics report has been generated and downloaded successfully.",
      });
    }, 1000);
  };

  const handleScenarioPlanning = () => {
    toast({
      title: "Scenario Planning",
      description: "Opening scenario planning tool...",
    });
    
    // Simulate scenario analysis
    setTimeout(() => {
      const scenarios = [
        "15% growth in next quarter based on current trends",
        "Optimistic scenario: 25% growth with new marketing campaign",
        "Conservative scenario: 8% growth with current resources"
      ];
      
      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      
      toast({
        title: "Scenario Analysis Complete",
        description: `Projection: ${randomScenario}`,
      });
    }, 1500);
  };

  const handleSpecificReport = (reportType: string) => {
    toast({
      title: "Report Generation Started",
      description: `Generating ${reportType}...`,
    });

    let reportData: any[] = [];
    let filename = "";

    switch (reportType) {
      case "Monthly Occupancy Report":
        reportData = [
          ["Month", "Occupancy Rate", "Available Spaces", "Occupied Spaces"],
          ["January", "75%", "100", "75"],
          ["February", "82%", "100", "82"],
          ["March", "78%", "100", "78"],
          ["April", "88%", "100", "88"],
          ["May", "85%", "100", "85"],
          ["June", "92%", "100", "92"]
        ];
        filename = "monthly-occupancy-report";
        break;
      case "Revenue Analysis Report":
        reportData = [
          ["Plan", "Members", "Revenue", "Growth"],
          ["Basic", "120", "₹240,000", "+5%"],
          ["Premium", "85", "₹340,000", "+12%"],
          ["Enterprise", "45", "₹360,000", "+8%"],
          ["Day Pass", "200", "₹100,000", "+15%"]
        ];
        filename = "revenue-analysis-report";
        break;
      case "Member Activity Report":
        reportData = [
          ["Member", "Check-ins", "Hours", "Plan"],
          ["John Doe", "25", "180", "Premium"],
          ["Sarah Johnson", "22", "165", "Basic"],
          ["Mike Wilson", "15", "120", "Day Pass"],
          ["Alice Cooper", "30", "220", "Enterprise"]
        ];
        filename = "member-activity-report";
        break;
      case "Space Utilization Report":
        reportData = [
          ["Space Type", "Utilization %", "Peak Hours", "Revenue"],
          ["Meeting Rooms", "95%", "2-4 PM", "₹150,000"],
          ["Hot Desks", "78%", "9-11 AM", "₹80,000"],
          ["Private Offices", "65%", "10-12 PM", "₹200,000"],
          ["Co-working", "88%", "All Day", "₹120,000"]
        ];
        filename = "space-utilization-report";
        break;
    }

    // Generate and download CSV
    setTimeout(() => {
      const csvContent = reportData.map(row => row.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Report Ready",
        description: `${reportType} has been generated and downloaded successfully.`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleExportReport}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
                <Button 
                  onClick={handleScenarioPlanning}
                  className="flex items-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  Scenario Planning
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold">₹42,85,750</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      ↑ +12.5%
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                      <p className="text-2xl font-bold">87%</p>
                    </div>
                    <Building className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                      ↑ +5.2%
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Members</p>
                      <p className="text-2xl font-bold">450</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <Badge variant="default" className="bg-purple-100 text-purple-800">
                      ↑ +8.3%
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                      <p className="text-2xl font-bold">15.2%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <Badge variant="default" className="bg-orange-100 text-orange-800">
                      ↑ +2.1%
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Occupancy Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Occupancy & Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={occupancyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        formatter={(value: any, name: string) => {
                          if (name === 'revenue') {
                            return [`₹${(value as number).toLocaleString()}`, 'Revenue'];
                          }
                          return [`${value}%`, 'Occupancy'];
                        }}
                      />
                      <Bar yAxisId="right" dataKey="revenue" fill="#8884d8" opacity={0.3} />
                      <Line yAxisId="left" type="monotone" dataKey="occupancy" stroke="#8884d8" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Space Utilization */}
              <Card>
                <CardHeader>
                  <CardTitle>Space Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={spaceUtilizationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {spaceUtilizationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [`${value}%`, 'Utilization']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {spaceUtilizationData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Membership Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Membership Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={membershipData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="plan" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'revenue') {
                          return [`₹${(value as number).toLocaleString()}`, 'Revenue'];
                        }
                        return [value as number, 'Members'];
                      }}
                    />
                    <Bar yAxisId="left" dataKey="members" fill="#82ca9d" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Reports & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSpecificReport("Monthly Occupancy Report")}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Monthly Occupancy Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSpecificReport("Revenue Analysis Report")}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Revenue Analysis Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSpecificReport("Member Activity Report")}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Member Activity Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleSpecificReport("Space Utilization Report")}
                    >
                      <Building className="h-4 w-4 mr-2" />
                      Space Utilization Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Peak Performance</h4>
                      <p className="text-sm text-green-600">Meeting rooms achieve 95% utilization during 2-4 PM</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Growth Opportunity</h4>
                      <p className="text-sm text-blue-600">Hot desk demand increased by 23% this quarter</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800">Optimization Needed</h4>
                      <p className="text-sm text-yellow-600">Private offices show 15% lower utilization</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Revenue Impact</h4>
                      <p className="text-sm text-purple-600">Premium memberships contribute 68% of total revenue</p>
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

export default Analytics;
