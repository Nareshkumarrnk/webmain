// pages/api/auth/reset-password.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: 'Missing token or password.' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    await dbConnect();

    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }
}
