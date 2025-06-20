import React from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormWrapper from '@/components/AuthFormWrapper'; // Custom component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Form, FormField, FormItem, FormLabel, FormControl, FormMessage are used for the form structure
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LockKeyhole } from 'lucide-react'; // Icon for the form logo

// Schema for form validation
const formSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
});

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Password reset requested for email:", values.email);
    // In a real application, you would make an API call here to send the reset link.
    // For this example, we'll simulate success with a toast message.
    toast.success("If an account with that email exists, a password reset link has been sent.");
    form.reset(); // Reset the form fields after submission
  }

  return (
    <>
      <Header />
      <AuthFormWrapper
        title="Forgot Your Password?"
        description="No problem. Enter your email address below and we'll send you a link to reset your password."
        logo={<LockKeyhole className="h-10 w-10 text-primary" />} // Using LockKeyhole as a thematic logo
        footerContent={
          <p className="text-center text-sm"> {/* AuthFormWrapper's CardFooter styles this text */}
            Remember your password?{' '}
            <Link 
              to="/" /* Path to LoginPage from App.tsx */
              className="font-medium text-primary hover:text-primary/80 hover:underline"
            >
              Sign in
            </Link>
          </p>
        }
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      </AuthFormWrapper>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;