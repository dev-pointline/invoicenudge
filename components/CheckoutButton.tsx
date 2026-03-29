'use client';

export function CheckoutButton({ tier }: { tier: 'starter' | 'pro' | 'agency' }) {
  const links = {
    starter: process.env.NEXT_PUBLIC_POLAR_CHECKOUT_LINK_STARTER,
    pro: process.env.NEXT_PUBLIC_POLAR_CHECKOUT_LINK_PRO,
    agency: process.env.NEXT_PUBLIC_POLAR_CHECKOUT_LINK_AGENCY,
  };
  
  return (
    <a 
      href={links[tier]}
      className="bg-primary text-white px-6 py-3 rounded-lg"
    >
      Get {tier.charAt(0).toUpperCase() + tier.slice(1)}
    </a>
  );
}