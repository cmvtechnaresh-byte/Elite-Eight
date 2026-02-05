import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Mail, Trash2, Download } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  date: string;
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@techsolutions.com",
    company: "Tech Solutions Pvt Ltd",
    service: "Corporate Training",
    message: "We're looking for a comprehensive sales training program for our team of 50 people. Would like to discuss customized options.",
    status: "new",
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@globalfinance.com",
    company: "Global Finance Corp",
    service: "Compliance Training",
    message: "Need to conduct a PoSH workshop for our organization. Please share details about the program duration and certification.",
    status: "contacted",
    date: "2024-01-14",
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit@startup.io",
    company: "StartUp Innovations",
    service: "Recruitment",
    message: "Looking for help setting up our HR department. We're a team of 30 and need proper HR processes.",
    status: "resolved",
    date: "2024-01-12",
  },
  {
    id: "4",
    name: "Neha Singh",
    email: "neha@manufacturing.com",
    company: "Manufacturing Ltd",
    service: "Organizational Development",
    message: "Interested in organizational development consulting for our 200+ employee company.",
    status: "new",
    date: "2024-01-11",
  },
  {
    id: "5",
    name: "Vikram Joshi",
    email: "vikram@enterprise.com",
    company: "Enterprise Solutions",
    service: "Corporate Training",
    message: "We need behavioral training for our management team. Please share program details and availability.",
    status: "new",
    date: "2024-01-10",
  },
];

const statusColors = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, status: Submission["status"]) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const deleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Company", "Service", "Message", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredSubmissions.map((s) =>
        [s.name, s.email, s.company, s.service, `"${s.message}"`, s.status, s.date].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact-submissions.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contact Submissions</h1>
          <p className="text-muted-foreground">Manage inquiries from the contact form</p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {submissions.filter((s) => s.status === "new").length}
            </div>
            <p className="text-sm text-muted-foreground">New Submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {submissions.filter((s) => s.status === "contacted").length}
            </div>
            <p className="text-sm text-muted-foreground">Contacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {submissions.filter((s) => s.status === "resolved").length}
            </div>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
          <CardDescription>View and manage contact form submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{submission.name}</p>
                        <p className="text-sm text-muted-foreground">{submission.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{submission.company}</TableCell>
                    <TableCell>{submission.service}</TableCell>
                    <TableCell>
                      <Select
                        value={submission.status}
                        onValueChange={(value) =>
                          updateStatus(submission.id, value as Submission["status"])
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <Badge className={statusColors[submission.status]}>
                            {submission.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{submission.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setIsViewOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(`mailto:${submission.email}`)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteSubmission(submission.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedSubmission?.date}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedSubmission.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedSubmission.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{selectedSubmission.company}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-medium">{selectedSubmission.service}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <p className="bg-muted p-4 rounded-lg">{selectedSubmission.message}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => window.open(`mailto:${selectedSubmission.email}`)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reply via Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    updateStatus(selectedSubmission.id, "contacted");
                    setIsViewOpen(false);
                  }}
                >
                  Mark as Contacted
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactSubmissions;
