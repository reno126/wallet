import Link from "next/link";
import { UserStatus } from "./UserStatus";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Wallets", href: "/wallets" },
  { name: "Add Wallet", href: "/wallet/new" },
];

export function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <ul className="flex space-x-4">
        {navigationLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="hover:underline">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <UserStatus />
    </nav>
  );
}
