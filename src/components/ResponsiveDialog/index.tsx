import * as React from "react";

import { Dialog, DialogContent, DialogTrigger } from "../../components/Dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "../../components/Drawer";
import useMediaQuery from "../../hooks/use-media-query";
import { Button } from "../Button";

interface ResponsiveDialogProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function ResponsiveDialog({ trigger, children }: ResponsiveDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-xl">{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
