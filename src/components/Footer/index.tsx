import { Box } from "@chakra-ui/react";
import React from "react";
import FooterCopyright from "./copyright";
import FooterLinks from "./links";
import FooterSocials from "./socials";

export default function Footer() {
  return (
    <Box
      as='footer'
      position='relative'
      bg='blueGradient'
      bottom={'0'}
    >
      <FooterSocials />
      <FooterLinks />
      <FooterCopyright />
    </Box>
  );
}