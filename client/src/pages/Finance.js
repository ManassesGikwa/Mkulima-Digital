import React from 'react';

const Finance = () => {
  const loans = [
    { id: 1, name: 'Home Loan', description: 'Low-interest home loans for your dream house.' },
    { id: 2, name: 'Car Loan', description: 'Get the best rates for your new car.' },
    { id: 3, name: 'Personal Loan', description: 'Flexible personal loans for various needs.' },
  ];

  const insurances = [
    { id: 1, name: 'Health Insurance', description: 'Comprehensive health insurance plans.' },
    { id: 2, name: 'Car Insurance', description: 'Affordable car insurance with great coverage.' },
    { id: 3, name: 'Home Insurance', description: 'Protect your home with our insurance plans.' },
  ];

  return (
    <div className="finance-container">
      <h1>Financial Services</h1>
      <div className="section">
        <h2>Loans</h2>
        {loans.map(loan => (
          <div className="finance-item" key={loan.id}>
            <h3>{loan.name}</h3>
            <p>{loan.description}</p>
            <button>Apply Now</button>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>Insurance</h2>
        {insurances.map(insurance => (
          <div className="finance-item" key={insurance.id}>
            <h3>{insurance.name}</h3>
            <p>{insurance.description}</p>
            <button>Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Finance;