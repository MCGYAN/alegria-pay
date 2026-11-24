import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { createInitialState } from '../data/seed'

const STORAGE_KEY = 'alegria-pay-bank-v1'
const BankContext = createContext(null)

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return createInitialState()
}

function nextId(prefix, list, key) {
  const n = list.length + 1
  return `${prefix}-${String(n).padStart(4, '0')}`
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN': {
      const user = state.users.find(
        (u) =>
          u.email.toLowerCase() === action.email.toLowerCase() &&
          u.password === action.password,
      )
      if (!user) return { ...state, authError: 'Invalid email or password' }
      return { ...state, currentUserId: user.id, authError: null }
    }
    case 'LOGOUT':
      return { ...state, currentUserId: null, authError: null }
    case 'CLEAR_ERROR':
      return { ...state, authError: null, flash: null }
    case 'FLASH':
      return { ...state, flash: action.message }
    case 'RESET_DATA':
      return { ...createInitialState(), flash: 'Demo data reset successfully.' }
    case 'REGISTER_CUSTOMER': {
      const exists = state.users.some(
        (u) => u.email.toLowerCase() === action.payload.email.toLowerCase(),
      )
      if (exists) return { ...state, authError: 'Email already registered' }
      const customerId = nextId('CU', state.users.filter((u) => u.role === 'customer'), 'customerId')
      const id = `U-${customerId}`
      const user = {
        id,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        role: 'customer',
        phone: action.payload.phone,
        customerId,
        address: action.payload.address,
        nationalId: action.payload.nationalId,
        branchId: action.payload.branchId,
      }
      return {
        ...state,
        users: [...state.users, user],
        currentUserId: id,
        authError: null,
        flash: 'Account created. Welcome to Alegria Pay.',
      }
    }
    case 'OPEN_ACCOUNT': {
      const { customerId, type, branchId, initialDeposit = 0 } = action.payload
      const accountNumber = `ACC-${Date.now().toString().slice(-8)}`
      const account = {
        accountNumber,
        type,
        balance: Number(initialDeposit) || 0,
        status: 'active',
        customerId,
        branchId,
        openedAt: new Date().toISOString().slice(0, 10),
        interestRate: type === 'savings' ? 4.5 : type === 'fixed' ? 9 : 0,
      }
      const transactions = [...state.transactions]
      if (initialDeposit > 0) {
        transactions.unshift({
          txnId: nextId('TXN', state.transactions, 'txnId'),
          type: 'deposit',
          amount: Number(initialDeposit),
          fromAccount: null,
          toAccount: accountNumber,
          timestamp: new Date().toISOString(),
          performedBy: state.currentUserId,
          branchId,
          reference: 'Opening deposit',
          status: 'completed',
        })
      }
      return {
        ...state,
        accounts: [...state.accounts, account],
        transactions,
        flash: `Account ${accountNumber} opened successfully.`,
      }
    }
    case 'DEPOSIT': {
      const { accountNumber, amount, reference, branchId } = action.payload
      const amt = Number(amount)
      if (amt <= 0) return { ...state, flash: 'Amount must be positive.' }
      const accounts = state.accounts.map((a) =>
        a.accountNumber === accountNumber ? { ...a, balance: a.balance + amt } : a,
      )
      const txn = {
        txnId: nextId('TXN', state.transactions, 'txnId'),
        type: 'deposit',
        amount: amt,
        fromAccount: null,
        toAccount: accountNumber,
        timestamp: new Date().toISOString(),
        performedBy: state.currentUserId,
        branchId: branchId || state.accounts.find((a) => a.accountNumber === accountNumber)?.branchId,
        reference: reference || 'Deposit',
        status: 'completed',
      }
      return {
        ...state,
        accounts,
        transactions: [txn, ...state.transactions],
        flash: `Deposited GH₵ ${amt.toFixed(2)} to ${accountNumber}.`,
      }
    }
    case 'WITHDRAW': {
      const { accountNumber, amount, reference } = action.payload
      const amt = Number(amount)
      const account = state.accounts.find((a) => a.accountNumber === accountNumber)
      if (!account) return { ...state, flash: 'Account not found.' }
      if (account.type === 'fixed')
        return { ...state, flash: 'Withdrawals not allowed from fixed deposit until maturity.' }
      if (amt <= 0) return { ...state, flash: 'Amount must be positive.' }
      if (account.balance < amt) return { ...state, flash: 'Insufficient balance.' }
      const accounts = state.accounts.map((a) =>
        a.accountNumber === accountNumber ? { ...a, balance: a.balance - amt } : a,
      )
      const txn = {
        txnId: nextId('TXN', state.transactions, 'txnId'),
        type: 'withdrawal',
        amount: amt,
        fromAccount: accountNumber,
        toAccount: null,
        timestamp: new Date().toISOString(),
        performedBy: state.currentUserId,
        branchId: account.branchId,
        reference: reference || 'Withdrawal',
        status: 'completed',
      }
      return {
        ...state,
        accounts,
        transactions: [txn, ...state.transactions],
        flash: `Withdrew GH₵ ${amt.toFixed(2)} from ${accountNumber}.`,
      }
    }
    case 'TRANSFER': {
      const { fromAccount, toAccount, amount, reference } = action.payload
      const amt = Number(amount)
      const from = state.accounts.find((a) => a.accountNumber === fromAccount)
      const to = state.accounts.find((a) => a.accountNumber === toAccount)
      if (!from || !to) return { ...state, flash: 'Invalid account number(s).' }
      if (fromAccount === toAccount) return { ...state, flash: 'Cannot transfer to the same account.' }
      if (from.type === 'fixed') return { ...state, flash: 'Cannot transfer from fixed deposit.' }
      if (amt <= 0) return { ...state, flash: 'Amount must be positive.' }
      if (from.balance < amt) return { ...state, flash: 'Insufficient balance.' }
      const accounts = state.accounts.map((a) => {
        if (a.accountNumber === fromAccount) return { ...a, balance: a.balance - amt }
        if (a.accountNumber === toAccount) return { ...a, balance: a.balance + amt }
        return a
      })
      const txn = {
        txnId: nextId('TXN', state.transactions, 'txnId'),
        type: 'transfer',
        amount: amt,
        fromAccount,
        toAccount,
        timestamp: new Date().toISOString(),
        performedBy: state.currentUserId,
        branchId: from.branchId,
        reference:
          reference ||
          (from.branchId !== to.branchId ? 'Inter-branch transfer' : 'Internal transfer'),
        status: 'completed',
      }
      return {
        ...state,
        accounts,
        transactions: [txn, ...state.transactions],
        flash: `Transferred GH₵ ${amt.toFixed(2)} to ${toAccount}.`,
      }
    }
    case 'APPLY_LOAN': {
      const loan = {
        loanId: nextId('LN', state.loans, 'loanId'),
        customerId: action.payload.customerId,
        productType: action.payload.productType,
        principal: Number(action.payload.principal),
        interestRate: Number(action.payload.interestRate) || 18,
        termMonths: Number(action.payload.termMonths) || 12,
        status: 'pending',
        balanceRemaining: Number(action.payload.principal),
        approvedBy: null,
        branchId: action.payload.branchId,
        appliedAt: new Date().toISOString().slice(0, 10),
        approvedAt: null,
        disbursedAccount: null,
      }
      return {
        ...state,
        loans: [loan, ...state.loans],
        flash: `Loan application ${loan.loanId} submitted for review.`,
      }
    }
    case 'APPROVE_LOAN': {
      const { loanId, accountNumber } = action.payload
      const loan = state.loans.find((l) => l.loanId === loanId)
      if (!loan || loan.status !== 'pending') return { ...state, flash: 'Loan not pending.' }
      const account = state.accounts.find((a) => a.accountNumber === accountNumber)
      if (!account || account.customerId !== loan.customerId)
        return { ...state, flash: 'Select a valid customer account for disbursement.' }
      const loans = state.loans.map((l) =>
        l.loanId === loanId
          ? {
              ...l,
              status: 'active',
              approvedBy: state.currentUserId,
              approvedAt: new Date().toISOString().slice(0, 10),
              disbursedAccount: accountNumber,
            }
          : l,
      )
      const accounts = state.accounts.map((a) =>
        a.accountNumber === accountNumber
          ? { ...a, balance: a.balance + loan.principal }
          : a,
      )
      const txn = {
        txnId: nextId('TXN', state.transactions, 'txnId'),
        type: 'deposit',
        amount: loan.principal,
        fromAccount: null,
        toAccount: accountNumber,
        timestamp: new Date().toISOString(),
        performedBy: state.currentUserId,
        branchId: loan.branchId,
        reference: `Loan disbursement ${loanId}`,
        status: 'completed',
      }
      return {
        ...state,
        loans,
        accounts,
        transactions: [txn, ...state.transactions],
        flash: `Loan ${loanId} approved and disbursed.`,
      }
    }
    case 'REJECT_LOAN': {
      const loans = state.loans.map((l) =>
        l.loanId === action.loanId ? { ...l, status: 'rejected', approvedBy: state.currentUserId } : l,
      )
      return { ...state, loans, flash: `Loan ${action.loanId} rejected.` }
    }
    case 'REPAY_LOAN': {
      const { loanId, amount, method } = action.payload
      const amt = Number(amount)
      const loan = state.loans.find((l) => l.loanId === loanId)
      if (!loan || loan.status !== 'active') return { ...state, flash: 'Active loan not found.' }
      if (amt <= 0 || amt > loan.balanceRemaining)
        return { ...state, flash: 'Invalid repayment amount.' }
      const newBal = loan.balanceRemaining - amt
      const loans = state.loans.map((l) =>
        l.loanId === loanId
          ? { ...l, balanceRemaining: newBal, status: newBal === 0 ? 'closed' : 'active' }
          : l,
      )
      const repayment = {
        repaymentId: nextId('RP', state.repayments, 'repaymentId'),
        loanId,
        amount: amt,
        date: new Date().toISOString().slice(0, 10),
        method: method || 'bank_transfer',
      }
      return {
        ...state,
        loans,
        repayments: [repayment, ...state.repayments],
        flash: `Repayment of GH₵ ${amt.toFixed(2)} recorded.`,
      }
    }
    case 'ISSUE_CARD': {
      const { customerId, accountId, limit } = action.payload
      const card = {
        cardId: nextId('CC', state.creditCards, 'cardId'),
        customerId,
        accountId,
        cardNumber: `4532 **** **** ${String(Math.floor(1000 + Math.random() * 9000))}`,
        limit: Number(limit) || 3000,
        availableCredit: Number(limit) || 3000,
        status: 'active',
        expiry: '12/29',
      }
      return {
        ...state,
        creditCards: [...state.creditCards, card],
        flash: `Credit card ${card.cardId} issued.`,
      }
    }
    case 'ADD_STAFF': {
      const payload = action.payload
      const exists = state.users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())
      if (exists) return { ...state, flash: 'Staff email already exists.' }
      const staffId = nextId('ST', state.users.filter((u) => u.staffId), 'staffId')
      const user = {
        id: `U-${staffId}`,
        name: payload.name,
        email: payload.email,
        password: payload.password || 'teller123',
        role: payload.role || 'staff',
        phone: payload.phone,
        staffId,
        position: payload.position,
        branchId: payload.branchId,
        employeeNo: `EMP-${1000 + state.users.filter((u) => u.staffId).length + 1}`,
      }
      return { ...state, users: [...state.users, user], flash: `Staff ${user.name} added.` }
    }
    default:
      return state
  }
}

export function BankProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, ready])

  const currentUser = state.users.find((u) => u.id === state.currentUserId) || null

  const value = {
    ...state,
    currentUser,
    dispatch,
    customers: state.users.filter((u) => u.role === 'customer'),
    staffMembers: state.users.filter((u) => u.role === 'staff' || u.role === 'manager' || u.role === 'admin'),
    getBranch: (id) => state.branches.find((b) => b.id === id),
    getCustomerAccounts: (customerId) => state.accounts.filter((a) => a.customerId === customerId),
    getUserName: (id) => state.users.find((u) => u.id === id)?.name || id,
  }

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>
}

export function useBank() {
  const ctx = useContext(BankContext)
  if (!ctx) throw new Error('useBank must be used within BankProvider')
  return ctx
}

export function formatMoney(n) {
  return `GH₵ ${Number(n || 0).toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatDate(iso) {
  if (!iso) return 'n/a'
  return new Date(iso).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: iso.includes('T') ? 'short' : undefined,
  })
}
