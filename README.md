# 🏠 RentMate - Property Management Platform

A comprehensive property and tenant management platform with an integrated marketing landing page. Built with React, TypeScript, and Tailwind CSS, this modern web application streamlines rental property operations, lease management, payment tracking, and tenant communications.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [User Roles](#-user-roles)
- [Key Modules](#-key-modules)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🌐 Landing Page
- **Marketing Website** - Professional landing page showcasing platform features
- **Feature Highlights** - Separate sections for landlords and tenants
- **Pricing Plans** - Transparent pricing with Free, Professional, and Enterprise tiers
- **Testimonials** - Social proof from satisfied users
- **Call-to-Action** - Easy sign-up flow for both landlords and tenants
- **Responsive Design** - Mobile-first design that works on all devices

### 🏢 Property Management
- **Property Portfolio Overview** - Visual dashboard with property cards showing images, occupancy rates, and monthly income
- **Property Details** - Comprehensive property information including units, tenants, and maintenance history
- **Add/Edit Properties** - Easy property onboarding with support for apartments, houses, and condos
- **Occupancy Tracking** - Real-time monitoring of vacant and occupied units
- **Advanced Filters** - Filter properties by type, status, and occupancy

### 👥 Tenant Management
- **Tenant Directory** - Complete tenant profiles with contact information and lease details
- **Tenant Details** - Individual tenant pages with payment history, maintenance requests, and documents
- **Lease Status Tracking** - Monitor active, pending, and expired leases
- **Communication Tools** - Contact tenants via email or WhatsApp directly from the platform
- **Document Management** - Store and view tenant documents (IDs, income proofs, lease agreements)

### 💰 Payment & Financial Management
- **Payment Tracking** - Monitor all rent payments with status indicators (paid, pending, overdue)
- **Record Payments** - Quick payment entry with multiple payment methods (Bank Transfer, Credit Card, Check)
- **Financial Dashboard** - Real-time stats showing total collected, pending, and overdue amounts
- **Payment History** - Complete transaction history with receipt downloads
- **Export Reports** - Generate financial reports in PDF, Excel, or CSV formats
- **Date Range Filters** - Analyze payments by custom date ranges

### 📄 Lease Management
- **Template System** - Upload and manage customizable lease agreement templates
- **Merge Fields** - Auto-fill tenant and property details using merge fields:
  - `{{TENANT_NAME}}`, `{{PROPERTY_ADDRESS}}`, `{{MONTHLY_RENT}}`
  - `{{LEASE_START_DATE}}`, `{{LEASE_END_DATE}}`, `{{SECURITY_DEPOSIT}}`
  - And 8 more merge fields for complete customization
- **Preview & Download** - Preview templates before sending to tenants
- **Multi-Channel Delivery** - Send leases via Email, WhatsApp, or both
- **Usage Tracking** - Track how many times each template has been used
- **Smart Recommendations** - Get suggestions on when to send leases (onboarding, renewal, amendments)

### 👥 Team Management
- **Role-Based Access Control** - Assign team members with specific roles:
  - **Admin** - Full access to all features
  - **Manager** - Property and tenant management
  - **Accountant** - Financial operations and reporting
  - **Maintenance** - Maintenance request handling
- **Permission Matrix** - Granular control over what each role can do
- **Team Directory** - View all team members with their roles and contact information

### 🔔 Notifications & Alerts
- **Real-time Notifications** - Stay updated on important events
- **Lease Expiry Alerts** - Get notified when leases are expiring soon
- **Payment Reminders** - Automated reminders for upcoming and overdue payments
- **Maintenance Updates** - Track maintenance request status changes

### 📊 Dashboard & Analytics
- **Overview Stats** - Total properties, monthly income, and overdue rent at a glance
- **Income Chart** - 6-month income visualization with trend analysis
- **Property Status Pie Chart** - Visual representation of occupied vs vacant units
- **Recent Activity Feed** - Timeline of recent payments, new tenants, and maintenance
- **Quick Actions** - One-click access to frequently used features
- **Clickable Widgets** - Navigate directly from stat cards to detailed pages

### ⚙️ Settings & Customization
- **Profile Management** - Update personal information and profile photo
- **Security Settings** - Change password and manage account security
- **Notification Preferences** - Customize email and push notification settings
- **Language & Display** - Choose language and theme preferences

---

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend (Ready for Integration)
- **Supabase** - Backend-as-a-Service (BaaS) ready
- Component structure prepared for API integration
- State management ready for Redux/Context API

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rafiquecudjoe/rent-management.git
   cd rent-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be generated in the `dist` folder.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

### Type Checking

```bash
npm run typecheck
# or
yarn typecheck
```

### Linting

```bash
npm run lint
# or
yarn lint
```

---

## 📁 Project Structure

```
rent-management/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Top navigation with actions
│   │   ├── Sidebar.tsx      # Side navigation menu
│   │   ├── QuickActions.tsx # Quick action buttons
│   │   ├── StatsCards.tsx   # Dashboard stat cards
│   │   ├── LeasesTable.tsx  # Expiring leases table
│   │   ├── IncomeOverview.tsx    # Income chart
│   │   ├── PropertyStatus.tsx    # Property status chart
│   │   ├── RecentActivity.tsx    # Activity feed
│   │   └── RecordPaymentModal.tsx # Payment recording modal
│   │
│   ├── pages/              # Main application pages
│   │   ├── Login.tsx       # Login/authentication page
│   │   ├── Register.tsx    # New user registration
│   │   ├── ForgotPassword.tsx # Password recovery
│   │   ├── Dashboard.tsx   # Main dashboard (landlord)
│   │   ├── Properties.tsx  # Property list & management
│   │   ├── PropertyDetails.tsx # Individual property view
│   │   ├── AddProperty.tsx # Add/edit property form
│   │   ├── Tenants.tsx     # Tenant directory
│   │   ├── TenantDetails.tsx # Individual tenant view
│   │   ├── AddTenant.tsx   # Tenant onboarding form
│   │   ├── Payments.tsx    # Payment tracking
│   │   ├── PaymentHistory.tsx # Payment history
│   │   ├── LeaseManagement.tsx # Lease template system
│   │   ├── TeamManagement.tsx  # Team & roles
│   │   ├── Settings.tsx    # User settings
│   │   ├── Notifications.tsx # Notification center
│   │   ├── TenantDashboard.tsx # Tenant portal dashboard
│   │   ├── TenantPayments.tsx  # Tenant payment view
│   │   └── MyLease.tsx     # Tenant lease viewer
│   │
│   ├── App.tsx             # Main app component & routing
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles
│   └── vite-env.d.ts       # Vite type definitions
│
├── public/                 # Static assets
├── .github/
│   └── copilot-instructions.md # GitHub Copilot guidelines
├── index.html              # HTML template
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # Project documentation
```

---

## 👤 User Roles

### 🏢 Property Owner/Landlord
**Full Dashboard Access**

- Manage all properties and tenants
- Track payments and financials
- Send lease agreements
- Manage team members
- Generate reports
- View analytics and insights

### 🏠 Tenant
**Limited Portal Access**

- View lease agreement
- Make rent payments
- Submit maintenance requests
- View payment history
- Update personal information
- Download receipts

### 👥 Team Members
**Role-Based Access**

**Admin** - Complete system access
- All features available
- User management
- System configuration

**Manager** - Property & tenant operations
- Add/edit properties
- Manage tenants
- Handle maintenance requests
- No financial access

**Accountant** - Financial operations
- Record payments
- Generate reports
- View financial data
- No property/tenant editing

**Maintenance** - Service requests
- View and update maintenance requests
- Access property details
- Limited system access

---

## 🔑 Key Modules

### 1. Authentication System
- **Login** - Secure email/password authentication
- **Registration** - Separate flows for landlords and tenants
- **Password Recovery** - Email-based password reset
- **Role Selection** - Choose between property owner or tenant

### 2. Dashboard
- **Landlord Dashboard** - Comprehensive overview with stats, charts, and quick actions
- **Tenant Dashboard** - Simplified view with rent status, payment options, and lease info
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### 3. Property Module
- **CRUD Operations** - Create, read, update, delete properties
- **Unit Management** - Track multiple units per property
- **Occupancy Tracking** - Monitor vacant and occupied units
- **Property Details** - Comprehensive view with tenant list and maintenance history
- **Image Support** - Upload and display property photos
- **Filter & Search** - Find properties quickly with advanced filters

### 4. Tenant Module
- **Tenant Directory** - Searchable list of all tenants
- **Tenant Profiles** - Detailed information including lease, payments, and documents
- **Contact Management** - Email and phone integration
- **Document Storage** - Store IDs, income proofs, and lease agreements
- **Communication Tools** - Send messages via email or WhatsApp
- **Lease Tracking** - Monitor lease start, end, and renewal dates

### 5. Payment Module
- **Payment Recording** - Quick entry for received payments
- **Payment Tracking** - Monitor paid, pending, and overdue payments
- **Multiple Payment Methods** - Bank transfer, credit card, check support
- **Receipt Generation** - Automatic receipt creation and download
- **Financial Stats** - Real-time financial overview
- **Export Functionality** - Generate reports in multiple formats

### 6. Lease Management Module
- **Template Library** - Store multiple lease templates
- **Merge Field System** - 14 dynamic fields for auto-customization
- **Preview Feature** - Review leases before sending
- **Multi-Channel Delivery** - Send via email, WhatsApp, or both
- **Usage Analytics** - Track template usage and effectiveness
- **Smart Timing** - Recommendations on when to send leases

### 7. Team Management Module
- **User Invitation** - Invite team members via email
- **Role Assignment** - Assign appropriate roles and permissions
- **Permission Matrix** - View detailed capabilities for each role
- **Team Directory** - List of all team members with contact info
- **Edit/Remove** - Manage team member access

---

## 📸 Screenshots

### Landlord Dashboard
![Dashboard](https://via.placeholder.com/800x450?text=Dashboard+Screenshot)
*Comprehensive overview with stats, income chart, and recent activity*

### Property Management
![Properties](https://via.placeholder.com/800x450?text=Properties+Screenshot)
*Property portfolio with cards showing occupancy and income*

### Tenant Directory
![Tenants](https://via.placeholder.com/800x450?text=Tenants+Screenshot)
*Tenant cards with lease status and quick actions*

### Payment Tracking
![Payments](https://via.placeholder.com/800x450?text=Payments+Screenshot)
*Payment table with filters and export options*

### Lease Management
![Leases](https://via.placeholder.com/800x450?text=Lease+Management+Screenshot)
*Template library with merge fields and preview*

---

## 🎯 Roadmap

### Phase 1 ✅ (Completed)
- [x] Core UI components
- [x] Dashboard layout
- [x] Property management
- [x] Tenant management
- [x] Payment tracking
- [x] Lease management system
- [x] Team management with roles
- [x] All button functionality

### Phase 2 🚧 (In Progress)
- [ ] Supabase backend integration
- [ ] User authentication (Supabase Auth)
- [ ] Database schema implementation
- [ ] API endpoints
- [ ] Real-time data synchronization

### Phase 3 📅 (Planned)
- [ ] Email notifications (SendGrid/Mailgun)
- [ ] WhatsApp integration (Twilio API)
- [ ] PDF generation for reports and leases
- [ ] File upload and storage (Supabase Storage)
- [ ] Receipt generation and printing

### Phase 4 🔮 (Future)
- [ ] Mobile app (React Native)
- [ ] Automated rent reminders
- [ ] Online payment processing (Stripe/PayPal)
- [ ] Maintenance request photos
- [ ] Analytics and insights dashboard
- [ ] Multi-language support
- [ ] Dark mode

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards
- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Rafique Cudjoe**
- GitHub: [@rafiquecudjoe](https://github.com/rafiquecudjoe)
- Repository: [rent-management](https://github.com/rafiquecudjoe/rent-management)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Supabase](https://supabase.com/) - Backend platform
- [Pexels](https://pexels.com/) - Stock images

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/rafiquecudjoe/rent-management/issues) page
2. Create a new issue if your problem isn't already listed
3. Provide as much detail as possible

---

## ⭐ Show Your Support

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ for property managers and landlords**
