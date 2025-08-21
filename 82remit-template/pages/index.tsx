import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { initWeb3Auth } from '../lib/web3auth';
import { Wallet, Smartphone, Send, History } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [web3Auth, setWeb3Auth] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        router.push('/dashboard');
      }
    });

    // Initialize Web3Auth
    const initAuth = async () => {
      try {
        const auth = await initWeb3Auth();
        setWeb3Auth(auth);
      } catch (error) {
        console.error('Web3Auth init failed:', error);
      }
    };
    initAuth();

    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  const handleWeb3SignIn = async () => {
    try {
      if (web3Auth) {
        await web3Auth.connect();
        // After Web3Auth connection, redirect to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Web3Auth sign-in failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            82<span className="text-blue-600">Remit</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            전화번호 기반 USDT 간편송금 서비스
            <br />
            TRON 네트워크로 빠르고 안전하게 송금하세요
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">로그인</h2>
            <p className="text-gray-600">계정에 로그인하여 송금 서비스를 이용하세요</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 로그인
            </button>

            <button
              onClick={handleWeb3SignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Wallet className="w-5 h-5 mr-3" />
              Web3 월렛으로 로그인
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">전화번호 기반</h3>
              <p className="text-gray-600">복잡한 지갑 주소 대신 전화번호로 간편하게 송금</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Send className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">빠른 송금</h3>
              <p className="text-gray-600">TRON 네트워크로 초고속 USDT 송금</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <History className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">거래 내역</h3>
              <p className="text-gray-600">모든 송금 내역을 실시간으로 확인</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}