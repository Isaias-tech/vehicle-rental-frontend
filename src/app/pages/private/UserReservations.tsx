import React, { useState, useEffect } from 'react';
import { cancelReservation, listTransactions } from '../../../api/Reservations';
import { Transaction } from '../../../types/Reservations';
import Modal from '../../../components/ui/Modal';

export const UserReservations: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const fetchTransactions = async () => {
    try {
      const data = await listTransactions();
      console.log('Transactions:', data);
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transactions');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleCancelClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const confirmCancelReservation = async () => {
    if (selectedTransaction) {
      alert(
        `Canceling reservation with ID ${selectedTransaction.reservation.id}`
      );
      await cancelReservation(selectedTransaction.reservation.id);
      fetchTransactions();
      setShowModal(false);
    }
  };

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="w-full max-h-full p-6">
      <div className="w-full px-5 flex flex-row justify-between">
        <h1 className="text-xl font-bold mb-4">Your Reservations</h1>
      </div>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.reservation.vehicle.id}</td>
                <td>
                  {new Date(
                    transaction.reservation.start_date
                  ).toLocaleDateString()}
                </td>
                <td>
                  {new Date(
                    transaction.reservation.end_date
                  ).toLocaleDateString()}
                </td>
                <td>${transaction.amount}</td>
                <td>{transaction.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleCancelClick(transaction)}
                    disabled={
                      transaction.reservation.is_canceled ||
                      !transaction.reservation.is_active
                    }
                  >
                    {transaction.reservation.is_canceled
                      ? 'Canceled'
                      : 'Cancel'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No reservations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showModal && (
        <Modal
          title="Cancel Reservation"
          message={`Are you sure you want to cancel the reservation for vehicle ID ${selectedTransaction?.reservation.vehicle.id}?`}
          onConfirm={confirmCancelReservation}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
