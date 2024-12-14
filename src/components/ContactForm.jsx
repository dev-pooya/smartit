import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const API_BASE_URL = "https://api.smartitgroups.com";

function ContactForm() {
  const [responseMessage, setResponseMessage] = useState(null);

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return !responseMessage ? (
    <form onSubmit={submit} class="px-5 md:px-0 flex flex-col gap-5">
      <div class="flex gap-3">
        <Input placeholder="نام و نام خانوادگی" name="name" />
        <Input placeholder="09XX XXX XXXX" type="tel" name="phone" />
        <Input name="service" value="contact-page" type="hidden" hidden />
      </div>
      <Textarea placeholder="پیام خود را بنویسید" rows={7} name="description" />
      <Button className="w-full" type="submit">
        ارسال
      </Button>
    </form>
  ) : (
    <div class="flex gap-2 flex-col items-center py-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={96}
        height={96}
        viewBox="0 0 24 24"
        class="text-green-500"
      >
        <path
          fill="currentColor"
          d="M19 19H5V5h10V3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8h-2m-11.09-.92L6.5 11.5L11 16L21 6l-1.41-1.42L11 13.17z"
        ></path>
      </svg>
      <span class="font-medium">اطلاعات شما با موفقیت ثبت شد </span>
    </div>
  );
}

export default ContactForm;
