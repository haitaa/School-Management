import Image from "next/image";
import Link from "next/link";

import { Pagination } from "@/components/pagination";
import { Table } from "@/components/table";
import { TableSearch } from "@/components/table-search";

import { role, teachersData } from "@/lib/data";
import { FormModal } from "@/components/form-modal";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "hidden lg:table-cell",
  },
];

const renderRow = (item: TeacherList) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-haitaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt={item.name}
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">
        {item.subjects.map((subject) => subject.name).join(",")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((classItem) => classItem.name).join(",")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-haitaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-haitaPurple">
            //   <Image src={"/delete.png"} alt="" width={16} height={16} />
            // </button>
            <>
              <FormModal table="teacher" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const TeacherList = async ({
  searchParams,
}: {
  // Fonksiyon, `searchParams` adlı bir nesne alır. Bu nesne sorgu için filtreleri içerir.
  searchParams: { [key: string]: string | undefined };
}) => {
  // `searchParams` içinden `page` değişkenini ayıklıyoruz ve geri kalan parametreleri `queryParams` altında topluyoruz.
  const { page, ...queryParams } = searchParams;

  // Eğer `page` değeri varsa, bunu tamsayıya çeviriyoruz; yoksa varsayılan olarak 1. sayfayı kullanıyoruz.
  const p = page ? parseInt(page) : 1;

  // `Teacher` verilerini filtrelemek için bir sorgu nesnesi oluşturuyoruz.
  const query: Prisma.TeacherWhereInput = {};

  // Eğer `queryParams` içinde herhangi bir değer varsa kontrol ediyoruz.
  if (queryParams) {
    // `queryParams` içindeki her bir anahtar-değer çifti üzerinde döngü oluşturuyoruz.
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        // Anahtara göre `query` nesnesine özel filtreler ekliyoruz.
        switch (key) {
          // Eğer anahtar `classId` ise, öğretmenleri ilgili derslerin sınıfına göre filtreliyoruz.
          case "classId":
            query.lessons = {
              some: {
                // `classId` değerini tamsayıya çevirip sorguya ekliyoruz.
                classId: parseInt(value),
              },
            };
            break;

          // Eğer anahtar `search` ise, öğretmenlerin adında geçen kelimeye göre arama yapıyoruz.
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break; // Bu `case` bloğunda da break deyimi ekleyelim.
        }
      }
    }
  }

  // Prisma ile öğretmenleri bulmak ve toplam öğretmen sayısını almak için iki ayrı sorgu işlemini aynı anda yürütüyoruz.
  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      // Yukarıda oluşturduğumuz filtre sorgusuna göre öğretmenleri getiriyoruz.
      where: query,
      // Öğretmenlerle birlikte ilgili dersleri (`subjects`) ve sınıfları (`classes`) de getiriyoruz.
      include: {
        subjects: true,
        classes: true,
      },
      // Sayfa başına belirlenen öğretmen sayısını alıyoruz (`ITEM_PER_PAGE`).
      take: ITEM_PER_PAGE,
      // Kaçıncı sayfadan başlayacağımızı hesaplıyoruz.
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    // Aynı sorgu koşullarına göre öğretmen sayısını alıyoruz.
    prisma.teacher.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-haitaYellow">
              //   <Image src={"/plus.png"} alt="" width={14} height={14} />
              // </button>
              <FormModal table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default TeacherList;
