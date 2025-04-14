
// import React from 'react';
// import './details.css';
// import Header from "./Header";
// import Navigation from "./Navigation";

// import {
//   CurrencyRupeeIcon,
//   ChartBarIcon,
//   PlayCircleIcon,
//   StopIcon
// } from '@heroicons/react/24/outline';

// const Dashboard = () => {
//   return (
//     <div>
//       <Header />
//       <Navigation />
//       <div className="dashboard-container p-6">
//         <h2 className="section-title text-2xl font-semibold mb-6">Your Campaigns</h2>

//         <div className="campaign-summary flex flex-col items-center gap-6">
//           <div className="summary-card">
//             <div className="icon total-spend">
//               <CurrencyRupeeIcon className="h-8 w-8 text-blue-500" />
//             </div>
//             <div>
//               <p>Total Campaign Spend (All-time)</p>
//               <h3>₹ 0</h3>
//             </div>
//           </div>

//           <div className="summary-card">
//             <div className="icon total-campaign">
//               <ChartBarIcon className="h-8 w-8 text-green-500" />
//             </div>
//             <div>
//               <p>Total no of Campaign</p>
//               <h3>0</h3>
//             </div>
//           </div>

//           <div className="summary-card">
//             <div className="icon live-campaign">
//               <PlayCircleIcon className="h-8 w-8 text-yellow-500" />
//             </div>
//             <div>
//               <p>Campaigns Live</p>
//               <h3>0</h3>
//             </div>
//           </div>

//           <div className="summary-card">
//             <div className="icon ended-campaign">
//               <StopIcon className="h-8 w-8 text-red-500" />
//             </div>
//             <div>
//               <p>Campaigns Ended</p>
//               <h3>0</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       <footer className="text-center mt-6 text-gray-500">
//         <p>&copy; 2025 AdSpecta. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import './details.css';
import Header from "./Header";
import Navigation from "./Navigation";
import {
  CurrencyRupeeIcon,
  ChartBarIcon,
  PlayCircleIcon,
  StopIcon
} from '@heroicons/react/24/outline';

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebase'; // adjust path as needed
import { getAuth } from 'firebase/auth';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalSpend: 0,
    totalCampaigns: 0,
    liveCampaigns: 0,
    endedCampaigns: 0
  });

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const buyerId = user.uid;

        const q = query(
          collection(db, "Campaign_Data"),
          where("Buyer_ID", "==", buyerId)
        );

        const querySnapshot = await getDocs(q);

        let totalSpend = 0;
        let totalCampaigns = 0;
        let liveCampaigns = 0;
        let endedCampaigns = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          totalCampaigns++;

          if (data.Budget) {
            totalSpend += Number(data.Budget);
          }

          if (data["Campaign Status"] === "Live") {
            liveCampaigns++;
          } else if (data["Campaign Status"] === "Ended") {
            endedCampaigns++;
          }
        });

        setSummary({
          totalSpend,
          totalCampaigns,
          liveCampaigns,
          endedCampaigns
        });

      } catch (err) {
        console.error("Error fetching campaign data:", err);
      }
    };

    fetchCampaignData();
  }, []);

  return (
    <div>
      <Header />
      <Navigation />
      <div className="dashboard-container p-6">
        <h2 className="section-title text-2xl font-semibold mb-6">Your Campaigns</h2>

        <div className="campaign-summary flex flex-col items-center gap-6">
          <div className="summary-card">
            <div className="icon total-spend">
              <CurrencyRupeeIcon className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <p>Total Campaign Spend (All-time)</p>
              <h3>₹ {summary.totalSpend}</h3>
            </div>
          </div>

          <div className="summary-card">
            <div className="icon total-campaign">
              <ChartBarIcon className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <p>Total no of Campaign</p>
              <h3>{summary.totalCampaigns}</h3>
            </div>
          </div>

          <div className="summary-card">
            <div className="icon live-campaign">
              <PlayCircleIcon className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
              <p>Campaigns Live</p>
              <h3>{summary.liveCampaigns}</h3>
            </div>
          </div>

          <div className="summary-card">
            <div className="icon ended-campaign">
              <StopIcon className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <p>Campaigns Ended</p>
              <h3>{summary.endedCampaigns}</h3>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-6 text-gray-500">
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
