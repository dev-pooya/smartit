import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { servicesCard } from "@/content/services/servicesCard";
import { Label } from "./ui/label";

const API_BASE_URL = "https://api.smartitgroups.com";

function OrderDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to check if the query parameter is present
  const checkQueryParam = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("drawer") === "open";
  };
  // Watch for changes to the query parameter
  useEffect(() => {
    const updateState = () => setIsOpen(checkQueryParam());
    updateState();

    // Update state when the query parameter changes
    const onPopState = () => updateState();
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Function to close the drawer
  const closeDrawer = () => {
    setIsOpen(false);
    setResponseMessage(null);

    // Remove the query parameter
    const params = new URLSearchParams(window.location.search);
    params.delete("drawer");
    window.history.replaceState(null, "", "?" + params.toString());
  };

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

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <DrawerContent className=" md:w-2/3 mx-auto pb-5">
        {!responseMessage && (
          <DrawerHeader className="sm:text-right">
            <DrawerTitle>فرم ثبت سفارش و دریافت مشاوره </DrawerTitle>
            <DrawerDescription className="sm:text-right">
              کارشناسان ما در اولین فرصت با شما تماس خواهند گرفت
            </DrawerDescription>
          </DrawerHeader>
        )}

        {!responseMessage ? (
          <form
            onSubmit={submit}
            class="px-5 pt-3 md:pt-6 flex flex-col gap-5 md:px-5"
          >
            <div class="grid md:grid-cols-3 gap-3">
              <div class="grid gap-3">
                <Label>نام و نام خانوادکی</Label>
                <Input name="name" />
              </div>
              <div class="grid gap-3">
                <Label>شماره تماس</Label>
                <Input placeholder="091 XXXX XXXX" type="tel" name="phone" />
              </div>
              <div class="grid gap-3">
                <Label> نوع خدمت </Label>
                <Select dir="rtl" name="service">
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicesCard.map((service, index) => (
                      <SelectItem value={service.value} key={service.value}>
                        {service.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">سایر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Textarea
              placeholder="کسب و کار و خدمت مورد نیاز خود را  مختصر شرح دهید ."
              rows={7}
              name="description"
            />

            <Button type="submit" className="w-full">
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
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default OrderDrawer;
