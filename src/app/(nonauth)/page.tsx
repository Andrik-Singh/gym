import React from "react";
import Hero from "./Hero-sectiion";
import Features from "./Features";
import Works from "./Works";
import Testimonials from "./Testimonials";

const Page = () => {
  return (
    <div className="">
      <Hero></Hero>
      <Features/>
      <Works/>
      <Testimonials/>
    </div>
  );
};

export default Page;