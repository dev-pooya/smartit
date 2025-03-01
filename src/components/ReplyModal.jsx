import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

function ReplyModal({ comment }) {
  // form send status
  const [res, setRes] = useState(null);
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const response = await fetch(
      `${API_BASE_URL}/api/comments/${comment.id}/reply`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "applicatioon/json",
          Accept: "applicatioon/json",
        },
      }
    ).then((res) => setRes(res.status));
  }

  useEffect(() => {
    if (res === 200) {
      form.reset();
    }
    setTimeout(() => setRes(null), 2000);
  }, [res]);

  return (
    <Drawer>
      <DrawerTrigger> پاسخ</DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mb-8 "
          >
            <DrawerHeader>
              <DrawerTitle className="pt-4">پاسخ به {comment.name}</DrawerTitle>
            </DrawerHeader>

            <div className="px-4">
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

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>پاسخ شما</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DrawerFooter className="spacing-y-5">
              {res === 200 ? (
                <span className="text-center bg-green-700 p-3 my-2 rounded">
                  پاسخ شما ثبت شد{" "}
                </span>
              ) : (
                <Button>ارسال پاسخ</Button>
              )}

              <DrawerClose>
                <Button className="w-full" variant="outline">
                  انصراف
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}

export default ReplyModal;
