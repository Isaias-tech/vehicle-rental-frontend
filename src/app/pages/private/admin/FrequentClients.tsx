import React, { useEffect, useState } from 'react';
import { ClientTransactionHistory } from '../../../../types/ClientTransactionHistory';
import { getTopFrequentClients } from '../../../../api/Reservations';

export const FrequentClients: React.FC = () => {
  const [clients, setClients] = useState<ClientTransactionHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getTopFrequentClients();
        setClients(data);
        setLoading(false);
      } catch (error: any) {
        setError('Failed to load frequent clients.');
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <div>Loading frequent clients...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Frequent Clients</h2>
      <div className="space-y-4">
        {clients.map((clientData, index) => (
          <div key={index} className="card bg-base-100 shadow-lg p-4">
            <h3 className="text-lg font-bold">
              {clientData.client.first_name} {clientData.client.last_name} ({clientData.client.email})
            </h3>
            <p>Number of Reservations: {clientData.transactions.length}</p>

            <h4 className="mt-4 text-lg font-semibold">Transaction History</h4>
            <table className="table table-zebra w-full mt-2">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Vehicle</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {clientData.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.braintree_transaction_id}</td>
                    <td>{transaction.reservation.vehicle.name}</td>
                    <td>{new Date(transaction.reservation.start_date).toLocaleDateString()}</td>
                    <td>{new Date(transaction.reservation.end_date).toLocaleDateString()}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};
