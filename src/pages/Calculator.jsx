import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { investmentTypes, timePeriods, returnRates } from '../data/dummyData';
import { calculateSIP, calculateLumpsum, calculateStepUpSIP, generateYearlyBreakdown } from '../utils/calculations';

const Calculator = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    investmentType: 'sip',
    amount: '10000',
    timePeriod: '10',
    expectedReturn: '12',
    stepUpPercentage: '10'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.investmentType) {
      newErrors.investmentType = 'Please select an investment type';
    }
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.timePeriod || formData.timePeriod <= 0) {
      newErrors.timePeriod = 'Please select a time period';
    }
    
    if (!formData.expectedReturn || formData.expectedReturn <= 0) {
      newErrors.expectedReturn = 'Please select expected return';
    }
    
    if (formData.investmentType === 'stepup' && (!formData.stepUpPercentage || formData.stepUpPercentage <= 0)) {
      newErrors.stepUpPercentage = 'Please enter step-up percentage';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const amount = parseFloat(formData.amount);
    const returnRate = parseFloat(formData.expectedReturn);
    const years = parseInt(formData.timePeriod);
    const stepUp = parseFloat(formData.stepUpPercentage) || 0;

    let result;

    if (formData.investmentType === 'sip') {
      result = calculateSIP(amount, returnRate, years);
    } else if (formData.investmentType === 'lumpsum') {
      result = calculateLumpsum(amount, returnRate, years);
    } else if (formData.investmentType === 'stepup') {
      result = calculateStepUpSIP(amount, returnRate, years, stepUp);
    }

    const yearlyBreakdown = generateYearlyBreakdown(
      formData.investmentType,
      amount,
      returnRate,
      years,
      stepUp
    );

    // Store result in sessionStorage to pass to results page
    const calculationResult = {
      ...formData,
      ...result,
      yearlyBreakdown
    };
    
    sessionStorage.setItem('calculationResult', JSON.stringify(calculationResult));
    
    // Navigate to results page
    navigate('/results');
  };

  const handleReset = () => {
    setFormData({
      investmentType: 'sip',
      amount: '10000',
      timePeriod: '10',
      expectedReturn: '12',
      stepUpPercentage: '10'
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Investment Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your investment returns with precision
          </p>
        </div>

        {/* Calculator Card */}
        <Card title="Enter Investment Details" className="mb-8">
          <form onSubmit={handleCalculate}>
            {/* Investment Type */}
            <Select
              label="Investment Type"
              name="investmentType"
              value={formData.investmentType}
              onChange={handleChange}
              options={investmentTypes}
              required
              error={errors.investmentType}
              helperText="Choose how you want to invest"
            />

            {/* Amount Input */}
            <Input
              label={
                formData.investmentType === 'lumpsum' 
                  ? 'Investment Amount (₹)' 
                  : 'Monthly Investment (₹)'
              }
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="10000"
              icon="₹"
              min="100"
              step="100"
              required
              error={errors.amount}
              helperText={
                formData.investmentType === 'lumpsum'
                  ? 'Enter one-time investment amount'
                  : 'Enter monthly investment amount'
              }
            />

            {/* Time Period */}
            <Select
              label="Investment Period"
              name="timePeriod"
              value={formData.timePeriod}
              onChange={handleChange}
              options={timePeriods}
              required
              error={errors.timePeriod}
              helperText="How long do you want to invest?"
            />

            {/* Expected Return */}
            <Select
              label="Expected Annual Return (%)"
              name="expectedReturn"
              value={formData.expectedReturn}
              onChange={handleChange}
              options={returnRates}
              required
              error={errors.expectedReturn}
              helperText="Expected yearly return percentage"
            />

            {/* Step-up Percentage (only for step-up SIP) */}
            {formData.investmentType === 'stepup' && (
              <Input
                label="Annual Step-up (%)"
                type="number"
                name="stepUpPercentage"
                value={formData.stepUpPercentage}
                onChange={handleChange}
                placeholder="10"
                icon="%"
                min="1"
                max="100"
                step="1"
                required
                error={errors.stepUpPercentage}
                helperText="Yearly increase in SIP amount"
              />
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <Button type="submit" fullWidth>
                Calculate Returns
              </Button>
              <Button type="button" variant="secondary" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card padding="md" className="bg-blue-50 border border-blue-200">
            <div className="text-center">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="font-bold text-gray-900 mb-2">SIP</h3>
              <p className="text-sm text-gray-600">
                Invest fixed amount monthly
              </p>
            </div>
          </Card>

          <Card padding="md" className="bg-green-50 border border-green-200">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-bold text-gray-900 mb-2">Lumpsum</h3>
              <p className="text-sm text-gray-600">
                One-time investment
              </p>
            </div>
          </Card>

          <Card padding="md" className="bg-purple-50 border border-purple-200">
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-bold text-gray-900 mb-2">Step-up SIP</h3>
              <p className="text-sm text-gray-600">
                Increase SIP annually
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;