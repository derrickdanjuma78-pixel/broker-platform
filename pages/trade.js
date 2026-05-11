import { useState } from "react";

export default function Trade() {
  const [balance, setBalance] = useState(10000);
  const [coin, setCoin] = useState("Bitcoin");
  const [amount, setAmount] = useState("");
  const [portfolio, setPortfolio] = useState({});

  const buyCoin = () => {
    const qty = Number(amount);
    const price = 50000;

    if (!qty || qty <= 0) return;

    const cost = qty * price;

    if (cost > balance) {
      alert("Insufficient balance");
      return;
    }

    setBalance(balance - cost);

    setPortfolio({
      ...portfolio,
      [coin]: (portfolio[coin] || 0) + qty
    });

    setAmount("");
  };

  const sellCoin = () => {
    const qty = Number(amount);

    if (!qty || qty <= 0) return;

    if ((portfolio[coin] || 0) < qty) {
      alert("Not enough holdings");
      return;
    }

    const price = 50000;

    setBalance(balance + qty * price);

    setPortfolio({
      ...portfolio,
      [coin]: portfolio[coin] - qty
    });

    setAmount("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Trading Dashboard</h1>

      <h2>Balance: ${balance}</h2>

      <select value={coin} onChange={(e) => setCoin(e.target.value)}>
        <option>Bitcoin</option>
        <option>Ethereum</option>
        <option>Solana</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={buyCoin}>Buy</button>
      <button onClick={sellCoin} style={{ marginLeft: 10 }}>
        Sell
      </button>

      <h3>Portfolio</h3>
      <pre>{JSON.stringify(portfolio, null, 2)}</pre>

      <a href="/">Back Home</a>
    </div>
  );
}