import React, { useState, useMemo } from 'react';
import { CalculatorIcon } from './IconComponents';

const FinanceCalculator: React.FC = () => {
  const [price, setPrice] = useState('30000');
  const [downPayment, setDownPayment] = useState('5000');
  const [interestRate, setInterestRate] = useState('5.0');
  const [loanTerm, setLoanTerm] = useState('5'); // in years

  const monthlyPayment = useMemo(() => {
    const p = parseFloat(price) - parseFloat(downPayment); // Principal
    const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const n = parseInt(loanTerm) * 12; // Number of payments

    if (p <= 0 || isNaN(p)) return 0;
    if (isNaN(r) || isNaN(n) || n === 0) return 0;
    
    if (r === 0) { // No interest
        return p / n;
    }

    const payment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return payment;
  }, [price, downPayment, interestRate, loanTerm]);

  const totalCost = useMemo(() => {
    const p = parseFloat(price) - parseFloat(downPayment);
    if (p <= 0) return parseFloat(price);
    const totalPayments = monthlyPayment * parseInt(loanTerm) * 12;
    return totalPayments + parseFloat(downPayment);
  }, [monthlyPayment, loanTerm, downPayment, price]);

  const totalInterest = useMemo(() => {
    const p = parseFloat(price) - parseFloat(downPayment);
    if(p <= 0) return 0;
    const cost = totalCost - parseFloat(price);
    return cost > 0 ? cost : 0;
  }, [totalCost, price]);


  const InputField: React.FC<{
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    prefix?: string,
    suffix?: string
  }> = ({ label, value, onChange, prefix, suffix }) => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={onChange}
          className={`w-full bg-slate-800 border border-slate-700 rounded-lg py-2 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ${prefix ? 'pl-7' : 'px-3'} ${suffix ? 'pr-10' : ''}`}
        />
        {suffix && <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-slate-900 text-white justify-center p-6">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Left Side: Inputs */}
        <div className="w-full md:w-1/2 lg:w-2/5 bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-100">Finance Calculator</h1>
            <p className="text-sm text-slate-400">Estimate your car loan payments.</p>
          </header>
          <div className="space-y-4">
            <InputField label="Car Price" value={price} onChange={e => setPrice(e.target.value)} prefix="$"/>
            <InputField label="Down Payment" value={downPayment} onChange={e => setDownPayment(e.target.value)} prefix="$"/>
            <InputField label="Interest Rate" value={interestRate} onChange={e => setInterestRate(e.target.value)} suffix="%"/>
            <InputField label="Loan Term" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} suffix="years"/>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col items-center justify-center bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="text-center">
                <p className="text-slate-400 text-lg">Your Estimated Monthly Payment</p>
                <p className="text-5xl font-bold text-blue-400 my-2">
                    ${monthlyPayment.toFixed(2)}
                </p>
                <div className="mt-6 w-full text-left space-y-3 pt-4 border-t border-slate-700">
                    <div className="flex justify-between text-slate-300">
                        <span>Total Principal:</span>
                        <span className="font-medium">${(parseFloat(price) - parseFloat(downPayment) || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                        <span>Total Interest Paid:</span>
                        <span className="font-medium">${(totalInterest || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between text-slate-200 font-bold">
                        <span>Total Cost of Car:</span>
                        <span className="font-bold">${(totalCost || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceCalculator;
