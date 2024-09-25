export const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-haitaSkyLight rounded-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            accusamus illo soluta a?
          </p>
        </div>
        <div className="bg-haitaPurpleLight rounded-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            accusamus illo soluta a?
          </p>
        </div>
        <div className="bg-haitaYellowLight rounded-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            accusamus illo soluta a?
          </p>
        </div>
      </div>
    </div>
  );
};
