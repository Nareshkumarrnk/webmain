import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-6 border rounded shadow-sm">
        <h2 className="text-center text-2xl font-bold">Sign in to your account</h2>

        <div className="space-y-2">
          <button
            onClick={() => signIn('google')}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn('microsoft')}
            className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
          >
            Sign in with Microsoft
          </button>
          <button
            onClick={() => signIn('github')}
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-900"
          >
            Sign in with GitHub
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          <p>
            Forgot your password?{' '}
            <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
              Reset it
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
