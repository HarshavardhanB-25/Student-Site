import SideNav from '@/app/components/dashboard/SideNav';
import Search from '@/app/components/search';
import userData from "../../../admin/user-data.json";

import GetResultForm from '@/app/components/dashboard/Form';

export default function Department() {
  const userRole = userData[0].role; 
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
      <SideNav userRole={userRole} />
      </div>
      
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-0">
          <Search placeholder="Search" />
        </div>
      </div>
      <div className="flex ">
      <GetResultForm
        heading="Get Student details"
        description="Get your details and edit them here."
      /> {/* Updated component */}
      </div>
    </div>
  );
}
