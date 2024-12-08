import React, { useState, useEffect } from "react";
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
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import useDeviceType from "@/hooks/useDeviceType";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function OrderDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useDeviceType();

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

    // Remove the query parameter
    const params = new URLSearchParams(window.location.search);
    params.delete("drawer");
    window.history.replaceState(null, "", "?" + params.toString());
  };

  if (true) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
        <DrawerContent className=" md:w-2/3 mx-auto pb-5">
          <DrawerHeader className="sm:text-right">
            <DrawerTitle>فرم ثبت سفارش و دریافت مشاوره </DrawerTitle>
            <DrawerDescription className="sm:text-right">
              کارشناسان ما در اولین فرصت با شما تماس خواهند گرفت
            </DrawerDescription>
          </DrawerHeader>
          <form action="" class="px-5  flex flex-col gap-5 md:px-5">
            <div class="flex gap-3">
              <Input placeholder="نام و نام خانوادگی" />
              <Input placeholder="091 XXXX XXXX" type="tel" />
            </div>
            <Textarea placeholder="پیام خود را بنویسید" rows={7} />
            <Button className="w-full"> ارسال </Button>
          </form>
        </DrawerContent>
      </Drawer>
    );
  }
}

export default OrderDrawer;
