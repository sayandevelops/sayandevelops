import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Admin Panel</CardTitle>
          <CardDescription>
            You can manage your portfolio content from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Use the navigation on the left to select a section to edit, such as "Experience".
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
