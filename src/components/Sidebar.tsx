import Link from 'next/link';
import { useState } from 'react';
import { AiTwotoneProject } from 'react-icons/ai';
import { BsArrowLeftRight } from 'react-icons/bs';
import { VscOrganization } from 'react-icons/vsc';
import { Menu, MenuItem, ProSidebar, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div style={{ height: 'calc(100vh - 57px)' }} className="shadow border-r w-max">
            <ProSidebar width={250} collapsed={collapsed}>
                <SidebarHeader className="flex justify-end py-3 pr-5 bg-gray-200">
                    <BsArrowLeftRight
                        className="text-white rounded-full p-1 bg-gray-700 cursor-pointer hover:bg-gray-600"
                        fontSize={22}
                        onClick={() => setCollapsed((prev) => !prev)}
                    />
                </SidebarHeader>

                <Menu iconShape="circle">
                    <Link href="/login" passHref>
                        <MenuItem icon={<VscOrganization />}>Organizations</MenuItem>
                    </Link>

                    <Link href="/login" passHref>
                        <MenuItem icon={<AiTwotoneProject />}>Projects</MenuItem>
                    </Link>
                </Menu>
            </ProSidebar>
        </div>
    );
};

export default Sidebar;
