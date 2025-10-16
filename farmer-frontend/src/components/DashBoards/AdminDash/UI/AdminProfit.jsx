import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const AdminProfit = () => {
  const [profitData, setProfitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfit = async () => {
      try {
        const response = await axios.get('http://localhost:8085/admin/profit-summary');
        setProfitData(response.data);
      } catch (err) {
        console.error('Error fetching profit summary:', err);
        setError('Failed to fetch profit summary.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfit();
  }, []);

  if (loading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const totalAdminProfit = profitData.reduce((sum, f) => sum + f.adminProfit, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#0d6efd', textAlign: 'center', marginBottom: '30px' }}>Admin Profit Summary</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Farmer ID</th>
            <th>Farmer Name</th>
            <th>Total Revenue (₹)</th>
            <th>Farmer Earnings (₹)</th>
            <th>Admin Profit (₹)</th>
          </tr>
        </thead>
        <tbody>
          {profitData.map((row) => (
            <tr key={row.farmerId}>
              <td>{row.farmerId}</td>
              <td>{row.farmerName}</td>
              <td>₹{row.totalRevenue.toFixed(2)}</td>
              <td>₹{row.farmerEarnings.toFixed(2)}</td>
              <td>₹{row.adminProfit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Admin Profit:</td>
            <td style={{ fontWeight: 'bold' }}>₹{totalAdminProfit.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default AdminProfit;
