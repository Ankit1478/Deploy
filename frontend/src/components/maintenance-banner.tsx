import { AlertCircle } from "lucide-react";

export function MaintenanceBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-fadeIn">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-purple-600/20 to-purple-900/20 blur-xl" />
        <div className="relative bg-black/80 border-b border-purple-500/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5 text-purple-400 animate-pulse" />
              <p className="text-purple-200 text-sm font-medium">
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Maintenance Notice:
                </span>{" "}
                EC2 servers are currently paused, Deployments will resume
                shortly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
