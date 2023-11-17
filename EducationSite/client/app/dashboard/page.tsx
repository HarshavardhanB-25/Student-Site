'use client'

import SideNav from '@/app/components/dashboard/SideNav';
import Search from '@/app/components/search';
import React, { useEffect, useState } from 'react';
import userData from "../../admin/user-data.json";
import RankTable from '../components/dashboard/RankTable';
import Reccard from '../components/dashboard/Reccard';
import Stat from '../components/dashboard/Stats';

 
export default function Layout({ children }: { children: React.ReactNode }) {
  const userRole = userData[0].role; 
  const [data, setData] = useState([]);
  const columns = [
    { name: 'SerialNumber', isNumeric: true },
    { name: 'Name' },
    { name: 'CollegeName' },
    { name: 'Percentage', isNumeric: true },
  ];

  useEffect(() => {
    fetch('your-database-endpoint')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  const [statContent1, setStatContent1] = useState('Data from database 1');
  const [statContent2, setStatContent2] = useState('Data from database 2');

  useEffect(() => {
   
    // fetchDataFromDatabase1().then(data => setStatContent1(data));
    // fetchDataFromDatabase2().then(data => setStatContent2(data));
  }, []);
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
      <SideNav userRole={userRole} />
      </div>
      
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-0">
            <Search placeholder="Search" />
        </div>
        <div className="mt-20 flex-grow p-6 gap-20  md:overflow-y-auto flex">
          <Reccard
            title="Welcome back user!"
            description="Always stay updated in your student portal"
            width="800px"
            height="160px"
            titleFontSize="2.00rem"
            descriptionFontSize="1rem"
          />
       <Stat
            stat1Heading="Stat 1"
            stat1Content={statContent1} // Pass data from the database
            stat2Heading="Stat 2"
            stat2Content={statContent2} // Pass data from the database
            width="400px"
            height="154px"
            titleFontSize="1.5rem"
            contentFontSize="1rem"
          />
      </div>
      <div className="container mt-40">
      <RankTable
      heading="Ranking present here is for demo purposes"
      content={data}
      columns={columns}
      width="100%"
      height="auto"
    />


      </div>
      </div>
    </div>
  );
}