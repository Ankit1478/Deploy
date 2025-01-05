import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Github, Rocket, ExternalLink } from "lucide-react";
import { MaintenanceBanner } from "../components/maintenance-banner";

const BACKEND_UPLOAD_URL = "http://localhost:3000";

export function Landing() {
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <MaintenanceBanner />
      <main className="flex flex-col items-center justify-center min-h-screen bg-black p-4 relative overflow-hidden pt-16">
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
          }}
        />

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black" />
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[40vh] w-[40vh] rounded-full"
              style={{
                background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.${
                  i + 1
                }), transparent 70%)`,
                top: `${Math.sin(i) * 50 + 50}%`,
                left: `${Math.cos(i) * 50 + 50}%`,
                transform: `translate(-50%, -50%)`,
                animation: `float-${i} ${10 + i * 2}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>

        <div className="text-center mb-12 relative z-10 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-purple-900/20 rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
          <h1 className="relative text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-purple-600 to-purple-400 pb-2 animate-gradient-x hover:scale-[1.02] transition-transform duration-300">
            Welcome to Deployly
          </h1>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-4 animate-pulse" />
        </div>

        <Card className="w-full max-w-md backdrop-blur-xl bg-black/40 border border-purple-500/20 shadow-2xl shadow-purple-500/10 transition-all duration-500 hover:shadow-purple-500/30 hover:scale-[1.01] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              <Github className="w-6 h-6 text-purple-400" />
              Deploy your Repository
            </CardTitle>
            <CardDescription className="text-purple-300/70">
              Enter the URL of your GitHub repository to deploy it instantly
            </CardDescription>
          </CardHeader>

          <CardContent className="relative space-y-6">
            <div className="space-y-2">
              <Label htmlFor="github-url" className="text-purple-300">
                Repository URL
              </Label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-900 rounded-lg opacity-50 blur group-hover:opacity-75 transition duration-500 group-focus-within:opacity-100" />
                <Input
                  id="github-url"
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="relative bg-black/50 border-purple-500/30 text-purple-100 placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400/50 transition-all duration-300"
                />
              </div>
            </div>

            <Button
              onClick={async () => {
                setUploading(true);
                try {
                  const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
                    repoUrl: repoUrl,
                  });
                  setUploadId(res.data.id);
                  setUploading(false);
                  const interval = setInterval(async () => {
                    const response = await axios.get(
                      `${BACKEND_UPLOAD_URL}/status?id=${res.data.id}`
                    );
                    if (response.data.status === "deployed") {
                      clearInterval(interval);
                      setDeployed(true);
                    }
                  }, 3000);
                } catch (error) {
                  setUploading(false);
                }
              }}
              disabled={true}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                {uploadId ? (
                  <>
                    <Rocket className="w-4 h-4 animate-bounce" />
                    Deploying...
                  </>
                ) : uploading ? (
                  "Uploading..."
                ) : (
                  "Deploy Repository"
                )}
              </span>
            </Button>
          </CardContent>
        </Card>

        {deployed && (
          <Card className="w-full max-w-md mt-8 backdrop-blur-xl bg-black/40 border border-purple-500/20 shadow-2xl shadow-purple-500/10 transition-all duration-500 hover:shadow-purple-500/30 hover:scale-[1.01] relative overflow-hidden animate-fadeIn group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                <Rocket className="w-6 h-6 text-purple-400 animate-bounce" />
                Deployment Successful!
              </CardTitle>
              <CardDescription className="text-purple-300/70">
                Your website is now live and ready to view
              </CardDescription>
            </CardHeader>

            <CardContent className="relative space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deployed-url" className="text-purple-300">
                  Deployed URL
                </Label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-900 rounded-lg opacity-50 blur group-hover:opacity-75 transition duration-500" />
                  <Input
                    id="deployed-url"
                    readOnly
                    type="url"
                    value={`http://${uploadId}.dev.aaryanbajaj.com:3001/index.html`}
                    className="relative bg-black/50 border-purple-500/30 text-purple-100 focus:border-purple-400 focus:ring-purple-400/50 transition-all duration-300"
                  />
                </div>
              </div>

              <Button className="w-full bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 group">
                <a
                  href={`http://${uploadId}.aaryanbajaj.com/index.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full group"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}

export default Landing;
