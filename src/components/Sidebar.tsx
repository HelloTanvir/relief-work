import Link from 'next/link';
import { AiTwotoneProject } from 'react-icons/ai';
import { VscOrganization } from 'react-icons/vsc';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Sidebar = () => (
    <div style={{ height: 'calc(100vh - 64px' }}>
        <ProSidebar style={{ height: '100%' }} image="/dark-background.jpg">
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

export default Sidebar;
