import React, { useState } from "react";

type Tab = {
  id: string;
  label: string;
};

const tabData: Tab[] = [
  { id: "general", label: "General" },
  { id: "tech", label: "Tech" },
  { id: "random", label: "Random" },
];

type FAQItemData = {
  question: string;
  answer: string;
};

const faqData: { [key: string]: FAQItemData[] } = {
  general: [
    {
      question: "What is SwiftAid?",
      answer:
        "SwiftAid is an AI-powered disaster response platform designed to help relief teams quickly identify and prioritize victims and their needs in disaster-affected areas.",
    },
    {
      question: "Who can use this platform?",
      answer:
        "SwiftAid is primarily built for organizations like the National Disaster Response Force (NDRF), NGOs, and other emergency response teams. However, local authorities and volunteers can also benefit from its insights.",
    },
    {
      question: "How does SwiftAid help during disasters?",
      answer:
        "SwiftAid aggregates real-time data from social media, news, and official reports, processes it using AI, and visualizes key information to assist in efficient decision-making and aid delivery.",
    },
    {
      question: "What makes SwiftAid unique?",
      answer:
        "SwiftAid combines AI-powered data analysis, interactive maps, and workflow automation to provide real-time insights, making disaster response faster and more efficient.",
    },
  ],
  tech: [
    {
      question: "What technologies power SwiftAid?",
      answer:
        "SwiftAid uses advanced AI models like NLP for text analysis and computer vision for image recognition. The tech stack includes React for frontend, Node.js/Python for backend, and cloud services for scalability.",
    },
    {
      question: "How does the platform ensure data accuracy?",
      answer:
        "SwiftAid cross-references data from multiple sources and uses AI-driven verification techniques to filter out false or noisy information.",
    },
    {
      question: "Is the platform scalable for large-scale disasters?",
      answer:
        "Yes, SwiftAid is built on a cloud-based infrastructure, ensuring it can handle high data volumes and provide real-time insights during large-scale disasters.",
    },
    {
      question: "How secure is the data collected by SwiftAid?",
      answer:
        "Data security is a top priority. All sensitive data is encrypted and stored securely, and the platform adheres to international data protection standards like GDPR.",
    },
  ],
  random: [
    {
      question: "Can the platform be used for training or simulations?",
      answer:
        "Yes, SwiftAid can be used for disaster response training and simulations, helping teams prepare for real-life scenarios.",
    },
    {
      question: "Does SwiftAid work in regions with limited internet access?",
      answer:
        "SwiftAid is designed to operate in challenging conditions. It can cache critical data locally for use in areas with poor connectivity, although some features require internet access.",
    },
    {
      question: "Can the platform integrate with existing tools and systems?",
      answer:
        "Yes, SwiftAid supports integration with other tools and systems through APIs, enabling seamless collaboration and data sharing.",
    },
    {
      question: "How often is SwiftAid updated with new features?",
      answer:
        "SwiftAid is continually updated based on feedback and advancements in technology to ensure it remains effective in disaster response scenarios.",
    },
  ],
};

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className="mb-4 border-b border-[#e4e4e7] pb-4 dark:border-[#27272a]">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={onClick}
      >
        <span className="text-lg font-medium">{question}</span>
        <div>
          <svg
            className={`size-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
              isOpen ? "rotate-45" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 dark:text-gray-400">{answer}</div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl text-gray-800 dark:text-gray-200 sm:p-6">
      <h1 className="mb-4 text-center text-3xl font-bold">
        <span className="bg-gradient-to-r from-green-500 via-blue-600 to-purple-500 bg-clip-text text-transparent">
          SwiftAid{" "}
        </span>{" "}
        FAQ
      </h1>
      <p className="mb-12 text-center text-gray-600 dark:text-gray-400">
        Get answers about our AI-driven disaster response platform and how it
        accelerates relief efforts.
      </p>

      <div className="mx-auto mb-10 flex max-w-lg space-x-1 rounded-lg border border-gray-300 p-1 dark:border-[#27272a]">
        {tabData.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? "border border-[#e4e4e7] bg-gray-300/40 font-semibold dark:border-[#27272a] dark:bg-gray-700/10"
                : "border border-transparent text-gray-500 hover:bg-gray-300/40 hover:dark:border-[#27272a] hover:dark:bg-gray-700/10 hover:dark:text-gray-300"
            }`}
            onClick={() => {
              setActiveTab(tab.id);
              setOpenItem(null);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="transition-opacity duration-200">
        {faqData[activeTab].map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openItem === index}
            onClick={() => setOpenItem(openItem === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
