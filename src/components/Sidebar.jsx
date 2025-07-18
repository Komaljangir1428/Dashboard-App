import React from 'react';
import { Link } from 'react-router-dom';
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill,
    BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsCart3 className='icon_header' /> SHOP
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to="/">
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/products">
                        <BsFillArchiveFill className='icon' /> Products
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/categories">
                        <BsFillGrid3X3GapFill className='icon' /> Categories
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/customers">
                        <BsPeopleFill className='icon' /> Customers
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/inventory">
                        <BsListCheck className='icon' /> Inventory
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/calendar">
                        <BsMenuButtonWideFill className='icon' /> Calendar
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/kanban">
                        <BsFillGearFill className='icon' /> Kanban
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
