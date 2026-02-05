import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EMSManager = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Employee Management System</h1>
        <p className="text-muted-foreground">Manage employee records and details.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>EMS Dashboard</CardTitle>
          <CardDescription>Welcome to the EMS module.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>EMS functionality coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EMSManager;