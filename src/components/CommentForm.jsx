import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { API_BASE_URL } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "نام باید حداقل ۲ کاراکتر باشد.",
  }),
  email: z
    .string()
    .min(2, { message: "ایمیل الزامی است" })
    .email("یک ایمسل معتبر وارد کنید."),
  message: z
    .string()
    .min(3, { message: "نوشتن دیدگاه الزامی میباشد" })
    .refine((value) => !/https?:\/\/|www\./i.test(value), {
      message: "ارسال لینک مجاز نیست.",
    }),
});

export function CommentForm({ blogId }) {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      post_id: blogId,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const response = await fetch(`${API_BASE_URL}/api/comments`, {
      method: "POST",
      body: JSON.stringify({ ...values, post_id: blogId }),
      headers: {
        "Content-Type": "applicatioon/json",
        Accept: "applicatioon/json",
      },
    }).then((res) => res.json());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mb-8">
        <div className="md:flex md:gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <Input placeholder="نام" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>دیدگاه شما</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          ثبت دیدگاه
        </Button>
      </form>
    </Form>
  );
}
