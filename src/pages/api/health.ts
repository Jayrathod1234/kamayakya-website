import type { NextApiRequest, NextApiResponse } from "next";

type HealthResponse = {
  status: string;
  timestamp: string;
  uptime: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<HealthResponse>) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      status: "error",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  }

  // Return healthy status
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
