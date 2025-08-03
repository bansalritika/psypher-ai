**Tiered Events App**

This project is a Next.js application that demonstrates a tiered event access system. Users are assigned a membership tier (Free, Silver, Gold, or Platinum) and can only view events that correspond to their tier or a lower tier. The application uses Clerk for user authentication and Supabase for the event database.

**🚀 Features**

Tier-Based Access: Events are fetched and displayed based on the user's membership tier.

Authentication: Secure user sign-in and sign-up with Clerk.

Tiered Content: Users can see locked events above their tier with an "Upgrade" message.

Simulated Upgrade: A button to simulate upgrading a user's tier by updating their Clerk public metadata.

Responsive UI: Built with Tailwind CSS for a clean and responsive design.

**🛠️ Tech Stack**
Framework: Next.js

Authentication: Clerk

Database: Supabase

Styling: Tailwind CSS

UI Components: Lucide-react for icons

**⚙️ Setup Instructions**

Follow these steps to get the project up and running on your local machine.

Prerequisites

Node.js (v18 or higher)

npm or yarn

A Clerk account

A Supabase account

**1. Clone the Repository**

git clone <your-repo-url>
cd <your-project-folder>

**2. Install Dependencies**

npm install
or
yarn install

**3. Configure Environment Variables**

Create a .env.local file in the root of your project and add the following keys.

**From Clerk:**

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: Your Clerk publishable key.

CLERK_SECRET_KEY: Your Clerk secret key.

**From Supabase:**

NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL.

NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase public "anon" key.

Your .env.local file should look like this:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiI..."

**🔑 Demo User Credentials**

Use the following credentials to test the tiered access system. You will need to create these users and set their metadata in your Clerk dashboard.

Email	                     Password	       Tier	          Notes

freeuser@example.com	     password	       free	       Can only see free events.

silveruser@example.com	   password	      silver	     Can see free and silver events.

golduser@example.com	     password     	gold	       Can see free, silver, and gold events.

platinumuser@example.com	 password	    platinum	     Can see all events.
