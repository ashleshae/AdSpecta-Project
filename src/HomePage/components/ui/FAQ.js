import React, { useState } from "react";
import "./homepage.css";

const FAQ = () => {
  const faqData = [
    {
      question: "What is AdSpecta?",
      answer:(
        <>
          <p>
            AdSpecta is an innovative media and advertising platform. The goal of AdSpecta is to bring accessibility, transparency, and efficiency to the ad buying process, making it easier for businesses of all sizes to plan, buy, and manage advertising campaigns.
          </p>
          <p>
            Launched with the mission to simplify advertising, AdSpecta empowers both experienced marketers and newcomers with a self-serve platform that offers equal opportunities for all. By focusing on affordability, and a seamless user experience, AdSpecta aims to disrupt traditional advertising practices and provide businesses with powerful tools to run successful campaigns.
          </p>
          <p>
            We aim to reshape the ad landscape and offer businesses a credible and efficient way to launch their marketing campaigns.
          </p>
        </>
      ),
      },
    {
      question: "How do you book an ad on AdSpecta?",
      answer:(
        <>
          <p>
            Planning an advertising strategy can be a complex process. Selecting the right media options, choosing optimal time slots, and securing cost-effective advertising rates often require expertise and industry knowledge.
          </p>
          <p>
            At AdSpecta, we simplify this process by offering a self-serve advertising platform that provides transparency and efficiency, eliminating the need for intermediaries. Whether you are a first-time advertiser or an experienced marketer, AdSpecta ensures a smooth end-to-end campaign execution.
          </p>
          <p>To book an ad on AdSpecta, follow these simple steps:</p>
          <ol>
            <li>Select the media option on the platform. AdSpecta provides thousands of advertising options across various media channels.</li>
            <li>Filter the available options based on category, advertising type, language, location, network, and other relevant parameters.</li>
            <li>Sort the advertising rates by top searches, categories, or languages, or explore a library of sample ads for reference.</li>
            <li>Choose a specific ad placement by clicking on a card to view all available advertising options and their respective rates.</li>
            <li>Select the most suitable option based on your budget and campaign goals, then click the submit button to request an express quote.</li>
          </ol>
          <p>
            With AdSpecta, advertising is made simple, cost-effective, and accessible to all businesses.
          </p>
        </>
      ),
      },
    {
      question: "Outdoor Advertising Agency",
      answer:(
        <>
          <p>
            AdSpecta helps brands maximize visibility with strategic outdoor advertising solutions. From billboards to transit ads, our platform offers a data-driven approach to ensure impactful campaigns. With expertise in planning and execution, we enable businesses to connect with their target audience effectively and cost-efficiently.
          </p>
        </>
      ),
      },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="white-section">
      <div className="faq-container">
    <h1>FAQ's</h1>
    {faqData.map((item, index) => (
      <div className="faq-item" key={index}>
        <div className="faq-question" onClick={() => toggleAnswer(index)}>
          {item.question}
          <span className="toggle-icon">
            {/* {openIndex === index ? "-" : "+"} */}
            <img 
                  src={openIndex === index ? "images/minus.png" : "images/plus.png"} 
                  alt={openIndex === index ? "Collapse" : "Expand"} 
                  width="20" 
                  height="20"
            />
          </span>
        </div>
        {openIndex === index && <div className="faq-answer">{item.answer}</div>}
      </div>
    ))}
  </div>
  </div>
    
  );
};

export default FAQ;