"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Courses Management</h1>
        <p className="text-muted-foreground">
          Manage your gym courses and related content here.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-dark-secondary border-brand/30">
          <CardHeader>
            <CardTitle className="text-white">Courses Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              This section will contain all your gym courses. You can add, edit, and manage courses here.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary border-brand/30">
          <CardHeader>
            <CardTitle className="text-white">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Course enrollment statistics and other metrics will be displayed here.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-secondary border-brand/30">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Recent course-related activity will be shown here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}