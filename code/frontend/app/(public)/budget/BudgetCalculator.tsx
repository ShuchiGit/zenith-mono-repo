'use client'

import { useState, useMemo } from 'react'
import {
  DOWN_PAYMENT_PERCENT,
  STAMP_DUTY_PERCENT,
  REGISTRATION_PERCENT,
  LOAN_INTEREST_RATES,
  LOAN_TENURES,
} from '@/constants/budget'

function calcEMI(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 12 / 100
  if (r === 0) return principal / months
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

function fmt(n: number): string {
  if (n >= 10000000) return `₹ ${(n / 10000000).toFixed(2)} Cr`
  if (n >= 100000) return `₹ ${(n / 100000).toFixed(2)} L`
  return `₹ ${Math.round(n).toLocaleString('en-IN')}`
}

export function BudgetCalculator() {
  const [price, setPrice] = useState(1.5)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const calc = useMemo(() => {
    const priceRs = price * 10000000
    const downPayment = (DOWN_PAYMENT_PERCENT / 100) * priceRs
    const loanAmount = priceRs - downPayment
    const stampDuty = (STAMP_DUTY_PERCENT / 100) * priceRs
    const registration = (REGISTRATION_PERCENT / 100) * priceRs
    const emi = calcEMI(loanAmount, rate, tenure * 12)
    const totalInterest = emi * tenure * 12 - loanAmount
    const totalCost = priceRs + stampDuty + registration
    return { priceRs, downPayment, loanAmount, stampDuty, registration, emi, totalInterest, totalCost }
  }, [price, rate, tenure])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <div className="glass-card rounded-2xl p-6 space-y-6">
        <h2 className="font-heading text-2xl text-[#006d77]">Your Inputs</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Price: <span className="text-[#006d77] font-semibold">₹ {price} Cr</span>
          </label>
          <input
            type="range"
            min={0.25}
            max={10}
            step={0.25}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-[#006d77]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>₹ 25 L</span>
            <span>₹ 10 Cr</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate: <span className="text-[#006d77] font-semibold">{rate}%</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {LOAN_INTEREST_RATES.map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  rate === r
                    ? 'bg-[#006d77] text-white'
                    : 'bg-white border border-[#83c5be]/40 text-gray-600 hover:bg-[#e6f4f5]'
                }`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Tenure: <span className="text-[#006d77] font-semibold">{tenure} Years</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {LOAN_TENURES.map((t) => (
              <button
                key={t}
                onClick={() => setTenure(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  tenure === t
                    ? 'bg-[#006d77] text-white'
                    : 'bg-white border border-[#83c5be]/40 text-gray-600 hover:bg-[#e6f4f5]'
                }`}
              >
                {t} yr
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-heading text-sm text-[#006d77] uppercase tracking-wide mb-4">EMI Breakdown</h3>
          <div className="text-center mb-4">
            <p className="text-xs text-gray-400 mb-1">Monthly EMI</p>
            <p className="font-heading text-4xl font-bold text-[#006d77]">{fmt(calc.emi)}</p>
          </div>
          <div className="space-y-2.5 text-sm">
            {[
              { label: 'Loan Amount', value: fmt(calc.loanAmount) },
              { label: 'Total Interest', value: fmt(calc.totalInterest) },
              { label: 'Total Repayment', value: fmt(calc.loanAmount + calc.totalInterest) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-1.5 border-b border-[#83c5be]/20">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-[#006d77]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-heading text-sm text-[#006d77] uppercase tracking-wide mb-4">Total Cost to Own</h3>
          <div className="space-y-2.5 text-sm">
            {[
              { label: `Down Payment (${DOWN_PAYMENT_PERCENT}%)`, value: fmt(calc.downPayment) },
              { label: `Stamp Duty (${STAMP_DUTY_PERCENT}%)`, value: fmt(calc.stampDuty) },
              { label: `Registration (${REGISTRATION_PERCENT}%)`, value: fmt(calc.registration) },
              { label: 'Property Price', value: fmt(calc.priceRs) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-1.5 border-b border-[#83c5be]/20">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-700">{value}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <span className="font-semibold text-[#006d77]">Total Cost</span>
              <span className="font-heading font-bold text-[#006d77] text-lg">{fmt(calc.totalCost)}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          * Calculations are indicative. Stamp duty rates vary by state and property type.
          Consult our experts for precise figures.
        </p>
      </div>
    </div>
  )
}
