import type { NextApiRequest, NextApiResponse } from "next";

type HealthResponse = {
  status: string;
  timestamp: string;
  uptime: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<HealthResponse>) {
  // Only allow GET requests
  // if (req.method !== "GET" && req.method !== "HEAD") {
  //   return res.status(405).end();
  // }

  // Return healthy status
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
