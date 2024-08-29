import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";


export default function App() {
  return (
    <Navbar  shouldHideOnScroll>
      <NavbarBrand>
      
        <p className="font-bold text-inherit">Template</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
       
        
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Logout</Link>
        </NavbarItem>
        <NavbarItem>
          
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
