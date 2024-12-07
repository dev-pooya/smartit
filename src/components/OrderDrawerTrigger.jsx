import { Button } from "./ui/button";

export default function OrderDrawerTrigger({
  label,
  className,
  variant = "default",
}) {
  const openDrawer = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("drawer", "open");
    window.history.pushState(null, "", "?" + params.toString()); // Update query parameters without a reload
    window.dispatchEvent(new PopStateEvent("popstate")); // Notify components of the change
  };

  return (
    <Button onClick={openDrawer} variant={variant} className={className}>
      {label}
    </Button>
  );
}
