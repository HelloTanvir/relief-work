import Link from 'next/link';
import { useState } from 'react';
import { AiTwotoneProject } from 'react-icons/ai';
import { BsArrowLeftRight } from 'react-icons/bs';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { VscOrganization } from 'react-icons/vsc';
import { Menu, MenuItem, ProSidebar, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="border-r shadow w-max h-[calc(100vh-57px)]">
            <ProSidebar width={200} collapsed={collapsed}>
                <SidebarHeader className="flex justify-end py-3 pr-5 bg-gray-200">
                    <BsArrowLeftRight
                        className="p-1 text-white bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600"
                        fontSize={22}
                        onClick={() => setCollapsed((prev) => !prev)}
                    />
                </SidebarHeader>

                <Menu iconShape="circle">
                    <Link href="/organizations" passHref>
                        <MenuItem icon={<VscOrganization />}>Organizations</MenuItem>
                    </Link>

                    <Link href="/projects" passHref>
                        <MenuItem icon={<AiTwotoneProject />}>Projects</MenuItem>
                    </Link>

                    <Link href="/beneficiaries" passHref>
                        <MenuItem icon={<MdOutlineFeaturedPlayList />}>Beneficiaries</MenuItem>
                    </Link>
                </Menu>
            </ProSidebar>
        </div>
    );
};

export default Sidebar;
