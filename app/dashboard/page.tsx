import { redirect } from 'next/navigation';

// Redirect /dashboard to /dashboard/stories
export default function DashboardPage() {
  redirect('/dashboard/stories');
}
