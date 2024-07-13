import AddProfile from "@/components/AddProfile";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-6 min-h-screen">
      <div className="bg-base-200">
        <ul className="menu text-base-content p-4">
          <li className="menu-title">Scheduler</li>
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
        <div className="flex justify-center">
          <AddProfile />
        </div>
      </div>
      <div className="col-span-5 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
