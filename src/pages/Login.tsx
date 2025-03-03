
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { LogIn, Store } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";

// This is a mock authentication function
// In a real application, this would connect to your backend
const mockAuth = (email: string, password: string): Promise<{ success: boolean; role?: 'user' | 'admin' }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes only
      if (email === "admin@freshmart.com" && password === "admin123") {
        resolve({ success: true, role: 'admin' });
      } else if (email === "user@freshmart.com" && password === "user123") {
        resolve({ success: true, role: 'user' });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/");

  useEffect(() => {
    // Check if we have a redirect destination in the URL query params
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await mockAuth(email, password);
      
      if (result.success) {
        // In a real app, you would store user info in a context or state management solution
        localStorage.setItem("userRole", result.role || "user");
        localStorage.setItem("isLoggedIn", "true");
        
        toast.success(`Logged in successfully as ${result.role}`);
        navigate(redirectUrl);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("Authentication failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Store className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to FreshMart</CardTitle>
            <CardDescription>
              Sign in to your account to start shopping
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@freshmart.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Demo Credentials:</p>
                <p>Admin: admin@freshmart.com / admin123</p>
                <p>User: user@freshmart.com / user123</p>
              </div>
            </CardContent>
            
            <CardFooter>
              <ButtonCustom
                type="submit"
                className="w-full"
                variant="premium"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </>
                )}
              </ButtonCustom>
            </CardFooter>
          </form>
          
          <div className="px-6 pb-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <a href="#" className="text-primary hover:underline">
              Sign up
            </a>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};

export default Login;
