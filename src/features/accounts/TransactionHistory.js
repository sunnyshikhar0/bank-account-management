import { useSelector } from "react-redux";

function TransactionHistory() {
  const txs = useSelector((s) => s.transactions.items);

  if (!txs.length)
    return (
      <div className="panel">
        <h2>Recent activity</h2>
        <p>No transactions yet.</p>
      </div>
    );

  return (
    <div className="panel">
      <h2>Recent activity</h2>
      <ul className="tx-list">
        {txs.map((t) => (
          <li key={t.id}>
            <strong>{t.type}</strong> {t.currency} {t.amount}
            <small>
              • {new Date(t.createdAt).toLocaleString()} • Balance: ₹
              {t.balanceAfter}
              {t.meta?.purpose ? ` • Purpose: ${t.meta.purpose}` : ""}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;


/**
 * TransactionHistory component
 * - Displays all persisted account activity (deposits, withdrawals, loans)
 * - Reads from transactions slice in Redux store (which is persisted)
 */