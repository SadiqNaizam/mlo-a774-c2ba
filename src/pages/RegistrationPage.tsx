import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label'; // Though shadcn FormItem implies Label, explicit import is fine (Not directly used now)
import { Checkbox } from '@/components/ui/checkbox'; // Added import for Checkbox
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LockKeyhole, Mail, KeyRound, Eye, EyeOff } from 'lucide-react'; // Icons
import { useToast } from "@/components/ui/use-toast"; // For notifications

const registrationFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password." }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the Terms of Service and Privacy Policy to create an account.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // Path of error
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log('RegistrationPage loaded');

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false, // Added default value for termsAccepted
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    console.log("Registration form submitted:", data);
    // Simulate API call
    toast({
      title: "Registration Successful!",
      description: "Your account has been created. Redirecting to login...",
    });
    setTimeout(() => {
      navigate("/"); // Navigate to LoginPage (path from App.tsx)
    }, 2000);
  };

  const logo = <LockKeyhole className="h-10 w-10 text-primary" />;

  const footerContent = (
    <p>
      Already have an account?{' '}
      <Link to="/" className="font-medium text-primary hover:underline"> {/* Path from App.tsx */}
        Log in
      </Link>
    </p>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow">
        <AuthFormWrapper
          title="Create your account"
          description="Enter your details below to get started."
          logo={logo}
          footerContent={footerContent}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" /> Email Address
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <KeyRound className="mr-2 h-4 w-4" /> Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="********" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Must be 8+ characters with uppercase, lowercase, number, and special character.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <KeyRound className="mr-2 h-4 w-4" /> Confirm Password
                    </FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="********" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          id="termsAccepted"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="termsAccepted"
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        I agree to the{' '}
                        <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                          Privacy Policy
                        </a>.
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </AuthFormWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;