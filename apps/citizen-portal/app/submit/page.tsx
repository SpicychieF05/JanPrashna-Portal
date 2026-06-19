"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar, Button, Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, Input, Label, Textarea, Checkbox, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@janprashna/ui";
import { Footer } from "../../components/footer";
import Link from "next/link";

const formSchema = z.object({
  age: z.string().min(1, "Age is required"),
  occupation: z.string().min(1, "Occupation is required"),
  district: z.string().min(1, "District is required"),
  areaType: z.enum(["rural", "urban"], { required_error: "Please select Rural or Urban" }),
  // Rural fields
  subdivision: z.string().optional(),
  block: z.string().optional(),
  gramPanchayat: z.string().optional(),
  // Urban fields
  municipality: z.string().optional(),
  ward: z.string().optional(),
  // Common location fields
  policeStation: z.string().min(1, "Police Station is required"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  // Question fields
  questionLanguage: z.string().min(1, "Language is required"),
  question: z.string().min(10, "Question must be at least 10 characters long").max(1000, "Question too long"),
  consent: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      areaType: "rural",
      consent: false,
    },
    mode: "onChange",
  });

  const areaType = form.watch("areaType");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) {
      fieldsToValidate = ["age", "occupation", "district", "areaType", "policeStation", "pincode"];
      if (areaType === "rural") fieldsToValidate.push("subdivision", "block", "gramPanchayat");
      if (areaType === "urban") fieldsToValidate.push("municipality", "ward");
    } else if (step === 2) {
      fieldsToValidate = ["questionLanguage", "question"];
    }

    const isStepValid = await form.trigger(fieldsToValidate);
    if (isStepValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg text-center py-12">
            <div className="mx-auto w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4">Submission Successful</h2>
            <p className="text-muted-foreground font-sans mb-8">
              Your question has been securely recorded. Our AI engine will analyze and summarize it for government officials.
            </p>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-12 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold">Submit a Question</h1>
          <p className="text-muted-foreground font-sans">Share your governance-related query securely.</p>
          
          <div className="flex items-center gap-2 mt-6">
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2 font-ui font-medium">
            <span>Location</span>
            <span>Question</span>
            <span>Review</span>
          </div>
        </div>

        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="pt-6">
                
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-display font-semibold border-b pb-2">Personal & Location Details</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="age" render={({ field }) => (
                        <FormItem><FormLabel>Age</FormLabel><FormControl><Input placeholder="e.g. 35" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="occupation" render={({ field }) => (
                        <FormItem><FormLabel>Occupation</FormLabel><FormControl><Input placeholder="e.g. Farmer, Teacher" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="district" render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="darjeeling">Darjeeling</SelectItem>
                              <SelectItem value="kolkata">Kolkata</SelectItem>
                              <SelectItem value="howrah">Howrah</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="areaType" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select Area Type" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="rural">Rural</SelectItem>
                              <SelectItem value="urban">Urban</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    {areaType === "rural" ? (
                      <div className="grid md:grid-cols-3 gap-4 p-4 bg-paper rounded-lg border border-border/50">
                        <FormField control={form.control} name="subdivision" render={({ field }) => (
                          <FormItem><FormLabel>Subdivision</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="block" render={({ field }) => (
                          <FormItem><FormLabel>Block</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="gramPanchayat" render={({ field }) => (
                          <FormItem><FormLabel>Gram Panchayat</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4 p-4 bg-paper rounded-lg border border-border/50">
                        <FormField control={form.control} name="municipality" render={({ field }) => (
                          <FormItem><FormLabel>Municipality / Corp</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="ward" render={({ field }) => (
                          <FormItem><FormLabel>Ward Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="policeStation" render={({ field }) => (
                        <FormItem><FormLabel>Police Station</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="pincode" render={({ field }) => (
                        <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input maxLength={6} {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-display font-semibold border-b pb-2">Your Question</h2>
                    <FormField control={form.control} name="questionLanguage" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select Language" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="bengali">Bengali</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="question" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe your question regarding government services, schemes, etc." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-display font-semibold border-b pb-2">Review & Submit</h2>
                    
                    <div className="bg-paper p-6 rounded-lg space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground font-ui">Question:</p>
                        <p className="font-sans mt-1">{form.getValues("question")}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-border/50">
                        <div>
                          <p className="text-muted-foreground font-ui">Location:</p>
                          <p className="font-medium">{form.getValues("district")}, {form.getValues("areaType")}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-ui">Language:</p>
                          <p className="font-medium capitalize">{form.getValues("questionLanguage")}</p>
                        </div>
                      </div>
                    </div>

                    <FormField control={form.control} name="consent" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I consent to submitting this question.</FormLabel>
                          <FormDescription>
                            I understand this is for intelligence gathering and not a grievance portal. No personal tracking is maintained.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>Back</Button>
                ) : <div />}
                
                {step < 3 ? (
                  <Button type="button" onClick={nextStep}>Next Step</Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Securely"}
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
