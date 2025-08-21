import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ArrowLeft, Clock, ArrowUpRight, ArrowDownLeft, DollarSign } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: string;
  recipient: string;
  sender: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  txHash?: string;
}

export default function HistoryPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'send' | 'receive'>('all');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        // TODO: Fetch transactions from Firebase
        fetchTransactions(user.uid);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchTransactions = async (userId: string) => {
    try {
      // TODO: Implement actual Firebase query
      // const transactionsRef = collection(db, 'transactions');
      // const q = query(transactionsRef, where('userId', '==', userId), orderBy('timestamp', 'desc'));
      // const snapshot = await getDocs(q);
      // const transactionData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // setTransactions(transactionData);

      // Mock data for now
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          type: 'send',
          amount: '100.00',
          recipient: '김철수',
          sender: '나',
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
          status: 'completed',
          txHash: '0x1234...5678'
        },
        {
          id: '2',
          type: 'receive',
          amount: '50.00',
          recipient: '나',
          sender: '이영희',
          timestamp: new Date(Date.now() - 172800000), // 2 days ago
          status: 'completed',
          txHash: '0x8765...4321'
        }
      ];
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'pending':
        return '처리중';
      case 'failed':
        return '실패';
      default:
        return '알 수 없음';
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">거래 내역</h2>
          <p className="text-gray-600">모든 송금 및 수신 내역을 확인하세요</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <div className="flex space-x-1">
            {[
              { key: 'all', label: '전체', count: transactions.length },
              { key: 'send', label: '송금', count: transactions.filter(tx => tx.type === 'send').length },
              { key: 'receive', label: '수신', count: transactions.filter(tx => tx.type === 'receive').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-sm">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">거래 내역이 없습니다</p>
              <p className="text-gray-400">첫 번째 송금을 시작해보세요!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'send' ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                        {tx.type === 'send' ? (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {tx.type === 'send' ? `${tx.recipient}님에게 송금` : `${tx.sender}님으로부터 수신`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {tx.timestamp.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className={`font-semibold text-lg ${
                          tx.type === 'send' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {tx.type === 'send' ? '-' : '+'}{tx.amount} USDT
                        </span>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                        {getStatusText(tx.status)}
                      </span>
                    </div>
                  </div>
                  
                  {tx.txHash && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        트랜잭션 해시: <span className="font-mono text-gray-700">{tx.txHash}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}