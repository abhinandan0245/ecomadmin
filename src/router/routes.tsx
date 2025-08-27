import { lazy } from 'react';
// import PrivateRoute from '../components/PrivateRoute';

const Index = lazy(() => import('../pages/Index'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Finance = lazy(() => import('../pages/Finance'));
const Crypto = lazy(() => import('../pages/Crypto'));
const Todolist = lazy(() => import('../pages/Apps/Todolist'));
const Mailbox = lazy(() => import('../pages/Apps/Mailbox'));
const Notes = lazy(() => import('../pages/Apps/Notes'));
const Contacts = lazy(() => import('../pages/Apps/Contacts'));
const Chat = lazy(() => import('../pages/Apps/Chat'));
const Scrumboard = lazy(() => import('../pages/Apps/Scrumboard'));
const Calendar = lazy(() => import('../pages/Apps/Calendar'));
const List = lazy(() => import('../pages/Apps/Invoice/List'));
const Preview = lazy(() => import('../pages/Apps/Invoice/Preview'));
const Add = lazy(() => import('../pages/Apps/Invoice/Add'));
const Edit = lazy(() => import('../pages/Apps/Invoice/Edit'));
const Tabs = lazy(() => import('../pages/Components/Tabs'));
const Accordians = lazy(() => import('../pages/Components/Accordians'));
const Modals = lazy(() => import('../pages/Components/Modals'));
const Cards = lazy(() => import('../pages/Components/Cards'));
const Carousel = lazy(() => import('../pages/Components/Carousel'));
const Countdown = lazy(() => import('../pages/Components/Countdown'));
const Counter = lazy(() => import('../pages/Components/Counter'));
const SweetAlert = lazy(() => import('../pages/Components/SweetAlert'));
const Timeline = lazy(() => import('../pages/Components/Timeline'));
const Notification = lazy(() => import('../pages/Components/Notification'));
const MediaObject = lazy(() => import('../pages/Components/MediaObject'));
const ListGroup = lazy(() => import('../pages/Components/ListGroup'));
const PricingTable = lazy(() => import('../pages/Components/PricingTable'));
const LightBox = lazy(() => import('../pages/Components/LightBox'));
const Alerts = lazy(() => import('../pages/Elements/Alerts'));
const Avatar = lazy(() => import('../pages/Elements/Avatar'));
const Badges = lazy(() => import('../pages/Elements/Badges'));
const Breadcrumbs = lazy(() => import('../pages/Elements/Breadcrumbs'));
const Buttons = lazy(() => import('../pages/Elements/Buttons'));
const Buttongroups = lazy(() => import('../pages/Elements/Buttongroups'));
const Colorlibrary = lazy(() => import('../pages/Elements/Colorlibrary'));
const DropdownPage = lazy(() => import('../pages/Elements/DropdownPage'));
const Infobox = lazy(() => import('../pages/Elements/Infobox'));
const Jumbotron = lazy(() => import('../pages/Elements/Jumbotron'));
const Loader = lazy(() => import('../pages/Elements/Loader'));
const Pagination = lazy(() => import('../pages/Elements/Pagination'));
const Popovers = lazy(() => import('../pages/Elements/Popovers'));
const Progressbar = lazy(() => import('../pages/Elements/Progressbar'));
const Search = lazy(() => import('../pages/Elements/Search'));
const Tooltip = lazy(() => import('../pages/Elements/Tooltip'));
const Treeview = lazy(() => import('../pages/Elements/Treeview'));
const Typography = lazy(() => import('../pages/Elements/Typography'));
const Widgets = lazy(() => import('../pages/Widgets'));
const FontIcons = lazy(() => import('../pages/FontIcons'));
const DragAndDrop = lazy(() => import('../pages/DragAndDrop'));
const Tables = lazy(() => import('../pages/Tables'));
const Basic = lazy(() => import('../pages/DataTables/Basic'));
const Advanced = lazy(() => import('../pages/DataTables/Advanced'));
const Skin = lazy(() => import('../pages/DataTables/Skin'));
const OrderSorting = lazy(() => import('../pages/DataTables/OrderSorting'));
const MultiColumn = lazy(() => import('../pages/DataTables/MultiColumn'));
const MultipleTables = lazy(() => import('../pages/DataTables/MultipleTables'));
const AltPagination = lazy(() => import('../pages/DataTables/AltPagination'));
const Checkbox = lazy(() => import('../pages/DataTables/Checkbox'));
const RangeSearch = lazy(() => import('../pages/DataTables/RangeSearch'));
const Export = lazy(() => import('../pages/DataTables/Export'));
const ColumnChooser = lazy(() => import('../pages/DataTables/ColumnChooser'));
// const Profile = lazy(() => import('../pages/Users/Profile'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const ContactUsBoxed = lazy(() => import('../pages/Pages/ContactUsBoxed'));
const ContactUsCover = lazy(() => import('../pages/Pages/ContactUsCover'));
// const Faq = lazy(() => import('../pages/Pages/Faq'));
const ComingSoonBoxed = lazy(() => import('../pages/Pages/ComingSoonBoxed'));
const ComingSoonCover = lazy(() => import('../pages/Pages/ComingSoonCover'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const LoginBoxed = lazy(() => import('../pages/auth/Login'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const UnlockBoxed = lazy(() => import('../pages/Authentication/UnlockBox'));
const RecoverIdBoxed = lazy(() => import('../pages/Authentication/RecoverIdBox'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RegisterCover = lazy(() => import('../pages/Authentication/RegisterCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));
const About = lazy(() => import('../pages/About'));
const Error = lazy(() => import('../components/Error'));
const Charts = lazy(() => import('../pages/Charts'));
const FormBasic = lazy(() => import('../pages/Forms/Basic'));
const FormInputGroup = lazy(() => import('../pages/Forms/InputGroup'));
const FormLayouts = lazy(() => import('../pages/Forms/Layouts'));
const Validation = lazy(() => import('../pages/Forms/Validation'));
const InputMask = lazy(() => import('../pages/Forms/InputMask'));
const Select2 = lazy(() => import('../pages/Forms/Select2'));
const Touchspin = lazy(() => import('../pages/Forms/TouchSpin'));
const CheckBoxRadio = lazy(() => import('../pages/Forms/CheckboxRadio'));
const Switches = lazy(() => import('../pages/Forms/Switches'));
const Wizards = lazy(() => import('../pages/Forms/Wizards'));
const FileUploadPreview = lazy(() => import('../pages/Forms/FileUploadPreview'));
const QuillEditor = lazy(() => import('../pages/Forms/QuillEditor'));
const MarkDownEditor = lazy(() => import('../pages/Forms/MarkDownEditor'));
const DateRangePicker = lazy(() => import('../pages/Forms/DateRangePicker'));
const Clipboard = lazy(() => import('../pages/Forms/Clipboard'));
const AddNew = lazy(() => import('../pages/products/AddNew'));
// const EditClass = lazy(() => import('../pages/class/EditClass'));
const AllProducts = lazy(() => import('../pages/products/AllProducts'));
const Categories = lazy(() => import('../pages/category/Categories'));
const AddNewCat = lazy(() => import('../pages/category/AddNewCat'));
const Brands = lazy(() => import('../pages/products/Brands'));
const AddBrand = lazy(() => import('../pages/products/AddBrand'));
const Inventory = lazy(() => import('../pages/products/Inventory'));
const ProductReviews = lazy(() => import('../pages/products/ProductReviews'));
const AllOrders = lazy(() => import('../pages/order/AllOrders'));
const OrderDetails = lazy(() => import('../pages/order/OrderDetails'));
const DeliveredOrder = lazy(() => import('../pages/order/DeliveredOrder'));
const RefundReturn = lazy(() => import('../pages/order/RefundReturn'));
const ReturnView = lazy(() => import('../pages/order/ReturnView'));
const PreviewInvoice = lazy(() => import('../pages/order/Invoice/PreviewInvoice'));
const AddInvoice = lazy(() => import('../pages/order/Invoice/AddInvoice'));
const EditInvoice = lazy(() => import('../pages/order/Invoice/EditInvoice'));

const AllCustomers = lazy(() => import('../pages/customers/AllCustomers'));
const CustomerProfile = lazy(() => import('../pages/customers/CustomerProfile'));
const SupportMessage = lazy(() => import('../pages/customers/SupportMessage'));

const Transactions = lazy(() => import('../pages/transactions/Transactions')); 
const TransactionDetail = lazy(() => import('../pages/transactions/transactionDetails')); 
const PaymentMethod = lazy(() => import('../pages/transactions/PaymentMethod')); 
const RefundLogs = lazy(() => import('../pages/transactions/RefundLogs')); 
const ShippingMethods = lazy(() => import('../pages/shipping/ShippingMethods')); 
const ShippingZoneRate = lazy(() => import('../pages/shipping/ShippingZoneRate')); 
const DeliveryPartners = lazy(() => import('../pages/shipping/DeliveryPartners')); 

const AllCoupons = lazy(() => import('../pages/couponsdiscount/AllCoupons')); 
const CreateCoupons = lazy(() => import('../pages/couponsdiscount/CreateCoupons')); 

const InvoiceSetting = lazy(() => import('../pages/invoiceandtax/InvoiceSetting')); 



const ContactMessage = lazy(() => import('../pages/contactsupport/ContactMessage')); 
const ViewMessage = lazy(() => import('../pages/contactsupport/ViewMessage')); 
const SupportTickets = lazy(() => import('../pages/contactsupport/SupportTickets')); 
const ViewReply = lazy(() => import('../pages/contactsupport/ViewReply')); 
const Chats = lazy(() => import('../pages/contactsupport/Chats')); 

const HomeBanners = lazy(() => import('../pages/cmspage/HomeBanners')); 
const HomeBanners2 = lazy(() => import('../pages/cmspage/HomeBanners2')); 
const HomeBanners3 = lazy(() => import('../pages/cmspage/HomeBanners3')); 
const HomeBanners4 = lazy(() => import('../pages/cmspage/HomeBanners4')); 
const AddBanner = lazy(() => import('../pages/cmspage/AddBanner')); 
const AddBanner2 = lazy(() => import('../pages/cmspage/AddBanner2')); 
const AddBanner3 = lazy(() => import('../pages/cmspage/AddBanner3')); 
const AddBanner4 = lazy(() => import('../pages/cmspage/AddBanner4')); 
const Aboutus = lazy(() => import('../pages/cmspage/Aboutus')); 
const Contact = lazy(() => import('../pages/cmspage/Contact')); 

const FaqList = lazy(() => import('../pages/faqs/FaqList')); 



const Information = lazy(() => import('../pages/information/Information'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const ChangePassword = lazy(() => import('../pages/profile/ChangePassword'));
const TicketGenrate = lazy(() => import('../pages/support/TicketGenrate'));
const ContactInfo = lazy(() => import('../pages/support/ContactInfo'));
const StatusOfTicket = lazy(() => import('../pages/support/StatusOfTicket'));
const ManageStatus = lazy(() => import('../pages/support/ManageStatus'));
const Plans = lazy(() => import('../pages/plans&offers/Plans'));
const Offers = lazy(() => import('../pages/plans&offers/Offers'));
const Faq = lazy(() => import('../pages/Pages/Faq'));

const TermsAndConditions = lazy(() => import('../pages/terms&conditions/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('../pages/Privacy&policy/PrivacyPolicy'));
const ShippingInfo = lazy(() => import('../pages/shippinginfo/ShippingInfo'));
const ContactMessages = lazy(() => import('../pages/contactmessages/ContactMessages'));
const RefundPolicy = lazy(() => import('../pages/refund&policy/Refund&policy'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const AddZone = lazy(() => import('../pages/shipping/AddZone'));
// const Dashboard = lazy(() => import('../pages/Dashboard'));

const routes = [

       // dashboard
    {
        path: '/',
        element: <Index />,
        protected: true,
    },

    //  admission

    //  profile
    {
        path: '/profile/profile',
        element: <Profile />,
         protected: true,
    },
    //  change password 
    {
        path: '/profile/change-password',
        element: <ChangePassword />,
         protected: true,
    },
    //  Information for prospects
    {
        path: '/information/information-for-prospects',
        element: <Information />,
         protected: true,
    },
    // category 
    {
        path: '/category/categories',
        element: <Categories />,
         protected: true,
    },
    {
        path: '/category/addnewcat',
        element: <AddNewCat />,
         protected: true,
    },
    {
        path: '/category/edit-category/:id',
        element: <AddNewCat />,
         protected: true,
    },
    //  Products managemnent 
    {
        path: '/products/addnew',
        element: <AddNew/>,
         protected: true,
    },
    {
        path: '/products/edit-product/:id',
        element: <AddNew/>,
         protected: true,
    },
    
    {
        path: '/products/allproducts',
        element: <AllProducts />,
         protected: true,
    },
    
    {
        path: '/products/brands',
        element: <Brands />,
         protected: true,
    },
    {
        path: '/products/addbrand',
        element: <AddBrand />,
         protected: true,
    },
    {
    path: '/products/edit/:id',
    element: <AddBrand />,
    protected: true,
},
    {
        path: '/products/inventory',
        element: <Inventory />,
         protected: true,
    },
    {
        path: '/products/product-reviews',
        element: <ProductReviews />,
         protected: true,
    },
    
    //  order managemnent 
    {
        path: '/order/allorders',
        element: <AllOrders />,
         protected: true,
    },   
    {
        path: '/order/order-details/:id',
        element: <OrderDetails />,
         protected: true,
    },   
    {
        path: '/order/delivered-order', 
        element: <DeliveredOrder />,
         protected: true,
    },   
    {
        path: '/order/refund-return',
        element: <RefundReturn />,
         protected: true,
    },   
    {
        path: '/order/return-view',
        element: <ReturnView />,
         protected: true,
    },   
    {
        path: '/order/invoice/preview-invoice',
        element: <PreviewInvoice />,
         protected: true,
    },   
    {
        path: '/order/invoice/add-invoice',
        element: <AddInvoice />,
         protected: true,
    },   
    {
        path: '/order/invoice/edit-invoice',
        element: <EditInvoice />,
         protected: true,
    },   
   
    //  customers/users managemnent 
    {
        path: '/customers/allcustomers',
        element: <AllCustomers />,
         protected: true,
    },   
    {
        path: '/customers/customer/:id',
        element: <CustomerProfile />,
         protected: true,
    },   
    
    {
        path: '/customers/support-message',
        element: <SupportMessage />,
         protected: true,
    },
    //  payment managemnent 
    {
        path: '/transactions/transactions',
        element: <Transactions />,
         protected: true,
    },   
    {
        path: '/transactions/details/:id',
        element: <TransactionDetail />,
         protected: true,
    },   
    {
        path: '/transactions/payment-method',
        element: <PaymentMethod/>,
         protected: true,
    },   
    {
        path: '/transactions/refund-logs',
        element: <RefundLogs/>,
         protected: true,
    },   
   
   

    //  Shipping managemnent 
    {
        path: '/shipping/add-zone',
        element: <AddZone />,
         protected: true,
    },
    {
        path: '/shipping/shipping-methods',
        element: <ShippingMethods />,
         protected: true,
    },
    {
        path: '/shipping/shipping-zone-rate',
        element: <ShippingZoneRate />,
         protected: true,
    },
    {
        path: '/shipping/delivery-partners',
        element: <DeliveryPartners />,
         protected: true,
    },
    
    //  couponse discounts managemnent 
    {
        path: '/couponsdiscount/all-coupons',
        element: <AllCoupons />,
         protected: true,
    },
    {
        path: '/couponsdiscount/create-coupons/:id?',
        element: <CreateCoupons />,
         protected: true,
    },
    
    

    //  Invoice tax managemnent 
    {
        path: '/invoiceandtax/invoice-setting',
        element: <InvoiceSetting />,
         protected: true,
    },   
   
    //  admin User role managemnent 
     
    
    //  Contact support managemnent 
    {
        path: '/contactsupport/contact-message',
        element: <ContactMessage />,
         protected: true,
    },   
    {
        path: '/contactsupport/chat',
        element: <Chats />,
         protected: true,
    },   
    {
        path: '/contactsupport/view-message',
        element: <ViewMessage />,
         protected: true,
    },   
    {
        path: '/contactsupport/support-tickets',
        element: <SupportTickets />,
         protected: true,
    },   
    {
        path: '/contactsupport/view-reply',
        element: <ViewReply />,
         protected: true,
    },   
      


    //  cms page managemnent 
    {
        path: '/cmspage/home-banners',
        element: <HomeBanners />,
         protected: true,
    },   
    {
        path: '/cmspage/home-banners-2',
        element: <HomeBanners2 />,
         protected: true,
    },   
    {
        path: '/cmspage/home-banners-3',
        element: <HomeBanners3 />,
         protected: true,
    },   
    {
        path: '/cmspage/whyshops',
        element: <HomeBanners4 />,
         protected: true,
    },   
    {
        path: '/cmspage/add-banner/:id?',
        element: <AddBanner />,
         protected: true,
    },   
    {
        path: '/cmspage/add-banner2/:id?',
        element: <AddBanner2 />,
         protected: true,
    },   
    {
        path: '/cmspage/add-banner3/:id?',
        element: <AddBanner3 />,
         protected: true,
    },   
    {
        path: '/cmspage/whyshop/:id?',
        element: <AddBanner4 />,
         protected: true,
    },   
    {
        path: '/cmspage/aboutus',
        element: <Aboutus />,
         protected: true,
    },   
    {
        path: '/cmspage/contact',
        element: <Contact />,
         protected: true,
    },   
     
    //  faqs managemnent 
    {
        path: '/faqs/faqlist',
        element: <FaqList />,
         protected: true,
    },   
   
    
   

 

    // support 
    {
        path: '/support/ticket-genrate',
        element: <TicketGenrate />,
         protected: true,
    },   
    {
        path: '/support/contact-information',
        element: <ContactInfo />,
         protected: true,
    },   
    {
        path: '/support/status-of-ticket',
        element: <StatusOfTicket />,
         protected: true,
    },   
    {
        path: '/support/manage-status',
        element: <ManageStatus />,
         protected: true,
    },   
    // plans and offers
    {
        path: '/plans-&-offers/plans',
        element: <Plans />,
         protected: true,
    },   
    {
        path: '/plans-&-offers/offers',
        element: <Offers />,
         protected: true,
    },   
   
      
    // faq
     
    // terms conditions
    {
        path: '/terms&conditions/terms-and-conditions',
        element: <TermsAndConditions />,
         protected: true,
    },   
    // privacy
    {
        path: '/privacy&policy/privacy-policy',
        element: <PrivacyPolicy />,
         protected: true,
    },   
    // shipping info
    {
        path: '/shippinginfo/shipping-info',
        element: <ShippingInfo />,
         protected: true,
    },   
    // refund
    {
        path: '/refund&policy/refund-policy',
        element: <RefundPolicy />,
         protected: true,
    },   
    // contact messages
    {
        path: '/contactmessages/contact-messages',
        element: <ContactMessages />,
         protected: true,
    },   

    // login
    {
        path: '/auth/login',
        element: <Login />,
        layout: 'blank',
        protected: false, // login page is public
    },   
    {
        path: '/auth/register',
        element: <Register />,
        layout: 'blank',
        protected: false, // login page is public
    },   
    
    // {
    //     path: '/auth/boxed-signin',
    //     element: <LoginBoxed />,
    //     layout: 'blank',
    // },
   
      // dashboard
    //   {
    //     path: '/dashboard',
    //     element: <Dashboard />,
    // },
    
    // ********************************************************************************************************************************************




    // dashboard
    // {
    //     path: '/',
    //     element: <PrivateRoute><Index /></PrivateRoute>,
    // },
    // {
    //     path: '/index',
    //     element: <Index />,
    // },
    // analytics page
    {
        path: '/analytics',
        element: <Analytics />,
    },
    // finance page
    {
        path: '/finance',
        element: <Finance />,
    },
    // crypto page
    {
        path: '/crypto',
        element: <Crypto />,
    },
    {
        path: '/apps/todolist',
        element: <Todolist />,
    },
    {
        path: '/apps/notes',
        element: <Notes />,
    },
    {
        path: '/apps/contacts',
        element: <Contacts />,
    },
    {
        path: '/apps/mailbox',
        element: <Mailbox />,
    },
    {
        path: '/apps/invoice/list',
        element: <List />,
    },
    // Apps page
    {
        path: '/apps/chat',
        element: <Chat />,
    },
    {
        path: '/apps/scrumboard',
        element: <Scrumboard />,
    },
    {
        path: '/apps/calendar',
        element: <Calendar />,
    },
    // preview page
    {
        path: '/apps/invoice/preview',
        element: <Preview />,
    },
    {
        path: '/apps/invoice/add',
        element: <Add />,
    },
    {
        path: '/apps/invoice/edit',
        element: <Edit />,
    },
    // components page
    {
        path: '/components/tabs',
        element: <Tabs />,
    },
    {
        path: '/components/accordions',
        element: <Accordians />,
    },
    {
        path: '/components/modals',
        element: <Modals />,
    },
    {
        path: '/components/cards',
        element: <Cards />,
    },
    {
        path: '/components/carousel',
        element: <Carousel />,
    },
    {
        path: '/components/countdown',
        element: <Countdown />,
    },
    {
        path: '/components/counter',
        element: <Counter />,
    },
    {
        path: '/components/sweetalert',
        element: <SweetAlert />,
    },
    {
        path: '/components/timeline',
        element: <Timeline />,
    },
    {
        path: '/components/notifications',
        element: <Notification />,
    },
    {
        path: '/components/media-object',
        element: <MediaObject />,
    },
    {
        path: '/components/list-group',
        element: <ListGroup />,
    },
    {
        path: '/components/pricing-table',
        element: <PricingTable />,
    },
    {
        path: '/components/lightbox',
        element: <LightBox />,
    },
    // elements page
    {
        path: '/elements/alerts',
        element: <Alerts />,
    },
    {
        path: '/elements/avatar',
        element: <Avatar />,
    },
    {
        path: '/elements/badges',
        element: <Badges />,
    },
    {
        path: '/elements/breadcrumbs',
        element: <Breadcrumbs />,
    },
    {
        path: '/elements/buttons',
        element: <Buttons />,
    },
    {
        path: '/elements/buttons-group',
        element: <Buttongroups />,
    },
    {
        path: '/elements/color-library',
        element: <Colorlibrary />,
    },
    {
        path: '/elements/dropdown',
        element: <DropdownPage />,
    },
    {
        path: '/elements/infobox',
        element: <Infobox />,
    },
    {
        path: '/elements/jumbotron',
        element: <Jumbotron />,
    },
    {
        path: '/elements/loader',
        element: <Loader />,
    },
    {
        path: '/elements/pagination',
        element: <Pagination />,
    },
    {
        path: '/elements/popovers',
        element: <Popovers />,
    },
    {
        path: '/elements/progress-bar',
        element: <Progressbar />,
    },
    {
        path: '/elements/search',
        element: <Search />,
    },
    {
        path: '/elements/tooltips',
        element: <Tooltip />,
    },
    {
        path: '/elements/treeview',
        element: <Treeview />,
    },
    {
        path: '/elements/typography',
        element: <Typography />,
    },

    // charts page
    {
        path: '/charts',
        element: <Charts />,
    },
    // widgets page
    {
        path: '/widgets',
        element: <Widgets />,
    },
    //  font-icons page
    {
        path: '/font-icons',
        element: <FontIcons />,
    },
    //  Drag And Drop page
    {
        path: '/dragndrop',
        element: <DragAndDrop />,
    },
    //  Tables page
    {
        path: '/tables',
        element: <Tables />,
    },
    // Data Tables
    {
        path: '/datatables/basic',
        element: <Basic />,
    },
    {
        path: '/datatables/advanced',
        element: <Advanced />,
    },
    {
        path: '/datatables/skin',
        element: <Skin />,
    },
    {
        path: '/datatables/order-sorting',
        element: <OrderSorting />,
    },
    {
        path: '/datatables/multi-column',
        element: <MultiColumn />,
    },
    {
        path: '/datatables/multiple-tables',
        element: <MultipleTables />,
    },
    {
        path: '/datatables/alt-pagination',
        element: <AltPagination />,
    },
    {
        path: '/datatables/checkbox',
        element: <Checkbox />,
    },
    {
        path: '/datatables/range-search',
        element: <RangeSearch />,
    },
    {
        path: '/datatables/export',
        element: <Export />,
    },
    {
        path: '/datatables/column-chooser',
        element: <ColumnChooser />,
    },
    // Users page
    {
        path: '/users/profile',
        element: <Profile />,
    },
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },
    // pages
    {
        path: '/pages/knowledge-base',
        element: <KnowledgeBase />,
    },
    {
        path: '/pages/contact-us-boxed',
        element: <ContactUsBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/contact-us-cover',
        element: <ContactUsCover />,
        layout: 'blank',
    },
    {
        path: '/pages/faq',
        element: <Faq />,
    },
    {
        path: '/pages/coming-soon-boxed',
        element: <ComingSoonBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/coming-soon-cover',
        element: <ComingSoonCover />,
        layout: 'blank',
    },
    {
        path: '/pages/error404',
        element: <ERROR404 />,
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: <Maintenence />,
        layout: 'blank',
    },
    //Authentication
    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-lockscreen',
        element: <UnlockBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-password-reset',
        element: <RecoverIdBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-login',
        element: <LoginCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-register',
        element: <RegisterCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-lockscreen',
        element: <UnlockCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-password-reset',
        element: <RecoverIdCover />,
        layout: 'blank',
    },
    //forms page
    {
        path: '/forms/basic',
        element: <FormBasic />,
    },
    {
        path: '/forms/input-group',
        element: <FormInputGroup />,
    },
    {
        path: '/forms/layouts',
        element: <FormLayouts />,
    },
    {
        path: '/forms/validation',
        element: <Validation />,
    },
    {
        path: '/forms/input-mask',
        element: <InputMask />,
    },
    {
        path: '/forms/select2',
        element: <Select2 />,
    },
    {
        path: '/forms/touchspin',
        element: <Touchspin />,
    },
    {
        path: '/forms/checkbox-radio',
        element: <CheckBoxRadio />,
    },
    {
        path: '/forms/switches',
        element: <Switches />,
    },
    {
        path: '/forms/wizards',
        element: <Wizards />,
    },
    {
        path: '/forms/file-upload',
        element: <FileUploadPreview />,
    },
    {
        path: '/forms/quill-editor',
        element: <QuillEditor />,
    },
    {
        path: '/forms/markdown-editor',
        element: <MarkDownEditor />,
    },
    {
        path: '/forms/date-picker',
        element: <DateRangePicker />,
    },
    {
        path: '/forms/clipboard',
        element: <Clipboard />,
    },
    {
        path: '/about',
        element: <About />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
