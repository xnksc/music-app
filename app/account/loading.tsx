"use client";

import { Box } from "@/components/Box";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <ScaleLoader color="#0891b2" speedMultiplier={0.8}></ScaleLoader>
    </Box>
  );
};

export default Loading;
