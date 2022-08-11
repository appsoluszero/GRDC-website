import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<{ name: string }>) {
    res.status(200).json({ name: 'John Doe' })
}
