"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .refine(
      (val) => val === null || z.string().email().safeParse(val).success,
      {
        message: "Invalid email address.",
      }
    ),

  phone: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .refine(
      (val) =>
        val === null ||
        z
          .string()
          .min(11, { message: "" })
          .max(11, { message: "" })
          .safeParse(val).success,
      {
        message: "Invalid phone number.",
      }
    ),

  address: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .refine(
      (val) =>
        val === null ||
        z.string().max(50, { message: "" }).safeParse(val).success,
      {
        message: "Address must be less than 50 characters.",
      }
    ),
});

export default function ClientModal() {
  const [open, setOpen] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  // });
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  // e.preventDefault();
  // setError("");
  // setLoading(true);
  // try {
  //   const response = await fetch("/api/clients", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   });
  //   if (!response.ok) {
  //     const errorData = await response.json();
  //     throw new Error(errorData.error || "Failed to create client");
  //   }
  //   setOpen(false);
  //   setFormData({ name: "", email: "", phone: "", address: "" });
  //   window.dispatchEvent(new Event("clientCreated")); // Trigger refresh
  //   console.log("Client: Client created successfully");
  // } catch (error) {
  //   // console.error("Client: Error creating client:", error);
  //   setError(error);
  // } finally {
  //   setLoading(false);
  // }
  // };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create client");
      }
      setOpen(false);
      form.reset();
      // setFormData({ name: "", email: "", phone: "", address: "" });
      window.dispatchEvent(new Event("clientCreated")); // Trigger refresh
      console.log("Client: Client created successfully");
    } catch (error) {
      // console.error("Client: Error creating client:", error);
      // setError(error);
    } finally {
      setLoading(false);
    }
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 w-4 h-4" />
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>Enter client details below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@example.com"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="03001234567"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ABC st 123 Multan, Pakistan"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Client"
              )}
            </Button>
          </form>
        </Form>

        {/* <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              // required
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              // required
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Client"
            )}
          </Button>
        </form> */}
      </DialogContent>
    </Dialog>
  );
}
