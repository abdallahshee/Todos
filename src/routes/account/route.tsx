import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button, Card } from "react-bootstrap";

export const Route = createFileRoute("/account")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-3/5">image logo here</div>
      <div className="lg:w-2/5 p-4">
        <Card className="p-4 bg-gray-600">
          <div className="row mb-2">
            <h1>image will be here</h1>
          </div>
          <Outlet />
        </Card>
      </div>
    </div>
  );
}
