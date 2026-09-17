import {
  IconBook,
  IconDashboard,
  IconHelp,
  IconSettings,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react"

export const mainNavigation = [
  { title: "Dashboard", url: "/admin", icon: IconDashboard, exact: true },
  { title: "Users", url: "/admin/users", icon: IconUsers },
  { title: "Settings", url: "/admin/settings", icon: IconSettings },
]

export function secondaryNavigation(repositoryUrl) {
  return [
    { title: "View site", url: "/", icon: IconWorld, inertia: true },
    { title: "Documentation", url: `${repositoryUrl}#readme`, icon: IconBook },
    { title: "Get help", url: `${repositoryUrl}/issues`, icon: IconHelp },
  ]
}

/** Returns the navigation item for the current URL, used for the active state and the page title. */
export function currentItem(url) {
  const path = url.split(/[?#]/)[0]
  return mainNavigation.find((item) => (item.exact ? path === item.url : path.startsWith(item.url)))
}
