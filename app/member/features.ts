import events from "@/public/members/events.png";
import payment from "@/public/members/payment.png";
import wardrobe from "@/public/members/wardrobe.png";
import contract from "@/public/members/contract.png";
import appointment from "@/public/members/appointment.png";

import eventsIcon from "@/public/events.svg";
import wardrobeIcon from "@/public/wardrobe.svg";
import paymentIcon from "@/public/payment.svg";
import contractIcon from "@/public/contract.svg";
import appointmentIcon from "@/public/appointment.svg";

export const features = [
  {
    image: events,
    description: "Events",
    icon: eventsIcon,
    href: "/member/events",
  },
  {
    image: wardrobe,
    description: "My Wardrobe",
    icon: wardrobeIcon,
    href: "/member/wardrobe",
  },
  {
    image: payment,
    description: "Payment",
    icon: paymentIcon,
    href: "/member/payment",
  },
  {
    image: contract,
    description: "Contract",
    icon: contractIcon,
    href: "/member/contract",
  },
  {
    image: appointment,
    description: "Appointment",
    icon: appointmentIcon,
    href: "/member/appointment",
  },
];
