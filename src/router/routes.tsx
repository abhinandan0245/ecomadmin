import { lazy } from 'react';
// import PrivateRoute from '../components/PrivateRoute';


const FontIcons = lazy(() => import('../pages/FontIcons'));


const Error = lazy(() => import('../components/Error'));
const Charts = lazy(() => import('../pages/Charts'));

const AddNew = lazy(() => import('../pages/products/AddNew'));
const AllProducts = lazy(() => import('../pages/products/AllProducts'));
const Categories = lazy(() => import('../pages/category/Categories'));
const AddNewCat = lazy(() => import('../pages/category/AddNewCat'));
const Brands = lazy(() => import('../pages/products/Brands'));
const AddBrand = lazy(() => import('../pages/products/AddBrand'));
const Inventory = lazy(() => import('../pages/products/Inventory'));
const ProductReviews = lazy(() => import('../pages/products/ProductReviews'));
const AllOrders = lazy(() => import('../pages/order/AllOrders'));
const OrderDetails = lazy(() => import('../pages/order/OrderDetails'));
// const DeliveredOrder = lazy(() => import('../pages/order/DeliveredOrder'));
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

const TermsAndConditions = lazy(() => import('../pages/terms&conditions/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('../pages/Privacy&policy/PrivacyPolicy'));
const ShippingInfo = lazy(() => import('../pages/shippinginfo/ShippingInfo'));
const ContactMessages = lazy(() => import('../pages/contactmessages/ContactMessages'));
const RefundPolicy = lazy(() => import('../pages/refund&policy/Refund&policy'));
const Login = lazy(() => import('../pages/auth/Login'));
// const Register = lazy(() => import('../pages/auth/Register'));
const AddZone = lazy(() => import('../pages/shipping/AddZone'));
// const Dashboard = lazy(() => import('../pages/Dashboard'));

const routes = [

    

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
        path: '/',
        element: <AllOrders />,
         protected: true,
    },  
    {
        path: '/order/order-details/:id',
        element: <OrderDetails />,
         protected: true,
    },   
    // {
    //     path: '/order/delivered-order', 
    //     element: <DeliveredOrder />,
    //      protected: true,
    // },   
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
    // {
    //     path: '/auth/register',
    //     element: <Register />,
    //     layout: 'blank',
    //     protected: false, // register page is public
    // },   
    
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




   
  

    // charts page
    {
        path: '/charts',
        element: <Charts />,
    },
    // widgets page
   
    //  font-icons page
    {
        path: '/font-icons',
        element: <FontIcons />,
    },
 
  
   
    //forms page
    
   
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
