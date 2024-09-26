import Image from "next/image";
import Link from "next/link";

import { Pagination } from "@/components/pagination";
import { Table } from "@/components/table";
import { TableSearch } from "@/components/table-search";

import { eventsData, resultsData, role } from "@/lib/data";

type Event = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

const columns = [
  {
    header: "Title",
    accessor: "Title",
  },
  {
    header: "Class Name",
    accessor: "className",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "Date",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "hidden lg:table-cell",
  },
];

const EventList = () => {
  const renderRow = (item: Event) => {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-haitaPurpleLight"
      >
        <td className="flex items-center gap-4 p-4">{item.title}</td>
        <td className="">{item.class}</td>
        <td className="hidden md:table-cell">{item.date}</td>
        <td className="hidden md:table-cell">{item.startTime}</td>
        <td className="hidden md:table-cell">{item.endTime}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/events/${item.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-haitaSky">
                <Image src={"/view.png"} alt="" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-haitaPurple">
                <Image src={"/delete.png"} alt="" width={16} height={16} />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-haitaYellow">
              <Image src={"/filter.png"} alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-haitaYellow">
              <Image src={"/sort.png"} alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-haitaYellow">
                <Image src={"/plus.png"} alt="" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={eventsData} />
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default EventList;
