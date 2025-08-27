// import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/slices/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import IconUser from '../Icon/IconUser';
import IconInfoCircle from '../Icon/IconInfoCircle';
import IconChatNotification from '../Icon/IconChatNotification';
import Scrollbars from 'react-custom-scrollbars-2';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const [billSubMenu, setBillSubMenu] = useState(false);
    const [paymentSubMenu, setPaymentSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/logo1.png" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('Triliv')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <Scrollbars className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                           
                        <li className="nav-item">
                                <ul>
                                    {/* dashboard */}
                                <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard
                                         className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>

                                    <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('Overview')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/analytics">{t('Quick stats')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/finance">{t('Recent activity')}</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to="/crypto">{t('crypto')}</NavLink>
                                        </li> */}
                                    </ul>
                                </AnimateHeight>
                            </li>
                                    {/* profile  */}
                                    <li className="nav-item">
                                        <NavLink to="/profile/profile" className="group">
                                            <div className="flex items-center">
                                                <IconUser className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Profile')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* category  */}
                                    <li className="nav-item">
                                        <NavLink to="/category/categories" className="group">
                                            <div className="flex items-center">
                                                <IconUser className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Category')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* Information and prospectus  */}

                                    {/* <li className="nav-item">
                                        <NavLink to="/information/information-for-prospects" className="group">
                                            <div className="flex items-center">
                                                <IconInfoCircle className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Information for Prospects')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                                    {/* admission  */}
                                    {/* <li className="nav-item">
                                        <NavLink to="/admission/admission" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Admission Leads')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                                    
                                              {/* Products  */}

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Products' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Products')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Products')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Products' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Products' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/products/allproducts">{t('All Products')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/products/addnew">{t('Add New Products')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/products/categories">{t('Categories')}</NavLink>
                                                </li> */}
                                                <li>
                                                    <NavLink to="/products/brands">{t('Brands')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/products/inventory">{t('Inventory Management')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/products/product-reviews">{t('Product Reviews')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/preview">{t('View Classes')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/class/editclass">{t('Edit Classes')}</NavLink>
                                                </li> */}
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    {/* Orders  */}

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Orders' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Orders')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Orders')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Orders' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Orders' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/order/allorders">{t('All Orders')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/order/order-details">{t('Orders Details')}</NavLink>
                                                </li> */}
                                                <li>
                                                    <NavLink to="/order/delivered-order">{t('Delivered Order')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/order/refund-return">{t('Returns/Refunds')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/order/viewsubject">{t('Shipping Management')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/order/invoice/preview-invoice">{t('Invoice')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/preview">{t('View Subject')}</NavLink>
                                                </li> */}
                                               
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/edit">{t('Edit Subject')}</NavLink>
                                                </li> */}
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    {/* Custumers/users  */}

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Custumers/users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Custumers/users')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Custumers/users')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Custumers/users' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Custumers/users' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/customers/allcustomers">{t('All Customers')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/student/add-bulk-student">{t('Customers Groups')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/customers/support-message">{t('Customer Support message')}</NavLink>
                                                </li> */}
                                                
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/preview">{t('View Student')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/edit">{t('Edit Student')}</NavLink>
                                                </li> */}
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    {/* Payments  */}

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Payments' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Payments')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payments')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Payments' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Payments' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/transactions/transactions">{t('Transactions')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/transactions/payment-method">{t('Payments Method')}</NavLink>
                                                </li> */}
                                                <li>
                                                    <NavLink to="/transactions/refund-logs">{t('Refunds Logs')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/add">{t('add')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/edit">{t('Edit Teacher')}</NavLink>
                                                </li> */}
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    {/* Shipping */}

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Shipping' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Shipping')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Shipping')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Shipping' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Shipping' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                {/* <li>
                                                    <NavLink to="/shipping/shipping-methods">{t('Shipping Methods')}</NavLink>
                                                </li> */}
                                                <li>
                                                    <NavLink to="/shipping/add-zone">{t('Add Zone')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/shipping/shipping-zone-rate">{t('Shipping Zones / Rates')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/shipping/delivery-partners">{t('Delivery Partners')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/add">{t('add')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/edit">{t('Edit Exam')}</NavLink>
                                                </li> */}
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    {/* Coupons/Discount*/}

                                    {/* <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Coupons/Discount' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Coupons/Discount')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Coupons/Discount')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Coupons/Discount' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Coupons/Discount' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/attendance/student-atten">{t('Student Attendance')}</NavLink>
                                                </li>
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${
                                                    billSubMenu ? 'open' : ''
                                                } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setBillSubMenu(!billSubMenu)}
                                            >
                                                {t('Teacher Attendance')}
                                                <div className={`${billSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={billSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <a href="/attendance/teacher/upload-atten" target="_blank">
                                                            {t('Upload Attendance')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/attendance/teacher/view-atten" target="_blank">
                                                            {t('View Attendance')}
                                                        </a>
                                                    </li>
                                                    
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                               
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}

                                    {/* Coupons/Discount */}

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Coupons/Discount' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Coupons/Discount')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Coupons/Discount')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Coupons/Discount' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Coupons/Discount' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/couponsdiscount/all-coupons">{t('All Coupons')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/couponsdiscount/create-coupons">{t('Create Coupons')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/timetable/view-timetable">{t('Discount Rule')}</NavLink>
                                                </li> */}
                                               
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    {/*  Reports / Analytics  */}
{/* 
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Reports/Analytics' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Reports/Analytics')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Reports/Analytics')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Reports/Analytics' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Reports/Analytics' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/apps/invoice/list">{t('Sales Reports')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/list">{t('Order Reports')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/result/view-result">{t('Product Performance')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/add">{t('Customer Analytics')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="//result/view-result">{t('Abandoned Carts')}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}
                                    {/* Invoices & Tax  */}

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Invoices & Tax' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Invoices & Tax')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Invoices & Tax')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Invoices & Tax' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Invoices & Tax' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/invoiceandtax/invoice-setting">{t('Invoice Settings ')}</NavLink>
                                                </li>
                                               
                                                {/* <li>
                                                    <NavLink to="/syllabus/view-syllabus">{t('Tax Configuration ')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/add">{t('GST/VAT Settings (if applicable)')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/edit">{t('Edit Syllabus ')}</NavLink>
                                                </li> */}
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    {/*Admin Management */}

                                    {/* <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Admin Management' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Admin Management')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Admin Management')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Admin Management' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Admin Management' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/adminuserrole/admin-user">{t('Admin Users / Roles ')}</NavLink>
                                                </li>
                                               
                                                <li>
                                                    <NavLink to="/adminuserrole/permissions">{t('Permissions')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/adminuserrole/activity-logs">{t('Activity Logs')}</NavLink>
                                                </li>
                                               
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}

                                    {/* Contact / Support */}

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Contact / Support' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Contact / Support')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Contact / Support')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Contact / Support' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Contact / Support' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                {/* <li>
                                                    <NavLink to="/contactsupport/contact-message">{t('Contact Messages ')}</NavLink>
                                                </li> */}
                                                <li>
                                                    <NavLink to="/contactsupport/chat">{t('Support Tickets ')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/contactsupport/support-tickets">{t('Support Tickets ')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/studenttransferreq/request-status">{t('FAQs ')}</NavLink>
                                                </li> */}
                                               
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/preview">{t('List of Student Applied for Transfer')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/add">{t('add')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/apps/invoice/edit">{t('Edit Role ')}</NavLink>
                                                </li> */}
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    {/* cms page */}

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'CMS Page' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('CMS Page')}>
                                            <div className="flex items-center">
                                                <IconChatNotification className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('CMS Page')}</span>
                                            </div>

                                            <div className={currentMenu !== 'CMS Page' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'CMS Page' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/cmspage/home-banners">{t('Home Page Banners')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/cmspage/home-banners-2">{t('Home Page-2')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/cmspage/home-banners-3">{t('Home Page-3')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/cmspage/whyshops">{t('Why Shop')}</NavLink>
                                                </li>
                                               
                                                <li>
                                                    <NavLink to="/cmspage/aboutus">{t('About Us')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/cmspage/contact">{t('Contact Page')}</NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink to="/notification/single-class">{t('Single Class ')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/notification/whole-institute">{t('Terms & Policies')}</NavLink>
                                                </li> */}
                                                {/* <li>
                                                    <NavLink to="/notification/view-notifications">{t('View Notifications Sent ')}</NavLink>
                                                </li> */}
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    {/* contact messages */}
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'contact messages' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('contact messages')}>
                                            <div className="flex items-center">
                                                <IconChatNotification className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Contact Messages')}</span>
                                            </div>

                                            <div className={currentMenu !== 'contact messages' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'contact messages' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                               
                                                <li>
                                                    <NavLink to="/contactmessages/contact-messages">{t('contact-messages')}</NavLink>
                                                </li>
                                               
                                              
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    {/* plans and offers  */}

                                    {/* <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Plans & Offers' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Plans & Offers')}>
                                            <div className="flex items-center">
                                                <IconChatNotification className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Plans & Offers')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Plans & Offers' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Plans & Offers' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/plans-&-offers/plans">{t('Plans')}</NavLink>
                                                </li>
                                               
                                                <li>
                                                <NavLink to="/plans-&-offers/offers">{t('Offers')}</NavLink>
                                                </li>
                                                
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}
                                    {/* bills and payments */}

                                    {/* <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Bills & Payments' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Bills & Payments')}>
                                            <div className="flex items-center">
                                                <IconChatNotification className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Bills & Payments')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Bills & Payments' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'Bills & Payments' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/bills&payments/bills">{t('Bills')}</NavLink>
                                                </li>
                                               
                                                <li>
                                                <NavLink to="/bills&payments/payments">{t('Payments')}</NavLink>
                                                </li>
                                                
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                       */}
                                      {/* plans and offers */}

                                    {/* <li className="nav-item">
                                        <NavLink to="/apps/notes" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Plans & Offers')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}

                                     {/* Bills &Payment */}
{/* 
                                     <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'Bills &Payment' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Bills &Payment')}>
                                    <div className="flex items-center">
                                        <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Bills &Payment')}</span>
                                    </div>

                                    <div className={currentMenu !== 'Bills &Payment' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'Bills &Payment' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        bills 
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${
                                                    billSubMenu ? 'open' : ''
                                                } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setBillSubMenu(!billSubMenu)}
                                            >
                                                {t('Bills')}
                                                <div className={`${billSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={billSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <a href="/bills&payments/bills/leadcommission" target="_blank">
                                                            {t('Lead Commission')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/bills&payments/bills/lsmpayment" target="_blank">
                                                            {t('LMS Payment')}
                                                        </a>
                                                    </li>
                                                    
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        payment 
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${
                                                    paymentSubMenu ? 'open' : ''
                                                } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setPaymentSubMenu(!paymentSubMenu)}
                                            >
                                                {t('payment')}
                                                <div className={`${paymentSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={paymentSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <a href="/bills&payments/payments/duepayment" target="_blank">
                                                            {t('Due Payments')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                    <a href="/bills&payments/payments/transaction" target="_blank">
                                                            {t('Transactions')}
                                                        </a>
                                                    </li>
                                                    
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                       
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                             {/* support */}

                             {/* <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'support' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('support')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('support')}</span>
                                            </div>

                                            <div className={currentMenu !== 'support' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'support' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/support/ticket-genrate">{t('Ticket Genrate')}</NavLink>
                                                </li>
                                               
                                                <li>
                                                    <NavLink to="/support/status-of-ticket">{t('View Ticket Status')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/support/contact-information">{t('Contact Information')}</NavLink>
                                                </li>
                                                
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}
                                      

                                       {/* FAQ */}

                                    <li className="nav-item">
                                        <NavLink to="/faqs/faqlist" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('FAQs')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                       {/* Terms & condition */}

                                    <li className="nav-item">
                                        <NavLink to="/terms&conditions/terms-and-conditions" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Terms & condition')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                       {/* Privacy Policy */}

                                    <li className="nav-item">
                                        <NavLink to="/privacy&policy/privacy-policy" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Privacy Policy')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                       {/* Refund Policy */}

                                    <li className="nav-item">
                                        <NavLink to="/refund&policy/refund-policy" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Refund Policy')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/shippinginfo/shipping-info" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Shipping Info')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/shippinginfo/shipping-info" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Shipping Info')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                   
                                </ul>
                            </li>






                            
                         



                        </ul>
                    </Scrollbars>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
