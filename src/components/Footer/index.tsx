import { Box } from "@chakra-ui/react";
import React from "react";
import FooterCopyright from "./copyright";
import FooterLinks from "./links";
import FooterSocials from "./socials";

export default function Footer() {
  return (
    <Box
      as='footer'
      w='100%'
      // position='fixed'
      bg='blueGradient'
    >
      <FooterSocials />
      <FooterLinks />
      <FooterCopyright />
    </Box>
  );
}