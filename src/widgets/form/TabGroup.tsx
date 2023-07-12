import { ReactNode, useState, useEffect } from "react";

type Tab = {
  title: string;
  content: string | ReactNode;
  id: string;
  active: boolean;
};

export const TabGroup = (props: any) => {
  const tabsGroup = props.tabs;
  const [activeTab, setActiveTab] = useState("0");
  const [activeTabContent, setActiveTabContent] = useState(
    tabsGroup[activeTab].content
  );

  useEffect(() => {
    setActiveTabContent(tabsGroup[activeTab].content);
  }, [activeTab, tabsGroup]);

  const buildTabs = (tabs: Tab[]) => {
    return (
      <div className="flex justify-center">
        {tabs.map((tab: Tab) => {
          let activeClass = "border-b-2 text-gray-300";
          const isActive = tab.id === activeTab;
          if (isActive) {
            activeClass = "border-b-4 border-blue-400 text-blue-500";
          }
          const finalClasses =
            "flex flex-row p-3 cursor-pointer items-center " + activeClass;
          return (
            <>
              <div
                className={finalClasses}
                onClick={() => setActiveTab(tab.id)}
                key={tab.id}
              >
                <h1 className="text-2xl font-bold">{tab.title}</h1>
              </div>
            </>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col p-4 w-full">
      {buildTabs(tabsGroup)}
      <div className="p-4">{activeTabContent}</div>
    </div>
  );
};
