import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { generateReport } from '../../../../api/Reservations';

export const ReportsManagement: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        start_date: startDate?.toISOString().split('T')[0], // Format to YYYY-MM-DD
        end_date: endDate?.toISOString().split('T')[0], // Format to YYYY-MM-DD
      };

      const response = await generateReport(params);
      setReportData(response);
      setLoading(false);
    } catch (error: any) {
      setError('Error generating report');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Generate Report</h2>

      <div className="flex flex-row justify-between">
        {/* Date Filter Form */}
        <div className="flex space-x-4 mb-6">
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              className="input input-bordered"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Start Date"
            />
          </div>
          <div>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              className="input input-bordered"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select End Date"
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleGenerateReport}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      {error && <div className="alert alert-error mt-4">{error}</div>}

      {/* Report Data */}
      {reportData && (
        <div className="mt-8">
          <div className="w-full px-5 flex flex-row justify-between items-center">
            <h3 className="text-xl font-bold mb-4">Report</h3>

            {/* Total Income */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold">Total Income</h4>
              <p className="text-2xl font-bold">
                ${reportData.total_income.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Most Requested Cars */}
          <h4 className="text-lg font-semibold mb-2">Most Requested Cars</h4>
          <div className="space-y-4">
            {reportData.most_requested_cars.map((car: any, index: number) => (
              <div key={index} className="card bg-base-100 shadow-lg p-4">
                <div className="flex space-x-4">
                  <img
                    src={car.vehicle_details.vehicle.picture1}
                    alt={car.vehicle_details.vehicle.name}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <div>
                    <h5 className="text-xl font-bold">
                      {car.vehicle_details.vehicle.name} (
                      {car.vehicle_details.vehicle.year})
                    </h5>
                    <p>Mileage: {car.vehicle_details.mileage}</p>
                    <p>Request Count: {car.request_count}</p>
                    <p>
                      Price per Day: $
                      {car.vehicle_details.vehicle.price_per_day}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
