import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { sendUSDT } from '../lib/tron';
import { ArrowLeft, Send, Phone, DollarSign, AlertCircle } from 'lucide-react';

export default function SendPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !amount || !recipientName) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (parseFloat(amount) <= 0) {
      setError('송금 금액은 0보다 커야 합니다.');
      return;
    }

    setSending(true);
    setError('');

    try {
      // TODO: Implement actual USDT transfer
      // 1. Validate phone number format
      // 2. Check if recipient exists
      // 3. Verify sender has sufficient balance
      // 4. Execute TRON transaction
      // 5. Save transaction to Firebase
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Send failed:', error);
      setError('송금에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSending(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as Korean phone number
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
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

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">송금 완료!</h2>
          <p className="text-gray-600 mb-6">
            {recipientName}님에게 {amount} USDT를 성공적으로 송금했습니다.
          </p>
          <p className="text-sm text-gray-500">대시보드로 이동합니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mr-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>뒤로</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              82<span className="text-blue-600">Remit</span>
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">USDT 송금</h2>
            <p className="text-gray-600">전화번호로 간편하게 송금하세요</p>
          </div>

          <form onSubmit={handleSend} className="space-y-6">
            {/* Recipient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                받는 사람 이름
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="받는 사람의 이름을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전화번호
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  placeholder="010-1234-5678"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  maxLength={13}
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                하이픈(-) 없이 입력해도 자동으로 포맷됩니다
              </p>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                송금 금액 (USDT)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Send Button */}
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {sending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>송금 중...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>송금하기</span>
                </>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">송금 안내</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 송금 수수료는 무료입니다</li>
              <li>• TRON 네트워크로 빠르게 처리됩니다</li>
              <li>• 송금 후 취소할 수 없습니다</li>
              <li>• 전화번호를 정확히 입력해주세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}