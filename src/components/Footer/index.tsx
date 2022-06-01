import { Box } from "@chakra-ui/react";
import React from "react";
import FooterCopyright from "./copyright";
import FooterLinks from "./links";
import FooterSocials from "./socials";

export default function Footer() {
  return (
    <Box
      bg='blueGradient'
      position="relative"
    >
      <FooterSocials />
      <FooterLinks />
      <FooterCopyright />
    </Box>
  );
}