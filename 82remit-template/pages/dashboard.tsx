import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { getUSDTBalance } from '../lib/tron';
import { Wallet, Send, History, LogOut, User, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        // TODO: Get user's TRON address and fetch balance
        // fetchBalance(user.uid);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const fetchBalance = async (userId: string) => {
    try {
      // TODO: Get user's TRON address from Firebase
      // const userDoc = await getDoc(doc(db, 'users', userId));
      // const tronAddress = userDoc.data()?.tronAddress;
      // if (tronAddress) {
      //   const balance = await getUSDTBalance(tronAddress);
      //   setBalance(balance);
      // }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                82<span className="text-blue-600">Remit</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{user?.email || 'User'}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">USDT 잔액</h2>
            </div>
            <div className="text-5xl font-bold text-green-600 mb-2">
              {parseFloat(balance).toFixed(2)}
            </div>
            <p className="text-gray-600">TRON 네트워크</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => router.push('/send')}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 text-center transition-colors group"
          >
            <Send className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">송금하기</h3>
            <p className="text-blue-100">전화번호로 USDT 송금</p>
          </button>

          <button
            onClick={() => router.push('/history')}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-8 text-center transition-colors group"
          >
            <History className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">거래내역</h3>
            <p className="text-purple-100">송금 기록 확인</p>
          </button>

          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <Wallet className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">지갑 관리</h3>
            <p className="text-gray-600">지갑 설정 및 보안</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">최근 거래</h3>
          <div className="text-center py-8">
            <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">아직 거래 내역이 없습니다</p>
            <p className="text-gray-400 text-sm">첫 번째 송금을 시작해보세요!</p>
          </div>
        </div>
      </div>
    </div>
  );
}