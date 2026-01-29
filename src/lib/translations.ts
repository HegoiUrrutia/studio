
export type Language = "en" | "eu";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    games: "Games",
    consoles: "Consoles",
    merchandise: "Merchandise",

    // UserNav
    login: "Login",
    register: "Register",
    profile: "Profile",
    orders: "Orders",
    settings: "Settings",
    logout: "Logout",

    // Cart
    cart: "Cart",
    your_cart: "Your Cart",
    add_to_cart: "Add to Cart",
    item_added_to_cart: "Item Added to Cart",
    has_been_added: "has been added to your cart.",
    subtotal: "Subtotal",
    proceed_to_checkout: "Proceed to Checkout",
    cart_empty_title: "Your Cart is Empty",
    cart_empty_subtitle: "Looks like you haven't added anything to your cart yet.",
    continue_shopping: "Continue Shopping",
    you_might_also_like: "You might also like",
    quantity: "Quantity",

    // Products
    no_products_found: "No Products Found",
    try_adjusting_filters: "Try adjusting your search or filters.",

    // Filters
    filters: "Filters",
    search: "Search",
    search_placeholder: "Search for products...",
    category: "Category",
    platform: "Platform",
    price: "Price",
    
    // Checkout
    checkout: "Checkout",
    back_to_shop: "Back to Shop",
    checkout_empty_title: "Your cart is empty!",
    checkout_empty_subtitle: "You can't proceed to checkout without any items.",
    shipping_information: "Shipping Information",
    first_name: "First Name",
    last_name: "Last Name",
    address: "Address",
    city: "City",
    state: "State",
    zip_code: "ZIP Code",
    payment_details: "Payment Details",
    card_number: "Card Number",
    expiry_date: "Expiry Date",
    cvc: "CVC",
    order_summary: "Order Summary",
    order_summary_desc: "Here's a summary of your order.",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    place_order: "Place Order",
    order_placed: "Order Placed!",
    order_placed_desc: "Your order has been successfully placed.",
    view_orders: "View Orders",

    // Order History
    order_history: "Order History",
    order_history_desc: "Check the status of recent orders.",
    no_orders_found: "No Orders Found",
    no_orders_found_desc: "You haven't placed any orders yet.",
    order_id: "Order ID",
    order_date: "Date",
    order_status: "Status",
    order_total: "Total",
    order_details: "Order Details",
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    completed: "Completed",

    // Password Reset
    forgot_password: "Forgot your password?",
    forgot_password_title: "Forgot Password",
    forgot_password_desc: "Enter your email and we'll send you a link to reset your password.",
    send_reset_email: "Send Reset Email",
    reset_email_sent_title: "Reset Email Sent",
    reset_email_sent_desc: "Check your inbox for a password reset link.",
    back_to_login: "Back to Login",

    // Footer
    all_rights_reserved: "All rights reserved.",
  },
  eu: {
    // Header
    games: "Jokoak",
    consoles: "Kontsolak",
    merchandise: "Merchandising",

    // UserNav
    login: "Hasi saioa",
    register: "Erregistratu",
    profile: "Profila",
    orders: "Eskaerak",
    settings: "Ezarpenak",
    logout: "Amaitu saioa",

    // Cart
    cart: "Saskia",
    your_cart: "Zure Saskia",
    add_to_cart: "Saskira Gehitu",
    item_added_to_cart: "Produktua Saskira Gehituta",
    has_been_added: "zure saskira gehitu da.",
    subtotal: "Guztira (bez gabe)",
    proceed_to_checkout: "Erosketa Amaitu",
    cart_empty_title: "Zure Saskia Hutsik Dago",
    cart_empty_subtitle: "Badirudi oraindik ez duzula ezer gehitu saskira.",
    continue_shopping: "Erosten Jarraitu",
    you_might_also_like: "Agian hau ere gustatuko zaizu",
    quantity: "Kantitatea",

    // Products
    no_products_found: "Ez da Produkturik Aurkitu",
    try_adjusting_filters: "Saiatu bilaketa edo iragazkiak aldatzen.",

    // Filters
    filters: "Iragazkiak",
    search: "Bilatu",
    search_placeholder: "Bilatu produktuak...",
    category: "Kategoria",
    platform: "Plataforma",
    price: "Prezioa",
    
    // Checkout
    checkout: "Erosketa",
    back_to_shop: "Dendara Itzuli",
    checkout_empty_title: "Zure saskia hutsik dago!",
    checkout_empty_subtitle: "Ezin duzu erosketa egin produkturik gabe.",
    shipping_information: "Bidalketa Informazioa",
    first_name: "Izena",
    last_name: "Abizena",
    address: "Helbidea",
    city: "Hiria",
    state: "Probintzia",
    zip_code: "Posta Kodea",
    payment_details: "Ordainketa Xehetasunak",
    card_number: "Txartel Zenbakia",
    expiry_date: "Iraungitze Data",
    cvc: "CVC",
    order_summary: "Eskaeraren Laburpena",
    order_summary_desc: "Hemen duzu zure eskaeraren laburpena.",
    shipping: "Bidalketa",
    free: "Doan",
    total: "Guztira",
    place_order: "Eskaera Egin",
    order_placed: "Eskaera Eginda!",
    order_placed_desc: "Zure eskaera ondo egin da.",
    view_orders: "Eskaerak Ikusi",
    
    // Order History
    order_history: "Eskaeren historiala",
    order_history_desc: "Egiaztatu azken eskaeren egoera.",
    no_orders_found: "Ez da Eskaerarik Aurkitu",
    no_orders_found_desc: "Oraindik ez duzu eskaerarik egin.",
    order_id: "Eskaera ID",
    order_date: "Data",
    order_status: "Egoera",
    order_total: "Guztira",
    order_details: "Eskaeraren Xehetasunak",
    pending: "Zain",
    processing: "Prozesatzen",
    shipped: "Bidalia",
    completed: "Osatuta",

    // Password Reset
    forgot_password: "Pasahitza ahaztu duzu?",
    forgot_password_title: "Pasahitza Ahaztuta",
    forgot_password_desc: "Sartu zure helbide elektronikoa eta pasahitza berrezartzeko esteka bat bidaliko dizugu.",
    send_reset_email: "Berrezartzeko Emaila Bidali",
    reset_email_sent_title: "Berrezartzeko Emaila Bidali da",
    reset_email_sent_desc: "Egiaztatu sarrera-ontzia pasahitza berrezartzeko esteka aurkitzeko.",
    back_to_login: "Saioa Hastera Itzuli",

    // Footer
    all_rights_reserved: "Eskubide guztiak erreserbatuta.",
  },
};
