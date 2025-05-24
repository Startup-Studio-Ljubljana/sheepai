import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import GoalCard from '../components/GoalCard';
import BottomNavigation from '../components/BottomNavigation';

const Goals = () => {
  const goals = [
    {
      id: '1',
      title: 'Dream Vacation',
      targetAmount: 3000,
      currentAmount: 2850,
      monthlyContribution: 200,
      icon: '✈️'
    },
    {
      id: '2',
      title: 'New Laptop',
      targetAmount: 1200,
      currentAmount: 450,
      monthlyContribution: 150,
      icon: '💻'
    },
    {
      id: '3',
      title: 'Emergency Fund',
      targetAmount: 5000,
      currentAmount: 1800,
      monthlyContribution: 300,
      icon: '🏦'
    },
    {
      id: '4',
      title: 'New Car',
      targetAmount: 25000,
      currentAmount: 8500,
      monthlyContribution: 500,
      icon: '🚗'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-pink-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-sm mx-auto bg-gradient-to-b from-purple-900/50 to-purple-800/30 min-h-screen backdrop-blur-sm">
        <Header />
        
        {/* Page Header */}

  );
};

export default Goals;