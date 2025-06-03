// pages/auth/verify.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    const verify = async () => {
      if (!token || typeof token !== 'string') return;

      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        const res = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: decoded.email }),
        });

        const result = await res.json();
        if (res.ok) {
          setMessage('Your email has been verified. You can now log in.');
        } else {
          setMessage(result.message || 'Verification failed.');
        }
      } catch (err) {
        setMessage('Invalid or expired token.');
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">{message}</p>
    </div>
  );
}
