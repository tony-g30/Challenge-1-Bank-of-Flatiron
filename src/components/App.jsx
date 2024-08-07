import React, { useState, useEffect } from 'react';
import TransactionsTable from './TransactionsTable';
import TransactionForm from './TransactionForm';
import SearchBar from './SearchBar';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data));
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Bank Transactions</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <TransactionForm addTransaction={addTransaction} />
      <TransactionsTable transactions={filteredTransactions} />
    </div>
  );
};

export default App;
