'use client';
import React, { useState } from 'react';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';
import { useSpring, animated } from 'react-spring';
import Navbar from '@/components/Navbar';

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Start');

  const { value: value1, reset: resetValue1 } = useCountUp({
    isCounting: isLoading,
    duration: 1,
    start: 0,
    end: 25,
    onComplete: () => {
      setIsLoading(false);
      setButtonLabel('Reset');
    },
  });

  const { value: value2, reset } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: 67,
  });

  const handleButtonClick = () => {
    if (isLoading) {
      setIsLoading(false);
      setButtonLabel('Start');
      resetValue1();
    } else if (buttonLabel === 'Reset') {
      setButtonLabel('Start');
      resetValue1();
    } else {
      setIsLoading(true);
      setButtonLabel('Reset');
    }
  };

  const numericValue1 = parseFloat(value1);
const numericValue2 = parseFloat(value2);

  return (
    <>
      <div>
      <Navbar/>

      </div>
      
      <div className='flex space-x-5 font-bold text-black justify-evenly gap-x-10'>
        <div className='flex-col items-center justify-center space-y-4 h-96'>
            <div className='ml-36'>
              <CircularProgress size="lg" determinate value={numericValue2 }>
                <Typography>{numericValue2}%</Typography>
              </CircularProgress>
            </div>
            <div>
              <h1 className='text-2xl' size="lg" variant="outlined" color="neutral" >
                Total Orders Placed Succesfully
              </h1>
            </div>
            
          </div>

          <div className='flex-col items-center justify-center space-y-4'>
          <div className='ml-22'>
            <CircularProgress size="lg" determinate value={numericValue2 /1.5}>
              <Typography>{numericValue2}</Typography>
            </CircularProgress>
          </div>
          <div>
            <h1 className='text-2xl' size="sm" variant="outlined" color="neutral" >
              Total Products 
            </h1>
          </div>
          
        </div>


        <div className='flex-col items-center justify-center space-y-4'>
          <div>
            <CircularProgress size="lg" determinate value={numericValue2 }>
              <Typography>{numericValue2}%</Typography>
            </CircularProgress>
          </div>
          <div>
            <h1 className='text-2xl' size="sm" variant="outlined" color="neutral" >
              Reviews Succesfully Placed
            </h1>
          </div>
          
        </div>
      </div>
       
    </>
  );
};

export default Dashboard;