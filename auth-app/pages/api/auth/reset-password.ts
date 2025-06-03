// pages/api/auth/reset-password.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'lib/dbConnect';
import User from 'models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      // For security, respond the same way
      return res.status(200).json({ message: 'If an account exists, you will receive an email' });
    }

    // TODO: Generate password reset token & send email

    res.status(200).json({ message: 'If an account exists, you will receive an email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
