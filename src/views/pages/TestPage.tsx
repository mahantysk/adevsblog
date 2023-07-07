import { TabGroup } from "../../widgets/form/TabGroup";
export default function TestPage() {
  const tabs = [
    {
      id: "0",
      title: "Tab 1",
      content: "Content 1",
      active: true,
    },
    {
      id: "1",
      title: "Tab 2",
      content: "Content 2",
      active: true,
    },
    {
      id: "2",
      title: "Tab 3",
      content: "Content 3",
      active: true,
    },
  ];

  return (
    <div>
      <h1>Home Page</h1>
      <TabGroup tabs={tabs} />
    </div>
  );
}
