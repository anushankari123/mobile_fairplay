import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CountryFlag from 'react-native-country-flag';
import { useNavigation } from '@react-navigation/native';
import { IoHome } from 'react-icons/io5'; // Import Home icon from ionicons

const DopingStatsChart = () => {
  const [data] = useState([
    { country: 'China', countryCode: 'CN', samples: 19228, violations: 0.2 },
    { country: 'Germany', countryCode: 'DE', samples: 13653, violations: 0.3 },
    { country: 'Russia', countryCode: 'RU', samples: 10186, violations: 0.8 },
    { country: 'USA', countryCode: 'US', samples: 6782, violations: 1.2 },
    { country: 'Japan', countryCode: 'JP', samples: 5706, violations: 0.2 },
    { country: 'India', countryCode: 'IN', samples: 3865, violations: 3.2 },
    { country: 'Canada', countryCode: 'CA', samples: 3846, violations: 1.1 },
    { country: 'Mexico', countryCode: 'MX', samples: 2252, violations: 1.4 },
    { country: 'Kazakhstan', countryCode: 'KZ', samples: 2174, violations: 1.9 },
    { country: 'South Africa', countryCode: 'ZA', samples: 2033, violations: 2.9 }
  ]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.[0]) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '200px' // Limit max width to avoid overflow
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <CountryFlag
              isoCode={data.countryCode}
              size={25}
              style={{ marginRight: '10px' }}
            />
            <p style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Orbitron, sans-serif' }}>
              {data.country}
            </p>
          </div>
          <p style={{ color: '#4CAF50', fontSize: '12px', fontFamily: 'Orbitron, sans-serif' }}>
            Samples Tested: {data.samples.toLocaleString()}
          </p>
          <p style={{ color: '#4CAF50', fontSize: '12px', fontFamily: 'Orbitron, sans-serif' }}>
            Violation Rate: {data.violations}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
        >
          <XAxis type="number" domain={[0, 4]} stroke="#fff" />
          <YAxis
            dataKey="country"
            type="category"
            stroke="#fff"
            width={100}
            tickFormatter={(value, index) => {
              const country = data[index];
              return `${country.country}`;
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="violations" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const StatsPage = () => {
  const navigation = useNavigation();

  const reports = [
    {
      type: 'WADA',
      component: <DopingStatsChart />,
      insights: [
        {
          icon: '📊',
          label: 'Most Samples Tested',
          value: 'China: 19,228 Samples'
        },
        {
          icon: '⚠️',
          label: 'Highest Violations',
          value: 'India: 3.2%'
        },
        {
          icon: '✅',
          label: 'Lowest Violation Rate',
          value: 'China & Japan: 0.2%'
        }
      ],
      courtesyText: 'Data courtesy of WADA Testing Report'
    }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212', // Plain background color
        padding: '10px',
        color: 'white',
        fontFamily: 'Orbitron, sans-serif',
        position: 'relative',
        overflowX: 'hidden', // Prevent horizontal scrolling
      }}
    >
      <div
        style={{
          maxHeight: '100vh',
          overflowY: 'auto',
          paddingRight: '10px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <header style={{
          textAlign: 'center',
          marginBottom: '16px',
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: 'white',
          }}>
            Anti-Doping Statistics
          </h1>
          <p style={{ color: '#4CAF50' }}>Global Testing Insights</p>
          <div style={{
            height: '4px',
            width: '60px',
            backgroundColor: '#4CAF50',
            margin: '16px auto 0',
          }} />
        </header>

        <div style={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: '10px',
        }}>
          {reports.map((report, index) => (
            <div key={index} style={{
              backgroundColor: 'rgba(18, 18, 18, 0.8)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px',
              border: '1px solid #4CAF50',
            }}>
              <div style={{ marginBottom: '16px' }}>{report.component}</div>

              <div>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: 'semibold',
                  color: '#4CAF50',
                  marginBottom: '12px',
                }}>
                  Key Insights
                </h2>
                <div>
                  {report.insights.map((insight, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: 'rgba(30, 30, 30, 0.8)',
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        border: '1px solid #4CAF50',
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{insight.icon}</span>
                      <div>
                        <p style={{ color: '#4CAF50', marginBottom: '4px' }}>
                          {insight.label}
                        </p>
                        <p style={{
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                          {insight.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p style={{
                color: '#4CAF50',
                textAlign: 'center',
                fontStyle: 'italic',
                marginTop: '16px',
              }}>
                {report.courtesyText}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigation.navigate('Home')}
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          backgroundColor: 'transparent',
          color: '#4CAF50',
          padding: '8px',
          borderRadius: '8px',
          border: '1px solid #4CAF50',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
        }}
      >
        <IoHome size={24} />
      </button>
    </div>
  );
};

export default StatsPage;
